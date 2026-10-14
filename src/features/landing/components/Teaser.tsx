import { storyblokEditable } from "@storyblok/react";
import { marketingHref } from "../../../lib/env";

interface TeaserBlok {
  _uid?: string;
  _editable?: string;
  component?: string;
  visible?: boolean;
  headline?: string;
  heading?: string;
  description?: string;
  cta_label?: string;
  cta_url?: string;
  layout_variant?: string;
  background_style?: string;
  icon?: string;
  section_id?: string;
}

export default function Teaser({ blok }: { blok?: TeaserBlok }) {
  if (blok?.visible === false) return null;
  const heading = blok?.heading || blok?.headline;
  if (!heading) return null;
  const background = (blok.background_style || "soft").toLowerCase();
  const layout = (blok.layout_variant || "wide").toLowerCase();
  const centered = layout === "centered";
  const compact = layout === "compact";
  const backgroundClass = background === "gradient"
    ? "bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-600 text-white"
    : background === "solid"
      ? "bg-slate-900 text-white"
      : "border border-blue-200 bg-white text-slate-950";
  const supportingClass = background === "soft" ? "text-slate-600" : "text-blue-50";

  return (
    <section id={blok.section_id} {...(blok._uid ? storyblokEditable(blok as never) : {})} className="px-4 py-10 sm:px-6 md:py-14 lg:px-8">
      <div className={`mx-auto ${compact ? "max-w-4xl" : "max-w-6xl"} rounded-2xl px-6 py-7 shadow-md md:px-8 md:py-8 ${backgroundClass} ${centered ? "text-center" : ""}`}>
        <div className={`${centered ? "" : "md:flex md:items-center md:justify-between md:gap-8"}`}>
          <div className={`${centered ? "mx-auto" : ""} max-w-3xl`}>
            <div className={`flex items-start gap-4 ${centered ? "justify-center" : ""}`}>
              {blok.icon && <span className="material-symbols-outlined mt-0.5 text-2xl text-blue-500" aria-hidden="true">{blok.icon}</span>}
              <div>
                <h2 className="text-xl font-semibold leading-tight tracking-tight md:text-2xl">{heading}</h2>
                {blok.description && <p className={`mt-2 text-sm leading-relaxed md:text-base ${supportingClass}`}>{blok.description}</p>}
              </div>
            </div>
          </div>
          {blok.cta_url && blok.cta_label && <a href={marketingHref(blok.cta_url)} className={`${centered ? "mt-6" : "mt-6 md:mt-0"} inline-flex shrink-0 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700`}>{blok.cta_label}<span className="ml-2" aria-hidden="true">→</span></a>}
        </div>
      </div>
    </section>
  );
}
