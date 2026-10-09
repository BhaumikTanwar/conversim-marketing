import { useEffect } from "react";
import { PAGE_META, DEFAULT_SITE } from "@/seo";

interface PageMetaOverrides {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
}

function setAttr(selector: string, attribute: string, value: string) {
  document.head.querySelector(selector)?.setAttribute(attribute, value);
}

export function usePageMeta(pathname: string, overrides?: PageMetaOverrides) {
  const title = overrides?.title;
  const description = overrides?.description;
  const image = overrides?.image;
  const noIndex = overrides?.noIndex;

  useEffect(() => {
    const defaults = PAGE_META[pathname] ?? PAGE_META["/"];
    const pageTitle = title || defaults.title;
    const pageDescription = description || defaults.description;
    const hasCmsMetadata = Boolean(title || description || image || noIndex);
    const canonical = `${import.meta.env.VITE_SITE_URL || DEFAULT_SITE}${hasCmsMetadata || PAGE_META[pathname] ? pathname : "/"}`;

    document.title = pageTitle;
    for (const selector of [
      'meta[name="description"]',
      'meta[property="og:description"]',
      'meta[name="twitter:description"]',
    ]) setAttr(selector, "content", pageDescription);
    for (const selector of ['meta[property="og:title"]', 'meta[name="twitter:title"]']) {
      setAttr(selector, "content", pageTitle);
    }
    setAttr('meta[property="og:url"]', "content", canonical);
    setAttr('link[rel="canonical"]', "href", canonical);
    setAttr('meta[property="og:image"]', "content", image || `${import.meta.env.VITE_SITE_URL || DEFAULT_SITE}/favicon.png`);
    setAttr('meta[name="robots"]', "content", noIndex ? "noindex,nofollow" : "index,follow");
  }, [pathname, title, description, image, noIndex]);
}
