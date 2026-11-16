import type { CSSProperties } from "react";
import { storyblokEditable } from "@storyblok/react";
import { ShieldCheck } from "lucide-react";
import { assetUrl } from "../../../lib/assets";
import { isDark } from "../../../lib/color";

interface LogoItem {
  _uid?: string;
  name?: string;
  logo?: { filename?: string; alt?: string } | string;
  url?: string;
}

interface BadgeItem {
  _uid?: string;
  name?: string;
}

interface LogoStripBlok {
  _uid?: string;
  visible?: boolean;
  eyebrow?: string;
  heading?: string;
  items?: LogoItem[];
  badges?: BadgeItem[];
  section_id?: string;
  background_style?: string;
  background_color?: string;
  display_mode?: string;
  grid_columns?: number | string;
  grid_rows?: number | string;
}


export default function LogoStrip({ blok }: { blok?: LogoStripBlok }) {
  if (blok?.visible === false) return null;
  if (!blok) return null;
  const items = (blok?.items ?? []).filter((item) => item.name?.trim() || assetUrl(item.logo));
  if (!items.length) return null;
  const background = (blok?.background_style || "white").toLowerCase().replace(/[\s_]+/g, "-");
  const customBackground = blok.background_color?.trim();
  const surface = background === "soft" ? "bg-slate-50" : background === "transparent" ? "bg-transparent" : "bg-white";
  const gridMode = ["grid", "logo-grid", "matrix"].includes((blok.display_mode || "strip").toLowerCase());
  const columns = Math.max(2, Math.min(8, Number.parseInt(String(blok.grid_columns || 6), 10) || 6));
  const configuredRows = Number.parseInt(String(blok.grid_rows || ""), 10);
  const rows = Number.isFinite(configuredRows) && configuredRows > 0 ? Math.min(8, configuredRows) : undefined;
  const darkSurface = customBackground ? isDark(customBackground) : background === "dark" || background === "black";
  const gridLine = darkSurface ? "border-white/15" : "border-slate-200";

  return (
    <section id={blok.section_id} {...(blok._uid ? storyblokEditable(blok as never) : {})} className={`${customBackground ? "" : surface} border-y px-4 py-8 sm:px-6 lg:px-8`} style={{ backgroundColor: customBackground || undefined, borderColor: customBackground || undefined }}>
      <div className="mx-auto max-w-7xl">
        {blok.eyebrow?.trim() && <p className={`mb-5 text-center text-xs font-semibold uppercase tracking-[0.18em] ${darkSurface ? "text-white/65" : "text-slate-500"}`}>{blok.eyebrow}</p>}
        {blok.heading?.trim() && (
          <div className="mx-auto mb-8 flex max-w-3xl items-center gap-5">
            <span className={`h-px flex-1 ${darkSurface ? "bg-white/15" : "bg-slate-200"}`} aria-hidden />
            <h2 className={`text-center text-sm font-medium ${darkSurface ? "text-white/70" : "text-slate-500"}`}>{blok.heading}</h2>
            <span className={`h-px flex-1 ${darkSurface ? "bg-white/15" : "bg-slate-200"}`} aria-hidden />
          </div>
        )}
        <div className={gridMode ? `logo-strip-grid grid ${gridLine} border-l border-t` : "grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] items-center gap-x-8 gap-y-6"} style={gridMode ? { "--logo-grid-columns": columns, ...(rows ? { gridTemplateRows: `repeat(${rows}, minmax(4rem, 1fr))` } : {}) } as CSSProperties : undefined}>
          {items.map((item) => {
            const image = assetUrl(item.logo);
            const cellClass = gridMode ? `flex min-h-16 items-center justify-center border-b border-r px-3 py-4 text-center sm:min-h-20 ${gridLine}` : "flex min-h-10 items-center justify-center";
            const content = image ? <img src={image} alt={typeof item.logo === "object" ? item.logo.alt || item.name || "Partner logo" : item.name || "Partner logo"} className={`${gridMode ? "max-h-10 max-w-[80%]" : "max-h-8 max-w-[9rem]"} object-contain grayscale transition duration-300 hover:grayscale-0`} /> : <span className={`text-sm font-semibold ${darkSurface ? "text-white/85" : "text-slate-700"}`}>{item.name}</span>;
            return item.url ? <a key={item._uid || item.name} href={item.url} className={cellClass} target={item.url.startsWith("http") ? "_blank" : undefined} rel={item.url.startsWith("http") ? "noreferrer" : undefined}>{content}</a> : <div key={item._uid || item.name} className={cellClass}>{content}</div>;
          })}
        </div>
        {(blok.badges ?? []).filter((badge) => badge.name?.trim()).length > 0 && (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {blok.badges!.filter((badge) => badge.name?.trim()).map((badge) => (
              <span key={badge._uid || badge.name} className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${darkSurface ? "border-white/20 text-white/80" : "border-slate-200 text-slate-600"}`}>
                <ShieldCheck size={14} aria-hidden="true" />
                {badge.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

