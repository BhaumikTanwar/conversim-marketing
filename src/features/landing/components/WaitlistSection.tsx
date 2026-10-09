/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { storyblokEditable } from "@storyblok/react";
import { EASE } from "../../../lib/animations";
import { marketingHref } from "../../../lib/env";

interface WaitlistBlok {
  _uid?: string;
  _editable?: string;
  component?: string;

  layout_variant?: "default" | string;

  heading?: string;
  description?: string;
  cta_label?: string;
  cta_url?: string;
  section_id?: string;
}

interface WaitlistSectionProps {
  blok?: WaitlistBlok;
}

export default function WaitlistSection({
  blok,
}: WaitlistSectionProps) {
  const heading =
    blok?.heading || "Get started today.";

  const description =
    blok?.description ||
    "Sign up and build your first custom simulation today.";

  const ctaLabel =
    blok?.cta_label || "Sign up";

  const ctaUrl =
    blok?.cta_url || "/login";

  return (
    <section
      {...(blok ? storyblokEditable(blok as any) : {})}
      className="py-24 md:py-32 lg:py-40 px-4 sm:px-6 lg:px-8"
      id={blok?.section_id || "waitlist"}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: EASE }}
        className="relative max-w-4xl mx-auto text-center bg-white border border-slate-200/90 rounded-[2rem] p-8 sm:p-12 md:p-16 overflow-hidden shadow-[0_20px_60px_rgba(29,28,24,0.06)]"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent-500/10 rounded-full blur-[90px]" />
        </div>

        <div className="relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.2,
              ease: EASE,
            }}
            className="text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-900 leading-[1.05] mb-6"
          >
            {heading}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.45,
              delay: 0.28,
              ease: EASE,
            }}
            className="text-slate-600 text-base md:text-lg mb-10 md:mb-12 max-w-xl mx-auto leading-relaxed"
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.45,
              delay: 0.35,
              ease: EASE,
            }}
          >
            <a
              href={marketingHref(ctaUrl)}
              className="inline-block bg-brand hover:bg-brand-hover text-white font-semibold px-8 py-3.5 rounded-xl text-sm transition-colors shadow-[0_4px_16px_rgba(37,99,235,0.3)]"
            >
              {ctaLabel}
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
