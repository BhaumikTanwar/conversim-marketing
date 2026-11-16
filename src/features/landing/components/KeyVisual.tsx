import { motion } from "framer-motion";
import { storyblokEditable } from "@storyblok/react";
import { EASE } from "../../../lib/animations";
import { assetUrl } from "../../../lib/assets";

interface Asset { filename?: string; alt?: string; }

export interface KeyVisualBlok {
  _uid?: string;
  visible?: boolean;
  image?: Asset | string;
  caption?: string;
  section_id?: string;
}


export default function KeyVisual({ blok }: { blok?: KeyVisualBlok }) {
  if (blok?.visible === false) return null;
  const image = assetUrl(blok?.image);
  if (!image) return null;

  return (
    <section id={blok?.section_id} {...(blok?._uid ? storyblokEditable(blok as never) : {})} className="relative overflow-hidden bg-slate-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-brand/8 blur-[110px]" aria-hidden />

      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: EASE }}
        className="relative mx-auto max-w-5xl"
      >
        <div className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-[0_24px_70px_-20px_rgba(29,28,24,0.18)]">
          <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-100/80 px-5 py-3.5">
            <span className="h-3 w-3 rounded-full bg-slate-300" aria-hidden />
            <span className="h-3 w-3 rounded-full bg-slate-300" aria-hidden />
            <span className="h-3 w-3 rounded-full bg-slate-300" aria-hidden />
          </div>
          <div className="flex aspect-[16/9] items-center justify-center bg-white sm:aspect-[21/10]">
            <img
              src={image}
              alt={typeof blok?.image === "object" ? blok.image.alt || blok?.caption || "" : blok?.caption || ""}
              className="h-full w-full object-contain p-8 sm:p-12"
            />
          </div>
        </div>
        {blok?.caption?.trim() && <p className="mt-6 text-center text-sm text-slate-500">{blok.caption}</p>}
      </motion.div>
    </section>
  );
}
