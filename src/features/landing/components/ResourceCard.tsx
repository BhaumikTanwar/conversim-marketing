import { storyblokEditable } from "@storyblok/react";
import { ArrowUpRight } from "lucide-react";

import { marketingHref } from "../../../lib/env";

interface StoryblokAsset {
  filename?: string;
  alt?: string;
}

export interface ResourceCardBlok {
  _uid?: string;
  _editable?: string;
  component?: string;
  visible?: boolean;
  image?: StoryblokAsset | string;
  category?: string;
  title?: string;
  description?: string;
  author_name?: string;
  author_image?: StoryblokAsset | string;
  date?: string;
  link_url?: string;
  link_label?: string;
  open_in_new_tab?: boolean;
}

function assetUrl(asset?: StoryblokAsset | string) {
  return typeof asset === "string" ? asset : asset?.filename;
}

function assetAlt(asset: StoryblokAsset | string | undefined, fallback: string) {
  return typeof asset === "object" ? asset.alt || fallback : fallback;
}

export default function ResourceCard({ blok }: { blok: ResourceCardBlok }) {
  const title = blok.title?.trim();
  if (blok.visible === false || !title) return null;

  const image = assetUrl(blok.image);
  const authorImage = assetUrl(blok.author_image);
  const content = (
    <>
      {image && (
        <div className="overflow-hidden bg-slate-100">
          <img
            src={image}
            alt={assetAlt(blok.image, title)}
            className="aspect-[16/9] w-full object-cover transition duration-500 group-hover:scale-[1.025]"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {blok.category?.trim() && (
          <span className="mb-3 w-fit rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-blue-700">
            {blok.category}
          </span>
        )}
        <h3 className="text-lg font-semibold leading-snug tracking-tight text-slate-950 sm:text-xl">
          {title}
        </h3>
        {blok.description?.trim() && (
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{blok.description}</p>
        )}

        {(blok.author_name?.trim() || blok.date?.trim()) && (
          <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
            {authorImage && (
              <img
                src={authorImage}
                alt={assetAlt(blok.author_image, blok.author_name || "Author")}
                className="size-8 rounded-full object-cover"
              />
            )}
            <div className="min-w-0 flex-1">
              {blok.author_name?.trim() && (
                <p className="truncate text-sm font-medium text-slate-800">{blok.author_name}</p>
              )}
              {blok.date?.trim() && <p className="text-xs text-slate-500">{blok.date}</p>}
            </div>
          </div>
        )}

        {blok.link_label?.trim() && (
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
            {blok.link_label}
            <ArrowUpRight size={15} aria-hidden="true" />
          </span>
        )}
      </div>
    </>
  );

  const cardClass =
    "group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_18px_45px_rgba(37,99,235,0.13)]";

  if (!blok.link_url?.trim()) {
    return (
      <article {...(blok._uid ? storyblokEditable(blok as never) : {})} className={cardClass}>
        {content}
      </article>
    );
  }

  return (
    <a
      {...(blok._uid ? storyblokEditable(blok as never) : {})}
      href={marketingHref(blok.link_url)}
      target={blok.open_in_new_tab ? "_blank" : undefined}
      rel={blok.open_in_new_tab ? "noopener noreferrer" : undefined}
      className={`${cardClass} focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200`}
    >
      {content}
    </a>
  );
}
