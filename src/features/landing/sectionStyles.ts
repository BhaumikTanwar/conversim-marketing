export function normalizeLayout(value?: string, fallback = "default") {
  return (value || fallback).toLowerCase().replace(/[\s-]+/g, "_");
}

export function sectionSpacing(layout: string) {
  return layout === "compact"
    ? "py-12 md:py-16"
    : "py-16 md:py-20 lg:py-24";
}

export function sectionContainer(layout: string) {
  if (layout === "wide") return "max-w-7xl";
  if (layout === "compact") return "max-w-5xl";
  return "max-w-6xl";
}

export const sectionHeadingClass =
  "text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.08] tracking-tight";

