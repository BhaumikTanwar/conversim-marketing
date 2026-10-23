# Conversim Marketing Website

Standalone React, TypeScript, and Vite project for the public Conversim website. This repository is independent of the Conversim product application and is not an npm workspace package.

## Included

- Storyblok-managed homepage (`conversim-home-cms`) and catch-all CMS pagess.
- Reusable Storyblok sections: Hero, Use Cases, How It Works, Preview, Pricing, FAQ, and Waitlist, plus the shared Header and Footer.
- Existing Sales Roleplay, Healthcare, Pharma, Insurance, Privacy, and Terms pages.
- Route-specific HTML metadata for the fixed marketing routes, sitemap generation, and SPA rewrites for dynamic Storyblok slugs.
- Login, signup, and product-area links routed to the separately hosted app through `VITE_APP_URL`.

## Local setup

Use Node.js 22.19 or newer, then:

```sh
npm install
```

Copy `.env.example` to `.env.local` and set:

- `VITE_STORYBLOK_DELIVERY_API_TOKEN`: Storyblok Delivery API token for the EU space. Do not use a Management API token.
- `VITE_APP_URL`: the deployed Conversim product-app origin. It defaults to `https://app.conversim.co` in code until hosting is finalized.
- `VITE_SITE_URL`: public marketing origin used for canonical tags and the sitemap.

Keep `.env.local` private; it is ignored by Git. Never add the Storyblok Management API token to this project.

Run and build:

```sh
npm run dev
npm run lint
npm run build
npm run preview
```

Local development requests draft Storyblok stories. Production builds request published stories. The homepage story slug remains `conversim-home-cms`; other public CMS pages resolve from their URL slug.

## Hosting

`firebase.json` is configured to serve `dist`, generate clean URLs, and rewrite unknown paths to the SPA so published Storyblok slugs can load directly. It deliberately does not include a `.firebaserc` project binding. Before deployment, select/create the separate Firebase Hosting project for the marketing website, configure the three Vite environment values in the build environment, and build this repository independently from the product app.

The checked-in sitemap and prerendered metadata cover the fixed routes listed in `src/seo.ts`. CMS pages receive SEO metadata in the browser from their Storyblok fields; adding every published CMS page to the sitemap and pre-rendering its head tags at build time is a follow-up production SEO improvement.

The waitlist and campaign forms currently preserve the existing landing-page behavior and show a client-side success state; they do not submit leads to a backend. Connect them to the approved lead-capture service before relying on them in production.

LinkedIn company-page posts can be synced to Storyblok as reviewable blog drafts using the scheduled GitHub Actions workflow. See [LINKEDIN-SYNC.md](./LINKEDIN-SYNC.md) for the Storyblok schema and repository secret setup.
