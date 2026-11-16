import type { ReactNode } from "react";
import { assetUrl } from "../../../lib/assets";

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


export default function HeroVideo({ value, children }: { value: HeroVideoValue; children?: ReactNode }) {
  const src = assetUrl(value.video) || value.video_url || "";
  const poster = assetUrl(value.video_poster);

  if (!src) return null;

  return (
    <>
      <video
        className="w-full h-full object-contain object-center"
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
