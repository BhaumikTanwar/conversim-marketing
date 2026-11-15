import { motion } from "framer-motion";
import { storyblokEditable } from "@storyblok/react";
import { EASE } from "../../../lib/animations";
import { sectionHeadingClass, sectionSpacing } from "../sectionStyles";

export interface ChallengeStat { _uid?: string; value?: string; label?: string; }
export interface ChallengeBlok {
  _uid?: string;
  visible?: boolean;
  eyebrow?: string;
  heading?: string;
  description?: string;
  stats?: ChallengeStat[];
  section_id?: string;
}

export default function Challenge({ blok }: { blok?: ChallengeBlok }) {
  if (blok?.visible === false) return null;
  if (!blok?.heading?.trim()) return null;
  const stats = (blok.stats ?? []).filter((stat) => stat.value?.trim() || stat.label?.trim());

  return (
    <section id={blok.section_id} {...(blok._uid ? storyblokEditable(blok as never) : {})} className={`${sectionSpacing("default")} px-4 sm:px-6 lg:px-8`}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: EASE }}
        className="mx-auto max-w-4xl"
      >
        {blok.eyebrow?.trim() && <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">{blok.eyebrow}</p>}
        <h2 className={`${sectionHeadingClass} text-slate-950`}>{blok.heading}</h2>
        {blok.description?.trim() && <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">{blok.description}</p>}
        {stats.length > 0 && (
          <div className="mt-14 grid gap-y-10 border-t border-slate-200 pt-10 sm:grid-cols-3 sm:gap-x-10">
            {stats.map((stat, index) => (
              <motion.div
                key={stat._uid || `${stat.value}-${stat.label}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08, ease: EASE }}
                className={`min-w-0 ${index > 0 ? "sm:border-l sm:border-slate-200 sm:pl-10" : ""}`}
              >
                <p className="text-3xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-6xl">{stat.value}</p>
                {stat.label?.trim() && <p className="mt-2 text-[9px] font-semibold uppercase leading-snug tracking-[0.1em] text-slate-500 sm:mt-3 sm:text-[11px] sm:tracking-[0.16em]">{stat.label}</p>}
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}
