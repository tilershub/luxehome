/* Sitemap for everything rendered on demand from the CMS. The static
   sitemap-index only covers prerendered pages, so designs, projects and
   journal articles are listed here and referenced from robots.txt. */
export const prerender = false;

import type { APIRoute } from 'astro';
import { getPublishedPosts } from '../lib/luxe-blog';
import { getDesigns, getProjects } from '../lib/luxe';

const SITE = 'https://luxehome.lk';

const entry = (path: string, lastmod?: string | null) =>
  `<url><loc>${SITE}${path}</loc>${lastmod ? `<lastmod>${new Date(lastmod).toISOString()}</lastmod>` : ''}</url>`;

export const GET: APIRoute = async () => {
  const [posts, designs, projects] = await Promise.all([
    getPublishedPosts(),
    getDesigns({ spaceSlug: 'bathrooms' }),
    getProjects(),
  ]);

  const urls = [
    entry('/'),
    entry('/designs'),
    entry('/projects'),
    entry('/blog'),
    entry('/how-we-build'),
    ...designs
      .filter((design) => design.cover_image_url)
      .map((design) => entry(`/designs/${design.slug}`)),
    ...projects
      .filter((project) => project.after_image_url)
      .map((project) => entry(`/projects/${project.slug}`)),
    ...posts
      .filter((post) => post.include_in_sitemap)
      .map((post) => entry(`/blog/${post.slug}`, post.updated_at)),
  ].join('');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=0, s-maxage=3600',
      },
    }
  );
};
