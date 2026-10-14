import { storyblokEditable } from "@storyblok/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { CONTENT_FILTER_EVENT, filterGroup, type ContentFilterDetail } from "../contentFilter";
import { normalizeLayout, sectionContainer, sectionHeadingClass, sectionSpacing } from "../sectionStyles";
import ResourceCard, { type ResourceCardBlok } from "./ResourceCard";

interface ResourceGridBlok {
  _uid?: string;
  _editable?: string;
  visible?: boolean;
  heading?: string;
  intro?: string;
  section_id?: string;
  layout_variant?: string;
  columns_count?: string | number;
  background_style?: string;
  filter_group?: string;
  empty_message?: string;
  cards?: ResourceCardBlok[];
}

export default function ResourceGrid({ blok }: { blok?: ResourceGridBlok }) {
  const [filter, setFilter] = useState({ category: "", query: "" });
  const group = filterGroup(blok?.filter_group);

  useEffect(() => {
    function onFilter(event: Event) {
      const detail = (event as CustomEvent<ContentFilterDetail>).detail;
      if (detail?.group === group) {
        setFilter({ category: detail.category || "", query: detail.query || "" });
      }
    }

    window.addEventListener(CONTENT_FILTER_EVENT, onFilter);
    return () => window.removeEventListener(CONTENT_FILTER_EVENT, onFilter);
  }, [group]);

  if (blok?.visible === false) return null;

  const cards = (blok?.cards ?? []).filter((card) => card.visible !== false && card.title?.trim());
  const query = filter.query.trim().toLowerCase();
  const filteredCards = cards.filter((card) => {
    const categoryMatches =
      !filter.category || card.category?.trim().toLowerCase() === filter.category.trim().toLowerCase();
    const searchText = [card.title, card.description, card.category, card.author_name]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return categoryMatches && (!query || searchText.includes(query));
  });

  const layout = normalizeLayout(blok?.layout_variant);
  const columnCount = String(blok?.columns_count || "3");
  const columnsClass =
    columnCount === "2" ? "lg:grid-cols-2" : columnCount === "4" ? "lg:grid-cols-4" : "lg:grid-cols-3";
  const background = normalizeLayout(blok?.background_style, "white");
  const backgroundClass =
    background === "soft" ? "bg-slate-50" : background === "transparent" ? "bg-transparent" : "bg-white";

  return (
    <section
      id={blok?.section_id}
      {...(blok?._uid ? storyblokEditable(blok as never) : {})}
      className={`${backgroundClass} ${sectionSpacing(layout)} px-4 sm:px-6 lg:px-8`}
    >
      <div className={`mx-auto ${sectionContainer(layout)}`}>
        {(blok?.heading || blok?.intro) && (
          <div className={`mb-8 max-w-2xl md:mb-10 ${layout === "centered" ? "mx-auto text-center" : ""}`}>
            {blok.heading && <h2 className={`${sectionHeadingClass} text-slate-950`}>{blok.heading}</h2>}
            {blok.intro && <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">{blok.intro}</p>}
          </div>
        )}

        {filteredCards.length > 0 ? (
          <motion.div layout className={`grid gap-5 sm:grid-cols-2 md:gap-6 ${columnsClass}`}>
            <AnimatePresence mode="popLayout">
              {filteredCards.map((card) => (
                <motion.div
                  layout
                  key={card._uid || card.title}
                  initial={{ opacity: 0, y: 14, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.24 }}
                >
                  <ResourceCard blok={card} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center text-sm text-slate-500">
            {blok?.empty_message?.trim() || "No matching content found."}
          </div>
        )}
      </div>
    </section>
  );
}
