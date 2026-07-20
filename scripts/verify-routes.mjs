import { existsSync } from 'node:fs';
import { join } from 'node:path';

const designs = [
  'araliya','olu','kumudu','nelum','sandun','orchid','manel','binara','idda',
  'rampe','karapincha','inguru','karabu','goraka','siyambala','kurundu','sadikka','wasawasi',
  'ritigala','dolukanda','hanthana','namunukula','kirigalpotta','thotupola','dumbara','samanala','pidurutalagala',
  'weligama','kalpitiya','pasikuda','habarana','ella','sinharaja','sigiriya','yala','horton',
];
const projects = ['kotte-family-bathroom','avissawella-ensuite','matara-bathroom-makeover'];
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
  '/kitchen-design-build', '/staircase-design-build', '/floor-design-installation', '/materials-brands',
  '/pricing-guide', '/warranty-aftercare', '/team', '/faq', '/terms', '/privacy', '/warranty-terms',
  '/payment-cancellation', '/admin', '/admin/cms', '/admin/cms/pages', '/admin/cms/categories',
  '/admin/cms/inquiries', '/admin/cms/media', '/admin/cms/settings', '/admin/luxehome', '/admin/blog',
  '/admin/shop', '/admin/projects', '/admin/crm', '/admin/catalogue', '/admin/catalogue/designs',
  '/admin/catalogue/designs/new', '/admin/catalogue/projects', '/admin/catalogue/projects/new',
  '/admin/catalogue/team', '/admin/catalogue/team/new',
  ...designs.map((slug) => `/designs/${slug}`),
  ...projects.map((slug) => `/projects/${slug}`),
  ...articles.map((slug) => `/blog/${slug}`),
  ...products.map((slug) => `/shop/${slug}`),
];

const missing = routes.filter((route) => !existsSync(join('dist', route === '/' ? 'index.html' : route.slice(1), route === '/' ? '' : 'index.html')));
if (missing.length) {
  console.error(`Missing ${missing.length} built route(s):\n${missing.join('\n')}`);
  process.exit(1);
}
console.log(`Verified ${routes.length} built public and admin routes.`);
