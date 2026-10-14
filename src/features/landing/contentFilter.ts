export const CONTENT_FILTER_EVENT = "conversim:content-filter";

export interface ContentFilterDetail {
  group: string;
  category: string;
  query: string;
}

export function filterGroup(value?: string) {
  return value?.trim().toLowerCase().replace(/[^a-z0-9_-]+/g, "-") || "resources";
}
