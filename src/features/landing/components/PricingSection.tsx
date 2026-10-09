/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { storyblokEditable } from "@storyblok/react";
import { Button } from "@/shared/ui/button";
import { EASE } from "../../../lib/animations";

interface PricingBlok {
  _uid?: string;
  _editable?: string;
  component?: string;

  layout_variant?: "default" | string;

  heading?: string;
  highlighted_heading?: string;
  card_heading?: string;
  description?: string;
  cta_label?: string;
  cta_url?: string;
  section_id?: string;
}

interface PricingSectionProps {
  blok?: PricingBlok;
}

export default function PricingSection({ blok }: PricingSectionProps) {
  const heading = blok?.heading || "Pricing built around";

  const highlightedHeading =
    blok?.highlighted_heading || "your team";

  const cardHeading =
    blok?.card_heading ||
    "Every plan is a conversation, not a checkbox.";

  const description =
    blok?.description ||
    "Workshops, tokens, editors and personas — sized to how your team actually practices. Tell us what you need and we'll put together a plan and rate that fits.";

  const ctaLabel =
    blok?.cta_label || "Contact us for pricing";

  const ctaUrl =
    blok?.cta_url ||
    "mailto:info@conversim.co?subject=Pricing%20for%20my%20team";

  return (
    <section
      {...(blok ? storyblokEditable(blok as any) : {})}
      id={blok?.section_id || "pricing"}
      className="py-20 md:py-28 lg:py-36 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto">
        <div className="mb-14 md:mb-20 max-w-3xl">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-900 leading-[1.05]">
            {heading}{" "}
            <span className="text-brand">{highlightedHeading}</span>
            {!/[.!?]$/.test(highlightedHeading) && "."}
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-600 px-8 py-14 md:px-16 md:py-20 text-center text-white"
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
            <h3 className="text-2xl md:text-3xl font-semibold mb-4">
              {cardHeading}
            </h3>

            <p className="text-white/85 text-base md:text-lg leading-relaxed mb-9">
              {description}
            </p>

            <Button
              size="lg"
              className="bg-white text-blue-700 hover:bg-white/90 shadow-lg"
              asChild
            >
              <a href={ctaUrl}>
                <Mail className="w-4 h-4" />
                {ctaLabel}
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
