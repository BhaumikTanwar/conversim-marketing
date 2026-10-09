import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/shared/ui/button";

interface RoleplayCtaSectionProps {
  onOpenWaitlist: () => void;
}

export default function RoleplayCtaSection({ onOpenWaitlist }: RoleplayCtaSectionProps) {
  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative max-w-4xl 2xl:max-w-5xl mx-auto text-center bg-aurora-surface border border-aurora-border rounded-3xl p-8 sm:p-12 md:p-16 overflow-hidden shadow-lg"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand/10 rounded-full blur-[90px]" />
          <div className="absolute -bottom-24 right-1/4 w-72 h-72 bg-aurora-cyan/8 rounded-full blur-[80px]" />
        </div>

        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-md px-3.5 py-1.5 mx-auto shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TRANSFORM YOUR SALES TEAM</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-aurora-text tracking-tight leading-tight">
            Bring Structured AI Roleplay Into <br className="hidden sm:inline" />
            Your Sales Training Library.
          </h2>

          <p className="text-aurora-text-2 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Join the waitlist for early access and start building your team's interactive AI sales roleplay scenarios on
            Conversim.
          </p>

          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="pt-4 inline-block">
            <Button
              size="lg"
              className="px-8 py-6 text-base font-semibold bg-brand hover:bg-brand-hover text-white gap-2.5 shadow-md"
              onClick={onOpenWaitlist}
            >
              Join The Waitlist <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
