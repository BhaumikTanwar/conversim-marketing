import type { SectorUseCaseItem } from "../types/landing.types";
import { EASE } from "../../../lib/animations";
import { motion } from "framer-motion";

interface SectorUseCasesProps {
  eyebrow: string;
  heading: string;
  items: SectorUseCaseItem[];
}


export default function SectorUseCases({ heading, items }: SectorUseCasesProps) {
  return (
    <section id="use-cases" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.48, ease: EASE }}
          className="mb-12 md:mb-16 max-w-3xl"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-aurora-text leading-[1.05]">{heading}</h2>
        </motion.div>

        <ol>
          {items.map((item, index) => (
            <motion.li
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.42, delay: index * 0.05, ease: EASE }}
              className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-x-8 gap-y-3 py-8 border-t border-slate-300/70 last:border-b group"
            >
              <h3 className="flex items-start gap-3 text-xl md:text-2xl font-semibold text-aurora-text">
                <span className="material-symbols-outlined text-brand text-2xl mt-0.5" aria-hidden="true">
                  {item.icon}
                </span>
                {item.title}
              </h3>
              <p className="text-aurora-text-2 leading-relaxed max-w-xl">{item.copy}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
