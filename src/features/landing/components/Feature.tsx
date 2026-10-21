import { storyblokEditable } from "@storyblok/react";
import { marketingHref } from "../../../lib/env";

export interface FeatureBlok {
  _uid?: string;
  _editable?: string;
  component?: string;
  visible?: boolean;
  label?: string;
  icon?: string;
  name?: string;
  title?: string;
  description?: string;
  info?: string;
  price?: string;
  link_label?: string;
  action_label?: string;
  cta_label?: string;
  button_label?: string;
  link_url?: string;
  image?: { filename?: string; alt?: string } | string;
  layout_variant?: string;
  presentation?: string;
  media_fit?: string;
  background_style?: string;
}

function imageUrl(image: FeatureBlok["image"]) {
  return typeof image === "string" ? image : image?.filename;
}

function normalizeLayout(value?: string) {
  const normalized = (value || "standard").toLowerCase().replace(/[\s_]+/g, "-");
  if (["left", "image-left", "left-media", "media-left"].includes(normalized)) return "media-left";
  if (["right", "image-right", "right-media", "media-right"].includes(normalized)) return "media-right";
  return normalized;
}

export default function Feature({ blok, standalone = false }: { blok?: FeatureBlok; standalone?: boolean }) {
  if (blok?.visible === false) return null;

  const title = blok?.title || blok?.name;
  if (!title) return null;
  const image = imageUrl(blok.image);
  const hasMedia = Boolean(image || blok.icon);
  const layout = normalizeLayout(blok.layout_variant);
  const presentation = (blok.presentation || "fit").toLowerCase().replace(/[\s_]+/g, "-");
  const mediaFit = (blok.media_fit || (presentation === "fill" ? "fill" : "fit")).toLowerCase().replace(/[\s_]+/g, "-");
  const imageFit = mediaFit === "fill" ? "object-cover" : "object-contain";
  const fill = presentation === "fill" || presentation === "full-width";
  const splitPresentation = presentation === "split" || presentation === "split-section";
  const compact = layout === "compact";
  const splitMedia = hasMedia && (splitPresentation || compact || layout === "media-left" || layout === "media-right" || layout === "wide");
  const mediaRight = layout === "media-right" || (splitPresentation && layout !== "media-left");
  const metadata = [blok.info, blok.price].filter(Boolean).join("  ·  ");
  const mediaColumns = splitPresentation
    ? "lg:grid-cols-[1fr_1.15fr]"
    : compact
      ? "sm:grid-cols-[7rem_1fr]"
      : "sm:grid-cols-[2fr_3fr]";
  // Fit uses a controlled media height; Fill lets the media keep its natural height.
  const cardHeight = compact ? (fill ? "" : "sm:h-44") : splitMedia && !fill ? "sm:h-64 lg:h-72" : "";
  const fillHeight = fill && hasMedia && splitMedia ? "sm:min-h-[32rem] lg:min-h-[38rem]" : "";
  const contentPadding = splitPresentation ? "p-8 sm:p-12 lg:p-20" : compact ? "p-4" : "p-6 md:p-7";
  const background = (blok.background_style || "white").toLowerCase().replace(/[\s_]+/g, "-");
  const dark = background === "dark" || background === "black";
  const cardBackground = background === "soft"
    ? "bg-slate-50"
    : background === "transparent"
      ? "bg-transparent"
      : dark
        ? "bg-slate-950"
        : "bg-white";
  const cardBorder = dark ? "border-white/15 hover:border-cyan-300/60" : "border-slate-200 hover:border-blue-200";
  const titleColor = dark ? "text-white" : "text-slate-950";
  const descriptionColor = dark ? "text-slate-300" : "text-slate-600";
  const metadataColor = dark ? "text-slate-400" : "text-slate-500";
  const actionLabel = blok.link_label || blok.action_label || blok.cta_label || blok.button_label;
  // Keep these class names literal. Tailwind cannot generate classes assembled
  // from breakpoint/column variables, which made media-left and media-right
  // render identically in split sections.
  const gridClass = splitPresentation ? "lg:grid" : "sm:grid";
  const mediaRowClass = splitPresentation ? "lg:row-start-1" : "sm:row-start-1";
  const mediaColumnClass = splitPresentation
    ? mediaRight ? "lg:col-start-2" : "lg:col-start-1"
    : mediaRight ? "sm:col-start-2" : "sm:col-start-1";
  const contentColumnClass = splitPresentation
    ? mediaRight ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-2 lg:row-start-1"
    : mediaRight ? "sm:col-start-1 sm:row-start-1" : "sm:col-start-2 sm:row-start-1";

  const card = (
    <div {...(blok._uid ? storyblokEditable(blok as never) : {})} className={`group flex h-full overflow-hidden ${splitPresentation ? "bg-transparent" : fill ? "rounded-none border-x-0 border-y" : "rounded-2xl border"} ${splitPresentation ? "border-0 shadow-none" : `${cardBorder} ${cardBackground} ${fill ? "shadow-none" : dark ? "shadow-[0_20px_50px_-28px_rgba(0,0,0,0.8)]" : "shadow-sm hover:shadow-md"}`} transition duration-300 ${fill || splitPresentation ? "" : "hover:-translate-y-0.5"} ${fillHeight} ${splitMedia ? `${gridClass} ${mediaColumns} ${cardHeight}` : "flex-col"}`}>
      {image ? (
        <img src={image} alt={typeof blok.image === "object" ? blok.image.alt || title : title} className={`w-full bg-slate-50 ${imageFit} transition duration-500 group-hover:scale-[1.03] ${splitMedia ? `${mediaRowClass} ${splitPresentation ? "lg:h-auto" : "sm:h-full sm:aspect-auto"} ${mediaColumnClass}` : "aspect-[16/9]"}`} />
      ) : blok.icon ? (
        <div className={`flex items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-100 to-cyan-100 text-blue-600 ${splitMedia ? `${mediaRowClass} ${splitPresentation ? "lg:h-auto" : "sm:h-full"} ${mediaColumnClass}` : "aspect-[16/9]"}`}>
          <span className={`material-symbols-outlined ${compact ? "text-3xl" : "text-5xl"}`} aria-hidden="true">{blok.icon}</span>
        </div>
      ) : null}
      <div className={`flex min-w-0 flex-1 flex-col ${splitPresentation ? "justify-center" : ""} ${contentPadding} ${splitMedia ? contentColumnClass : ""}`}>
        {blok.label && <span className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-blue-600">{blok.label}</span>}
        <h3 className={`${compact ? "text-base" : "text-xl"} font-semibold leading-tight tracking-tight ${titleColor}`}>{title}</h3>
        {blok.description && <p className={`${compact ? "mt-2 line-clamp-2 text-xs" : "mt-3 line-clamp-3 text-sm"} leading-relaxed ${descriptionColor}`}>{blok.description}</p>}
        {metadata && <p className={`mt-3 text-[11px] ${metadataColor}`}>{metadata}</p>}
        {actionLabel && (blok.link_url ? <a href={marketingHref(blok.link_url)} className={`${compact ? "pt-3 text-xs" : "pt-5 text-sm"} mt-auto inline-flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-800`}>{actionLabel}<span aria-hidden="true">→</span></a> : <span className={`${compact ? "pt-3 text-xs" : "pt-5 text-sm"} mt-auto inline-flex items-center font-semibold text-blue-600`}>{actionLabel}</span>)}
      </div>
    </div>
  );

  if (!standalone) return card;

  return (
  <section className={splitPresentation ? cardBackground : fill ? "px-0 py-0" : "px-4 py-10 sm:px-6 md:py-14 lg:px-8"}>
      <div className={splitPresentation ? "mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-28" : fill ? "w-full" : "mx-auto max-w-6xl"}>{card}</div>
    </section>
  );
}
