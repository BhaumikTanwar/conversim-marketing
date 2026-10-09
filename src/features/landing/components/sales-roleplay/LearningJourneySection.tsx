import { motion } from "framer-motion";
import { BookOpen, Mic, LineChart } from "lucide-react";

const steps = [
  {
    number: "1",
    icon: BookOpen,
    title: "Learn",
    description:
      "Understand role-specific scenarios powered by AI, built from your own sales playbooks, product docs, and real customer situations.",
  },
  {
    number: "2",
    icon: Mic,
    title: "Train",
    description:
      "Practice through guided AI roleplays that simulate real interactions - rehearse conversations, handle tough objections, and refine pitch messaging.",
  },
  {
    number: "3",
    icon: LineChart,
    title: "Assess",
    description:
      "Receive real-time AI feedback and performance scorecards after every session. Spot rep strengths and target exact areas for improvement.",
  },
];

export default function LearningJourneySection() {
  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden" id="learning-journey">
      <div className="max-w-[1280px] 2xl:max-w-[1440px] 3xl:max-w-[1760px] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-20 space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-md px-3.5 py-1.5 shadow-xs"
          >
            <span>THE LEARNING METHODOLOGY</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-aurora-text tracking-tight"
          >
            The 3-step AI roleplay{" "}
            <span className="text-brand">
              learning journey.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-base sm:text-lg text-aurora-text-2"
          >
            A continuous loop of learning, practice, and data-backed performance assessment.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.12 }}
                whileHover={{ y: -6 }}
                className="relative bg-aurora-surface border border-aurora-border rounded-2xl p-8 overflow-hidden hover:border-brand/40 shadow-sm hover:shadow-md transition-all group flex flex-col box-border"
              >
                <div className="text-6xl font-black text-slate-100 group-hover:text-indigo-100/70 transition-colors absolute top-4 right-6 select-none">
                  {step.number}
                </div>
                <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-2xl font-semibold text-aurora-text mb-3 tracking-tight">{step.title}</h3>
                <p className="text-sm text-aurora-text-2 leading-relaxed relative z-10">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
