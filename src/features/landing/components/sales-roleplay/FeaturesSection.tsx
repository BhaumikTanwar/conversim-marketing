import { motion } from "framer-motion";
import { UserCheck, Users, GitMerge, ShieldAlert, Mic, Globe } from "lucide-react";

const features = [
  {
    icon: UserCheck,
    title: "Persona Creation & Practice",
    description: "Build custom buyer personas and let reps practice against them on repeat.",
  },
  {
    icon: Users,
    title: "Multi-Stakeholder Simulations",
    description: "Rehearse conversations involving multiple decision-makers in one scenario.",
  },
  {
    icon: GitMerge,
    title: "Adaptive Conversation Flows",
    description: "The AI persona reacts dynamically to what a rep actually says, not a fixed script.",
  },
  {
    icon: ShieldAlert,
    title: "Objection Handling Drills",
    description: "Drill high-stakes pushback moments until responses feel completely natural.",
  },
  {
    icon: Mic,
    title: "Sales Pitch Mastery",
    description: "Sharpen value positioning and vocal delivery with instant, structured AI feedback.",
  },
  {
    icon: Globe,
    title: "Multilingual & Avatar Catalog",
    description: "Train in the exact language, voice model, and avatar that match your target market.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden" id="features">
      <div className="max-w-[1280px] 2xl:max-w-[1440px] 3xl:max-w-[1760px] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-20 space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-md px-3.5 py-1.5 shadow-xs"
          >
            <span>CORE CAPABILITIES</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-aurora-text tracking-tight"
          >
            Features engineered for{" "}
            <span className="text-brand">
              sales excellence.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-base sm:text-lg text-aurora-text-2"
          >
            Everything your reps need to practice realistic sales scenarios and close deals faster.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{ y: -4 }}
                className="bg-aurora-surface border border-aurora-border rounded-2xl p-6 sm:p-8 flex flex-col gap-4 hover:border-brand/40 shadow-sm hover:shadow-md transition-all box-border group"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-aurora-text tracking-tight">{feature.title}</h3>
                <p className="text-sm text-aurora-text-2 leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
