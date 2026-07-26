import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

// Prerendered routes must exist as files in dist/.
const staticRoutes = [
  '/about', '/design-recommendation', '/whole-home-planner', '/thank-you',
  '/admin', '/admin/cms', '/admin/cms/designs', '/admin/cms/projects',
  '/admin/cms/blog', '/admin/cms/pages', '/admin/cms/products', '/admin/cms/categories',
  '/admin/cms/inspections', '/admin/cms/team', '/admin/cms/media', '/admin/cms/settings',
  '/admin/luxehome', '/admin/blog', '/admin/shop', '/admin/projects', '/admin/crm',
  '/admin/catalogue', '/admin/catalogue/designs', '/admin/catalogue/designs/new',
  '/admin/catalogue/projects', '/admin/catalogue/projects/new',
  '/admin/catalogue/team', '/admin/catalogue/team/new',
];

// Rendered on demand so CMS content goes live without a deploy. These never
// appear in dist/ — they are served by the worker, so verify it was built and
// that each page module made it into the bundle.
const ssrRoutes = [
  '/', '/designs', '/designs/[slug]', '/projects', '/projects/[slug]',
  '/bathroom-designs', '/kitchen-designs', '/staircase-designs', '/floor-designs',
  '/shop', '/shop/[slug]', '/blog', '/blog/[slug]', '/[page]',
  '/team', '/contact', '/book-site-inspection', '/start', '/how-we-build',
  '/content-sitemap.xml', '/api/meta-capi',
];

const missing = staticRoutes.filter((route) =>
  !existsSync(join('dist', route.slice(1), 'index.html'))
);
if (missing.length) {
  console.error(`Missing ${missing.length} prerendered route(s):\n${missing.join('\n')}`);
  process.exit(1);
}

const worker = join('dist', '_worker.js');
if (!existsSync(worker)) {
  console.error('The SSR worker was not built — dynamic routes would 404.');
  process.exit(1);
}

// The Cloudflare adapter emits a routes manifest; SSR pages must not be
// excluded from it or the worker never sees the request.
const routesManifest = join('dist', '_routes.json');
if (existsSync(routesManifest)) {
  const { exclude = [] } = JSON.parse(readFileSync(routesManifest, 'utf8'));
  const shadowed = ssrRoutes.filter((route) =>
    exclude.some((pattern) => pattern === route || (pattern.endsWith('/*') && route.startsWith(pattern.slice(0, -2))))
  );
  if (shadowed.length) {
    console.error(`These SSR routes are shadowed by static assets:\n${shadowed.join('\n')}`);
    process.exit(1);
  }
}

if (existsSync(join('dist', 'services'))) {
  console.error('Legacy /services routes were generated unexpectedly.');
  process.exit(1);
}

console.log(`Verified ${staticRoutes.length} prerendered routes and ${ssrRoutes.length} server-rendered routes.`);
