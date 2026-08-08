/* Sitemap for everything rendered on demand from the CMS. The static
   sitemap-index only covers prerendered pages, so designs, projects and
   journal articles are listed here and referenced from robots.txt. */
export const prerender = false;

import type { APIRoute } from 'astro';
import { getPublishedPosts } from '../lib/luxe-blog';
import { getDesigns, getProjects } from '../lib/luxe';
import { normalizeBathroomDesignIdentity } from '../lib/bathroom-taxonomy';

const SITE = 'https://luxehome.lk';

const entry = (path: string, lastmod?: string | null) =>
  `<url><loc>${SITE}${path}</loc>${lastmod ? `<lastmod>${new Date(lastmod).toISOString()}</lastmod>` : ''}</url>`;

export const GET: APIRoute = async () => {
  const [posts, designs, projects] = await Promise.all([
    getPublishedPosts(),
    getDesigns({ spaceSlug: 'bathrooms' }),
    getProjects(),
  ]);

  // The regular Astro sitemap already owns all fixed routes. This sitemap is
  // only for CMS-driven detail pages that Astro cannot discover at build time.
  // Normalize legacy bathroom records before publishing them so Google sees
  // only the current destination URL, never a URL that immediately redirects.
  const dynamicEntries: Array<{ path: string; lastmod?: string | null }> = [
    ...designs
      .filter((design) => design.cover_image_url)
      .map((design) => ({
        path: `/designs/${normalizeBathroomDesignIdentity(design).slug}`,
      })),
    ...projects
      .filter((project) => project.after_image_url)
      .map((project) => ({ path: `/projects/${project.slug}` })),
    ...posts
      .filter((post) => post.include_in_sitemap)
      .map((post) => ({ path: `/blog/${post.slug}`, lastmod: post.updated_at })),
  ];

  const seen = new Set<string>();
  const urls = dynamicEntries
    .filter(({ path }) => {
      if (seen.has(path)) return false;
      seen.add(path);
      return true;
    })
    .map(({ path, lastmod }) => entry(path, lastmod))
    .join('');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=0, s-maxage=300',
      },
    }
  );
};
