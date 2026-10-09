import { useStoryblok } from "@storyblok/react";
import { usePageMeta } from "../../../shared/hooks/usePageMeta";

import {
  normalizeStoryblokPage,
  StoryblokFooter,
  StoryblokHeader,
  StoryblokSections,
} from "../storyblokLibrary";

export default function Landing() {
  const story = useStoryblok("conversim-home-cms", {
    version: import.meta.env.DEV ? "draft" : "published",
  });
  usePageMeta("/", {
    title: story?.content?.seo_title || "Conversim | AI Roleplay Voice Training for Sales & Customer Conversations",
    description: story?.content?.seo_description || undefined,
    image: story?.content?.og_image?.filename || story?.content?.og_image?.url,
    noIndex: Boolean(story?.content?.no_index),
  });

  const page = normalizeStoryblokPage(story?.content);

  return (
    <>
      <StoryblokHeader blok={page.header} />

      <main className="overflow-x-clip">
        <StoryblokSections sections={page.sections} />
      </main>

      <StoryblokFooter blok={page.footer} />
    </>
  );
}
