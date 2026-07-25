globalThis.process ??= {}; globalThis.process.env ??= {};
import { f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute, q as Fragment } from '../chunks/astro/server_qXath3RI.mjs';
import { $ as $$LuxeLayout, c as cloudinary, f as formatLKRM } from '../chunks/LuxeLayout_nczARZOY.mjs';
import { g as getDesigns } from '../chunks/luxe_CnbQKenw.mjs';
import { C as CATALOGUE_DESIGNS } from '../chunks/luxe-catalogue_uH6Tziwp.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const storedDesigns = await getDesigns({ spaceSlug: "bathrooms" });
  const readyCatalogue = CATALOGUE_DESIGNS.filter((item) => item.space === "bathrooms" && item.coverImage);
  const designMap = /* @__PURE__ */ new Map();
  for (const [index, item] of readyCatalogue.entries()) {
    designMap.set(item.slug, {
      id: `catalogue-bathrooms-${item.slug}`,
      slug: item.slug,
      name: item.name,
      space_id: "bathrooms",
      collection: item.collection,
      tagline: item.tagline,
      description: null,
      starting_price_lkr: item.startingPrice ?? 0,
      min_sqm: item.minSqm,
      new_starting_price_lkr: item.startingPrice,
      renovation_starting_price_lkr: item.renovationStartingPrice ?? null,
      cover_image_url: item.coverImage,
      inspiration_image_url: null,
      video_3d_url: null,
      video_work_url: null,
      workflow_text: null,
      highlights: [],
      featured: false,
      sort_order: index,
      space: { id: "bathrooms", slug: "bathrooms", name: "Bathrooms", sinhala_name: null, sort_order: 0 }
    });
  }
  for (const stored of storedDesigns) {
    const fallback = readyCatalogue.find((item) => item.slug === stored.slug);
    const cover = stored.cover_image_url || fallback?.coverImage;
    if (!cover) continue;
    designMap.set(stored.slug, {
      ...stored,
      cover_image_url: cover,
      new_starting_price_lkr: stored.new_starting_price_lkr || stored.starting_price_lkr || fallback?.startingPrice || null,
      renovation_starting_price_lkr: stored.renovation_starting_price_lkr || fallback?.renovationStartingPrice || null
    });
  }
  const designs = [...designMap.values()].sort((a, b) => a.sort_order - b.sort_order);
  const collections = [
    { key: "standard", label: "Standard Collection" },
    { key: "premium", label: "Premium Collection" },
    { key: "signature", label: "Signature Collection" }
  ];
  return renderTemplate`${renderComponent($$result, "LuxeLayout", $$LuxeLayout, { "title": "Bathroom Designs \u2014 Complete Design Files | LUXEhome", "description": "Browse fully developed LUXEhome bathroom designs with room-size guidance, new and renovation starting prices, renders, technical drawings, fixtures and warranties.", "data-astro-cid-e6iammxu": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="dz-hero" data-astro-cid-e6iammxu> <p class="lx-eyebrow lxr" data-astro-cid-e6iammxu>The Sri Lankan floral collection</p> <h1 class="lxr" data-astro-cid-e6iammxu>Choose a bathroom design,<br data-astro-cid-e6iammxu><em data-astro-cid-e6iammxu>not a guess.</em></h1> <p class="dz-intro lxr" data-astro-cid-e6iammxu>
Every published design is fully developed—renders, room-size guidance, new and renovation
      pricing, technical drawings, specified fixtures and warranties.
</p> </section> <section class="dz-body" data-astro-cid-e6iammxu> <div class="dz-publishing-note lxr" data-astro-cid-e6iammxu> <span data-astro-cid-e6iammxu>Our publishing standard</span> <p data-astro-cid-e6iammxu>We add designs one by one. A design appears here only when its complete decision file is ready.</p> </div> ${designs.length === 0 ? renderTemplate`<div class="dz-empty lxr" data-astro-cid-e6iammxu> <p data-astro-cid-e6iammxu>The first complete bathroom design is being prepared. You can still request a site inspection so we can measure the room and advise the correct path.</p> <a href="/book-site-inspection" class="lx-btn-wa" data-astro-cid-e6iammxu>Book Site Inspection · LKR 10,000</a> </div>` : collections.map((collection) => {
    const group = designs.filter((design) => design.collection === collection.key);
    if (group.length === 0) return null;
    return renderTemplate`<section class="dz-collection" data-astro-cid-e6iammxu> <h2 class="dz-col-title lxr" data-astro-cid-e6iammxu>${collection.label}</h2> <div class="dz-grid" data-astro-cid-e6iammxu> ${group.map((design) => renderTemplate`<a${addAttribute(`/designs/${design.slug}`, "href")} class="dz-card lxr" data-astro-cid-e6iammxu> <div class="dz-card-img" data-astro-cid-e6iammxu> <img${addAttribute(cloudinary(design.cover_image_url, 800), "src")}${addAttribute(`${design.name} bathroom design`, "alt")} loading="lazy" width="800" height="600" data-astro-cid-e6iammxu> <span class="dz-badge" data-astro-cid-e6iammxu>${design.min_sqm ? `Minimum ${design.min_sqm} m\xB2` : "Custom fit"}</span> </div> <div class="dz-card-body" data-astro-cid-e6iammxu> <p class="lx-eyebrow" data-astro-cid-e6iammxu>${collection.label.replace(" Collection", "")}</p> <h3 data-astro-cid-e6iammxu>${design.name}</h3> ${design.tagline && renderTemplate`<p class="dz-tagline" data-astro-cid-e6iammxu>${design.tagline}</p>`} <dl data-astro-cid-e6iammxu> ${(design.new_starting_price_lkr || design.starting_price_lkr > 0) && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-e6iammxu": true }, { "default": async ($$result3) => renderTemplate`<dt data-astro-cid-e6iammxu>New bathroom</dt><dd data-astro-cid-e6iammxu>${formatLKRM(design.new_starting_price_lkr || design.starting_price_lkr)}</dd>` })}`} ${design.renovation_starting_price_lkr && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-e6iammxu": true }, { "default": async ($$result3) => renderTemplate`<dt data-astro-cid-e6iammxu>Renovation</dt><dd data-astro-cid-e6iammxu>${formatLKRM(design.renovation_starting_price_lkr)}</dd>` })}`} </dl> <strong data-astro-cid-e6iammxu>View complete design <span aria-hidden="true" data-astro-cid-e6iammxu>→</span></strong> </div> </a>`)} </div> </section>`;
  })} </section> <section class="dz-cta lxr" data-astro-cid-e6iammxu> <div data-astro-cid-e6iammxu><p class="lx-eyebrow" data-astro-cid-e6iammxu>Need help choosing?</p><h2 data-astro-cid-e6iammxu>We will measure your bathroom.</h2><p data-astro-cid-e6iammxu>No dimensions are required to request the visit.</p></div> <a href="/book-site-inspection" data-astro-cid-e6iammxu>Book Inspection · LKR 10,000</a> </section> ` })} `;
}, "/home/user/luxehome/src/pages/designs/index.astro", void 0);

const $$file = "/home/user/luxehome/src/pages/designs/index.astro";
const $$url = "/designs";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
