import { defineMiddleware } from 'astro:middleware';

/**
 * Worker caching is valuable for public catalogue pages, but administration
 * and API responses must always execute fresh. The new Worker version starts
 * with an empty cache, so these directives prevent either area from ever
 * receiving a shared entry.
 */
export const onRequest = defineMiddleware(async ({ url }, next) => {
  const response = await next();

  if (url.pathname.startsWith('/admin') || url.pathname.startsWith('/api/')) {
    response.headers.set('Cache-Control', 'private, no-store');
  }

  return response;
});
