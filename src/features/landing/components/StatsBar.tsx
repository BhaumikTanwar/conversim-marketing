import { storyblokEditable } from "@storyblok/react";

interface StatItem { _uid?: string; value?: string; label?: string; }
interface StatsBarBlok { _uid?: string; visible?: boolean; items?: StatItem[]; section_id?: string; background_style?: string; }

export default function StatsBar({ blok }: { blok?: StatsBarBlok }) {
  if (blok?.visible === false) return null;
  if (!blok) return null;
  const items = (blok?.items ?? []).filter((item) => item.value?.trim() || item.label?.trim());
  if (!items.length) return null;
  const background = (blok?.background_style || "white").toLowerCase().replace(/[\s_]+/g, "-");
  const dark = background === "dark" || background === "black";
  return <section id={blok.section_id} {...(blok._uid ? storyblokEditable(blok as never) : {})} className={`${dark ? "bg-slate-950 text-white" : background === "soft" ? "bg-slate-50 text-slate-950" : "bg-white text-slate-950"} border-y border-slate-200 px-4 py-12 sm:px-6 md:py-16 lg:px-8`}><div className="mx-auto grid max-w-7xl grid-cols-[repeat(auto-fit,minmax(180px,1fr))] items-start gap-x-8 gap-y-10 text-center">{items.map((item) => <div key={item._uid || `${item.value}-${item.label}`} className="min-w-0"><p className="text-5xl font-semibold tracking-[-0.06em] sm:text-6xl">{item.value}</p>{item.label?.trim() && <p className={`mt-3 text-[11px] font-semibold uppercase tracking-[0.16em] ${dark ? "text-slate-400" : "text-slate-500"}`}>{item.label}</p>}</div>)}</div></section>;
}
