import { storyblokEditable } from "@storyblok/react";
import { useRef, useState, type CSSProperties } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { assetUrl } from "../../../lib/assets";
import { isDark } from "../../../lib/color";
import { marketingHref } from "../../../lib/env";

interface Asset { filename?: string; alt?: string; }
interface Metric { _uid?: string; component?: string; value?: string; label?: string; }
interface CaseStudyCard {
  _uid?: string;
  component?: string;
  visible?: boolean;
  image?: Asset | string;
  company_name?: string;
  title?: string;
  headline?: string;
  description?: string;
  stats?: Metric[];
  action_label?: string;
  action_url?: string | { url?: string; cached_url?: string };
  open_in_new_tab?: boolean;
}
interface CaseStudyGridBlok {
  _uid?: string;
  visible?: boolean;
  eyebrow?: string;
  heading?: string;
  description?: string;
  background_color?: string;
  card_background_color?: string;
  columns?: number | string;
  rows?: number | string;
  display_mode?: string;
  cards?: CaseStudyCard[];
  section_id?: string;
}

function linkUrl(value: CaseStudyCard["action_url"]) {
  return typeof value === "string" ? value : value?.url || value?.cached_url || "";
}

export default function CaseStudyGrid({ blok }: { blok?: CaseStudyGridBlok }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!blok || blok.visible === false) return null;
  const cards = (blok.cards ?? []).filter((card) => card.visible !== false && (card.title?.trim() || assetUrl(card.image)));
  if (!cards.length) return null;
  const sectionColor = blok.background_color?.trim() || "#ffffff";
  const cardColor = blok.card_background_color?.trim() || (isDark(sectionColor) ? "#171717" : "#ffffff");
  const darkCard = isDark(cardColor);
  const columns = Math.max(1, Math.min(4, Number.parseInt(String(blok.columns || 2), 10) || 2));
  const rowsValue = Number.parseInt(String(blok.rows || ""), 10);
  const rows = Number.isFinite(rowsValue) && rowsValue > 0 ? Math.min(8, rowsValue) : undefined;
  const carousel = (blok.display_mode || "grid").toLowerCase() === "carousel";

  function scrollToIndex(index: number) {
    const clamped = Math.max(0, Math.min(cards.length - 1, index));
    trackRef.current?.children[clamped]?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    setActiveIndex(clamped);
  }

  function handleScroll() {
    const track = trackRef.current;
    if (!track) return;
    const closest = Array.from(track.children).reduce((closestIndex, child, index) => {
      const distance = Math.abs((child as HTMLElement).offsetLeft - track.scrollLeft);
      const closestDistance = Math.abs((track.children[closestIndex] as HTMLElement).offsetLeft - track.scrollLeft);
      return distance < closestDistance ? index : closestIndex;
    }, 0);
    setActiveIndex(closest);
  }

  function renderCard(card: CaseStudyCard) {
    const image = assetUrl(card.image);
    const stats = (card.stats ?? []).filter((stat) => stat.value?.trim() || stat.label?.trim());
    const url = linkUrl(card.action_url);
    const cardContent = (
      <>
        {image && <div className="aspect-[16/9] overflow-hidden bg-slate-100"><img src={image} alt={typeof card.image === "object" ? card.image.alt || card.company_name || card.title || "Case study" : card.company_name || card.title || "Case study"} className="size-full object-cover transition duration-500 group-hover:scale-[1.025]" /></div>}
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          {card.company_name?.trim() && <p className={`text-xs font-semibold uppercase tracking-[0.12em] ${darkCard ? "text-white/80" : "text-slate-500"}`}>{card.company_name}</p>}
          {card.title?.trim() && <h3 className={`mt-3 text-xl font-semibold leading-snug ${darkCard ? "text-white" : "text-slate-950"}`}>{card.title}</h3>}
          {card.headline?.trim() && <p className={`mt-3 text-sm font-semibold ${darkCard ? "text-white" : "text-slate-800"}`}>{card.headline}</p>}
          {card.description?.trim() && <p className={`mt-2 text-sm leading-relaxed ${darkCard ? "text-white/65" : "text-slate-600"}`}>{card.description}</p>}
          {stats.length > 0 && <div className={`mt-5 grid border-t pt-4 ${darkCard ? "border-white/10" : "border-slate-200"}`} style={{ gridTemplateColumns: `repeat(${Math.min(stats.length, 3)}, minmax(0, 1fr))` }}>{stats.map((stat) => <div key={stat._uid || `${stat.value}-${stat.label}`} className="min-w-0 px-1 first:pl-0"><p className={`text-lg font-semibold tracking-tight sm:text-2xl ${darkCard ? "text-white" : "text-slate-950"}`}>{stat.value}</p>{stat.label?.trim() && <p className={`mt-1 text-[9px] uppercase leading-snug tracking-wide sm:text-[10px] ${darkCard ? "text-white/55" : "text-slate-500"}`}>{stat.label}</p>}</div>)}</div>}
          {card.action_label?.trim() && <span className="mt-auto inline-flex items-center gap-2 pt-5 text-xs font-semibold uppercase tracking-[0.1em] text-blue-500">{card.action_label}<ArrowRight size={14} aria-hidden="true" /></span>}
        </div>
      </>
    );
    const className = `group flex h-full min-w-0 flex-col overflow-hidden border border-black/10 transition hover:-translate-y-0.5 hover:shadow-xl ${url ? "cursor-pointer" : ""} ${carousel ? "snap-start shrink-0 w-[85%] sm:w-[45%] lg:w-[31%]" : ""}`;
    return url ? <a key={card._uid || card.title} href={marketingHref(url)} target={card.open_in_new_tab ? "_blank" : undefined} rel={card.open_in_new_tab ? "noopener noreferrer" : undefined} className={className} style={{ backgroundColor: cardColor, color: darkCard ? "white" : "#111827" }}>{cardContent}</a> : <article key={card._uid || card.title} className={className} style={{ backgroundColor: cardColor, color: darkCard ? "white" : "#111827" }}>{cardContent}</article>;
  }

  return (
    <section id={blok.section_id} {...(blok._uid ? storyblokEditable(blok as never) : {})} className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20" style={{ backgroundColor: sectionColor }}>
      <div className="mx-auto max-w-7xl">
        {(blok.eyebrow?.trim() || blok.heading?.trim() || blok.description?.trim()) && (
          <header className="mb-7 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              {blok.eyebrow?.trim() && <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">{blok.eyebrow}</p>}
              {blok.heading?.trim() && <h2 className={`max-w-3xl text-2xl font-semibold tracking-tight sm:text-4xl ${isDark(sectionColor) ? "text-white" : "text-slate-950"}`}>{blok.heading}</h2>}
            </div>
            {blok.description?.trim() && <p className={`max-w-md text-sm leading-6 ${isDark(sectionColor) ? "text-white/70" : "text-slate-600"}`}>{blok.description}</p>}
          </header>
        )}
        {carousel ? (
          <div className="relative">
            <div ref={trackRef} onScroll={handleScroll} className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 sm:gap-5 lg:gap-6">
              {cards.map(renderCard)}
            </div>
            {cards.length > 1 && (
              <div className="mt-6 flex items-center justify-center gap-4">
                <button type="button" aria-label="Previous case study" disabled={activeIndex === 0} onClick={() => scrollToIndex(activeIndex - 1)} className={`flex size-9 items-center justify-center rounded-full border transition ${isDark(sectionColor) ? "border-white/20 text-white hover:bg-white/10 disabled:opacity-30" : "border-slate-300 text-slate-700 hover:bg-slate-100 disabled:opacity-30"}`}>
                  <ArrowLeft size={16} aria-hidden="true" />
                </button>
                <div className="flex items-center gap-2">
                  {cards.map((card, index) => (
                    <button key={card._uid || index} type="button" aria-label={`Go to slide ${index + 1}`} onClick={() => scrollToIndex(index)} className={`size-2 rounded-full transition ${index === activeIndex ? "bg-blue-600" : isDark(sectionColor) ? "bg-white/25" : "bg-slate-300"}`} />
                  ))}
                </div>
                <button type="button" aria-label="Next case study" disabled={activeIndex === cards.length - 1} onClick={() => scrollToIndex(activeIndex + 1)} className={`flex size-9 items-center justify-center rounded-full border transition ${isDark(sectionColor) ? "border-white/20 text-white hover:bg-white/10 disabled:opacity-30" : "border-slate-300 text-slate-700 hover:bg-slate-100 disabled:opacity-30"}`}>
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="case-study-grid-cards grid gap-4 sm:gap-5 lg:gap-6" style={{ "--case-study-columns": columns, ...(rows ? { gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))` } : {}) } as CSSProperties}>
            {cards.map(renderCard)}
          </div>
        )}
      </div>
    </section>
  );
}
