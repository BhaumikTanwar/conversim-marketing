const configuredAppUrl = import.meta.env.VITE_APP_URL || "https://app.conversim.co";

export const env = {
  storyblokToken: import.meta.env.VITE_STORYBLOK_DELIVERY_API_TOKEN,
  appUrl: configuredAppUrl.replace(/\/+$/, ""),
};

export function toAppUrl(path?: string) {
  if (!path) return `${env.appUrl}/login`;
  if (/^(https?:|mailto:|tel:)/i.test(path)) return path;
  return `${env.appUrl}/${path.replace(/^\/+/, "")}`;
}

export function marketingHref(path: string) {
  return /^\/(login|signup|dashboard|settings|billing|profile|attempts|workshops|call-presets|mcp-servers|personas|evaluations|try-demo|share|admin)(\/|$)/.test(path)
    ? toAppUrl(path)
    : path;
}
