import { storyblokEditable } from "@storyblok/react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

import { CONTENT_FILTER_EVENT, filterGroup } from "../contentFilter";

interface FilterOption {
  _uid?: string;
  label?: string;
}

interface ContentFilterBarBlok {
  _uid?: string;
  _editable?: string;
  visible?: boolean;
  all_label?: string;
  categories?: FilterOption[];
  show_search?: boolean;
  search_placeholder?: string;
  filter_group?: string;
}

export default function ContentFilterBar({ blok }: { blok?: ContentFilterBarBlok }) {
  const allLabel = blok?.all_label?.trim() || "All";
  const categories = (blok?.categories ?? []).filter((item) => item.label?.trim());
  const [category, setCategory] = useState(allLabel);
  const [query, setQuery] = useState("");
  const group = filterGroup(blok?.filter_group);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent(CONTENT_FILTER_EVENT, {
        detail: { group, category: category === allLabel ? "" : category, query },
      }),
    );
  }, [allLabel, category, group, query]);

  if (blok?.visible === false) return null;

  return (
    <section
      {...(blok?._uid ? storyblokEditable(blok as never) : {})}
      className="border-y border-slate-200/80 bg-white px-4 py-4 sm:px-6 lg:px-8"
      aria-label="Content filters"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0" role="group" aria-label="Filter by category">
          {[{ _uid: "all", label: allLabel }, ...categories].map((item) => {
            const label = item.label!.trim();
            const active = category === label;
            return (
              <button
                key={item._uid || label}
                type="button"
                onClick={() => setCategory(label)}
                className={`relative shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active ? "text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-950"
                }`}
                aria-pressed={active}
              >
                {active && (
                  <motion.span
                    layoutId={`content-filter-${group}`}
                    className="absolute inset-0 rounded-full bg-brand shadow-[0_6px_18px_rgba(37,99,235,0.28)]"
                    transition={{ type: "spring", stiffness: 430, damping: 34 }}
                  />
                )}
                <span className="relative z-10">{label}</span>
              </button>
            );
          })}
        </div>

        {blok?.show_search !== false && (
          <label className="relative block w-full md:w-64">
            <span className="sr-only">Search content</span>
            <Search
              size={16}
              aria-hidden="true"
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={blok?.search_placeholder?.trim() || "Search"}
              className="h-10 w-full rounded-full border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
          </label>
        )}
      </div>
    </section>
  );
}
