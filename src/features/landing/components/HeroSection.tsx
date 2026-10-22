import { motion } from "framer-motion";
import { storyblokEditable } from "@storyblok/react";
import { EASE } from "../../../lib/animations";
import { scoreColor } from "../../../lib/scoreColor";
import StoryblokCta, { type StoryblokCtaValue } from "./StoryblokCta";
import HeroImage, { type HeroImageValue } from "./HeroImage";
import HeroVideo, { type HeroVideoValue } from "./HeroVideo";

interface HeroStat {
  label?: string;
  value?: string | number;
}

interface HeroCriterion {
  label?: string;
  score?: string | number;
}

interface HeroAsset {
  filename?: string;
  url?: string;
}

interface HeroLink extends StoryblokCtaValue { linktype?: string; }

interface HeroMediaBlock {
  component?: string;
  _uid?: string;
  video?: HeroVideoValue["video"];
  video_url?: string;
  video_poster?: HeroVideoValue["video_poster"];
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  show_controls?: boolean;
  live_label?: string;
  image?: HeroImageValue["image"];
  image_url?: string;
  alt_text?: string;
  object_fit?: string;
  background_style?: string;
  show_shadow?: boolean;
  show_border?: boolean;
}

interface HeroBlok {
  _uid?: string;
  _editable?: string;
  component?: string;

  eyebrow?: string;
  heading?: string;
  highlighted_heading?: string;
  italic_heading?: string;
  description?: string;
  layout_variant?: string;
  layout?: string;

  primary_cta?: HeroLink | string;
  secondary_cta?: HeroLink | string;

  score?: string | number;
  stats?: HeroStat[];
  criteria?: HeroCriterion[];

  video?: HeroAsset | string;
  video_poster?: HeroAsset | string;
  media?: HeroMediaBlock[] | HeroMediaBlock;

  live_label?: string;
  feedback_label?: string;
  score_label?: string;
  section_id?: string;
}

interface HeroSectionProps {
  blok?: HeroBlok;
}

export default function HeroSection({ blok }: HeroSectionProps) {
  const layout = (blok?.layout_variant || blok?.layout || "split").toLowerCase().replace(/[\s-]+/g, "_");
  const centered = layout === "centered" || layout === "center";
  const mediaLeft = layout === "media_left" || layout === "left_media" || layout === "image_left";
  const mediaRight = layout === "media_right" || layout === "right_media" || layout === "image_right";
  const eyebrow = blok ? blok.eyebrow?.trim() : "AI conversation training";
  const heading = blok ? blok.heading?.trim() : "Practice Real";
  const highlightedHeading = blok ? blok.highlighted_heading?.trim() : "Conversations.";

  const italicHeading =
    blok ? blok.italic_heading?.trim() : "Get better, fast.";

  const description = blok
    ? blok.description?.trim()
    : "Practice the conversations that matter — with AI that responds like a real person and scores you as you go.";

  const primaryCta = typeof blok?.primary_cta === "object"
    ? blok.primary_cta
    : { label: blok?.primary_cta, url: "/login" };
  const secondaryCta = typeof blok?.secondary_cta === "object"
    ? blok.secondary_cta
    : { label: blok?.secondary_cta, url: "#preview" };
  const hasPrimaryCta = Boolean(
    (typeof blok?.primary_cta === "string" && blok.primary_cta.trim()) ||
      (typeof blok?.primary_cta === "object" &&
        (blok.primary_cta.label || blok.primary_cta.url)) ||
      !blok,
  );
  const hasSecondaryCta = Boolean(
    (typeof blok?.secondary_cta === "string" && blok.secondary_cta.trim()) ||
      (typeof blok?.secondary_cta === "object" &&
        (blok.secondary_cta.label || blok.secondary_cta.url)) ||
      !blok,
  );

  const hasScore = blok ? blok.score !== undefined && blok.score !== "" : true;
  const score = Number(blok?.score ?? 78);

  const stats: HeroStat[] = blok
    ? (blok.stats ?? []).filter((stat) => stat.value || stat.label)
    : [
        { value: "10k+", label: "Sessions run" },
        { value: "94%", label: "Report improvement" },
        { value: "50+", label: "Scenarios" },
      ];

  const criteria: HeroCriterion[] = blok
    ? (blok.criteria ?? []).filter((criterion) => criterion.label || criterion.score !== undefined)
    : [
        { label: "Empathy", score: 86 },
        { label: "Objection handling", score: 72 },
        { label: "Pacing", score: 58 },
      ];

  const videoSrc = typeof blok?.video === "string"
    ? blok.video
    : blok?.video?.filename || blok?.video?.url || (!blok ? "/landing/conversimdemo2.webm" : "");
  const videoPoster = typeof blok?.video_poster === "string"
    ? blok.video_poster
    : blok?.video_poster?.filename || blok?.video_poster?.url;

  const mediaBlock = Array.isArray(blok?.media) ? blok.media.find(Boolean) : blok?.media;
  const mediaType = mediaBlock?.component;
  const hasImageMedia = mediaType === "hero_image" && Boolean(mediaBlock?.image || mediaBlock?.image_url);
  const hasVideoMedia = mediaType === "hero_video" && Boolean(mediaBlock?.video || mediaBlock?.video_url);
  const edgeToEdgeImage = hasImageMedia && mediaBlock?.object_fit === "edge_to_edge";
  const showVideo = hasVideoMedia || (!mediaBlock && Boolean(videoSrc));
  const showMedia = showVideo || hasImageMedia;
  const showStats = stats.length > 0;
  const compactTextHero = !showMedia && centered;

  const liveLabel = blok
    ? (mediaBlock?.live_label ?? blok.live_label)?.trim()
    : "Live session";
  const feedbackLabel = blok ? blok.feedback_label?.trim() : "Good empathy shown";
  const scoreLabel = blok ? blok.score_label?.trim() : "Live score";

  return (
    <section
      {...(blok ? storyblokEditable(blok) : {})}
      id={blok?.section_id}
      className={`relative flex items-center ${edgeToEdgeImage ? "min-h-[min(760px,calc(100dvh-5rem))] py-14 lg:py-0 lg:pr-0" : showVideo ? "min-h-[calc(100dvh-5rem)] py-14 md:py-20" : compactTextHero ? "py-10 md:py-14" : "py-14 md:py-18"} px-4 sm:px-6 lg:px-8 overflow-hidden aurora-bg`}
    >
      <div
        className="pointer-events-none absolute inset-0 hero-dot-grid"
        aria-hidden
      />

      <div
        className="pointer-events-none absolute -left-48 top-1/3 -translate-y-1/2 h-[560px] w-[560px] rounded-full bg-brand opacity-[0.07] blur-[130px]"
        aria-hidden
      />

      <div className={`${edgeToEdgeImage ? "max-w-none mx-0 lg:min-h-[min(760px,calc(100dvh-5rem))] lg:grid-cols-1 lg:gap-0" : "max-w-[1280px] 2xl:max-w-[1440px] mx-auto"} grid ${!showMedia || centered || edgeToEdgeImage ? "lg:grid-cols-1" : mediaRight ? "lg:grid-cols-2" : "lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]"} gap-12 lg:gap-20 items-center w-full relative z-10`}>
        <div className={`flex flex-col ${compactTextHero ? "gap-4 md:gap-5" : "gap-7 md:gap-9"} ${(!showVideo && !edgeToEdgeImage || centered) ? "items-center text-center" : ""} ${edgeToEdgeImage ? "relative z-10 lg:max-w-[52%]" : ""} ${mediaLeft ? "lg:order-2" : "lg:order-1"}`}>
          {eyebrow && <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: 0.04,
              ease: EASE,
            }}
            className="flex items-center gap-2 text-sm font-medium text-brand"
          >
            <span
              className="h-2 w-2 rounded-full bg-brand flex-shrink-0"
              aria-hidden
            />

            {eyebrow}
          </motion.div>}

          {(heading || highlightedHeading || italicHeading) && <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.08,
              ease: EASE,
            }}
            className={`${compactTextHero ? "text-3xl sm:text-4xl lg:text-5xl" : "text-4xl sm:text-5xl lg:text-6xl"} font-semibold text-slate-900 leading-[1.04] tracking-tight`}
          >
            {heading}
            {heading && highlightedHeading && <br />}
            {highlightedHeading && <span className="text-brand">{highlightedHeading}</span>}

            {italicHeading && (
              <>
                {(heading || highlightedHeading) && <br />}
                <span className="font-normal italic text-slate-500">
                  {italicHeading}
                </span>
              </>
            )}
          </motion.h1>}

          {description && <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.16,
              ease: EASE,
            }}
            className={`${compactTextHero ? "text-sm md:text-base" : "text-base md:text-lg"} text-slate-600 leading-relaxed max-w-[52ch]`}
          >
            {description}
          </motion.p>}

          {(hasPrimaryCta || hasSecondaryCta || showStats) && <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.24,
              ease: EASE,
            }}
            className={`flex flex-col ${compactTextHero ? "gap-5" : "gap-7"} ${(!showVideo && !edgeToEdgeImage) || centered ? "items-center" : ""}`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              {hasPrimaryCta && (
                <StoryblokCta
                  value={{
                    ...primaryCta,
                    label: primaryCta.label || (!blok ? "Get started" : ""),
                    url: primaryCta.url || (!blok ? "/login" : ""),
                  }}
                  className="px-7 py-4 text-base"
                />
              )}

              {hasSecondaryCta && (
                <StoryblokCta
                  value={{
                    ...secondaryCta,
                    label: secondaryCta.label || (!blok ? "Watch demo" : ""),
                    url: secondaryCta.url || (!blok ? "#preview" : ""),
                    style: secondaryCta.style || secondaryCta.variant || "secondary",
                  }}
                  className="px-7 py-4 text-base"
                />
              )}
            </div>

            {showStats && <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.38,
                ease: EASE,
              }}
              className="flex items-stretch divide-x divide-slate-200"
            >
              {stats.map((s, index) => (
                <div
                  key={`${s.label}-${index}`}
                  className="flex flex-col gap-0.5 px-4 sm:px-6 first:pl-0 last:pr-0"
                >
                  <span className="text-xl md:text-2xl font-semibold text-slate-900 tabular">
                    {s.value}
                  </span>

                  <span className="text-xs text-slate-500">
                    {s.label}
                  </span>
                </div>
              ))}
            </motion.div>}
          </motion.div>}
        </div>

        {showMedia && <motion.div
          initial={{
            opacity: 0,
            y: 32,
            scale: 0.97,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.7,
            delay: 0.2,
            ease: EASE,
          }}
          className={`relative w-full ${edgeToEdgeImage ? "mt-8 aspect-[4/3] lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:aspect-auto lg:w-[58%]" : `mt-8 aspect-[4/5] max-w-md lg:mt-10 xl:max-w-lg ${centered ? "lg:mx-auto lg:mt-0" : "lg:ml-auto lg:-translate-x-3"} ${mediaLeft ? "lg:order-1" : "lg:order-2"}`}`}
        >
          <div className={`relative h-full w-full overflow-hidden ${edgeToEdgeImage ? "rounded-none ring-0 lg:[mask-image:linear-gradient(to_right,transparent_0%,black_28%,black_100%)]" : `rounded-[1.75rem] ${hasImageMedia && mediaBlock?.show_border === false ? "ring-0" : "ring-1 ring-slate-900/10"}`} ${hasImageMedia ? "bg-transparent" : "bg-slate-900"}`}>
            {hasImageMedia ? (
              <HeroImage value={mediaBlock as HeroImageValue} />
            ) : (
              <HeroVideo
                value={{
                  ...(mediaBlock as HeroVideoValue | undefined),
                  video: mediaBlock?.video || videoSrc,
                  video_poster: mediaBlock?.video_poster || videoPoster,
                }}
              />
            )}
          </div>

          {showVideo && liveLabel && <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-slate-900/70 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-rose-400" />

            {liveLabel}
          </div>}

          {showVideo && feedbackLabel && <motion.div
            initial={{
              opacity: 0,
              x: 16,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.5,
              delay: 1.1,
              ease: EASE,
            }}
            className="absolute -right-5 top-14 flex items-center gap-2 rounded-xl border border-white/70 bg-white/90 px-3.5 py-2.5 text-xs font-medium text-slate-700 shadow-lg backdrop-blur-md"
          >
            <span className="material-symbols-outlined text-base text-emerald-600">
              check_circle
            </span>

            {feedbackLabel}
          </motion.div>}

          {showVideo && (hasScore || criteria.length > 0) && <motion.div
            initial={{
              opacity: 0,
              y: 16,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
              delay: 0.9,
              ease: EASE,
            }}
            className="absolute -left-10 bottom-10 w-60 rounded-2xl border border-white/70 bg-white/90 p-4 shadow-xl backdrop-blur-md"
          >
            <div className="mb-3 flex items-end justify-between">
              {scoreLabel && <span className="text-xs font-medium text-slate-500">
                {scoreLabel}
              </span>}

              {hasScore && <span
                className="font-mono text-3xl font-semibold leading-none"
                style={{
                  color: scoreColor(score),
                }}
              >
                {score}
              </span>}
            </div>

            <ul className="space-y-2.5">
              {criteria.map((c, i) => {
                const criterionScore = Number(c.score ?? 0);

                return (
                  <li key={`${c.label}-${i}`}>
                    <div className="mb-1 flex justify-between text-[11px] text-slate-600">
                      <span>{c.label}</span>

                      <span className="font-mono">
                        {criterionScore}
                      </span>
                    </div>

                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${criterionScore}%`,
                        }}
                        transition={{
                          duration: 0.9,
                          delay: 1.2 + i * 0.12,
                          ease: EASE,
                        }}
                        className="h-full rounded-full"
                        style={{
                          background:
                            scoreColor(criterionScore),
                        }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </motion.div>}
        </motion.div>}
      </div>
    </section>
  );
}
