/* Storyblok's live schemas contain legacy field names used by existing stories. */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import type { ComponentType } from "react";

import Footer from "./components/Footer";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import HowItWorksSection from "./components/HowItWorksSection";
import PreviewSection from "./components/PreviewSection";
import PricingSection from "./components/PricingSection";
import SectorFAQ from "./components/SectorFAQ";
import UseCasesSection from "./components/UseCasesSection";
import WaitlistSection from "./components/WaitlistSection";

export type StoryblokBlock = Record<string, any>;

const sectionIds: Record<string, string> = {
  hero: "hero",
  use_cases: "use-cases",
  how_it_works: "how-it-works",
  preview: "preview",
  pricing: "pricing",
  faq: "faq",
  waitlist: "waitlist",
};

const sectionComponents = new Set(Object.keys(sectionIds));

function firstBlock(value: any): StoryblokBlock | undefined {
  if (Array.isArray(value)) return value.find(Boolean);
  return value && typeof value === "object" ? value : undefined;
}

function normalizeUrl(value: any): any {
  if (!value || typeof value !== "object") return value;
  return value.url || value.cached_url || value.story?.url || "#";
}

function normalizeCta(value: any) {
  const block = firstBlock(value) ?? value;
  return block && typeof block === "object"
    ? { ...block, url: normalizeUrl(block.url) }
    : block;
}

function normalizeHeader(value: any): StoryblokBlock | undefined {
  const block = firstBlock(value);
  if (!block || block.visible === false) return undefined;

  const navigationItems = block.navigation_items ?? block.nav_items ?? [];
  return {
    ...block,
    logo_alt_text: block.logo_alt_text ?? block.logo_alt,
    navigation_items: (Array.isArray(navigationItems) ? navigationItems : []).map((item: StoryblokBlock) => ({
      ...item,
      target_anchor: normalizeUrl(item.target_anchor ?? item.target),
    })),
    header_style: block.header_style ?? block.style,
    show_authentication_actions:
      block.show_authentication_actions ?? block.show_auth_actions,
    log_in_label: block.log_in_label ?? block.login_label,
    log_in_url: block.log_in_url ?? block.login_url,
    sign_up_label: block.sign_up_label ?? block.signup_label,
    sign_up_url: block.sign_up_url ?? block.signup_url,
  };
}

function normalizeFooter(value: any): StoryblokBlock | undefined {
  const block = firstBlock(value);
  if (!block || block.visible === false) return undefined;

  const columns = block.footer_columns ?? block.columns ?? [];
  return {
    ...block,
    logo_alt_text: block.logo_alt_text ?? block.logo_alt,
    footer_columns: (Array.isArray(columns) ? columns : []).map((column: StoryblokBlock) => ({
      ...column,
      links: (Array.isArray(column.links) ? column.links : []).map((link: StoryblokBlock) => ({
        ...link,
        url: normalizeUrl(link.url),
        open_in_new_tab: link.open_in_new_tab ?? link.open_new_tab,
      })),
    })),
    copyright_text: block.copyright_text ?? block.copyright,
    social_links: (Array.isArray(block.social_links) ? block.social_links : []).map((link: StoryblokBlock) => ({
      ...link,
      url: normalizeUrl(link.url),
      open_in_new_tab: link.open_in_new_tab ?? link.open_new_tab,
    })),
  };
}

function normalizeSection(block: StoryblokBlock, sectionId: string) {
  const normalized: StoryblokBlock = { ...block, section_id: sectionId };

  switch (block.component) {
    case "hero":
      normalized.description = block.description ?? block.subtext;
      normalized.video = block.video ?? block.video_url;
      normalized.live_label = block.live_label ?? block.video_label;
      normalized.primary_cta = normalizeCta(block.primary_cta);
      normalized.secondary_cta = normalizeCta(block.secondary_cta);
      break;
    case "preview":
    case "faq":
    case "pricing":
    case "waitlist":
      normalized.layout_variant = block.layout_variant ?? block.layout;
      break;
  }

  if (block.component === "pricing") {
    normalized.highlighted_heading = block.highlighted_heading ?? block.highlighted_text;
    normalized.description = block.description ?? block.card_body;
    const cta = normalizeCta(block.cta);
    normalized.cta_label = block.cta_label ?? cta?.label;
    normalized.cta_url = block.cta_url ?? cta?.url;
    normalized.cta_url = normalizeUrl(normalized.cta_url);
  }

  if (block.component === "waitlist") {
    normalized.description = block.description ?? block.body;
    const cta = normalizeCta(block.cta);
    normalized.cta_label = block.cta_label ?? cta?.label;
    normalized.cta_url = block.cta_url ?? cta?.url;
    normalized.cta_url = normalizeUrl(normalized.cta_url);
  }

  return normalized;
}

function connectRepeatedNavItems(header: StoryblokBlock | undefined, sections: StoryblokBlock[]) {
  if (!header) return header;

  const idsByBase = new Map<string, string[]>();
  for (const section of sections) {
    const base = sectionIds[section.component];
    if (!base) continue;
    const ids = idsByBase.get(base) ?? [];
    ids.push(section.section_id);
    idsByBase.set(base, ids);
  }

  const seenTargets = new Map<string, number>();
  return {
    ...header,
    navigation_items: header.navigation_items.map((item: StoryblokBlock) => {
      const target = item.target_anchor ?? "#";
      if (!target.startsWith("#")) return item;

      const base = target.slice(1);
      const ids = idsByBase.get(base);
      if (!ids || ids.length < 2) return item;

      const occurrence = seenTargets.get(base) ?? 0;
      seenTargets.set(base, occurrence + 1);
      return occurrence < ids.length ? { ...item, target_anchor: `#${ids[occurrence]}` } : item;
    }),
  };
}

export function normalizeStoryblokPage(content: any) {
  const page = content ?? {};
  const sourceBlocks = Array.isArray(page.body) && page.body.length > 0
    ? page.body
    : Array.isArray(page.sections) && page.sections.length > 0
      ? page.sections
      : Array.isArray(page.body)
        ? page.body
        : [];

  const headerSource = firstBlock(page.header) ?? sourceBlocks.find((block: StoryblokBlock) => block.component === "header");
  const footerSource = firstBlock(page.footer) ?? sourceBlocks.find((block: StoryblokBlock) => block.component === "footer");
  const counts = new Map<string, number>();
  const sections = sourceBlocks
    .filter((block: StoryblokBlock) =>
      sectionComponents.has(block.component) && block.visible !== false,
    )
    .map((block: StoryblokBlock) => {
      const base = sectionIds[block.component];
      const occurrence = (counts.get(base) ?? 0) + 1;
      counts.set(base, occurrence);
      return normalizeSection(block, occurrence === 1 ? base : `${base}-${occurrence}`);
    });

  const header = connectRepeatedNavItems(normalizeHeader(headerSource), sections);

  return {
    header,
    footer: normalizeFooter(footerSource),
    sections,
  };
}

const renderers: Record<string, ComponentType<{ blok?: any }>> = {
  hero: HeroSection,
  use_cases: UseCasesSection,
  how_it_works: HowItWorksSection,
  preview: PreviewSection,
  pricing: PricingSection,
  faq: SectorFAQ,
  waitlist: WaitlistSection,
};

export function StoryblokSections({ sections }: { sections: StoryblokBlock[] }) {
  return sections.map((block) => {
    const Section = renderers[block.component];
    return Section ? <Section key={block._uid} blok={block} /> : null;
  });
}

export { Header as StoryblokHeader, Footer as StoryblokFooter };
