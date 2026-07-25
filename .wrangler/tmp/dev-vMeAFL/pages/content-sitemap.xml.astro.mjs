globalThis.process ??= {}; globalThis.process.env ??= {};
import { a as getPublishedPosts } from '../chunks/luxe-blog_Bi7_RaIL.mjs';
import { g as getDesigns, a as getProjects } from '../chunks/luxe_CnbQKenw.mjs';
export { renderers } from '../renderers.mjs';

const prerender = false;
const SITE = "https://luxehome.lk";
const entry = (path, lastmod) => `<url><loc>${SITE}${path}</loc>${lastmod ? `<lastmod>${new Date(lastmod).toISOString()}</lastmod>` : ""}</url>`;
const GET = async () => {
  const [posts, designs, projects] = await Promise.all([
    getPublishedPosts(),
    getDesigns({ spaceSlug: "bathrooms" }),
    getProjects()
  ]);
  const urls = [
    entry("/"),
    entry("/designs"),
    entry("/projects"),
    entry("/blog"),
    ...designs.filter((design) => design.cover_image_url).map((design) => entry(`/designs/${design.slug}`)),
    ...projects.filter((project) => project.after_image_url).map((project) => entry(`/projects/${project.slug}`)),
    ...posts.filter((post) => post.include_in_sitemap).map((post) => entry(`/blog/${post.slug}`, post.updated_at))
  ].join("");
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=0, s-maxage=3600"
      }
    }
  );
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
