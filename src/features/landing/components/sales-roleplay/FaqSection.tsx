import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "Is Conversim free to try?",
    answer:
      "Conversim is currently in early access. Join the waitlist and you'll be among the first invited in to try sales roleplay scenarios hands-on.",
  },
  {
    question: "Is this built for enterprise sales teams?",
    answer:
      "Yes. The platform is designed to support multi-stakeholder roles and complex enterprise scenarios, so SDRs, AEs, and Sales Leaders can train against content tailored to them.",
  },
  {
    question: "Can my team rehearse real, high-stakes conversations?",
    answer:
      "That's the core of Conversim: realistic, adaptive AI personas that respond like actual prospects, allowing reps to rehearse tough objections before real deal calls.",
  },
  {
    question: "Does it cover every sales role?",
    answer:
      "Conversim covers role-specific training across the entire sales lifecycle - SDRs, sales executives, inside sales, account managers, BDMs, and sales leadership.",
  },
  {
    question: "How is our training data handled?",
    answer:
      "Data security is a first-class requirement. All scenario data, custom knowledge bases, and transcript recordings are encrypted and strictly partitioned to your workspace.",
  },
  {
    question: "Will this replace our existing sales training program?",
    answer:
      "No - Conversim is built to complement and supercharge your existing sales enablement playbooks and manager coaching programs.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden" id="faq">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14 md:mb-20 space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-md px-3.5 py-1.5 shadow-xs"
          >
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-aurora-text tracking-tight"
          >
            Got questions? We've got{" "}
            <span className="text-brand">answers.</span>
          </motion.h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className={`bg-aurora-surface border rounded-2xl overflow-hidden transition-all ${
                  isOpen ? "border-indigo-300 shadow-sm" : "border-aurora-border shadow-xs"
                }`}
              >
                <button
                  type="button"
                  className="w-full flex items-center justify-between gap-4 p-6 text-left"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className="text-base sm:text-lg font-semibold text-aurora-text tracking-tight">{faq.question}</span>
                  <div
                    className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 transition-colors ${
                      isOpen
                        ? "bg-indigo-50 border-indigo-200 text-indigo-700"
                        : "bg-aurora-surface-2 border-aurora-border text-aurora-text-3"
                    }`}
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <p className="px-6 pb-6 pt-0 text-sm text-aurora-text-2 leading-relaxed">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
