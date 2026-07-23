/* Dynamic sitemap for the server-rendered Journal. The static
   sitemap-index only covers prerendered pages, so CMS-published
   articles are listed here and referenced from robots.txt. */
export const prerender = false;

import type { APIRoute } from 'astro';
import { getPublishedPosts } from '../lib/luxe-blog';

const SITE = 'https://luxehome.lk';

export const GET: APIRoute = async () => {
  const posts = (await getPublishedPosts()).filter((post) => post.include_in_sitemap);
  const urls = [
    `<url><loc>${SITE}/blog</loc></url>`,
    ...posts.map((post) =>
      `<url><loc>${SITE}/blog/${post.slug}</loc><lastmod>${new Date(post.updated_at).toISOString()}</lastmod></url>`
    ),
  ].join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
