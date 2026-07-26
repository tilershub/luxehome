# LUXEhome

Complete bathroom design and construction, Sri Lanka. Astro site on Cloudflare
Workers, with content managed through a Supabase-backed CMS at `/admin`.

## Getting started

```bash
npm install       # install dependencies
npm run dev       # Astro dev server
npm run build     # production build into dist/
npm run verify:routes   # check prerendered routes and the SSR worker
npx wrangler dev  # run the built worker exactly as it ships
```

`npm run dev` is fine for layout work, but anything touching rendering or
routing should be checked with `npx wrangler dev`, which runs the real worker
against `dist/` the way Cloudflare does.

## How rendering works

Two modes, and the distinction matters:

- **Server-rendered** (`export const prerender = false`) — every page that
  reads the CMS: home, designs, projects, shop, blog, team, contact, booking
  and the info pages. Publishing in the CMS is live immediately, with no
  deploy. Cloudflare caches each response at the edge for 60s and serves it
  stale while revalidating.
- **Prerendered** — `/about`, `/design-recommendation`, `/whole-home-planner`,
  `/thank-you` and the whole `/admin` section. Built to files at deploy time.

Because SSR pages never appear in the static sitemap, `/content-sitemap.xml`
lists designs, projects and journal articles dynamically. `robots.txt` points
at both sitemaps.

## Project structure

```
src/
├── layouts/LuxeLayout.astro    Brand shell: nav, footer, Meta Pixel, GA4
├── pages/
│   ├── designs/[slug].astro    The design page — the site's main sales asset
│   ├── projects/[slug].astro   Project stories: brief, journey, review
│   ├── blog/                   The Journal, CMS-backed
│   ├── admin/                  CMS (prerendered, gated by Supabase auth)
│   └── api/meta-capi.ts        Meta Conversions API endpoint
├── components/
│   ├── luxe/                   Public components
│   └── admin/ContentManager    The CMS editor: forms, uploads, child tables
└── lib/
    ├── luxe-config.ts          Single source of truth — see below
    ├── luxe.ts                 Typed Supabase data layer (designs, projects)
    ├── luxe-blog.ts            Journal data layer
    ├── luxe-supabase.ts        The Supabase project the CMS and site share
    └── admin-cms.ts            CMS module and field definitions
supabase/migrations/            Schema, applied in order
```

## Single source of truth

`src/lib/luxe-config.ts` holds the values that must not drift. Change them
there and every page follows:

| Export | What it controls |
| --- | --- |
| `WHATSAPP_NUMBER` | Every WhatsApp link |
| `GA_MEASUREMENT_ID` | GA4 property |
| `WARRANTY_SCHEDULE` | Warranty per task — bathware 15y, waterproofing 10y, plumbing 10y, wiring 10y, taps & showers 5y, ceiling 5y, light fixtures 1y, tempered glass 1y |
| `PRE_CONSTRUCTION_FEES` | Site inspection LKR 10,000 · refundable design package LKR 40,000 · LKR 50,000 together |
| `STANDARD_DRAWINGS` | The four technical drawings, shared by every design |
| `FIXTURE_CATEGORIES` | Bathroom fixture schedule and its display order |
| `DEFAULT_DESIGN_TIMELINE` | Six-week timeline seeded into a new design |
| `PLANNER` | Whole-home planner collection base prices |

## Content

Nine bathroom designs across three collections (Standard, Premium, Signature),
each with its own page. Managed at `/admin/cms/designs`:

- **Room images** — cover, vanity, water closet, shower, ceiling. These drive
  the walk-in sequence on the design page.
- **Technical drawings** are *not* per design. One shared set in
  `public/images/drawings/` appears on every design page.
- **Fixtures** carry brand, model, finish, specification, warranty period and
  a reference price. A fixture only appears publicly once it has real content,
  so a half-filled checklist never publishes empty rows.
- **Pricing** is per size tier; the flat per-m² rate is derived from the first
  two tiers. Areas accept decimals (3.5 m², 5.3 m²).

Images uploaded through the CMS are converted to WebP in the browser and capped
at 2200px before landing in the `luxehome-media` Supabase bucket — so photos
can come straight off a phone, including iPhone HEIC.

## Deploying

```bash
npm run deploy    # astro build && wrangler deploy
```

`wrangler.jsonc` **must** keep its `main` entry pointing at
`./dist/_worker.js/index.js`. Without it wrangler uploads `dist/` as static
files and deploys no worker at all — every server-rendered route and every
`/api` endpoint then returns 404 while static assets keep working, which makes
the failure easy to misread.

Secrets are set on the Worker, not in the repo:

```bash
npx wrangler secret put META_ACCESS_TOKEN   # Meta Conversions API
```

Database changes go in `supabase/migrations/` and are applied to the Supabase
project referenced in `src/lib/luxe-supabase.ts`.

## Analytics

- **GA4** `G-XKXFPFS3VN` — loaded from `LuxeLayout`, so every public page is
  covered while `/admin` is not. `window.gtag` is defined up front so events
  fired before the library loads are queued.
- **Meta Pixel** `1904211696933513` — PageView, `Contact` on WhatsApp and phone
  clicks, `Lead` on booking submission, deduplicated against the server-side
  Conversions API via a shared `event_id`.

## Contact

- WhatsApp: +94 77 450 3744
- Email: luxehome@gmail.com
- Site: https://luxehome.lk
