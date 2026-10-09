import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { EASE } from "../../lib/animations";

export default function NotFound({
  title = "We couldn't find that page",
  message = "The link may be broken, or the page may have moved.",
}: {
  title?: string;
  message?: string;
}) {
  return (
    <main className="flex min-h-dvh w-full items-center justify-center overflow-hidden px-6 py-16 text-center">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }} className="relative max-w-2xl">
        <p aria-hidden="true" className="select-none font-mono text-[9rem] font-semibold leading-[0.8] tabular-nums text-accent-100 md:text-[14rem]">404</p>
        <div className="relative -mt-6 md:-mt-12">
          <h1 className="text-3xl font-semibold leading-tight text-aurora-text md:text-5xl">{title}</h1>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-aurora-text-2 md:text-lg">{message}</p>
          <Link to="/" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-medium text-white transition-[background-color,transform] hover:bg-brand-hover active:scale-[0.97]">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
