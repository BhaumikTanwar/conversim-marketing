import { storyblokEditable } from "@storyblok/react";

interface LogoItem {
  _uid?: string;
  name?: string;
  logo?: { filename?: string; alt?: string } | string;
  url?: string;
}

interface LogoStripBlok {
  _uid?: string;
  visible?: boolean;
  eyebrow?: string;
  items?: LogoItem[];
  section_id?: string;
  background_style?: string;
}

function assetUrl(asset?: LogoItem["logo"]) {
  return typeof asset === "string" ? asset : asset?.filename;
}

export default function LogoStrip({ blok }: { blok?: LogoStripBlok }) {
  if (blok?.visible === false) return null;
  if (!blok) return null;
  const items = (blok?.items ?? []).filter((item) => item.name?.trim() || assetUrl(item.logo));
  if (!items.length) return null;
  const background = (blok?.background_style || "white").toLowerCase().replace(/[\s_]+/g, "-");
  const surface = background === "soft" ? "bg-slate-50" : background === "transparent" ? "bg-transparent" : "bg-white";

  return (
    <section id={blok.section_id} {...(blok._uid ? storyblokEditable(blok as never) : {})} className={`${surface} border-y border-slate-200 px-4 py-8 sm:px-6 lg:px-8`}>
      <div className="mx-auto max-w-7xl">
        {blok.eyebrow?.trim() && <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{blok.eyebrow}</p>}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] items-center gap-x-8 gap-y-6">
          {items.map((item) => {
            const image = assetUrl(item.logo);
            const content = image ? <img src={image} alt={typeof item.logo === "object" ? item.logo.alt || item.name || "Partner logo" : item.name || "Partner logo"} className="max-h-8 max-w-[9rem] object-contain grayscale transition duration-300 hover:grayscale-0" /> : <span className="text-sm font-semibold text-slate-700">{item.name}</span>;
            return item.url ? <a key={item._uid || item.name} href={item.url} className="flex min-h-10 items-center justify-center" target={item.url.startsWith("http") ? "_blank" : undefined} rel={item.url.startsWith("http") ? "noreferrer" : undefined}>{content}</a> : <div key={item._uid || item.name} className="flex min-h-10 items-center justify-center">{content}</div>;
          })}
        </div>
      </div>
    </section>
  );
}
