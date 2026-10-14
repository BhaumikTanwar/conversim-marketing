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
  link_url?: string;
  image?: { filename?: string; alt?: string } | string;
  layout_variant?: string;
}

function imageUrl(image: FeatureBlok["image"]) {
  return typeof image === "string" ? image : image?.filename;
}

export default function Feature({ blok, standalone = false }: { blok?: FeatureBlok; standalone?: boolean }) {
  if (blok?.visible === false) return null;

  const title = blok?.title || blok?.name;
  if (!title) return null;
  const image = imageUrl(blok.image);
  const hasMedia = Boolean(image || blok.icon);
  const requestedLayout = (blok.layout_variant || "standard").toLowerCase().replace(/[\s_]+/g, "-");
  const layout = requestedLayout;
  const compact = layout === "compact";
  const splitMedia = hasMedia && (compact || layout === "media-left" || layout === "media-right" || layout === "wide");
  const mediaRight = layout === "media-right";
  const metadata = [blok.info, blok.price].filter(Boolean).join("  ·  ");
  const mediaColumns = compact ? "sm:grid-cols-[7rem_1fr]" : "sm:grid-cols-[2fr_3fr]";
  const cardHeight = compact ? "sm:h-44" : splitMedia ? "sm:h-64 lg:h-72" : "";
  const contentPadding = compact ? "p-4" : "p-6 md:p-7";

  const card = (
    <div {...(blok._uid ? storyblokEditable(blok as never) : {})} className={`group flex h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md ${splitMedia ? `sm:grid ${mediaColumns} ${cardHeight}` : "flex-col"}`}>
      {image ? (
        <img src={image} alt={typeof blok.image === "object" ? blok.image.alt || title : title} className={`w-full object-cover transition duration-500 group-hover:scale-[1.03] ${splitMedia ? `sm:row-start-1 sm:h-full sm:aspect-auto ${mediaRight ? "sm:col-start-2" : "sm:col-start-1"}` : "aspect-[16/9]"}`} />
      ) : blok.icon ? (
        <div className={`flex items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-100 to-cyan-100 text-blue-600 ${splitMedia ? `sm:row-start-1 sm:h-full ${mediaRight ? "sm:col-start-2" : "sm:col-start-1"}` : "aspect-[16/9]"}`}>
          <span className={`material-symbols-outlined ${compact ? "text-3xl" : "text-5xl"}`} aria-hidden="true">{blok.icon}</span>
        </div>
      ) : null}
      <div className={`flex min-w-0 flex-1 flex-col ${contentPadding} ${splitMedia && mediaRight ? "sm:col-start-1 sm:row-start-1" : ""}`}>
        {blok.label && <span className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-blue-600">{blok.label}</span>}
        <h3 className={`${compact ? "text-base" : "text-xl"} font-semibold leading-tight tracking-tight text-slate-950`}>{title}</h3>
        {blok.description && <p className={`${compact ? "mt-2 line-clamp-2 text-xs" : "mt-3 line-clamp-3 text-sm"} leading-relaxed text-slate-600`}>{blok.description}</p>}
        {metadata && <p className="mt-3 text-[11px] text-slate-500">{metadata}</p>}
        {blok.link_url && <a href={marketingHref(blok.link_url)} className={`${compact ? "pt-3 text-xs" : "pt-5 text-sm"} mt-auto inline-flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-800`}>{blok.link_label || "Learn more"}<span aria-hidden="true">→</span></a>}
      </div>
    </div>
  );

  if (!standalone) return card;

  return (
    <section className="px-4 py-10 sm:px-6 md:py-14 lg:px-8">
      <div className="mx-auto max-w-6xl">{card}</div>
    </section>
  );
}
