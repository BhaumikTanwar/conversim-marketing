import { marketingHref } from "../../../lib/env";

export interface StoryblokCtaValue {
  label?: string;
  url?: string;
  icon?: string;
  style?: string;
  variant?: string;
}

function normalizeStyle(value?: string) {
  return (value || "primary").toLowerCase().replace(/[\s-]+/g, "_");
}

function storyblokCtaClasses(value?: string, onBrand = false) {
  const style = normalizeStyle(value);

  if (style === "outline" || style === "outlined" || style === "outline_button") {
    return onBrand
      ? "border border-white/70 text-white hover:bg-white/10"
      : "border border-brand text-brand hover:bg-brand/10";
  }
  if (style === "ghost" || style === "text" || style === "link" || style === "text_link") {
    return onBrand
      ? "text-white hover:bg-white/10"
      : "text-brand hover:bg-brand/10";
  }
  if (style === "secondary" || style === "secondary_button") {
    return onBrand
      ? "bg-white/15 text-white hover:bg-white/25"
      : "bg-slate-100 text-slate-800 hover:bg-slate-200";
  }
  return onBrand
    ? "bg-white text-blue-700 hover:bg-white/90"
    : "bg-brand text-white hover:bg-brand-hover";
}

export default function StoryblokCta({
  value,
  onBrand = false,
  className = "",
}: {
  value?: StoryblokCtaValue;
  onBrand?: boolean;
  className?: string;
}) {
  const label = value?.label?.trim();
  const url = value?.url?.trim();
  if (!label || !url) return null;
  const icon = value?.icon?.trim();
  const style = value?.style || value?.variant;

  return (
    <a
      href={marketingHref(url)}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-colors ${storyblokCtaClasses(style, onBrand)} ${className}`}
    >
      {icon && (
        <span className="material-symbols-outlined text-lg" aria-hidden="true">
          {icon}
        </span>
      )}
      {label}
    </a>
  );
}
