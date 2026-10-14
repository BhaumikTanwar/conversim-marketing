/* Storyblok blocks have different schemas, matching the existing landing renderer. */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useStoryblokApi, useStoryblokState } from "@storyblok/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

import {
  normalizeStoryblokPage,
  StoryblokFooter,
  StoryblokHeader,
  StoryblokSections,
} from "../storyblokLibrary";
import Loader from "../../../shared/components/Loader";
import NotFound from "../../../shared/components/NotFound";
import { usePageMeta } from "../../../shared/hooks/usePageMeta";

export default function StoryblokPage() {
  const { pathname, hash } = useLocation();
  const slug = pathname.replace(/^\/+|\/+$/g, "");
  const isDevelopmentPreview = import.meta.env.DEV;
  const storyblokApi = useStoryblokApi();
  const [result, setResult] = useState<{
    slug: string;
    story: any;
    notFound: boolean;
    fetchError: string | null;
  }>({ slug: "", story: null, notFound: false, fetchError: null });
  const story = useStoryblokState<any>(result.story);
  const seoContent = story?.content;
  usePageMeta(pathname, seoContent ? {
    title: seoContent.seo_title || story.name,
    description: seoContent.seo_description || "",
    image: seoContent.og_image?.filename || seoContent.og_image?.url,
    noIndex: Boolean(seoContent.no_index ?? seoContent.noindex),
  } : undefined);

  useEffect(() => {
    let cancelled = false;

    storyblokApi
      ?.get(`cdn/stories/${slug}`, {
        version: isDevelopmentPreview ? "draft" : "published",
      })
      .then(({ data }: any) => {
        if (!cancelled) {
          setResult({ slug, story: data.story, notFound: false, fetchError: null });
        }
      })
      .catch((error: any) => {
        const status = error?.response?.status;
        const message = error?.response?.data?.error || error?.message || "Unknown request error";

        console.error(`Failed to load Storyblok story "${slug}"`, error);

        if (!cancelled) {
          setResult({
            slug,
            story: null,
            notFound: status === 404,
            fetchError: status === 404 ? null : `${status ? `HTTP ${status}: ` : ""}${message}`,
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [slug, storyblokApi, isDevelopmentPreview]);

  useEffect(() => {
    if (!story || !hash) return;
    const timer = window.setTimeout(() => {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 80);
    return () => window.clearTimeout(timer);
  }, [story, hash]);

  if (result.slug !== slug) {
    return (
      <div className="min-h-dvh bg-bg flex items-center justify-center">
        <Loader label="Loading page…" />
      </div>
    );
  }

  if (result.fetchError) {
    return (
      <main className="min-h-dvh flex flex-col items-center justify-center gap-3 bg-bg px-6 text-center">
        <h1 className="text-2xl font-semibold text-aurora-text">Could not load this page</h1>
        <p className="max-w-2xl text-sm text-aurora-text-2">
          Storyblok request failed for <code>/{slug}</code>: {result.fetchError}
        </p>
      </main>
    );
  }
  if (result.notFound || !story) return <NotFound />;

  const page = normalizeStoryblokPage(story.content);

  if (page.sections.length === 0) {
    return <NotFound />;
  }

  return (
    <>
      <StoryblokHeader blok={page.header} />
      <main className="overflow-x-clip pt-16 md:pt-20">
        <StoryblokSections sections={page.sections} />
      </main>
      <StoryblokFooter blok={page.footer} />
    </>
  );
}
