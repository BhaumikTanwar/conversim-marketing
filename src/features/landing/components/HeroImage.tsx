export interface HeroImageValue {
  image?: { filename?: string; url?: string; alt?: string } | string;
  image_url?: string;
  alt_text?: string;
  object_fit?: string;
  background_style?: string;
  show_shadow?: boolean;
  show_border?: boolean;
}

function assetUrl(value: HeroImageValue["image"]): string {
  if (typeof value === "string") return value;
  return value?.filename || value?.url || "";
}

export default function HeroImage({ value }: { value: HeroImageValue }) {
  const src = assetUrl(value.image) || value.image_url || "";
  if (!src) return null;

  const fit = value.object_fit === "contain" ? "object-contain" : "object-cover";
  const background = value.background_style === "soft"
    ? "bg-slate-50"
    : value.background_style === "solid"
      ? "bg-slate-900"
      : "bg-transparent";
  const shadow = value.show_shadow === false ? "" : "shadow-[0_30px_60px_-20px_rgba(29,28,24,0.35)]";

  return (
    <img
      src={src}
      alt={value.alt_text || (typeof value.image === "object" ? value.image.alt : "") || ""}
      className={`w-full h-full ${fit} object-center ${background} ${shadow}`}
    />
  );
}
