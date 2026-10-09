/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { storyblokEditable } from "@storyblok/react";
import { EASE } from "../../../lib/animations";

interface UseCaseItem {
  _uid?: string;
  _editable?: string;
  component?: string;
  icon?: string;
  title?: string;
  description?: string;
  detail?: string;
  layout_variant?: "standard" | "featured" | "wide" | string;
}

interface UseCasesBlok {
  _uid?: string;
  _editable?: string;
  component?: string;
  visible?: boolean;
  layout?: "default" | "centered" | "wide" | "compact" | string;
  heading?: string;
  intro?: string;
  items?: UseCaseItem[];
  section_id?: string;
}

interface UseCasesSectionProps {
  blok?: UseCasesBlok;
}

function UseCaseTile({
  useCase,
  index,
  useLargeFeatured,
}: {
  useCase: UseCaseItem;
  index: number;
  useLargeFeatured: boolean;
}) {
  const variant = useCase.layout_variant || "standard";

  const featured = variant === "featured";
  const wide = variant === "wide";

  const spanClass = featured
    ? useLargeFeatured
      ? "lg:col-span-2 lg:row-span-2"
      : "lg:col-span-2"
    : wide
      ? "lg:col-span-3"
      : "lg:col-span-1";

  return (
    <motion.article
      {...(useCase._uid
        ? storyblokEditable(useCase as any)
        : {})}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.07,
        ease: EASE,
      }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();

        e.currentTarget.style.setProperty(
          "--mx",
          `${e.clientX - r.left}px`,
        );

        e.currentTarget.style.setProperty(
          "--my",
          `${e.clientY - r.top}px`,
        );
      }}
      className={`spotlight group flex flex-col rounded-3xl p-7 md:p-9 transition-[background-color,border-color,box-shadow] duration-300 hover:shadow-lg ${spanClass} ${
        featured
          ? "bg-accent-900 text-white justify-between min-h-[22rem]"
          : "bg-accent-50 border border-accent-100 hover:border-accent-300"
      }`}
    >
      <span
        className={`material-symbols-outlined text-3xl mb-8 ${
          featured ? "text-accent-300" : "text-brand"
        }`}
        aria-hidden="true"
      >
        {useCase.icon || "auto_awesome"}
      </span>

      <div
        className={
          wide
            ? "md:flex md:items-end md:justify-between md:gap-12"
            : ""
        }
      >
        <div className="max-w-md">
          <h3
            className={`font-semibold mb-2 ${
              featured
                ? "text-3xl md:text-4xl"
                : "text-xl"
            }`}
          >
            {useCase.title}
          </h3>

          <p
            className={`leading-relaxed ${
              featured
                ? "text-accent-100/85 text-base"
                : "text-sm text-slate-600"
            }`}
          >
            {useCase.description}
          </p>
        </div>

        {useCase.detail && (
          <p
            className={`mt-8 pt-5 border-t ${
              featured
                ? "border-white/15 text-accent-200"
                : "border-slate-200 text-slate-500"
            } text-sm max-w-md`}
          >
            {useCase.detail}
          </p>
        )}
      </div>
    </motion.article>
  );
}

export default function UseCasesSection({
  blok,
}: UseCasesSectionProps) {
  if (blok?.visible === false) {
    return null;
  }

  const heading =
    blok?.heading ||
    "Practice the conversations that are hard to get right.";

  const intro =
    blok?.intro ||
    "Each persona is built around a specific situation, so a team can rehearse it as many times as it takes.";

  const items = blok?.items?.length
    ? blok.items
    : [
        {
          icon: "trending_up",
          title: "Sales practice",
          description:
            "Rehearse discovery calls, pricing pushback and multi-threaded negotiations against prospects who don't fold on the first objection.",
          detail:
            "Scored on talk ratio, objection handling and next-step commitment.",
          layout_variant: "featured",
        },
        {
          icon: "support_agent",
          title: "Customer support",
          description:
            "De-escalate angry, confused and time-poor customers before the real ones arrive.",
          layout_variant: "standard",
        },
        {
          icon: "handshake",
          title: "Employee onboarding",
          description:
            "Walk new hires through policy and culture conversations they can repeat until they're comfortable.",
          layout_variant: "standard",
        },
        {
          icon: "forum",
          title: "Interview practice",
          description:
            "Recruiters and candidates run realistic interviews with follow-ups that adapt to each answer.",
          layout_variant: "wide",
        },
      ];

  const layout = blok?.layout || "default";

  const featuredCount = items.filter(
    (item) => item.layout_variant === "featured",
  ).length;

  const useLargeFeatured = featuredCount === 1;

  const containerClass =
    layout === "wide"
      ? "max-w-[1440px] 3xl:max-w-[1760px]"
      : "max-w-[1280px] 2xl:max-w-[1440px]";

  const headingAlignment =
    layout === "centered"
      ? "mx-auto text-center"
      : "";

  const introAlignment =
    layout === "centered"
      ? "mx-auto text-center"
      : "";

  const sectionSpacing =
    layout === "compact"
      ? "py-14 md:py-20 lg:py-24"
      : "py-20 md:py-28 lg:py-36";

  const headingMargin =
    layout === "compact"
      ? "mb-8 md:mb-10"
      : "mb-12 md:mb-16";

  const gridGap =
    layout === "compact"
      ? "gap-3"
      : "gap-4";

  return (
    <section
      {...(blok ? storyblokEditable(blok as any) : {})}
      className={`${sectionSpacing} px-4 sm:px-6 lg:px-8`}
      id={blok?.section_id || "use-cases"}
    >
      <div className={`${containerClass} mx-auto`}>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: 0.5,
            ease: EASE,
          }}
          className={`${headingMargin} max-w-3xl ${headingAlignment}`}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-900 leading-[1.05]">
            {heading}
          </h2>

          <p
            className={`${introAlignment} text-slate-600 text-base md:text-lg leading-relaxed mt-5 max-w-[65ch]`}
          >
            {intro}
          </p>
        </motion.div>

        <div
          className={`grid md:grid-cols-2 lg:grid-cols-3 ${gridGap} lg:auto-rows-auto lg:grid-flow-dense`}
        >
          {items.map((useCase, index) => (
            <UseCaseTile
              key={useCase._uid || `${useCase.title}-${index}`}
              useCase={useCase}
              index={index}
              useLargeFeatured={useLargeFeatured}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
