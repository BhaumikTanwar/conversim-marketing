/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { storyblokEditable } from "@storyblok/react";
import { EASE } from "../../../lib/animations";
import { sectionContainer, sectionHeadingClass, sectionSpacing } from "../sectionStyles";
import StoryblokCta from "./StoryblokCta";

interface PricingBlok {
  _uid?: string;
  _editable?: string;
  component?: string;

  layout_variant?: "default" | "centered" | "wide" | "compact" | string;

  heading?: string;
  highlighted_heading?: string;
  card_heading?: string;
  description?: string;
  cta_label?: string;
  cta_url?: string;
  cta_icon?: string;
  cta_style?: string;
  section_id?: string;
}

interface PricingSectionProps {
  blok?: PricingBlok;
}

export default function PricingSection({ blok }: PricingSectionProps) {
  const layout = (blok?.layout_variant || "default").toLowerCase().replace(/[\s-]+/g, "_");
  const compact = layout === "compact";
  const centered = layout === "centered" || layout === "center";
  const wide = layout === "wide";
  const heading = blok ? blok.heading?.trim() : "Pricing built around";

  const highlightedHeading = blok ? blok.highlighted_heading?.trim() : "your team";

  const cardHeading = blok
    ? blok.card_heading?.trim()
    : "Every plan is a conversation, not a checkbox.";

  const description = blok
    ? blok.description?.trim()
    : "Workshops, tokens, editors and personas — sized to how your team actually practices. Tell us what you need and we'll put together a plan and rate that fits.";

  const ctaLabel = blok ? blok.cta_label?.trim() : "Contact us for pricing";

  const ctaUrl = blok
    ? blok.cta_url?.trim()
    : "mailto:info@conversim.co?subject=Pricing%20for%20my%20team";
  const hasCard = Boolean(cardHeading || description || (ctaLabel && ctaUrl));
  if (!heading && !highlightedHeading && !hasCard) return null;

  return (
    <section
      {...(blok ? storyblokEditable(blok as any) : {})}
      id={blok?.section_id || "pricing"}
      className={`${sectionSpacing(layout)} px-4 sm:px-6 lg:px-8`}
    >
      <div className={`${sectionContainer(wide ? "wide" : layout)} mx-auto`}>
        {(heading || highlightedHeading) && <div className={`${compact ? "mb-7" : "mb-10 md:mb-12"} max-w-3xl ${centered ? "mx-auto text-center" : ""}`}>
          <h2 className={`${sectionHeadingClass} text-slate-900`}>
            {heading}{heading && highlightedHeading ? " " : ""}
            {highlightedHeading && <span className="text-brand">{highlightedHeading}</span>}
            {highlightedHeading && !/[.!?]$/.test(highlightedHeading) && "."}
          </h2>
        </div>}

        {hasCard && <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: EASE }}
          className={`relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-600 ${compact ? "px-6 py-8 md:px-10" : "px-8 py-10 md:px-14 md:py-14"} text-center text-white`}
        >
          <div
            className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/10 blur-[100px]"
            aria-hidden
          />

          <div
            className="pointer-events-none absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-white/10 blur-[100px]"
            aria-hidden
          />

          <div className="relative max-w-2xl mx-auto">
            {cardHeading && <h3 className="text-2xl md:text-3xl font-semibold mb-4">
              {cardHeading}
            </h3>}

            {description && <p className={`text-white/85 text-base md:text-lg leading-relaxed ${ctaLabel && ctaUrl ? "mb-9" : ""}`}>
              {description}
            </p>}

            <StoryblokCta
              value={{ label: ctaLabel, url: ctaUrl, icon: blok?.cta_icon, style: blok?.cta_style }}
              onBrand
              className="shadow-lg"
            />
          </div>
        </motion.div>}
      </div>
    </section>
  );
}
