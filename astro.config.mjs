import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

// Keep in step with PUBLIC_INFO_PAGES in src/lib/luxe-pages.ts ('team' has its own page).
const INFO_PAGE_SLUGS = [
  'how-it-works', 'bathroom-renovation', 'materials-brands', 'pricing-guide', 'warranty-aftercare',
  'faq', 'terms', 'warranty-terms', 'payment-cancellation',
];

export default defineConfig({
  adapter: cloudflare(),
  // Allow the managed development preview host; production is unaffected.
  vite: { server: { allowedHosts: ['terminal.local'] } },
  site: 'https://luxehome.lk',
  // Keep one URL shape everywhere. Internal links already use paths without a
  // trailing slash, and on-demand routes will permanently redirect slash
  // variants instead of publishing a second self-canonical URL.
  trailingSlash: 'never',
  integrations: [
    sitemap({
      // Info pages render through the on-demand [page] route, so the sitemap
      // integration cannot discover them on its own.
      customPages: INFO_PAGE_SLUGS.map((slug) => `https://luxehome.lk/${slug}`),
      // Exclude utility pages and routes that only 301 elsewhere: a redirect in
      // the sitemap wastes crawl budget and Search Console flags it.
      filter: (page) => !page.includes('/admin') && ![
        '/cart', '/thank-you', '/start', '/designs', '/whole-home-planner', '/design-recommendation',
        '/bathroom-designs', '/kitchen-designs', '/floor-designs', '/staircase-designs', '/404',
      ].some((path) => page.replace(/\/$/, '').endsWith(path)),
    }),
  ],
});
