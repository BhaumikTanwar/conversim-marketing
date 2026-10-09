import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function CaseStudySection() {
  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden" id="case-study">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-aurora-surface border border-aurora-border rounded-3xl p-8 sm:p-12 md:p-16 shadow-lg relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand/8 rounded-full blur-[90px] pointer-events-none" />

        <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-md px-3.5 py-1.5 mb-6 shadow-xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>REAL-WORLD IMPACT</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-aurora-text tracking-tight leading-tight mb-5">
          How Structured AI Roleplay <br className="hidden sm:inline" />
          Transforms Sales Outcomes.
        </h2>

        <p className="text-aurora-text-2 text-base md:text-lg leading-relaxed max-w-2xl">
          Picture a frontline sales team rehearsing complex scenarios on Conversim - giving every rep on-demand
          practice, sharpening objection responses, and building unstoppable closing confidence before the call that
          actually counts.
        </p>

        <div className="grid sm:grid-cols-3 gap-6 md:gap-8 mt-10 pt-10 border-t border-aurora-border">
          <div>
            <p className="text-4xl md:text-5xl font-extrabold text-brand">7+</p>
            <p className="text-xs font-semibold text-aurora-text-3 mt-2">Sales roles covered</p>
          </div>
          <div>
            <p className="text-4xl md:text-5xl font-extrabold text-brand">24/7</p>
            <p className="text-xs font-semibold text-aurora-text-3 mt-2">Practice availability</p>
          </div>
          <div>
            <p className="text-4xl md:text-5xl font-extrabold text-brand">100%</p>
            <p className="text-xs font-semibold text-aurora-text-3 mt-2">Custom scenario depth</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
