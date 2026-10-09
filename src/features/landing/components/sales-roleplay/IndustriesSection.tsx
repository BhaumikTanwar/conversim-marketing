import { motion } from "framer-motion";

const industries = [
  "SaaS & Enterprise Tech",
  "Banking & Financial Services",
  "Insurance",
  "Pharma & Life Sciences",
  "Healthcare",
  "Professional Services",
  "Manufacturing & Industrial",
  "Automotive",
  "Logistics & Supply Chain",
  "Retail & E-commerce",
];

export default function IndustriesSection() {
  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden" id="industries">
      <div className="max-w-[1280px] 2xl:max-w-[1440px] 3xl:max-w-[1760px] mx-auto text-center">
        <div className="max-w-3xl mx-auto mb-12 space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-md px-3.5 py-1.5 shadow-xs"
          >
            <span>CROSS-INDUSTRY SCALABILITY</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-aurora-text tracking-tight"
          >
            Built for sales teams across{" "}
            <span className="text-brand">
              every major industry.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-base sm:text-lg text-aurora-text-2"
          >
            Sales conversations differ by sector - Conversim's persona-driven AI roleplay adapts to match your exact
            domain.
          </motion.p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.05 } },
          }}
          className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto"
        >
          {industries.map((industry) => (
            <motion.div
              key={industry}
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1 },
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="bg-aurora-surface border border-aurora-border rounded-xl px-6 py-3.5 hover:border-brand/40 shadow-xs hover:shadow-sm transition-all cursor-default"
            >
              <span className="text-sm font-semibold text-aurora-text">{industry}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
