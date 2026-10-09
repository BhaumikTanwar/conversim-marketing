import type { SectorCta } from "../types/landing.types";
import { EASE } from "../../../lib/animations";
import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface SectorHeroProps {
  eyebrow: string;
  heading: ReactNode;
  subtext: string;
  primaryCta: SectorCta;
  secondaryCta: SectorCta;
  visual: ReactNode;
}


export default function SectorHero({ eyebrow, heading, subtext, primaryCta, secondaryCta, visual }: SectorHeroProps) {
  return (
    <section className="relative flex items-center py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden aurora-bg">
      <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto grid lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] gap-12 lg:gap-20 items-center w-full relative z-10">
        <div className="flex flex-col gap-6 md:gap-8">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="inline-flex items-center gap-2.5 text-sm font-medium text-slate-600"
          >
            {eyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: EASE }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold text-aurora-text leading-[1.02]"
          >
            {heading}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.16, ease: EASE }}
            className="text-lg text-aurora-text-2 leading-relaxed max-w-xl"
          >
            {subtext}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.24, ease: EASE }}
            className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8 pt-2"
          >
            <button
              className="bg-brand hover:bg-brand-hover text-white px-7 py-4 rounded-xl font-medium text-base transition-[background-color,transform] active:scale-[0.97] flex items-center justify-center gap-2.5 group shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_6px_20px_rgba(37,99,235,0.28)]"
              onClick={primaryCta.onClick}
            >
              {primaryCta.label}
              <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>
            <button
              className="text-base font-medium text-slate-700 hover:text-brand transition-colors underline decoration-slate-300 underline-offset-[6px] hover:decoration-brand"
              onClick={secondaryCta.onClick}
            >
              {secondaryCta.label}
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.18, ease: EASE }}
          className="flex items-center justify-center lg:justify-end lg:mt-10"
        >
          {visual}
        </motion.div>
      </div>
    </section>
  );
}
