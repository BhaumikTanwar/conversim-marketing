/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { storyblokEditable } from "@storyblok/react";
import { EASE } from "../../../lib/animations";
import { sectionContainer, sectionHeadingClass, sectionSpacing } from "../sectionStyles";
import StatsBar, { type StatsBarBlok } from "./StatsBar";
import { resolveMaterialIcon } from "../materialIcons";

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
  layout_variant?: string;
  heading?: string;
  intro?: string;
  items?: UseCaseItem[];
  stats_bar?: StatsBarBlok | StatsBarBlok[];
  section_id?: string;
}

interface UseCasesSectionProps {
  blok?: UseCasesBlok;
}

function UseCaseTile({
  useCase,
  index,
  useLargeFeatured,
  sectionLayout,
}: {
  useCase: UseCaseItem;
  index: number;
  useLargeFeatured: boolean;
  sectionLayout: string;
}) {
  const variant = useCase.layout_variant || "standard";

  const featured = variant === "featured";
  const wide = variant === "wide";
  const compact = sectionLayout === "compact";

  const spanClass = featured
    ? useLargeFeatured
      ? "lg:col-span-2 lg:row-span-2"
      : "lg:col-span-2"
    : wide
      ? sectionLayout === "wide" ? "lg:col-span-2" : "lg:col-span-3"
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
      className={`spotlight group flex flex-col rounded-3xl ${compact ? "p-5 md:p-6" : "p-7 md:p-9"} transition-[background-color,border-color,box-shadow] duration-300 hover:shadow-lg ${spanClass} ${
        featured
          ? "bg-accent-900 text-white justify-between min-h-[22rem]"
          : "bg-accent-50 border border-accent-100 hover:border-accent-300"
      }`}
    >
      {useCase.icon && <span
        className={`material-symbols-outlined text-3xl mb-8 ${
          featured ? "text-accent-300" : "text-brand"
        }`}
        aria-hidden="true"
      >
        {resolveMaterialIcon(useCase.icon)}
      </span>}

      <div
        className={
          wide
            ? "md:flex md:items-end md:justify-between md:gap-12"
            : ""
        }
      >
        <div className="max-w-md">
          {useCase.title && <h3
            className={`font-semibold mb-2 ${
              featured
                ? "text-3xl md:text-4xl"
                : "text-xl"
            }`}
          >
            {useCase.title}
          </h3>}

          {useCase.description && <p
            className={`leading-relaxed ${
              featured
                ? "text-accent-100/85 text-base"
                : "text-sm text-slate-600"
            }`}
          >
            {useCase.description}
          </p>}
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

  const heading = blok ? blok.heading?.trim() : "Practice the conversations that are hard to get right.";

  const intro = blok
    ? blok.intro?.trim()
    : "Each persona is built around a specific situation, so a team can rehearse it as many times as it takes.";

  const items = blok
    ? (blok.items ?? []).filter((item) => item.title || item.description || item.detail || item.icon)
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

  const layout = (blok?.layout_variant || blok?.layout || "default").toLowerCase().replace(/[\s-]+/g, "_");

  const featuredCount = items.filter(
    (item) => item.layout_variant === "featured",
  ).length;

  const useLargeFeatured = featuredCount === 1;

  const containerClass = sectionContainer(layout);

  const headingAlignment =
    layout === "centered"
      ? "mx-auto text-center"
      : "";

  const introAlignment =
    layout === "centered"
      ? "mx-auto text-center"
      : "";

  const spacingClass = sectionSpacing(layout);

  const headingMargin =
    layout === "compact"
      ? "mb-8 md:mb-10"
      : "mb-12 md:mb-16";

  const gridGap = layout === "compact" ? "gap-3" : layout === "wide" ? "gap-6" : "gap-4";
  const gridColumns = layout === "compact" ? "lg:grid-cols-2" : layout === "wide" ? "lg:grid-cols-4" : "lg:grid-cols-3";
  const statsBar = Array.isArray(blok?.stats_bar) ? blok.stats_bar[0] : blok?.stats_bar;

  return (
    <section
      {...(blok ? storyblokEditable(blok as any) : {})}
      className={`${spacingClass} px-4 sm:px-6 lg:px-8`}
      id={blok?.section_id || "use-cases"}
    >
      <div className={`${containerClass} mx-auto`}>
        {(heading || intro) && <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: 0.5,
            ease: EASE,
          }}
          className={`${headingMargin} max-w-3xl ${headingAlignment}`}
        >
          {heading && <h2 className={`${sectionHeadingClass} text-slate-900`}>
            {heading}
          </h2>}

          {intro && <p
            className={`${introAlignment} text-slate-600 text-base md:text-lg leading-relaxed mt-5 max-w-[65ch]`}
          >
            {intro}
          </p>}
        </motion.div>}

        <div
          className={`grid md:grid-cols-2 ${gridColumns} ${gridGap} lg:auto-rows-auto lg:grid-flow-dense`}
        >
          {items.map((useCase, index) => (
            <UseCaseTile
              key={useCase._uid || `${useCase.title}-${index}`}
              useCase={useCase}
              index={index}
              useLargeFeatured={useLargeFeatured}
              sectionLayout={layout}
            />
          ))}
        </div>
        {statsBar && <div className="mt-12 md:mt-16"><StatsBar blok={statsBar} /></div>}
      </div>
    </section>
  );
}
