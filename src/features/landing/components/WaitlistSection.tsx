/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { storyblokEditable } from "@storyblok/react";
import { EASE } from "../../../lib/animations";
import { sectionHeadingClass, sectionSpacing } from "../sectionStyles";
import StoryblokCta from "./StoryblokCta";

interface WaitlistBlok {
  _uid?: string;
  _editable?: string;
  component?: string;

  layout_variant?: "default" | "centered" | "compact" | string;

  heading?: string;
  description?: string;
  cta_label?: string;
  cta_url?: string;
  cta_icon?: string;
  cta_style?: string;
  section_id?: string;
}

interface WaitlistSectionProps {
  blok?: WaitlistBlok;
}

export default function WaitlistSection({
  blok,
}: WaitlistSectionProps) {
  const layout = (blok?.layout_variant || "default").toLowerCase().replace(/[\s-]+/g, "_");
  const compact = layout === "compact";
  const wide = layout === "wide";
  const centered = layout === "centered" || layout === "center";
  const heading = blok ? blok.heading?.trim() : "Get started today.";

  const description = blok
    ? blok.description?.trim()
    : "Sign up and build your first custom simulation today.";

  const ctaLabel = blok ? blok.cta_label?.trim() : "Sign up";

  const ctaUrl = blok ? blok.cta_url?.trim() : "/login";
  if (!heading && !description && !(ctaLabel && ctaUrl)) return null;

  return (
    <section
      {...(blok ? storyblokEditable(blok as any) : {})}
      className={`${sectionSpacing(layout)} px-4 sm:px-6 lg:px-8`}
      id={blok?.section_id || "waitlist"}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: EASE }}
        className={`relative ${wide ? "max-w-6xl" : centered ? "max-w-2xl" : "max-w-4xl"} mx-auto text-center bg-white border border-slate-200/90 rounded-[2rem] ${compact ? "p-6 sm:p-8" : "p-8 sm:p-10 md:p-12"} overflow-hidden shadow-[0_20px_60px_rgba(29,28,24,0.06)]`}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent-500/10 rounded-full blur-[90px]" />
        </div>

        <div className="relative z-10">
          {heading && <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.2,
              ease: EASE,
            }}
            className={`${sectionHeadingClass} text-slate-900 mb-5`}
          >
            {heading}
          </motion.h2>}

          {description && <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.45,
              delay: 0.28,
              ease: EASE,
            }}
            className="text-slate-600 text-base md:text-lg mb-7 md:mb-8 max-w-xl mx-auto leading-relaxed"
          >
            {description}
          </motion.p>}

          {ctaLabel && ctaUrl && <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.45,
              delay: 0.35,
              ease: EASE,
            }}
          >
            <StoryblokCta
              value={{ label: ctaLabel, url: ctaUrl, icon: blok?.cta_icon, style: blok?.cta_style }}
              className="px-8 shadow-[0_4px_16px_rgba(37,99,235,0.3)]"
            />
          </motion.div>}
        </div>
      </motion.div>
    </section>
  );
}
