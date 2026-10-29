import { storyblokEditable } from "@storyblok/react";
import { marketingHref } from "../../../lib/env";
import { resolveMaterialIcon } from "../materialIcons";

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
  supporting_details?: string[] | string | { content?: unknown[] };
  info?: string;
  price?: string;
  link_label?: string;
  link_text?: string;
  action_label?: string;
  action_icon?: string;
  action_url?: string;
  cta_label?: string;
  button_label?: string;
  link_url?: string;
  image?: { filename?: string; alt?: string } | string;
  layout_variant?: string;
  presentation?: string;
  media_fit?: string;
  background_style?: string;
  nested_cards?: FeatureCardItem[];
}

interface FeatureCardItem {
  _uid?: string;
  component?: string;
  visible?: boolean;
  title?: string;
  description?: string;
  image?: { filename?: string; alt?: string } | string;
  action_label?: string;
  action_url?: string | { url?: string; cached_url?: string; linktype?: string };
}

function nestedCardHref(value: FeatureCardItem["action_url"]) {
  if (typeof value === "string") return value;
  return value?.url || value?.cached_url;
}

function imageUrl(image: FeatureBlok["image"]) {
  return typeof image === "string" ? image : image?.filename;
}

function supportingDetailLines(value: unknown): string[] {
  if (!value) return [];
  if (typeof value === "string") return value.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  if (Array.isArray(value)) return value.flatMap(supportingDetailLines);
  if (typeof value !== "object") return [];

  const node = value as { type?: string; text?: unknown; content?: unknown[] };
  const collectText = (part: unknown): string => {
    if (typeof part === "string") return part;
    if (Array.isArray(part)) return part.map(collectText).join("");
    if (!part || typeof part !== "object") return "";
    const child = part as { text?: unknown; content?: unknown[] };
    return (typeof child.text === "string" ? child.text : "") + (child.content ?? []).map(collectText).join("");
  };

  if (node.type === "paragraph" || node.type === "list_item") {
    const line = collectText(node.content).trim();
    return line ? [line] : [];
  }
  return (node.content ?? []).flatMap(supportingDetailLines);
}

function normalizeLayout(value?: string) {
  const normalized = (value || "standard").toLowerCase().replace(/[\s_]+/g, "-");
  if (["left", "image-left", "left-media", "media-left"].includes(normalized)) return "media-left";
  if (["right", "image-right", "right-media", "media-right"].includes(normalized)) return "media-right";
  return normalized;
}

function normalizeMediaFit(value?: string) {
  const normalized = (value || "fit").toLowerCase().replace(/[\s_]+/g, "-");
  if (["cover", "fill", "crop"].includes(normalized)) return "cover";
  if (["natural", "original", "auto", "intrinsic"].includes(normalized)) return "natural";
  return "contain";
}

export default function Feature({ blok, standalone = false }: { blok?: FeatureBlok; standalone?: boolean }) {
  if (blok?.visible === false) return null;

  const title = blok?.title || blok?.name;
  if (!title) return null;
  const image = imageUrl(blok.image);
  const hasMedia = Boolean(image || blok.icon);
  const layout = normalizeLayout(blok.layout_variant);
  const presentation = (blok.presentation || "fit").toLowerCase().replace(/[\s_]+/g, "-");
  const mediaFit = normalizeMediaFit(blok.media_fit || (presentation === "fill" ? "fill" : "fit"));
  const imageFit = mediaFit === "cover" ? "object-cover" : "object-contain";
  const fill = presentation === "fill" || presentation === "full-width";
  const splitPresentation = presentation === "split" || presentation === "split-section";
  const compact = layout === "compact";
  const splitMedia = hasMedia && (fill || splitPresentation || compact || layout === "media-left" || layout === "media-right" || layout === "wide");
  const mediaRight = fill
    ? layout !== "media-left"
    : layout === "media-right" || (splitPresentation && layout !== "media-left");
  const metadata = [blok.info, blok.price].filter(Boolean).join("  ·  ");
  const supportingDetails = supportingDetailLines(blok.supporting_details);
  // Keep the media at the same relative size on either side. The old fixed
  // column templates made right-side media 60% wide but left-side media 40%.
  const mediaColumns = fill
    ? mediaRight ? "lg:grid-cols-[0.9fr_1.1fr]" : "lg:grid-cols-[1.1fr_0.9fr]"
    : splitPresentation
    ? mediaRight ? "lg:grid-cols-[1fr_1.15fr]" : "lg:grid-cols-[1.15fr_1fr]"
    : compact
      ? mediaRight ? "sm:grid-cols-[1fr_7rem]" : "sm:grid-cols-[7rem_1fr]"
      : mediaRight ? "sm:grid-cols-[2fr_3fr]" : "sm:grid-cols-[3fr_2fr]";
  // Set the media frame rather than a fixed card height: copy can grow without
  // being clipped, while cover/contain still have a predictable crop area.
  const mediaFrame = fill
    ? "aspect-[16/9] w-full lg:aspect-auto lg:h-full lg:min-h-[19rem]"
    : mediaFit === "natural"
    ? "w-full"
    : splitMedia
      ? compact
        ? "aspect-[16/9] w-full sm:aspect-auto sm:h-full sm:min-h-44"
        : "aspect-[4/3] w-full sm:aspect-auto sm:h-full sm:min-h-64"
      : "aspect-[16/9] w-full";
  const fillHeight = fill && hasMedia && splitMedia ? "lg:min-h-[19rem]" : "";
  const splitHeight = splitPresentation && hasMedia ? "lg:min-h-[32rem]" : "";
  const contentPadding = fill
    ? "justify-center p-7 sm:p-10 lg:p-12 xl:p-16"
    : splitPresentation ? "p-5 sm:p-8 lg:p-16 xl:p-20" : compact ? "p-4" : "p-5 sm:p-6 md:p-7";
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
  const actionLabel = [blok.link_label, blok.action_label, blok.cta_label, blok.button_label, blok.link_text]
    .find((value) => typeof value === "string" && value.trim())
    ?.trim();
  const actionUrl = blok.link_url || blok.action_url;
  const nestedCards = (blok.nested_cards ?? []).filter((item) => item.visible !== false && item.title?.trim());
  // Keep positional classes literal so Tailwind can generate both directions.
  const gridClass = splitPresentation || fill ? "lg:grid" : "sm:grid";
  const mediaRowClass = splitPresentation || fill ? "lg:row-start-1" : "sm:row-start-1";
  const mediaColumnClass = splitPresentation || fill
    ? mediaRight ? "lg:col-start-2" : "lg:col-start-1"
    : mediaRight ? "sm:col-start-2" : "sm:col-start-1";
  const contentColumnClass = splitPresentation || fill
    ? mediaRight ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-2 lg:row-start-1"
    : mediaRight ? "sm:col-start-1 sm:row-start-1" : "sm:col-start-2 sm:row-start-1";

  const card = (
    <div {...(blok._uid ? storyblokEditable(blok as never) : {})} className={`group flex h-full flex-col overflow-hidden ${splitPresentation ? "bg-transparent" : fill ? "rounded-none border-0" : "rounded-2xl border"} ${splitPresentation ? "border-0 shadow-none" : `${cardBorder} ${cardBackground} ${fill ? "shadow-none" : dark ? "shadow-[0_20px_50px_-28px_rgba(0,0,0,0.8)]" : "shadow-sm hover:shadow-md"}`} transition duration-300 ${fill || splitPresentation ? "" : "hover:-translate-y-0.5"} ${fillHeight} ${splitHeight} ${splitMedia ? `${gridClass} ${mediaColumns}` : ""}`}>
      {hasMedia && <div className={`overflow-hidden ${fill ? "bg-transparent" : "bg-slate-50"} ${mediaFrame} ${splitMedia ? `${mediaRowClass} ${mediaColumnClass}` : ""} ${mediaFit === "natural" && !fill ? "self-start" : ""}`}>
        {image ? (
          <img src={image} alt={typeof blok.image === "object" ? blok.image.alt || title : title} className={`block ${mediaFit === "natural" ? "h-auto" : "h-full"} w-full ${imageFit} transition duration-500 group-hover:scale-[1.03]`} />
        ) : (
          <div className="flex h-full min-h-28 items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-100 to-cyan-100 text-blue-600">
            <span className={`material-symbols-outlined ${compact ? "text-3xl" : "text-5xl"}`} aria-hidden="true">{resolveMaterialIcon(blok.icon)}</span>
          </div>
        )}
      </div>}
      <div className={`flex min-w-0 flex-1 flex-col ${splitPresentation ? "justify-center" : ""} ${contentPadding} ${splitMedia ? contentColumnClass : ""}`}>
        {blok.label && <span className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-blue-600">{blok.label}</span>}
        <h3 className={`${fill ? "max-w-[16ch] font-mono text-2xl font-bold uppercase leading-[1.05] tracking-tight sm:text-3xl lg:text-4xl xl:text-5xl" : compact ? "text-base" : "text-xl"} ${fill ? "" : "font-semibold leading-tight tracking-tight"} ${titleColor}`}>{title}</h3>
        {blok.description && <p className={`${compact ? "mt-2 line-clamp-2 text-xs" : "mt-3 line-clamp-3 text-sm"} leading-relaxed ${descriptionColor}`}>{blok.description}</p>}
        {supportingDetails.length > 0 && <ul className={`mt-4 space-y-2 text-sm leading-relaxed ${descriptionColor}`}>{supportingDetails.map((detail, index) => <li key={`${index}-${detail}`} className="flex gap-2"><span className="text-blue-600" aria-hidden="true">•</span><span>{detail}</span></li>)}</ul>}
        {metadata && <p className={`mt-3 text-[11px] ${metadataColor}`}>{metadata}</p>}
        {nestedCards.length > 0 && <div className="mt-5 grid min-w-0 gap-3 sm:grid-cols-2">
          {nestedCards.map((item) => {
            const childImage = imageUrl(item.image);
            const childActionUrl = nestedCardHref(item.action_url);
            const childCard = <>
              {childImage && <img src={childImage} alt={typeof item.image === "object" ? item.image.alt || item.title || "" : item.title || ""} className="mb-3 aspect-[16/9] w-full rounded-lg object-cover" />}
              <h4 className={`text-sm font-semibold leading-snug ${titleColor}`}>{item.title}</h4>
              {item.description?.trim() && <p className={`mt-1.5 text-xs leading-relaxed ${descriptionColor}`}>{item.description}</p>}
              {item.action_label?.trim() && <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-blue-600">{item.action_label}<span aria-hidden="true">→</span></span>}
            </>;
            const childClass = `block min-w-0 rounded-xl border p-3 ${dark ? "border-white/15 bg-white/5" : "border-slate-200 bg-white/80"}`;
            return childActionUrl?.trim()
              ? <a key={item._uid || item.title} href={marketingHref(childActionUrl)} className={`${childClass} transition-colors hover:border-blue-300`}>{childCard}</a>
              : <div key={item._uid || item.title} className={childClass}>{childCard}</div>;
          })}
        </div>}
        {actionLabel && (actionUrl ? <a href={marketingHref(actionUrl)} className={`${fill ? "mt-6 border border-white/30 bg-white px-5 py-3 font-mono text-[11px] uppercase tracking-wider text-slate-950 hover:bg-slate-200" : `${compact ? "mt-3 text-xs" : "mt-5 text-sm"} text-blue-600 hover:text-blue-800`} inline-flex w-fit shrink-0 items-center gap-2 font-semibold`}>{actionLabel}<span className="material-symbols-outlined text-base" aria-hidden="true">{resolveMaterialIcon(blok.action_icon, "arrow_forward")}</span></a> : <span className={`${compact ? "mt-3 text-xs" : "mt-5 text-sm"} inline-flex w-fit shrink-0 font-semibold text-blue-600`}>{actionLabel}</span>)}
      </div>
    </div>
  );

  if (!standalone) return card;

  return (
  <section className={splitPresentation ? cardBackground : fill ? "px-0 py-0" : "px-4 py-10 sm:px-6 md:py-14 lg:px-8"}>
      <div className={splitPresentation ? "mx-auto max-w-7xl px-4 py-10 sm:px-8 sm:py-16 lg:px-12 lg:py-24" : fill ? "w-full" : "mx-auto max-w-6xl"}>{card}</div>
    </section>
  );
}
