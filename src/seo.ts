export const DEFAULT_SITE = "https://conversim.co";
export type PageMeta = { title: string; description: string };

export const PAGE_META: Record<string, PageMeta> = {
  "/": {
    title: "Conversim | AI Roleplay Voice Training for Sales & Customer Conversations",
    description: "Practice high-stakes conversations with realistic AI voice personas and get rubric-scored feedback after every call. Roleplay training for sales, healthcare, pharma and insurance teams.",
  },
  "/sales-roleplay": {
    title: "AI Sales Roleplay Training | Conversim",
    description: "Sharpen discovery, objection handling and closing with AI sales roleplay. Reps practise realistic voice calls with AI buyers and get scored feedback instantly.",
  },
  "/healthcare": {
    title: "Healthcare Communication Training with AI Simulations | Conversim",
    description: "Practise realistic patient and clinical conversations with AI-powered voice simulations, instant feedback and repeatable training for healthcare teams.",
  },
  "/pharma": {
    title: "AI Roleplay for Pharma Sales Reps | Conversim",
    description: "Train medical reps against AI doctors that push back. Unlimited HCP call rehearsal with AI personas built from real objection patterns, scored after every call.",
  },
  "/insurance": {
    title: "AI Roleplay for Insurance Sales Agents | Conversim",
    description: "Train insurance agents against AI customers that push back. Unlimited rehearsal with AI personas built from real objection patterns before facing real prospects.",
  },
  "/privacy": { title: "Privacy Policy | Conversim", description: "How Conversim collects, uses and protects your data." },
  "/terms": { title: "Terms of Service | Conversim", description: "The terms governing your use of the service." },
};

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

export function fillSeo(html: string, route: string, site = DEFAULT_SITE) {
  const meta = PAGE_META[route] ?? PAGE_META["/"];
  const url = `${site}${route}`;
  return html
    .replaceAll("{{seo:title}}", escapeHtml(meta.title))
    .replaceAll("{{seo:description}}", escapeHtml(meta.description))
    .replaceAll("{{seo:url}}", escapeHtml(url))
    .replaceAll("{{seo:image}}", escapeHtml(`${site}/favicon.png`));
}
