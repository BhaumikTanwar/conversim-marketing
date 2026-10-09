/* eslint-disable @typescript-eslint/no-explicit-any */
import { EASE } from "../../../lib/animations";
import { motion } from "framer-motion";
import { storyblokEditable } from "@storyblok/react";

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

  layout_variant?: "default" | string;

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
  if (blok?.visible === false) return null;
  const heading =
    blok?.heading || "Frequently asked questions";

  const intro =
    blok?.intro ||
    "Everything you need to know about practising conversations with Conversim.";

  const items =
    blok?.items && blok.items.length > 0
      ? blok.items
      : defaultItems;

  return (
    <section
      {...(blok ? storyblokEditable(blok as any) : {})}
      id={blok?.section_id || "faq"}
      className="px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-[1280px] 2xl:max-w-[1440px] grid lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] gap-10 lg:gap-24">
        {/* LEFT SIDE - STAYS STICKY */}
        <div className="lg:sticky lg:top-28 self-start">
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
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-aurora-text leading-[1.05] mb-5">
              {heading}
            </h2>

            <p className="text-aurora-text-2 text-base md:text-lg max-w-sm leading-relaxed">
              {intro}
            </p>
          </motion.div>
        </div>

        {/* RIGHT SIDE - SCROLLS */}
        <dl>
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
              className="py-7 border-t border-slate-300/70 last:border-b"
            >
              <dt className="text-lg font-semibold text-aurora-text mb-2">
                {item.question}
              </dt>

              <dd className="text-aurora-text-2 leading-relaxed max-w-2xl">
                {item.answer}
              </dd>
            </motion.div>
          ))}
        </dl>

      </div>
    </section>
  );
}
