import { storyblokEditable } from "@storyblok/react";
import Feature, { type FeatureBlok } from "./Feature";
import { normalizeLayout, sectionContainer, sectionHeadingClass, sectionSpacing } from "../sectionStyles";

interface GridBlok {
  _uid?: string;
  _editable?: string;
  component?: string;
  visible?: boolean;
  heading?: string;
  intro?: string;
  section_id?: string;
  layout_variant?: string;
  columns_count?: string | number;
  background_style?: string;
  columns?: FeatureBlok[];
}

export default function Grid({ blok }: { blok?: GridBlok }) {
  if (blok?.visible === false) return null;
  const columns = Array.isArray(blok?.columns) ? blok.columns : [];
  const layout = normalizeLayout(blok?.layout_variant);
  const columnCount = String(blok?.columns_count || "3");
  const columnsClass = columnCount === "2" ? "lg:grid-cols-2" : columnCount === "4" ? "lg:grid-cols-4" : "lg:grid-cols-3";
  const background = normalizeLayout(blok?.background_style, "soft");
  const backgroundClass = background === "white" ? "bg-white" : background === "transparent" ? "bg-transparent" : "bg-slate-50";

  return (
    <section id={blok?.section_id} {...(blok?._uid ? storyblokEditable(blok as never) : {})} className={`${backgroundClass} ${sectionSpacing(layout)} px-4 sm:px-6 lg:px-8`}>
      <div className={`mx-auto ${sectionContainer(layout)}`}>
        {(blok?.heading || blok?.intro) && (
          <div className={`mb-8 md:mb-10 max-w-2xl ${layout === "centered" ? "mx-auto text-center" : ""}`}>
            {blok.heading && <h2 className={`${sectionHeadingClass} text-slate-950`}>{blok.heading}</h2>}
            {blok.intro && <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">{blok.intro}</p>}
          </div>
        )}
        <div className={`grid gap-4 sm:grid-cols-2 ${columnsClass}`}>
          {columns.map((column) => {
            if (column.component !== "feature" || column.visible === false || !(column.title || column.name)) return null;
            const variant = (column.layout_variant || "standard").toLowerCase().replace(/[\s_]+/g, "-");
            const span = variant === "wide" ? "lg:col-span-full" : variant.startsWith("media-") ? "lg:col-span-2" : "";
            return <div key={column._uid} className={span}><Feature blok={column} /></div>;
          })}
        </div>
      </div>
    </section>
  );
}
