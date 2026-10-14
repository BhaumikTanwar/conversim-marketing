import { storyblokEditable } from "@storyblok/react";
import { ArrowRight } from "lucide-react";

import { marketingHref } from "../../../lib/env";
import { normalizeLayout, sectionContainer, sectionSpacing } from "../sectionStyles";

interface ResultMetric {
  _uid?: string;
  value?: string;
  label?: string;
}

interface StoryblokAsset {
  filename?: string;
  alt?: string;
}

interface CustomerResultBlok {
  _uid?: string;
  _editable?: string;
  visible?: boolean;
  eyebrow?: string;
  heading?: string;
  description?: string;
  company_name?: string;
  company_logo?: StoryblokAsset | string;
  metrics?: ResultMetric[];
  cta_label?: string;
  cta_url?: string;
  open_in_new_tab?: boolean;
  section_id?: string;
  layout_variant?: string;
  background_style?: string;
}

function logoUrl(logo?: StoryblokAsset | string) {
  return typeof logo === "string" ? logo : logo?.filename;
}

export default function CustomerResult({ blok }: { blok?: CustomerResultBlok }) {
  if (blok?.visible === false || !blok?.heading?.trim()) return null;

  const logo = logoUrl(blok.company_logo);
  const metrics = (blok.metrics ?? []).filter((metric) => metric.value?.trim() || metric.label?.trim());
  const layout = normalizeLayout(blok.layout_variant);
  const background = normalizeLayout(blok.background_style, "white");
  const cardBackground =
    background === "brand"
      ? "border-blue-700 bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-600 text-white"
      : background === "soft"
        ? "border-slate-200 bg-slate-50 text-slate-950"
        : "border-slate-200 bg-white text-slate-950";
  const mutedText = background === "brand" ? "text-blue-50/85" : "text-slate-600";

  return (
    <section
      id={blok.section_id}
      {...(blok._uid ? storyblokEditable(blok as never) : {})}
      className={`${sectionSpacing(layout)} px-4 sm:px-6 lg:px-8`}
    >
      <div className={`mx-auto ${sectionContainer(layout)}`}>
        <article className={`overflow-hidden rounded-3xl border p-6 shadow-sm sm:p-8 lg:p-10 ${cardBackground}`}>
          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-12">
            <div>
              {blok.eyebrow?.trim() && (
                <p className={`mb-3 text-xs font-semibold uppercase tracking-[0.14em] ${background === "brand" ? "text-cyan-100" : "text-brand"}`}>
                  {blok.eyebrow}
                </p>
              )}
              <h2 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                {blok.heading}
              </h2>
              {blok.description?.trim() && (
                <p className={`mt-4 max-w-3xl text-base leading-7 ${mutedText}`}>{blok.description}</p>
              )}
            </div>

            {(logo || blok.company_name?.trim()) && (
              <div className={`flex min-h-32 items-center justify-center rounded-2xl border p-6 ${background === "brand" ? "border-white/20 bg-white" : "border-slate-200 bg-white shadow-sm"}`}>
                {logo ? (
                  <img
                    src={logo}
                    alt={typeof blok.company_logo === "object" ? blok.company_logo.alt || blok.company_name || "Customer logo" : blok.company_name || "Customer logo"}
                    className="max-h-16 max-w-full object-contain"
                  />
                ) : (
                  <span className="text-2xl font-semibold tracking-tight text-slate-950">{blok.company_name}</span>
                )}
              </div>
            )}
          </div>

          {(metrics.length > 0 || (blok.cta_label?.trim() && blok.cta_url?.trim())) && (
            <div className="mt-8 flex flex-col gap-6 border-t border-current/10 pt-7 lg:flex-row lg:items-end lg:justify-between">
              {metrics.length > 0 && (
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {metrics.map((metric) => (
                    <div
                      key={metric._uid || `${metric.value}-${metric.label}`}
                      className={`min-w-36 rounded-xl border px-5 py-4 ${background === "brand" ? "border-white/20 bg-white/10" : "border-slate-200 bg-white"}`}
                    >
                      {metric.value?.trim() && (
                        <p className={`text-2xl font-semibold tracking-tight ${background === "brand" ? "text-white" : "text-brand"}`}>
                          {metric.value}
                        </p>
                      )}
                      {metric.label?.trim() && <p className={`mt-1 text-xs ${mutedText}`}>{metric.label}</p>}
                    </div>
                  ))}
                </div>
              )}

              {blok.cta_label?.trim() && blok.cta_url?.trim() && (
                <a
                  href={marketingHref(blok.cta_url)}
                  target={blok.open_in_new_tab ? "_blank" : undefined}
                  rel={blok.open_in_new_tab ? "noopener noreferrer" : undefined}
                  className={`inline-flex w-fit items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition ${background === "brand" ? "bg-white text-blue-700 hover:bg-blue-50" : "bg-slate-950 text-white hover:bg-brand"}`}
                >
                  {blok.cta_label}
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
              )}
            </div>
          )}
        </article>
      </div>
    </section>
  );
}
