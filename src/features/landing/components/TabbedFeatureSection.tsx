import { storyblokEditable } from "@storyblok/react";
import { useState } from "react";

import { marketingHref } from "../../../lib/env";
import { resolveMaterialIcon } from "../materialIcons";

interface TabItem {
  _uid?: string;
  label?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  supporting_details?: string[] | string | { content?: unknown[] };
  author?: string;
  date?: string;
  read_time?: string;
  info?: string;
  image?: { filename?: string; alt?: string } | string;
  action_label?: string;
  action_url?: string;
  action_icon?: string;
}

interface TabbedFeatureBlok {
  _uid?: string;
  visible?: boolean;
  eyebrow?: string;
  heading?: string;
  intro?: string;
  tabs?: TabItem[];
  background_style?: string;
}

function imageUrl(image?: TabItem["image"]) { return typeof image === "string" ? image : image?.filename; }

function richTextToLines(value: unknown): string[] {
  if (!value) return [];
  if (typeof value === "string") return value.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  if (Array.isArray(value)) return value.flatMap(richTextToLines);
  if (typeof value !== "object") return [];

  const node = value as { type?: string; text?: unknown; content?: unknown[] };
  const collectInlineText = (child: unknown): string => {
    if (!child) return "";
    if (typeof child === "string") return child;
    if (Array.isArray(child)) return child.map(collectInlineText).join("");
    if (typeof child !== "object") return "";
    const inline = child as { text?: unknown; content?: unknown[] };
    return (typeof inline.text === "string" ? inline.text : "") + (inline.content ?? []).map(collectInlineText).join("");
  };

  if (node.type === "paragraph" || node.type === "list_item") {
    const line = collectInlineText(node.content).trim();
    return line ? [line] : [];
  }

  // Storyblok rich-text paragraphs/lists are nested nodes; keep each paragraph
  // as one readable detail rather than stringifying the editor's JSON payload.
  return (node.content ?? []).flatMap(richTextToLines);
}

export default function TabbedFeatureSection({ blok }: { blok?: TabbedFeatureBlok }) {
  const [activeIndex, setActiveIndex] = useState(0);
  if (blok?.visible === false) return null;
  if (!blok) return null;
  const tabs = (blok?.tabs ?? []).filter((tab) => tab.label?.trim() || tab.title?.trim() || tab.description?.trim());
  if (!tabs.length) return null;
  const active = tabs[Math.min(activeIndex, tabs.length - 1)];
  const background = (blok?.background_style || "white").toLowerCase().replace(/[\s_]+/g, "-");
  const dark = background === "dark" || background === "black";
  const surface = dark ? "bg-slate-950 text-white" : background === "soft" ? "bg-slate-50 text-slate-950" : "bg-white text-slate-950";
  const image = imageUrl(active.image);
  const supportingDetails = richTextToLines(active.supporting_details);
  const details = supportingDetails.length > 0
    ? supportingDetails
    : [active.info, active.author, active.date, active.read_time].filter((detail): detail is string => Boolean(detail?.trim()));

  return (
    <section {...(blok._uid ? storyblokEditable(blok as never) : {})} className={`${surface} px-4 py-16 sm:px-6 md:py-20 lg:px-8 lg:py-24`}>
      <div className="mx-auto max-w-7xl">
        {(blok.eyebrow?.trim() || blok.heading?.trim() || blok.intro?.trim()) && <div className="mb-10 grid gap-4 lg:grid-cols-[1fr_1.4fr] lg:items-end"><div>{blok.eyebrow?.trim() && <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand">{blok.eyebrow}</p>}{blok.heading?.trim() && <h2 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">{blok.heading}</h2>}</div>{blok.intro?.trim() && <p className={`max-w-2xl text-base leading-7 ${dark ? "text-slate-300" : "text-slate-600"}`}>{blok.intro}</p>}</div>}
        <div className={`flex flex-wrap gap-2 border-b pb-3 ${dark ? "border-white/15" : "border-slate-200"}`} role="tablist" aria-label={blok.heading || "Features"}>
          {tabs.map((tab, index) => <button key={tab._uid || tab.label || index} type="button" role="tab" aria-selected={index === activeIndex} onClick={() => setActiveIndex(index)} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${index === activeIndex ? "bg-brand text-white shadow-sm" : dark ? "text-slate-300 hover:bg-white/10" : "text-slate-600 hover:bg-slate-100"}`}>{tab.label || tab.title}</button>)}
        </div>
        <div className={`mt-8 grid overflow-hidden rounded-3xl border ${dark ? "border-white/15 bg-white/[0.04]" : "border-slate-200 bg-white shadow-sm"} lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]`}>
          <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14"><p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand">{active.eyebrow || active.label}</p><h3 className="text-2xl font-semibold leading-tight sm:text-3xl">{active.title || active.label}</h3>{active.description?.trim() && <p className={`mt-5 max-w-xl text-base leading-7 ${dark ? "text-slate-300" : "text-slate-600"}`}>{active.description}</p>}{details.length > 0 && <ul className={`mt-5 space-y-2 text-sm leading-6 ${dark ? "text-slate-300" : "text-slate-600"}`}>{details.map((detail, index) => <li key={`${index}-${detail}`} className="flex gap-2"><span className="text-brand" aria-hidden="true">•</span><span>{detail}</span></li>)}</ul>}{active.action_label?.trim() && active.action_url?.trim() && <a href={marketingHref(active.action_url)} className="mt-7 inline-flex w-fit items-center gap-2 font-semibold text-brand hover:text-brand-hover">{active.action_label}<span className="material-symbols-outlined text-base" aria-hidden="true">{resolveMaterialIcon(active.action_icon, "arrow_forward")}</span></a>}</div>
          <div className={`min-h-72 p-5 sm:p-8 lg:min-h-[27rem] ${dark ? "bg-slate-900" : "bg-slate-100"}`}>{image ? <img src={image} alt={typeof active.image === "object" ? active.image.alt || active.title || "Feature" : active.title || "Feature"} className="h-full min-h-64 w-full rounded-2xl object-contain" /> : <div className="flex h-full min-h-64 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 via-indigo-100 to-cyan-100 text-center text-sm font-medium text-blue-700">Add an image for this tab</div>}</div>
        </div>
      </div>
    </section>
  );
}
