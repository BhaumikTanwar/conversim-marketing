import { EASE } from "../../../lib/animations";
import { motion } from "framer-motion";

const loopSteps = [
  {
    number: "01",
    icon: "record_voice_over",
    title: "Roleplay",
    description: "Practice realistic healthcare conversations with AI-powered personas.",
  },
  {
    number: "02",
    icon: "analytics",
    title: "Score",
    description: "See how you performed across the conversation and important communication skills.",
  },
  {
    number: "03",
    icon: "tips_and_updates",
    title: "Coach",
    description: "Get AI-powered feedback on what went well and where you can improve.",
  },
  {
    number: "04",
    icon: "refresh",
    title: "Repeat",
    description: "Practice again, apply the feedback, and build confidence through repetition.",
  },
];


export default function HealthcareLoop() {
  return (
    <section id="conversim-loop" className="px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32">
      <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.48, ease: EASE }}
          className="mb-14 md:mb-20 text-center"
        >
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-md px-3.5 py-1.5 mb-6 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
            The Conversim Loop
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-aurora-text tracking-tight mb-4">
            Practice. Learn. Improve.
          </h2>
          <p className="text-aurora-text-2 text-base md:text-lg max-w-2xl mx-auto">
            Turn every conversation into an opportunity to improve.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {loopSteps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.42, delay: index * 0.09, ease: EASE }}
              whileHover={{ y: -4, boxShadow: "0 12px 30px rgba(29,28,24,0.08)" }}
              className="bg-aurora-surface border border-aurora-border rounded-2xl p-8 flex flex-col gap-5 hover:border-brand/40 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                  className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center"
                >
                  <span className="material-symbols-outlined text-2xl text-indigo-600">{step.icon}</span>
                </motion.div>
                <span className="font-mono text-4xl font-semibold text-slate-100 select-none leading-none">
                  {step.number}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-aurora-text">{step.title}</h3>
              <p className="text-sm text-aurora-text-2 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
