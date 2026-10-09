/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { storyblokEditable } from "@storyblok/react";
import { EASE } from "../../../lib/animations";

interface HowItWorksStep {
  _uid?: string;
  _editable?: string;
  component?: string;
  icon?: string;
  title?: string;
  description?: string;
}

interface HowItWorksBlok {
  _uid?: string;
  _editable?: string;
  component?: string;
  visible?: boolean;
  heading?: string;
  intro?: string;
  steps?: HowItWorksStep[];
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

  const heading =
    blok?.heading ||
    "From a folder of docs to a live simulation in an afternoon.";

  const intro =
    blok?.intro ||
    "No scripting engine and no integration project. Three steps, and the last one is a URL.";

  const steps =
    blok?.steps && blok.steps.length > 0
      ? blok.steps
      : defaultSteps;

  return (
    <section
      {...(blok ? storyblokEditable(blok as any) : {})}
      className="py-20 md:py-28 lg:py-36 px-4 sm:px-6 lg:px-8 bg-slate-100/70"
      id={blok?.section_id || "how-it-works"}
    >
      <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-12 lg:gap-24">

        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="lg:sticky lg:top-28 self-start"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-900 leading-[1.05] mb-6">
            {heading}
          </h2>

          <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-md">
            {intro}
          </p>
        </motion.div>

        {/* RIGHT SIDE */}
        <ol className="relative">
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
              className={`py-9 md:py-12 border-t border-slate-300/70 ${
                index === steps.length - 1 ? "border-b" : ""
              } ${index === 1 ? "lg:ml-10" : ""}`}
            >
              <div>
                <div className="flex items-center gap-4 mb-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-100 text-brand">
                    <span
                      className="material-symbols-outlined text-2xl"
                      aria-hidden="true"
                    >
                      {step.icon || "auto_awesome"}
                    </span>
                  </span>

                  <h3 className="text-xl md:text-2xl font-semibold text-slate-900">
                    {step.title}
                  </h3>
                </div>

                <p className="text-slate-600 leading-relaxed max-w-lg">
                  {step.description}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
