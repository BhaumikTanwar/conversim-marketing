import { motion } from "framer-motion";
import { PhoneCall, Handshake, Headset, Users, Compass, UserCheck, Award } from "lucide-react";

const roles = [
  {
    icon: PhoneCall,
    title: "Sales Development Reps",
    description: "Lead qualification, outreach simulations, first-level objection handling.",
  },
  {
    icon: Handshake,
    title: "Sales Executives",
    description: "Solution-led conversations, high-stakes negotiation, and complex buyer objections.",
  },
  {
    icon: Headset,
    title: "Inside Sales Reps",
    description: "Remote selling, high-volume prospect interactions, and sharp product positioning.",
  },
  {
    icon: Users,
    title: "Account Managers",
    description: "Quarterly business reviews, renewal negotiations, upselling, and cross-selling.",
  },
  {
    icon: Compass,
    title: "Business Development Managers",
    description: "Strategic prospecting, opportunity discovery, and enterprise outreach.",
  },
  {
    icon: UserCheck,
    title: "Sales Managers",
    description: "Coaching conversations, deal strategy reviews, and performance discussions.",
  },
  {
    icon: Award,
    title: "Head of Sales & VPs",
    description: "Executive decision-making simulations and alignment to revenue targets.",
  },
];

export default function RolesSection() {
  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden" id="roles">
      <div className="max-w-[1280px] 2xl:max-w-[1440px] 3xl:max-w-[1760px] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-20 space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-md px-3.5 py-1.5 shadow-xs"
          >
            <span>ROLE-BASED SCENARIOS</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-aurora-text tracking-tight"
          >
            Tailored roleplay for{" "}
            <span className="text-brand">
              every sales role.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-base sm:text-lg text-aurora-text-2"
          >
            From SDR prospecting to VP-level enterprise negotiation, Conversim prepares your team for every interaction.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {roles.map((role, index) => {
            const Icon = role.icon;
            return (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                whileHover={{ y: -4 }}
                className="bg-aurora-surface border border-aurora-border rounded-2xl p-6 flex flex-col gap-3.5 hover:border-brand/40 shadow-sm hover:shadow-md transition-all box-border group"
              >
                <div className="w-11 h-11 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-aurora-text tracking-tight">{role.title}</h3>
                <p className="text-xs text-aurora-text-2 leading-relaxed">{role.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
