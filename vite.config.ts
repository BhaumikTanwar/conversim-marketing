import fs from "node:fs";
import path from "node:path";
import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import mkcert from "vite-plugin-mkcert";
import { PAGE_META, DEFAULT_SITE, fillSeo, type PageMeta } from "./src/seo.ts";

type CmsStory = {
  full_slug: string;
  name: string;
  content?: { component?: string; noindex?: boolean; no_index?: boolean; seo_title?: string; seo_description?: string; og_image?: { filename?: string } };
};
type CmsPage = { route: string; meta: PageMeta; image?: string; noindex: boolean };

// Published Storyblok pages, so each gets its own sitemap entry and link-preview tags.
// A failed request only skips CMS pages; it never breaks the build.
async function cmsPages(token?: string): Promise<CmsPage[]> {
  if (!token) return [];
  const pages: CmsPage[] = [];
  try {
    for (let page = 1; ; page++) {
      const res = await fetch(`https://api.storyblok.com/v2/cdn/stories?token=${token}&version=published&per_page=100&page=${page}`);
      if (!res.ok) throw new Error(`Storyblok answered ${res.status}`);
      const { stories } = (await res.json()) as { stories: CmsStory[] };
      for (const story of stories) {
        const content = story.content ?? {};
        const route = `/${story.full_slug}`;
        if (content.component !== "page" || route === "/home" || route.startsWith("/global/") || route in PAGE_META) continue;
        pages.push({
          route,
          noindex: Boolean(content.noindex ?? content.no_index),
          image: content.og_image?.filename || undefined,
          meta: { title: content.seo_title || story.name, description: content.seo_description || PAGE_META["/"].description },
        });
      }
      if (stories.length < 100) break;
    }
  } catch (error) {
    console.warn(`[seo] CMS pages left out of the sitemap: ${(error as Error).message}`);
    return [];
  }
  return pages;
}

function seoPages(site: string, token?: string): Plugin {
  let template = "";
  let outDir = "";

  return {
    name: "marketing-seo-pages",
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
    },
    transformIndexHtml: {
      order: "post",
      handler(html) {
        template = html;
        return fillSeo(html, "/", site);
      },
    },
    async closeBundle() {
      if (!template) return;
      const routes = Object.keys(PAGE_META);
      for (const route of routes) {
        if (route !== "/") {
          fs.writeFileSync(path.join(outDir, `${route.slice(1)}.html`), fillSeo(template, route, site));
        }
      }
      const cms = await cmsPages(token);
      for (const { route, meta, image } of cms) {
        const file = path.join(outDir, `${route.slice(1)}.html`);
        fs.mkdirSync(path.dirname(file), { recursive: true });
        fs.writeFileSync(file, fillSeo(template, route, site, meta, image));
      }
      const indexableRoutes = [
        ...routes.filter((route) => route !== "/privacy" && route !== "/terms"),
        ...cms.filter((page) => !page.noindex).map((page) => page.route),
      ];
      const sitemapUrls = indexableRoutes.map((route) => `  <url><loc>${site}${route}</loc></url>`).join("\n");
      fs.writeFileSync(
        path.join(outDir, "sitemap.xml"),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls}\n</urlset>\n`,
      );
      const appRoutes = ["login", "signup", "dashboard", "settings", "billing", "profile", "attempts", "workshops", "call-presets", "mcp-servers", "personas", "evaluations", "try-demo", "share", "admin"];
      const disallow = appRoutes.map((r) => `Disallow: /${r}`).join("\n");
      fs.writeFileSync(
        path.join(outDir, "robots.txt"),
        `User-agent: *\nAllow: /\n${disallow}\n\nSitemap: ${site}/sitemap.xml\n`,
      );
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const site = (env.VITE_SITE_URL || DEFAULT_SITE).replace(/\/+$/, "");

  return {
    plugins: [react(), tailwindcss(), mkcert(), seoPages(site, env.VITE_STORYBLOK_DELIVERY_API_TOKEN)],
    resolve: { alias: { "@": path.resolve(import.meta.dirname, "./src") } },
    build: { chunkSizeWarningLimit: 600 },
  };
});
