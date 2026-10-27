/* eslint-disable @typescript-eslint/no-explicit-any */
import { EASE } from "../../../lib/animations";
import { motion } from "framer-motion";
import { storyblokEditable } from "@storyblok/react";
import { sectionContainer, sectionHeadingClass, sectionSpacing } from "../sectionStyles";

interface FAQItem {
  _uid?: string;
  _editable?: string;
  component?: string;
  question?: string;
  answer?: string;
}

interface FAQBlok {
  _uid?: string;
  _editable?: string;
  component?: string;

  layout_variant?: "default" | "centered" | "compact" | "wide" | string;

  eyebrow?: string;
  heading?: string;
  intro?: string;
  items?: FAQItem[];
  visible?: boolean;
  section_id?: string;
}

interface SectorFAQProps extends FAQBlok {
  blok?: FAQBlok;
}

const defaultItems: FAQItem[] = [
  {
    question: "What is Conversim?",
    answer:
      "Conversim is an AI conversation training platform that lets teams practise realistic conversations and receive feedback.",
  },
  {
    question: "Who is Conversim for?",
    answer:
      "Conversim is designed for teams that want to practise sales, support, onboarding, interviews and other important conversations.",
  },
];

export default function SectorFAQ(props: SectorFAQProps) {
  const blok = props.blok ?? props;
  const layout = (blok?.layout_variant || "default").toLowerCase().replace(/[\s-]+/g, "_");
  const centered = layout === "centered" || layout === "center";
  const compact = layout === "compact";
  const wide = layout === "wide";
  if (blok?.visible === false) return null;
  const heading = blok ? blok.heading?.trim() : "Frequently asked questions";

  const intro = blok
    ? blok.intro?.trim()
    : "Everything you need to know about practising conversations with Conversim.";

  const items = blok
    ? (blok.items ?? []).filter((item) => item.question || item.answer)
    : defaultItems;
  if (!blok?.eyebrow && !heading && !intro && items.length === 0) return null;
  const structuredFaqs = items.filter((item) => item.question?.trim() && item.answer?.trim());
  const faqJsonLd = structuredFaqs.length
    ? JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: structuredFaqs.map((item) => ({
          "@type": "Question",
          name: item.question!.trim(),
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer!.trim(),
          },
        })),
      }).replace(/</g, "\\u003c")
    : null;

  return (
    <section
      {...(blok ? storyblokEditable(blok as any) : {})}
      id={blok?.section_id || "faq"}
      className={`${sectionSpacing(layout)} px-4 sm:px-6 lg:px-8`}
    >
      {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd }} />}
      <div className={`mx-auto ${sectionContainer(layout)} ${centered ? "max-w-3xl" : "grid lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)]"} gap-10 lg:gap-16`}>
        {/* LEFT SIDE - STAYS STICKY */}
        <div className={`${centered ? "text-center mx-auto" : "lg:sticky lg:top-28 self-start"}`}>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.48, ease: EASE }}
          >
            {blok?.eyebrow && (
              <p className="text-sm font-semibold uppercase tracking-wider text-brand mb-3">
                {blok.eyebrow}
              </p>
            )}
            {heading && <h2 className={`${sectionHeadingClass} text-aurora-text mb-5`}>
              {heading}
            </h2>}

            {intro && <p className="text-aurora-text-2 text-base md:text-lg max-w-sm leading-relaxed">
              {intro}
            </p>}
          </motion.div>
        </div>

        {/* RIGHT SIDE - SCROLLS */}
        <dl className={compact ? "space-y-1" : ""}>
          {items.map((item, index) => (
            <motion.div
              key={item._uid || item.question || index}
              {...(item._uid
                ? storyblokEditable(item as any)
                : {})}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.4,
                delay: index * 0.05,
                ease: EASE,
              }}
              className={`${compact ? "py-4" : "py-7"} border-t border-slate-300/70 last:border-b ${wide ? "lg:py-9" : ""}`}
            >
              {item.question && <dt className="text-lg font-semibold text-aurora-text mb-2">
                {item.question}
              </dt>}

              {item.answer && <dd className="text-aurora-text-2 leading-relaxed max-w-2xl">
                {item.answer}
              </dd>}
            </motion.div>
          ))}
        </dl>

      </div>
    </section>
  );
}
