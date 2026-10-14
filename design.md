# Conversim Marketing Website Design System

This document is the source of truth for the Conversim marketing website's visual system, reusable React components, and Storyblok editing model.

It describes what editors can build, how Storyblok content maps to React, and the rules that keep pages reusable and consistent. The React implementation remains authoritative when behavior and CMS labels disagree.

## 1. System overview

The website uses:

- React, TypeScript, and Vite for rendering.
- Storyblok for page content, composition, ordering, and SEO fields.
- Tailwind CSS for styling.
- Framer Motion for progressive reveal animations.
- A catch-all route that resolves new Storyblok story slugs automatically.

Marketing editors can create any number of pages without adding a React page file. React only needs to change when a genuinely new section structure or interaction is required.

### Page flow

1. An editor creates a Storyblok story using the **Website page** content type.
2. The story slug becomes its URL, for example `ai-sales-training` becomes `/ai-sales-training`.
3. The editor adds a Header, reusable page sections, and a Footer.
4. React fetches the story for the requested slug.
5. Blocks are normalized for backwards compatibility and rendered in Storyblok order.
6. Draft content is used locally; published content is used in production.
7. Unknown or empty stories render the website's 404 page.

## 2. Architecture principles

### Content controls visibility

Optional content controls its own visibility:

- A video is displayed when a video URL is supplied.
- Statistics are displayed when statistic items exist.
- A button is displayed only when both its label and destination exist.
- Images, icons, descriptions, metadata, and supporting panels disappear cleanly when empty.
- Empty nested items are ignored without leaving blank space.

Do not add a separate “Show” switch for optional content unless hiding populated content is a real editorial requirement.

### Layout is separate from content

Layout options change presentation, spacing, alignment, or emphasis. They do not decide which fields are available.

Avoid types such as “Blog card”, “Product card”, or “Team card” when the structure is identical. The general **Content card** should be used instead.

### Reusable actions

The **Button or link** widget is shared by Hero, Pricing/contact, and Call-to-action sections. Its label, destination, optional icon, and style behave consistently in every supported section.

### Compatibility

The renderer still recognizes a small number of older technical field names so existing content does not break. New content should use the labels shown in Storyblok. Obsolete Hero visibility toggles and the Content Card category selector have been removed.

## 3. Visual identity

### Brand palette

| Purpose | Value |
| --- | --- |
| Primary blue | `#2563eb` |
| Cyan highlight | `#06b6d4` |
| Indigo hover | `#4338ca` |
| Brand gradient | Indigo `#4f46e5` → blue `#2563eb` → cyan `#0891b2` |
| Page background | `#f8fafc` |
| Main text | `#0f172a` |
| Supporting text | `#475569` |
| Muted text | `#64748b` |
| Border | Slate with approximately 8% opacity |
| Success | `#2f9e6e` |
| Warning | `#d99a2b` |
| Danger | `#d64545` |

### Typography

- Primary family: Geist with system sans-serif fallback.
- Monospace family: Geist Mono.
- Section headings: responsive 30–48 px, semibold, tight line height and tracking.
- Paragraphs use comfortable line height and slate supporting colors.
- Headings use balanced wrapping; paragraphs use pretty wrapping.

### Surfaces and depth

- Cards use white surfaces, slate borders, rounded corners, and blue-tinted shadows.
- Primary promotional surfaces may use the indigo–blue–cyan brand gradient.
- Backgrounds remain light and cool to keep content readable.
- Hover movement is subtle and must not move layout around other elements.

### Responsive widths and spacing

| Layout | Container | Vertical spacing |
| --- | --- | --- |
| Default / Centered | `max-w-6xl` | 64–96 px |
| Wide | `max-w-7xl` | 64–96 px |
| Compact | `max-w-5xl` | 48–64 px |

The fixed Header is 64 px on small screens and 80 px on medium screens and above. Page content includes matching top padding so the Header does not cover the Hero.

## 4. Website page schema

**Storyblok component:** `page`  
**Editor name:** Website page

| Field | Technical key | Behavior |
| --- | --- | --- |
| SEO title | `seo_title` | Optional page title for browser and search previews. |
| SEO description | `seo_description` | Optional summary for search previews. |
| Social sharing image | `og_image` | Optional Open Graph image. Recommended 1200×630 px. |
| Hide from search engines | `noindex` | Adds no-index metadata when enabled. Use only when intentional. |
| Site Header | `header` | Optional single Header block. |
| Page sections | `body` | Reorderable reusable sections. |
| Site Footer | `footer` | Optional single Footer block. |

The section order in Storyblok is the rendered page order.

## 5. Page sections

### 5.1 Hero section

**Technical component:** `hero`

Use for the first major message on a page.

Content fields:

- Layout: Split, Centered, Media left, or Media right.
- Eyebrow label.
- Heading.
- Highlighted heading.
- Supporting or italic heading.
- Description.
- Primary action.
- Secondary action.
- Video URL.
- Video poster image.
- Live label.
- Feedback label.
- Score and score criteria.
- Statistics.
- Visible.

Behavior:

- Video appears only when a video URL exists.
- Statistics appear only when statistic items exist.
- Score cards and feedback labels appear only with supplied content.
- Actions appear only with a valid label and destination.
- Centered without media becomes a compact text Hero.

Media guidance:

- Video: MP4 or WebM, portrait 4:5 preferred, approximately 1080×1350 px, compressed for web.
- Poster: match the video ratio and crop; JPG, WebP, or AVIF.
- Poster and video recommendations are guidance, not Storyblok upload limits.

### 5.2 Use cases section

**Technical component:** `use_cases`

Use to show scenarios, benefits, audiences, or applications.

Fields:

- Visible.
- Layout and spacing: Default, Centered, Compact, or Wide.
- Heading.
- Introduction.
- Reorderable Use case cards.

Compact reduces spacing and uses a denser grid. Wide increases container width and supports four-column layouts on large screens.

### 5.3 Process steps section

**Technical component:** `how_it_works`

Use for ordered processes, workflows, timelines, or onboarding steps.

Fields:

- Visible.
- Heading.
- Introduction.
- Reorderable Process steps.
- Layout: Default, Cards/grid, Centered, Compact, or Wide where available.

Steps are rendered in Storyblok order. Empty steps are ignored.

### 5.4 Product demo section

**Technical component:** `preview`

Use to display a product recording with optional feedback and progress panels.

Fields:

- Layout and spacing.
- Heading.
- Video URL.
- Video poster image.
- Browser URL label.
- Status label.
- Recording label.
- Feedback heading and Feedback points.
- Goals heading.
- Progress label and value.

Behavior:

- The section is hidden when no video URL exists.
- Feedback and progress panels disappear independently when empty.
- Progress is clamped visually between 0 and 100.

Media guidance:

- Video: MP4 or WebM, 16:9 preferred, approximately 1920×1080 px, compressed for web.
- Poster: 16:9, approximately 1920×1080 px, JPG, WebP, or AVIF.

### 5.5 Pricing or contact section

**Technical component:** `pricing`

Use for pricing enquiries, plan positioning, contact prompts, or a major promotional card.

Fields:

- Visible.
- Layout and spacing.
- Heading.
- Highlighted words.
- Card heading.
- Card description.
- Optional Button or link.

The action uses the reusable button's label, destination, icon, and style.

### 5.6 FAQ section

**Technical component:** `faq`

Use for common questions and answers.

Fields:

- Visible.
- Layout and spacing: Default, Centered, Compact, or Wide.
- Eyebrow label.
- Heading.
- Introduction.
- Reorderable FAQ items.

The default desktop layout uses a sticky introduction beside the questions. Centered uses a single-column presentation.

### 5.7 Call to action section

**Technical component:** `waitlist`

Use for a focused next step near the end or middle of a page.

Fields:

- Visible.
- Layout and spacing.
- Heading.
- Description.
- Optional Button or link.

The action uses the reusable button's label, destination, icon, and style.

### 5.8 Card grid section

**Technical component:** `grid`

Use for collections of reusable Content Cards.

Fields:

- Visible.
- Heading.
- Introduction.
- Section ID.
- Layout and spacing.
- Columns per row: 2, 3, or 4.
- Background style: Soft, White, or Transparent.
- Reorderable Content Cards.

Wide cards span the complete grid. Media-left and media-right cards may span two columns. Cards without a title are ignored.

### 5.9 Standalone Content Card

**Technical component:** `feature`

The same card may be added directly as a page section or nested inside a Card grid. Prefer a Card grid for groups of related cards.

### 5.10 CTA banner

**Technical component:** `teaser`

Use for a compact promotional message or newsletter-style prompt.

Fields:

- Visible.
- Heading.
- Description.
- Action label and destination.
- Optional icon.
- Layout.
- Background style.
- Section ID.

## 6. Nested widgets

Nested widgets belong inside page sections. They should not normally be inserted directly into the page body.

### 6.1 Button or link

**Technical component:** `cta`

| Field | Behavior |
| --- | --- |
| Label | Required visible action text. |
| Destination | Required path, anchor, email link, phone link, or full URL. |
| Icon | Optional Material Symbols icon name. |
| Style | Primary, Secondary, Outline, or Ghost. |

Examples of destinations:

- Marketing page: `/solutions`
- Page section: `#pricing`
- Main application: `/login` or `/signup`
- Email: `mailto:hello@example.com`
- External website: `https://example.com`

Known main-application routes are redirected to the separately hosted Conversim application.

### 6.2 Content Card

**Technical component:** `feature`

This is a general-purpose card. It is not tied to blogs, products, people, or pricing.

| Editor field | Technical key | Behavior |
| --- | --- | --- |
| Eyebrow label | `category` | Optional small label above the title. |
| Title | `title` | Main card title. Cards without a title are ignored in grids. |
| Description | `description` | Optional supporting text. |
| Supporting detail 1 | `author` | Optional short metadata of any kind. |
| Supporting detail 2 | `date` | Optional short metadata of any kind. |
| Supporting detail 3 | `read_time` | Optional short metadata of any kind. |
| Action label | `link_label` | Optional action text. Defaults to “Learn more” only when a destination exists. |
| Action destination | `link_url` | Optional internal or external link. |
| Image | `image` | Optional card image. |
| Card layout | `layout_variant` | Standard, Compact, Wide, Media left, or Media right. |
| Icon | `icon` | Optional Material Symbols icon used when there is no image. |

The older technical `name` field is read only as a title fallback for existing cards. New cards should use Title.

Media guidance:

- Recommended image: 1600×900 px at 16:9.
- Use JPG, WebP, PNG, or AVIF.
- Aim for less than 1 MB where practical.
- If no image or icon is supplied, no empty media placeholder is rendered.

### 6.3 Use case card

**Technical component:** `use_case_item`

- Optional icon.
- Optional title.
- Optional description.
- Optional supporting detail.
- Card emphasis: Standard, Featured, Compact, or Wide.

Use Featured sparingly so the page retains a clear hierarchy.

### 6.4 Process step

**Technical component:** `how_it_works_item`

- Optional icon.
- Optional title.
- Optional description.
- Step emphasis: Standard, Featured, Compact, or Wide.

### 6.5 FAQ item

**Technical component:** `faq_item`

- Question.
- Answer.

### 6.6 Statistic

**Technical component:** `stat_item`

- Value, such as `94%` or `50+`.
- Label explaining the value.

### 6.7 Score criterion

**Technical component:** `criteria_item`

- Criterion label.
- Numeric score.

### 6.8 Feedback point

**Technical component:** `feedback_item`

- Optional Material Symbols icon.
- Feedback text.
- Tone, such as success or warning.

### 6.9 Navigation link

**Technical component:** `nav_item`

- Label.
- Optional destination: page path, section anchor, or full URL.
- Optional open-in-new-tab setting.
- Optional reorderable Dropdown links. Adding at least one complete Dropdown link automatically turns the navigation item into a dropdown; no separate type or toggle is needed.

A Dropdown link contains a label, optional supporting description, destination, and optional open-in-new-tab setting. Incomplete dropdown links are hidden. On desktop, the menu opens on hover, keyboard focus, or click. On mobile, it opens as an accordion.

An item without Dropdown links behaves as a standard navigation link and is hidden when its destination is missing.

### 6.10 Footer link group, Footer link, and Social link

- A Footer link group contains an optional heading and reorderable Footer links.
- A Footer link contains a label, destination, and optional open-in-new-tab setting.
- A Social link contains a label, destination, and optional open-in-new-tab setting.
- Incomplete links are hidden.

## 7. Header and Footer

### Site Header

**Technical component:** `header`

Fields:

- Optional logo and alternative text.
- Reorderable Navigation links.
- Header appearance: solid or transparent at the top.
- Show login and sign-up actions.
- Login label and destination.
- Sign-up label and destination.
- Visible.

The login and sign-up actions are independently hidden if either their label or destination is missing. Recommended logo format is SVG or a transparent PNG/WebP at least 320 px wide.

### Site Footer

**Technical component:** `footer`

Fields:

- Optional logo.
- Brand name.
- Brand description.
- Reorderable Footer link groups.
- Copyright text; `{year}` is replaced automatically.
- Optional Social links.
- Visible.

Recommended logo format is SVG or a transparent PNG/WebP at least 320 px wide.

### Content Filter

**Technical component:** `content_filter`

Use this directly above a Resource Grid when visitors need category buttons, search, or both. The active category uses a smooth animated highlight.

Fields:

- All label: optional replacement for “All”.
- Categories: reorderable Filter Option widgets. Each label must match the Category text used on Resource Cards.
- Show search: enables the search field.
- Search placeholder: optional helper text inside the search field.
- Filter group: advanced connection name. Use the same value on the Content Filter and Resource Grid; the default is `resources`.

The filter and grid are intentionally separate. A Resource Grid works without a filter, and the filter can be omitted when all cards should remain visible.

### Resource Grid and Resource Card

**Technical components:** `resource_grid`, `resource_card`

Use Resource Grid for a responsive collection of editorial cards such as guides, case studies, learning resources, comparisons, partnerships, product updates, or news. Resource Card is a nested widget and is added inside the grid rather than directly to a page.

Resource Grid fields:

- Optional heading and introduction.
- Cards: reorderable Resource Card widgets.
- Columns count: `2`, `3`, or `4`; the layout collapses responsively on smaller screens.
- Layout: `default`, `centered`, `wide`, or `compact`.
- Background: `white`, `soft`, or `transparent`.
- Filter group: must match the Content Filter when filtering is required.
- Empty message: displayed only when no cards match the active category or search.
- Optional Section ID.

Resource Card fields:

- Optional image, category, description, author name, author image, date, and link label.
- Title.
- Optional destination and “open in a new tab” setting.

Recommended card image: 1600×900 px (16:9), WebP or JPG, compressed for web delivery. Recommended author image: 400×400 px (1:1), WebP or JPG. These are recommendations, not upload limits. Missing image or metadata is hidden without leaving an empty placeholder. If no destination is provided, the card remains non-clickable.

### Customer Result

**Technical component:** `customer_result`

Use this for customer proof, outcome summaries, partnership results, or a compact case-study callout. It is not limited to case studies.

Fields:

- Optional eyebrow, company name, and company logo.
- Heading and description.
- Optional Results built from Statistic widgets, for example `60%` / `Faster ramp`.
- Optional action label and destination. The button appears only when both are supplied.
- Optional “open in a new tab” setting.
- Layout: `default`, `wide`, or `compact`.
- Background: `white`, `soft`, or `brand`.
- Optional Section ID.

Recommended logo: SVG where available, otherwise a transparent PNG/WebP on an approximately 800×240 px artboard. Metrics, logo, company name, and action are independent optional groups; omitting any of them does not leave blank space.

## 8. Section IDs and navigation

Every rendered section receives an ID. Standard automatic IDs include:

- `hero`
- `use-cases`
- `how-it-works`
- `preview`
- `pricing`
- `faq`
- `waitlist`
- `grid`
- `feature`
- `teaser`
- `content-filter`
- `resources`
- `customer-result`

Repeated sections receive numbered IDs such as `pricing-2`. Where a section exposes a Section ID field, the editor may provide a custom ID. Invalid characters are converted to hyphens, and duplicate IDs receive a numeric suffix.

Header navigation automatically connects repeated standard section anchors to matching section occurrences in order.

## 9. Routing and publishing

Reserved React routes take priority over Storyblok slugs. Current reserved routes include:

- `/`
- `/home`
- `/sales-roleplay`
- `/healthcare`
- `/pharma`
- `/insurance`
- `/privacy`
- `/terms`
- Main-application route families such as `/login`, `/signup`, `/dashboard`, and `/workshops`.

All other paths are resolved through Storyblok's catch-all page renderer.

Editor workflow:

1. Create a Website page story.
2. Choose a unique, lowercase, hyphenated slug.
3. Add an optional Site Header.
4. Add sections to Page sections in reading order.
5. Add nested widgets inside their correct section.
6. Add an optional Site Footer.
7. Complete SEO fields.
8. Preview locally using HTTPS.
9. Save and publish.

## 10. Editorial rules

- Use sentence case for headings and button labels.
- Keep one primary action per visual group where possible.
- Use Primary for the most important action, Secondary or Outline for alternatives, and Ghost for low-emphasis links.
- Avoid adding content only to fill space; optional fields may remain empty.
- Do not repeat the same section ID manually.
- Write descriptive image alternative text when the image communicates information.
- Do not put important information only inside images or videos.
- Compress media before uploading.
- Keep cards in the same grid similar in content length when practical.
- Use Featured and Wide emphasis intentionally, not on every item.

## 11. Quality checklist

Before publishing a page, verify:

- The story slug matches the intended URL.
- Header and Footer links point to valid destinations.
- Buttons have both a label and destination.
- Section anchors scroll to the correct section.
- Headings follow a logical hierarchy.
- Optional empty fields leave no visible gaps.
- Images have appropriate crops and alternative text.
- Videos have a poster image and load acceptably on mobile.
- The page works at mobile, tablet, and desktop widths.
- SEO title and description are unique.
- The social image uses an appropriate 1200×630 crop.
- No-index is off unless intentionally required.
- The story has been published for production visibility.

## 12. Implementation source files

- Design tokens: `src/index.css`
- Shared section sizing: `src/features/landing/sectionStyles.ts`
- Storyblok normalization and registration: `src/features/landing/storyblokLibrary.tsx`
- Dynamic Storyblok page: `src/features/landing/pages/StoryblokPage.tsx`
- Reusable landing components: `src/features/landing/components/`
- Application routing: `src/App.tsx`

