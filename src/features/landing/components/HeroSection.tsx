import { motion } from "framer-motion";
import { storyblokEditable } from "@storyblok/react";
import { EASE } from "../../../lib/animations";
import { scoreColor } from "../../../lib/scoreColor";
import { marketingHref } from "../../../lib/env";

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

interface HeroLink {
  url?: string;
  label?: string;
  linktype?: string;
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

  primary_cta?: HeroLink | string;
  secondary_cta?: HeroLink | string;

  score?: string | number;
  stats?: HeroStat[];
  criteria?: HeroCriterion[];

  video?: HeroAsset | string;

  live_label?: string;
  feedback_label?: string;
  score_label?: string;
  section_id?: string;
}

interface HeroSectionProps {
  blok?: HeroBlok;
}

export default function HeroSection({ blok }: HeroSectionProps) {
  const eyebrow = blok?.eyebrow || "AI conversation training";

  const heading = blok?.heading || "Practice Real";

  const highlightedHeading =
    blok?.highlighted_heading || "Conversations.";

  const italicHeading =
    blok?.italic_heading || "Get better, fast.";

  const description =
    blok?.description ||
    "Practice the conversations that matter — with AI that responds like a real person and scores you as you go.";

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

  const score = Number(blok?.score ?? 78);

  const stats: HeroStat[] = blok?.stats?.length
    ? blok.stats
    : [
        { value: "10k+", label: "Sessions run" },
        { value: "94%", label: "Report improvement" },
        { value: "50+", label: "Scenarios" },
      ];

  const criteria: HeroCriterion[] = blok?.criteria?.length
    ? blok.criteria
    : [
        { label: "Empathy", score: 86 },
        { label: "Objection handling", score: 72 },
        { label: "Pacing", score: 58 },
      ];

  const videoSrc =
    typeof blok?.video === "string"
      ? blok.video
      : blok?.video?.filename ||
        blok?.video?.url ||
        "/landing/conversimdemo2.webm";

  const liveLabel = blok?.live_label || "Live session";

  const feedbackLabel =
    blok?.feedback_label || "Good empathy shown";

  const scoreLabel = blok?.score_label || "Live score";

  return (
    <section
      {...(blok ? storyblokEditable(blok) : {})}
      id={blok?.section_id}
      className="relative flex items-center min-h-[100dvh] py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden aurora-bg"
    >
      <div
        className="pointer-events-none absolute inset-0 hero-dot-grid"
        aria-hidden
      />

      <div
        className="pointer-events-none absolute -left-48 top-1/3 -translate-y-1/2 h-[560px] w-[560px] rounded-full bg-brand opacity-[0.07] blur-[130px]"
        aria-hidden
      />

      <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto grid lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] gap-12 lg:gap-20 items-center w-full relative z-10">
        <div className="flex flex-col gap-7 md:gap-9">
          <motion.div
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
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.08,
              ease: EASE,
            }}
            className="text-5xl sm:text-6xl lg:text-7xl font-semibold text-slate-900 leading-[1.02]"
          >
            {heading}
            <br />

            <span className="text-brand">
              {highlightedHeading}
            </span>

            <br />

            <span className="font-normal italic text-slate-500">
              {italicHeading}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.16,
              ease: EASE,
            }}
            className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-[44ch]"
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.24,
              ease: EASE,
            }}
            className="flex flex-col gap-7"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              {hasPrimaryCta && (
                <a
                  href={marketingHref(primaryCta.url || "/login")}
                  className="bg-brand hover:bg-brand-hover text-white px-7 py-4 rounded-xl font-medium text-base transition-[background-color,transform] active:scale-[0.97] flex items-center justify-center gap-2.5 group shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_6px_24px_rgba(37,99,235,0.32)] ring-1 ring-brand-hover/30"
                >
                  {primaryCta.label || "Get started"}
                  <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </a>
              )}

              {hasSecondaryCta && (
                <a
                  href={secondaryCta.url || "#preview"}
                  className="inline-flex items-center justify-center gap-2 text-base font-medium text-slate-600 hover:text-brand transition-colors"
                >
                  <span className="material-symbols-outlined text-xl text-brand">
                    play_circle
                  </span>
                  {secondaryCta.label || "Watch demo"}
                </a>
              )}
            </div>

            <motion.div
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
                  className="flex flex-col gap-0.5 px-7 first:pl-0 last:pr-0"
                >
                  <span className="text-2xl font-semibold text-slate-900 tabular">
                    {s.value}
                  </span>

                  <span className="text-xs text-slate-500">
                    {s.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <motion.div
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
          className="hidden lg:block relative w-full aspect-[4/5] max-w-md xl:max-w-lg lg:ml-auto lg:mt-10"
        >
          <div className="w-full h-full bg-slate-900 rounded-[1.75rem] overflow-hidden shadow-[0_30px_60px_-20px_rgba(29,28,24,0.35)] ring-1 ring-slate-900/10">
            <video
              className="w-full h-full object-contain object-center scale-110"
              autoPlay
              preload="metadata"
              muted
              loop
              playsInline
              src={videoSrc}
            />
          </div>

          <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-slate-900/70 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-rose-400" />

            {liveLabel}
          </div>

          <motion.div
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
          </motion.div>

          <motion.div
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
              <span className="text-xs font-medium text-slate-500">
                {scoreLabel}
              </span>

              <span
                className="font-mono text-3xl font-semibold leading-none"
                style={{
                  color: scoreColor(score),
                }}
              >
                {score}
              </span>
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
