/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { storyblokEditable } from "@storyblok/react";
import { EASE } from "../../../lib/animations";
import LazyVideo from "../../../shared/components/LazyVideo";
import { sectionContainer, sectionHeadingClass, sectionSpacing } from "../sectionStyles";

interface PreviewFeedbackItem {
  _uid?: string;
  _editable?: string;
  component?: string;
  icon?: string;
  text?: string;
  tone?: "success" | "warning" | string;
}

interface PreviewBlok {
  _uid?: string;
  _editable?: string;
  component?: string;

  layout_variant?: "default" | "centered" | "wide" | "compact" | string;

  heading?: string;
  video_url?: string;
  poster_image?: { filename?: string; url?: string } | string;
  browser_url?: string;
  status_label?: string;
  recording_label?: string;

  feedback_heading?: string;
  feedback_items?: PreviewFeedbackItem[];

  goals_heading?: string;
  progress_label?: string;
  progress_value?: string | number;
  section_id?: string;
}

interface PreviewSectionProps {
  blok?: PreviewBlok;
}

const defaultFeedbackItems: PreviewFeedbackItem[] = [
  {
    icon: "check_circle",
    text: "Good empathy shown.",
    tone: "success",
  },
  {
    icon: "warning",
    text: "Pacing slightly fast.",
    tone: "warning",
  },
];

export default function PreviewSection({ blok }: PreviewSectionProps) {
  const layout = (blok?.layout_variant || "default").toLowerCase().replace(/[\s-]+/g, "_");
  const compact = layout === "compact";
  const centered = layout === "centered" || layout === "center";
  const heading = blok ? blok.heading?.trim() : "See what a session looks like from the inside.";

  const videoSrc = blok ? blok.video_url?.trim() : "/landing/conversimdemo1.webm";
  if (!videoSrc) return null;
  const posterImage = typeof blok?.poster_image === "string"
    ? blok.poster_image
    : blok?.poster_image?.filename || blok?.poster_image?.url;

  const browserUrl = blok ? blok.browser_url?.trim() : "conversim.co";

  const statusLabel = blok ? blok.status_label?.trim() : "Listening";

  const recordingLabel = blok ? blok.recording_label?.trim() : "Recording";

  const feedbackHeading = blok ? blok.feedback_heading?.trim() : "Live Feedback";

  const feedbackItems = blok
    ? (blok.feedback_items ?? []).filter((item) => item.text || item.icon)
    : defaultFeedbackItems;

  const goalsHeading = blok ? blok.goals_heading?.trim() : "Scenario Goals";

  const progressLabel = blok ? blok.progress_label?.trim() : "Progress";

  const hasProgress = blok ? blok.progress_value !== undefined && blok.progress_value !== "" : true;
  const progressValue = Number(blok?.progress_value ?? 66);

  const progressWidth = `${Math.min(Math.max(progressValue, 0), 100)}%`;

  return (
    <section
      {...(blok ? storyblokEditable(blok as any) : {})}
      className={`${sectionSpacing(layout)} px-4 sm:px-6 lg:px-8`}
      id={blok?.section_id || "preview"}
    >
      <div className={`${sectionContainer(layout)} mx-auto`}>
        {heading && <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: EASE }}
          className={`${compact ? "mb-7" : "mb-10 md:mb-12"} flex flex-col md:flex-row justify-between items-end gap-6 ${centered ? "items-center text-center" : ""}`}
        >
          <div>
            <h2 className={`${sectionHeadingClass} text-slate-900 max-w-2xl`}>
              {heading}
            </h2>
          </div>
        </motion.div>}

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          className="bg-white border border-slate-200/90 rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(29,28,24,0.08)]"
        >
          <div className="bg-slate-100/90 px-5 py-3.5 flex items-center justify-between border-b border-slate-200">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-slate-300" />
              <div className="w-3 h-3 rounded-full bg-slate-300" />
              <div className="w-3 h-3 rounded-full bg-slate-300" />
            </div>

            {browserUrl && <div className="font-mono text-xs text-slate-600 border border-slate-200 bg-white px-4 py-1 rounded-lg shadow-2xs">
              {browserUrl}
            </div>}

            <div className="w-16" />
          </div>

          <div className="p-4 sm:p-6 md:p-8 grid md:grid-cols-3 gap-5 bg-slate-50">
            <div className={`${feedbackHeading || feedbackItems.length || goalsHeading || hasProgress ? "md:col-span-2" : "md:col-span-3"} aspect-video bg-white border border-slate-200/90 rounded-xl relative overflow-hidden flex flex-col shadow-xs`}>
              <div className="flex-grow bg-slate-900 overflow-hidden rounded-t-xl flex items-center justify-center">
                <LazyVideo
                  className="w-full h-full object-contain"
                  src={videoSrc}
                  poster={posterImage || undefined}
                />
              </div>

              {(statusLabel || recordingLabel) && <div className="border-t border-slate-200 bg-white px-4 py-3 flex justify-between items-center">
                {statusLabel && <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 border border-indigo-200 rounded-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
                  <span className="text-xs font-semibold text-indigo-700">
                    {statusLabel}
                  </span>
                </div>}

                {recordingLabel && <span className="text-xs text-rose-600 font-medium">
                  ● {recordingLabel}
                </span>}
              </div>}
            </div>

            {(feedbackHeading || feedbackItems.length > 0 || goalsHeading || hasProgress) && <div className="flex flex-col gap-4">
              {(feedbackHeading || feedbackItems.length > 0) && <div className="bg-white border border-slate-200/90 rounded-xl p-5 flex-1 shadow-xs">
                {feedbackHeading && <h4 className="text-sm font-semibold text-slate-900 mb-4 pb-3 border-b border-slate-100">
                  {feedbackHeading}
                </h4>}

                <ul className="space-y-3">
                  {feedbackItems.map((item, index) => {
                    const tone =
                      item.tone === "warning"
                        ? "text-amber-500"
                        : "text-emerald-600";

                    return (
                      <li
                        key={item._uid || `${item.text}-${index}`}
                        {...(item._uid
                          ? storyblokEditable(item as any)
                          : {})}
                        className="flex items-start gap-2.5 text-xs"
                      >
                        <span
                          className={`material-symbols-outlined ${tone} text-base mt-0.5`}
                        >
                          {item.icon || "check_circle"}
                        </span>

                        <span className="text-slate-600 leading-relaxed">
                          {item.text}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>}

              {(goalsHeading || hasProgress) && <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs">
                {goalsHeading && <h4 className="text-sm font-semibold text-slate-900 mb-4 pb-3 border-b border-slate-100">
                  {goalsHeading}
                </h4>}

                {hasProgress && <div>
                  <div className="flex justify-between items-end mb-2">
                    {progressLabel && <span className="text-xs text-slate-500">
                      {progressLabel}
                    </span>}

                    <span className="font-mono text-xs font-semibold text-indigo-600">
                      {progressValue}%
                    </span>
                  </div>

                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: progressWidth }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1.2,
                        delay: 0.5,
                        ease: EASE,
                      }}
                      className="h-full bg-indigo-600 rounded-full"
                    />
                  </div>
                </div>}
              </div>}
            </div>}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
