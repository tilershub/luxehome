globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_qXath3RI.mjs';
import { $ as $$LuxeLayout, c as cloudinary } from '../chunks/LuxeLayout_nczARZOY.mjs';
import { a as getPublishedPosts, r as readingTime, e as excerptOf, f as formatPostDate } from '../chunks/luxe-blog_Bi7_RaIL.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://luxehome.lk");
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const posts = await getPublishedPosts();
  const categories = [...new Set(posts.map((post) => post.category).filter(Boolean))];
  const activeCategory = Astro2.url.searchParams.get("category");
  const filtered = activeCategory ? posts.filter((post) => post.category === activeCategory) : posts;
  const [featured, ...rest] = filtered;
  return renderTemplate`${renderComponent($$result, "LuxeLayout", $$LuxeLayout, { "title": "Ideas & Advice \u2014 The LUXEhome Journal", "description": "Practical design, materials, quotation and construction guidance from the LUXEhome team in Sri Lanka \u2014 written for homeowners planning real projects.", "data-astro-cid-5tznm7mj": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="journal-hero" data-astro-cid-5tznm7mj> <p class="lx-eyebrow lxr" data-astro-cid-5tznm7mj>The LUXEhome journal</p> <h1 class="lxr" data-astro-cid-5tznm7mj>Better decisions make better homes.</h1> <p class="lxr" data-astro-cid-5tznm7mj>Clear advice about design, materials, quotations and construction — written for homeowners.</p> ${categories.length > 0 && renderTemplate`<nav class="journal-filter lxr" aria-label="Article categories" data-astro-cid-5tznm7mj> <a href="/blog"${addAttribute({ active: !activeCategory }, "class:list")} data-astro-cid-5tznm7mj>All articles</a> ${categories.map((category) => renderTemplate`<a${addAttribute(`/blog?category=${encodeURIComponent(category)}`, "href")}${addAttribute({ active: activeCategory === category }, "class:list")} data-astro-cid-5tznm7mj>${category}</a>`)} </nav>`} </section> ${filtered.length === 0 && renderTemplate`<section class="journal-empty lxr" data-astro-cid-5tznm7mj> <p class="lx-eyebrow" data-astro-cid-5tznm7mj>Coming soon</p> <h2 data-astro-cid-5tznm7mj>${activeCategory ? "Nothing in this category yet." : "The first articles are being prepared."}</h2> <p data-astro-cid-5tznm7mj>In the meantime, the design collections show how we document a complete project.</p> <div class="journal-empty-actions" data-astro-cid-5tznm7mj> ${activeCategory && renderTemplate`<a class="lx-btn-ghost" href="/blog" data-astro-cid-5tznm7mj>View all articles</a>`} <a class="lx-btn-wa" href="/designs" data-astro-cid-5tznm7mj>Explore bathroom designs</a> </div> </section>`}${featured && renderTemplate`<section class="journal-featured lxr" aria-labelledby="featured-title" data-astro-cid-5tznm7mj> <a class="journal-featured-card"${addAttribute(`/blog/${featured.slug}`, "href")} data-astro-cid-5tznm7mj> <div class="journal-featured-art" data-astro-cid-5tznm7mj> ${featured.cover_image ? renderTemplate`<img${addAttribute(cloudinary(featured.cover_image, 1e3), "src")} alt="" width="1000" height="640" fetchpriority="high" data-astro-cid-5tznm7mj>` : renderTemplate`<span aria-hidden="true" data-astro-cid-5tznm7mj>Journal</span>`} </div> <div class="journal-featured-body" data-astro-cid-5tznm7mj> <p class="lx-eyebrow" data-astro-cid-5tznm7mj>
Featured${featured.category ? ` \xB7 ${featured.category}` : ""} · ${readingTime(featured)} </p> <h2 id="featured-title" data-astro-cid-5tznm7mj>${featured.title}</h2> <p data-astro-cid-5tznm7mj>${excerptOf(featured)}</p> <span class="journal-meta" data-astro-cid-5tznm7mj>${featured.author} · <time${addAttribute(featured.pub_date, "datetime")} data-astro-cid-5tznm7mj>${formatPostDate(featured.pub_date)}</time></span> <strong data-astro-cid-5tznm7mj>Read the full article <span aria-hidden="true" data-astro-cid-5tznm7mj>→</span></strong> </div> </a> </section>`}${rest.length > 0 && renderTemplate`<section class="journal-grid-wrap" aria-label="All articles" data-astro-cid-5tznm7mj> <div class="journal-grid" data-astro-cid-5tznm7mj> ${rest.map((post) => renderTemplate`<a class="journal-card lxr"${addAttribute(`/blog/${post.slug}`, "href")} data-astro-cid-5tznm7mj> <div class="journal-card-art" data-astro-cid-5tznm7mj> ${post.cover_image ? renderTemplate`<img${addAttribute(cloudinary(post.cover_image, 700), "src")} alt="" loading="lazy" width="700" height="480" data-astro-cid-5tznm7mj>` : renderTemplate`<span aria-hidden="true" data-astro-cid-5tznm7mj>${post.category ?? "Journal"}</span>`} </div> <div class="journal-card-body" data-astro-cid-5tznm7mj> <p class="lx-eyebrow" data-astro-cid-5tznm7mj>${post.category ?? "Advice"} · ${readingTime(post)}</p> <h2 data-astro-cid-5tznm7mj>${post.title}</h2> <p data-astro-cid-5tznm7mj>${excerptOf(post)}</p> <span class="journal-meta" data-astro-cid-5tznm7mj><time${addAttribute(post.pub_date, "datetime")} data-astro-cid-5tznm7mj>${formatPostDate(post.pub_date)}</time></span> </div> </a>`)} </div> </section>`}<section class="journal-cta lxr" data-astro-cid-5tznm7mj> <div data-astro-cid-5tznm7mj> <p class="lx-eyebrow" data-astro-cid-5tznm7mj>From reading to planning</p> <h2 data-astro-cid-5tznm7mj>Ready to look at your own bathroom?</h2> <p data-astro-cid-5tznm7mj>A site inspection turns good advice into a measured, documented plan for your room.</p> </div> <a href="/book-site-inspection" data-astro-cid-5tznm7mj>Book Inspection · LKR 10,000</a> </section> ` })} `;
}, "/home/user/luxehome/src/pages/blog/index.astro", void 0);

const $$file = "/home/user/luxehome/src/pages/blog/index.astro";
const $$url = "/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
