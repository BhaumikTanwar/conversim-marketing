/** Storyblok asset fields arrive as `{ filename }` objects; some fields hold a plain URL string instead. */
export function assetUrl(asset?: { filename?: string; url?: string } | string): string {
  return typeof asset === "string" ? asset : asset?.filename || asset?.url || "";
}
