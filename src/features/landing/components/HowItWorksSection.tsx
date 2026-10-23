/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { storyblokEditable } from "@storyblok/react";
import { EASE } from "../../../lib/animations";
import { sectionContainer, sectionHeadingClass, sectionSpacing } from "../sectionStyles";
import { resolveMaterialIcon } from "../materialIcons";

interface HowItWorksStep {
  _uid?: string;
  _editable?: string;
  component?: string;
  icon?: string;
  title?: string;
  description?: string;
  layout_variant?: string;
}

interface HowItWorksBlok {
  _uid?: string;
  _editable?: string;
  component?: string;
  visible?: boolean;
  heading?: string;
  intro?: string;
  steps?: HowItWorksStep[];
  layout?: string;
  layout_variant?: string;
  section_id?: string;
}

interface HowItWorksSectionProps {
  blok?: HowItWorksBlok;
}

const defaultSteps: HowItWorksStep[] = [
  {
    icon: "upload_file",
    title: "Upload your material",
    description:
      "Add training docs, call scripts and scoring rubrics. The persona works from your context, not a generic one.",
  },
  {
    icon: "settings_accessibility",
    title: "Shape the persona",
    description:
      "Set the look, temperament, background and what they're trying to get out of the conversation.",
  },
  {
    icon: "rocket_launch",
    title: "Share the link",
    description:
      "Your team practises from a browser. You see scores, transcripts and progress per person.",
  },
];

export default function HowItWorksSection({
  blok,
}: HowItWorksSectionProps) {
  if (blok?.visible === false) return null;

  const heading = blok
    ? blok.heading?.trim()
    : "From a folder of docs to a live simulation in an afternoon.";

  const intro = blok
    ? blok.intro?.trim()
    : "No scripting engine and no integration project. Three steps, and the last one is a URL.";

  const steps = blok
    ? (blok.steps ?? []).filter((step) => step.title || step.description || step.icon)
    : defaultSteps;
  const layout = (blok?.layout_variant || blok?.layout || "default").toLowerCase().replace(/[\s-]+/g, "_");
  const cards = layout === "cards" || layout === "grid" || layout === "card_grid";
  const compact = layout === "compact";
  const centered = layout === "centered" || layout === "center";
  const wide = layout === "wide";

  return (
    <section
      {...(blok ? storyblokEditable(blok as any) : {})}
      className={`${sectionSpacing(layout)} px-4 sm:px-6 lg:px-8 bg-slate-100/70`}
      id={blok?.section_id || "how-it-works"}
    >
      <div className={`${sectionContainer(wide ? "wide" : layout)} mx-auto ${cards || centered ? "" : "grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"} gap-10 lg:gap-16`}>

        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: EASE }}
          className={cards || centered ? `max-w-3xl mb-10 ${centered ? "mx-auto text-center" : ""}` : "lg:sticky lg:top-28 self-start"}
        >
          {heading && <h2 className={`${sectionHeadingClass} text-slate-900 mb-5`}>
            {heading}
          </h2>}

          {intro && <p className={`text-slate-600 text-base md:text-lg leading-relaxed max-w-md ${centered ? "mx-auto" : ""}`}>
            {intro}
          </p>}
        </motion.div>

        {/* RIGHT SIDE */}
        <ol className={`relative ${cards ? "grid md:grid-cols-3 gap-4" : centered ? "max-w-3xl mx-auto" : ""}`}>
          {steps.map((step, index) => (
            <motion.li
              key={step._uid || `${step.title}-${index}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
                ease: EASE,
              }}
              className={`${cards ? "rounded-2xl border border-slate-300/70 p-6" : "py-9 md:py-12 border-t border-slate-300/70"} ${compact ? "py-6 md:py-8" : ""} ${((step.layout_variant || "").toLowerCase().replace(/[\s-]+/g, "_") === "featured") ? "bg-white rounded-2xl px-6 shadow-sm" : ""} ${((step.layout_variant || "").toLowerCase().replace(/[\s-]+/g, "_") === "compact") ? "py-5" : ""} ${((step.layout_variant || "").toLowerCase().replace(/[\s-]+/g, "_") === "wide") ? cards ? "md:col-span-2" : "lg:-ml-10 lg:pl-10 bg-white rounded-2xl shadow-sm" : ""} ${
                index === steps.length - 1 ? "border-b" : ""
              } ${(step.layout_variant || "").toLowerCase() === "indented" || (!step.layout_variant && !cards && !centered && index === 1) ? "lg:ml-10" : ""}`}
            >
              <div>
                <div className="flex items-center gap-4 mb-3">
                  {step.icon && <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-100 text-brand">
                    <span
                      className="material-symbols-outlined text-2xl"
                      aria-hidden="true"
                    >
                      {resolveMaterialIcon(step.icon)}
                    </span>
                  </span>}

                  {step.title && <h3 className="text-xl md:text-2xl font-semibold text-slate-900">
                    {step.title}
                  </h3>}
                </div>

                {step.description && <p className="text-slate-600 leading-relaxed max-w-lg">
                  {step.description}
                </p>}
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
