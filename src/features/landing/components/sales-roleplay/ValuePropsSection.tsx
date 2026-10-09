import { motion } from "framer-motion";
import { GraduationCap, UserCheck, MessageSquare } from "lucide-react";

const pillars = [
  {
    icon: GraduationCap,
    title: "Acts As Your Sales Trainer",
    description:
      "Built to run structured, role-specific sales training - not generic chat. Every scenario is grounded in your playbooks and product content.",
    number: "01",
  },
  {
    icon: UserCheck,
    title: "Serves As A Personal AI Coach",
    description:
      "Reps get one-on-one practice on demand, with feedback on pacing, tone, and objection handling after every session.",
    number: "02",
  },
  {
    icon: MessageSquare,
    title: "Delivers Realistic Roleplay Training",
    description:
      "Hyper-realistic AI avatars stand in for prospects and customers, so reps rehearse the actual conversation, not a script read-through.",
    number: "03",
  },
];

export default function ValuePropsSection() {
  return (
    <section className="py-20 md:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden" id="value-props">
      <div className="max-w-[1280px] 2xl:max-w-[1440px] 3xl:max-w-[1760px] mx-auto">
        <div className="mb-14 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-aurora-text tracking-tight leading-tight">
              Your all-in-one{" "}
              <span className="text-brand">
                AI roleplay platform
              </span>{" "}
              for sales training.
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-aurora-text-2 text-base md:text-lg max-w-md leading-relaxed"
          >
            A specialized platform engineered to empower sales teams with roleplay simulations, instant feedback, and
            continuous AI coaching.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.12 }}
                whileHover={{ y: -6 }}
                className="bg-aurora-surface border border-aurora-border rounded-2xl p-6 sm:p-8 hover:border-brand/40 shadow-sm hover:shadow-md transition-all group flex flex-col box-border"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-aurora-text mb-3 tracking-tight">{pillar.title}</h3>
                <p className="text-sm text-aurora-text-2 leading-relaxed">{pillar.description}</p>
                <div className="mt-auto pt-8">
                  <span className="font-mono text-xs font-semibold text-indigo-600">{pillar.number}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
