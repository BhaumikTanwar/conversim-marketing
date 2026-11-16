import { motion } from "framer-motion";
import { storyblokEditable } from "@storyblok/react";
import { EASE } from "../../../lib/animations";
import { sectionHeadingClass, sectionSpacing } from "../sectionStyles";

export interface ChallengeStat { _uid?: string; value?: string; label?: string; source_url?: string; }
export interface ChallengeBlok {
  _uid?: string;
  visible?: boolean;
  eyebrow?: string;
  background_style?: string;
  heading?: string;
  description?: string;
  stats?: ChallengeStat[];
  section_id?: string;
}

const LIGHT = { section: "", eyebrow: "text-blue-600", heading: "text-slate-950", body: "text-slate-600", label: "text-slate-500", line: "border-slate-200" };
const THEMES: Record<string, typeof LIGHT> = {
  white: { ...LIGHT, section: "bg-white" },
  soft: { ...LIGHT, section: "bg-slate-50" },
  tint: { ...LIGHT, section: "bg-blue-50/70", line: "border-blue-100" },
  dark: { section: "bg-slate-950", eyebrow: "text-cyan-300", heading: "text-white", body: "text-slate-300", label: "text-slate-400", line: "border-white/15" },
};

export default function Challenge({ blok }: { blok?: ChallengeBlok }) {
  if (blok?.visible === false) return null;
  if (!blok?.heading?.trim()) return null;
  const stats = (blok.stats ?? []).filter((stat) => stat.value?.trim() || stat.label?.trim());
  // Columns at the widest breakpoint; 1 stat is centered, 5+ wrap into even rows of 3 or 4.
  const cols = stats.length <= 4 ? stats.length : stats.length % 4 === 0 ? 4 : 3;
  const single = stats.length === 1;
  const gridClass = { 1: "max-w-sm sm:mx-auto sm:grid-cols-1", 2: "sm:grid-cols-2", 3: "sm:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[cols] ?? "sm:grid-cols-2 lg:grid-cols-3";
  const t = THEMES[(blok.background_style || "").toLowerCase()] ?? LIGHT;
  const dividerAt = cols === 4 ? "lg" : "sm";

  return (
    <section id={blok.section_id} {...(blok._uid ? storyblokEditable(blok as never) : {})} className={`${sectionSpacing("default")} ${t.section} px-4 sm:px-6 lg:px-8`}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: EASE }}
        className="mx-auto max-w-4xl"
      >
        {blok.eyebrow?.trim() && <p className={`mb-3 text-xs font-semibold uppercase tracking-[0.16em] ${t.eyebrow}`}>{blok.eyebrow}</p>}
        <h2 className={`${sectionHeadingClass} ${t.heading}`}>{blok.heading}</h2>
        {blok.description?.trim() && <p className={`mt-5 max-w-2xl text-base leading-relaxed md:text-lg ${t.body}`}>{blok.description}</p>}
        {stats.length > 0 && (
          <div className={`mt-14 grid gap-y-10 border-t ${t.line} pt-10 sm:gap-x-10 ${gridClass}`}>
            {stats.map((stat, index) => (
              <motion.div
                key={stat._uid || `${stat.value}-${stat.label}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08, ease: EASE }}
                className={`min-w-0 ${single ? "text-center" : ""} ${index % cols !== 0 ? (dividerAt === "lg" ? `lg:border-l lg:pl-10 ${t.line}` : `sm:border-l sm:pl-10 ${t.line}`) : ""}`}
              >
                <p className={`text-3xl font-semibold tracking-[-0.06em] sm:text-6xl ${t.heading}`}>{stat.value}</p>
                {stat.label?.trim() && (
                  <p className={`mt-2 text-[9px] font-semibold uppercase leading-snug tracking-[0.1em] sm:mt-3 sm:text-[11px] sm:tracking-[0.16em] ${t.label}`}>
                    {stat.label}
                    {stat.source_url?.trim() && (
                      <a href={stat.source_url} target="_blank" rel="noopener noreferrer" className={`ml-1.5 normal-case tracking-normal font-medium underline underline-offset-2 transition-opacity opacity-50 hover:opacity-100 ${t.label}`} aria-label="View source">source ↗</a>
                    )}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}
