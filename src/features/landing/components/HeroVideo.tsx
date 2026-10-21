import type { ReactNode } from "react";

export interface HeroVideoValue {
  video?: { filename?: string; url?: string } | string;
  video_url?: string;
  video_poster?: { filename?: string; url?: string } | string;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  show_controls?: boolean;
  live_label?: string;
}

function assetUrl(value: HeroVideoValue["video"] | HeroVideoValue["video_poster"]): string {
  if (typeof value === "string") return value;
  return value?.filename || value?.url || "";
}

export default function HeroVideo({ value, children }: { value: HeroVideoValue; children?: ReactNode }) {
  const src = assetUrl(value.video) || value.video_url || "";
  const poster = assetUrl(value.video_poster);

  if (!src) return null;

  return (
    <>
      <video
        className="w-full h-full object-contain object-center scale-110"
        autoPlay={value.autoplay !== false}
        preload="metadata"
        muted={value.muted !== false}
        loop={value.loop !== false}
        playsInline
        controls={value.show_controls === true}
        src={src}
        poster={poster || undefined}
      />
      {children}
    </>
  );
}
