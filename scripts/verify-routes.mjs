import { existsSync } from 'node:fs';
import { join } from 'node:path';

// Only complete, repository-backed entries are required in an offline build.
// Additional published CMS designs and projects are added when Supabase is
// available at build time.
const designs = ['manel'];
const articles = [
  'what-a-fixed-bathroom-quotation-should-include','before-the-first-tile','bathroom-under-4sqm',
  'kitchen-storage-first','large-format-tile-wall-ready','what-we-found-avissawella','when-to-book-site-inspection',
];
const products = [
  'wall-hung-wc','backlit-5mm-mirror','10mm-shower-screen','eco-board-vanity',
  'concealed-rain-shower','tile-in-linear-drain','undermount-sink-set','quartz-worktop','soft-close-drawer-system',
];
const routes = [
  '/', '/designs', '/bathroom-designs', '/kitchen-designs', '/staircase-designs', '/floor-designs',
  '/projects', '/blog', '/shop', '/about', '/contact', '/book-site-inspection', '/design-recommendation',
  '/whole-home-planner', '/start', '/thank-you', '/how-it-works', '/bathroom-renovation',
  '/materials-brands', '/pricing-guide', '/warranty-aftercare', '/team', '/faq', '/terms', '/privacy', '/warranty-terms',
  '/payment-cancellation', '/admin', '/admin/cms', '/admin/cms/designs', '/admin/cms/projects',
  '/admin/cms/blog', '/admin/cms/pages', '/admin/cms/products', '/admin/cms/categories',
  '/admin/cms/inspections', '/admin/cms/team', '/admin/cms/media', '/admin/cms/settings', '/admin/luxehome', '/admin/blog',
  '/admin/shop', '/admin/projects', '/admin/crm', '/admin/catalogue', '/admin/catalogue/designs',
  '/admin/catalogue/designs/new', '/admin/catalogue/projects', '/admin/catalogue/projects/new',
  '/admin/catalogue/team', '/admin/catalogue/team/new',
  ...designs.map((slug) => `/designs/${slug}`),
  ...articles.map((slug) => `/blog/${slug}`),
  ...products.map((slug) => `/shop/${slug}`),
];

const missing = routes.filter((route) => !existsSync(join('dist', route === '/' ? 'index.html' : route.slice(1), route === '/' ? '' : 'index.html')));
if (missing.length) {
  console.error(`Missing ${missing.length} built route(s):\n${missing.join('\n')}`);
  process.exit(1);
}

if (existsSync(join('dist', 'services'))) {
  console.error('Legacy /services routes were generated unexpectedly.');
  process.exit(1);
}

console.log(`Verified ${routes.length} built public and admin routes.`);
