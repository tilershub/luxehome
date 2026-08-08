import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  adapter: cloudflare(),
  site: 'https://luxehome.lk',
  // Keep one URL shape everywhere. Internal links already use paths without a
  // trailing slash, and on-demand routes will permanently redirect slash
  // variants instead of publishing a second self-canonical URL.
  trailingSlash: 'never',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/admin'),
    }),
  ],
});
