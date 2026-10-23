import { randomUUID } from "node:crypto";

const required = [
  "LINKEDIN_ACCESS_TOKEN",
  "LINKEDIN_ORGANIZATION_ID",
  "LINKEDIN_API_VERSION",
  "LINKEDIN_SYNC_START_AT",
  "STORYBLOK_MANAGEMENT_TOKEN",
  "STORYBLOK_SPACE_ID",
  "STORYBLOK_BLOG_FOLDER_ID",
];

for (const key of required) {
  if (!process.env[key]) throw new Error(`Missing required environment variable: ${key}`);
}

if (!/^\d{6}$/.test(process.env.LINKEDIN_API_VERSION)) {
  throw new Error("LINKEDIN_API_VERSION must use YYYYMM format, for example 202610.");
}

const syncStartAt = Date.parse(process.env.LINKEDIN_SYNC_START_AT);
if (!Number.isFinite(syncStartAt)) {
  throw new Error("LINKEDIN_SYNC_START_AT must be a valid ISO date/time.");
}

const organizationUrn = process.env.LINKEDIN_ORGANIZATION_ID.startsWith("urn:")
  ? process.env.LINKEDIN_ORGANIZATION_ID
  : `urn:li:organization:${process.env.LINKEDIN_ORGANIZATION_ID}`;
const spaceId = encodeURIComponent(process.env.STORYBLOK_SPACE_ID);
const folderId = Number(process.env.STORYBLOK_BLOG_FOLDER_ID);
if (!Number.isSafeInteger(folderId) || folderId <= 0) {
  throw new Error("STORYBLOK_BLOG_FOLDER_ID must be the numeric ID of the Storyblok blog folder.");
}

const managementApi = (process.env.STORYBLOK_MANAGEMENT_API || "https://mapi.storyblok.com/v1").replace(/\/$/, "");
const baseStoryblokUrl = `${managementApi}/spaces/${spaceId}`;

async function requestJson(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) {
    const body = await response.text();
    const endpoint = new URL(url);
    throw new Error(`Request failed (${response.status}) for ${endpoint.origin}${endpoint.pathname}: ${body.slice(0, 600)}`);
  }
  return response.status === 204 ? null : response.json();
}

async function getRecentPosts() {
  const allPosts = [];
  const pageSize = 100;
  let start = 0;

  for (let page = 0; page < 10; page += 1) {
    const url = new URL("https://api.linkedin.com/rest/posts");
    url.searchParams.set("author", organizationUrn);
    url.searchParams.set("q", "author");
    url.searchParams.set("count", String(pageSize));
    url.searchParams.set("start", String(start));
    url.searchParams.set("sortBy", "CREATED");
    const result = await requestJson(url, {
      headers: {
        Authorization: `Bearer ${process.env.LINKEDIN_ACCESS_TOKEN}`,
        "Linkedin-Version": process.env.LINKEDIN_API_VERSION,
        "X-Restli-Protocol-Version": "2.0.0",
        "X-RestLi-Method": "FINDER",
      },
    });
    const posts = result.elements ?? [];
    allPosts.push(...posts);
    if (posts.length < pageSize || posts.every((post) => (post.publishedAt ?? post.createdAt ?? 0) < syncStartAt)) break;
    start += posts.length;
  }

  return allPosts.filter((post) =>
    post.lifecycleState === "PUBLISHED" &&
    post.visibility === "PUBLIC" &&
    (post.publishedAt ?? post.createdAt ?? 0) >= syncStartAt &&
    typeof post.id === "string",
  );
}

async function getExistingSlugs() {
  const slugs = new Set();
  let page = 1;
  while (page <= 100) {
    const url = new URL(`${baseStoryblokUrl}/stories/`);
    url.searchParams.set("with_parent", String(folderId));
    url.searchParams.set("per_page", "100");
    url.searchParams.set("page", String(page));
    const result = await requestJson(url, {
      headers: { Authorization: process.env.STORYBLOK_MANAGEMENT_TOKEN },
    });
    const stories = result.stories ?? [];
    for (const story of stories) slugs.add(story.slug);
    if (stories.length < 100) break;
    page += 1;
  }
  return slugs;
}

function postToStory(post) {
  const numericId = post.id.split(":").at(-1);
  const commentary = (post.commentary ?? "").replace(/@\[([^\]]+)\]\([^)]*\)/g, "$1").trim();
  const title = (commentary.split(/\r?\n/).find((line) => line.trim()) || "A note from Conversim")
    .replace(/\s+/g, " ")
    .slice(0, 100);

  return {
    name: title,
    slug: `linkedin-${numericId}`,
    parent_id: folderId,
    content: {
      _uid: randomUUID(),
      component: "linkedin_post",
      title,
      description: commentary.slice(0, 1000),
      category: "LinkedIn",
      author_name: "Conversim",
      date: new Date(post.publishedAt ?? post.createdAt).toISOString().slice(0, 10),
      link_url: `https://www.linkedin.com/feed/update/${post.id}/`,
      link_label: "View on LinkedIn",
      open_in_new_tab: true,
      linkedin_post_id: post.id,
    },
  };
}

async function createDraft(story) {
  await requestJson(`${baseStoryblokUrl}/stories`, {
    method: "POST",
    headers: {
      Authorization: process.env.STORYBLOK_MANAGEMENT_TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ story, publish: false }),
  });
}

const [posts, existingSlugs] = await Promise.all([getRecentPosts(), getExistingSlugs()]);
const newPosts = posts
  .map(postToStory)
  .filter((story) => !existingSlugs.has(story.slug))
  .sort((a, b) => a.content.date.localeCompare(b.content.date));

for (const story of newPosts) {
  await createDraft(story);
  console.log(`Created Storyblok draft: ${story.slug}`);
}

console.log(`LinkedIn sync complete: ${newPosts.length} new draft(s).`);
