import fs from "node:fs";
import path from "node:path";
import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { PAGE_META, DEFAULT_SITE, fillSeo } from "./src/seo.ts";

function seoPages(site: string): Plugin {
  let template = "";
  let outDir = "";

  return {
    name: "marketing-seo-pages",
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
    },
    transformIndexHtml: {
      order: "post",
      handler(html) {
        template = html;
        return fillSeo(html, "/", site);
      },
    },
    closeBundle() {
      if (!template) return;
      const routes = Object.keys(PAGE_META);
      for (const route of routes) {
        if (route !== "/") {
          fs.writeFileSync(path.join(outDir, `${route.slice(1)}.html`), fillSeo(template, route, site));
        }
      }
      const indexableRoutes = routes.filter((route) => route !== "/privacy" && route !== "/terms");
      const sitemapUrls = indexableRoutes.map((route) => `  <url><loc>${site}${route}</loc></url>`).join("\n");
      fs.writeFileSync(
        path.join(outDir, "sitemap.xml"),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls}\n</urlset>\n`,
      );
      fs.writeFileSync(
        path.join(outDir, "robots.txt"),
        `User-agent: *\nAllow: /\nDisallow: /login\nDisallow: /dashboard\nDisallow: /admin\n\nSitemap: ${site}/sitemap.xml\n`,
      );
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const site = (env.VITE_SITE_URL || DEFAULT_SITE).replace(/\/+$/, "");

  return {
    plugins: [react(), tailwindcss(), seoPages(site)],
    resolve: { alias: { "@": path.resolve(import.meta.dirname, "./src") } },
    build: { chunkSizeWarningLimit: 600 },
  };
});
