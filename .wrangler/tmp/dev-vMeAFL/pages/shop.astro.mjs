globalThis.process ??= {}; globalThis.process.env ??= {};
import { f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_qXath3RI.mjs';
import { $ as $$LuxeLayout, w as waLink } from '../chunks/LuxeLayout_nczARZOY.mjs';
import { e as getProducts } from '../chunks/luxe_CnbQKenw.mjs';
/* empty css                                */
export { renderers } from '../renderers.mjs';

const prerender = false;
const $$Shop = createComponent(async ($$result, $$props, $$slots) => {
  const fallback = [
    { slug: "wall-hung-wc", name: "Wall-Hung WC Set", category: "Featured", short_description: "A clean-lined wall-hung suite specified for contemporary bathrooms.", price_lkr: 0, cover_image_url: null },
    { slug: "backlit-5mm-mirror", name: "Backlit 5mm Mirror", category: "Featured", short_description: "Made-to-measure mirror with soft integrated lighting.", price_lkr: 38e3, cover_image_url: null },
    { slug: "10mm-shower-screen", name: "10mm Shower Screen", category: "Featured", short_description: "Malaysian tempered glass with hardware selected for the design.", price_lkr: 0, cover_image_url: null },
    { slug: "eco-board-vanity", name: "Eco Board Vanity", category: "Bathroom", short_description: "Custom storage designed around the basin and room.", price_lkr: 0, cover_image_url: null },
    { slug: "concealed-rain-shower", name: "Concealed Rain Shower", category: "Bathroom", short_description: "A complete concealed shower specification.", price_lkr: 0, cover_image_url: null },
    { slug: "tile-in-linear-drain", name: "Tile-In Linear Drain", category: "Bathroom", short_description: "A quiet drainage detail integrated with the floor layout.", price_lkr: 0, cover_image_url: null },
    { slug: "undermount-sink-set", name: "Undermount Sink Set", category: "Kitchen", short_description: "Sink and tap selected together for function and finish.", price_lkr: 0, cover_image_url: null },
    { slug: "quartz-worktop", name: "Quartz Worktop", category: "Kitchen", short_description: "Durable worktop measured and fabricated for the design.", price_lkr: 0, cover_image_url: null },
    { slug: "soft-close-drawer-system", name: "Soft-Close Drawer System", category: "Kitchen", short_description: "Reliable drawer hardware for hard-working storage.", price_lkr: 0, cover_image_url: null }
  ];
  const stored = await getProducts();
  const products = stored.length ? stored : fallback;
  const groups = ["Featured", "Bathroom", "Kitchen"];
  return renderTemplate`${renderComponent($$result, "LuxeLayout", $$LuxeLayout, { "title": "Shop \u2014 LUXEhome", "description": "Products specified by LUXEhome for better bathrooms, kitchens and complete rooms.", "data-astro-cid-5w43p2qc": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="shop-hero" data-astro-cid-5w43p2qc><p class="lx-eyebrow" data-astro-cid-5w43p2qc>Specified by LUXEhome</p><h1 data-astro-cid-5w43p2qc>Products selected for better rooms.</h1><p data-astro-cid-5w43p2qc>A curated selection of fixtures, furniture and finishes chosen to work with our designs.</p><nav data-astro-cid-5w43p2qc>${groups.map((group) => renderTemplate`<a${addAttribute(`#${group.toLowerCase()}`, "href")} data-astro-cid-5w43p2qc>${group}</a>`)}</nav></section> <div class="shop-body" data-astro-cid-5w43p2qc>${groups.map((group) => renderTemplate`<section${addAttribute(group.toLowerCase(), "id")} data-astro-cid-5w43p2qc><p class="lx-eyebrow" data-astro-cid-5w43p2qc>${group} collection</p><h2 data-astro-cid-5w43p2qc>${group === "Featured" ? "Curated selection" : group === "Bathroom" ? "Fixtures & furniture" : "Function, finished beautifully"}</h2><div class="product-grid" data-astro-cid-5w43p2qc>${products.filter((p) => (p.category || "Featured").toLowerCase() === group.toLowerCase()).map((p) => renderTemplate`<a class="product"${addAttribute(`/shop/${p.slug}`, "href")} data-astro-cid-5w43p2qc><div class="image" data-astro-cid-5w43p2qc>${p.cover_image_url ? renderTemplate`<img${addAttribute(p.cover_image_url, "src")}${addAttribute(p.name, "alt")} loading="lazy" data-astro-cid-5w43p2qc>` : renderTemplate`<span data-astro-cid-5w43p2qc>${p.name}</span>`}</div><div class="body" data-astro-cid-5w43p2qc><h3 data-astro-cid-5w43p2qc>${p.name}</h3><p data-astro-cid-5w43p2qc>${p.short_description}</p><strong data-astro-cid-5w43p2qc>${Number(p.price_lkr) > 0 ? `From LKR ${Number(p.price_lkr).toLocaleString("en-LK")}` : "Price on request"}</strong><span class="link" data-astro-cid-5w43p2qc>View product →</span></div></a>`)}</div></section>`)}</div> <section class="shop-cta" data-astro-cid-5w43p2qc><div data-astro-cid-5w43p2qc><p class="lx-eyebrow" data-astro-cid-5w43p2qc>Need tiles, flooring or finishing materials?</p><h2 data-astro-cid-5w43p2qc>Choose them with the design.</h2></div><a${addAttribute(waLink("Hi LUXEhome! I need help selecting materials."), "href")} target="_blank" rel="noopener noreferrer" data-astro-cid-5w43p2qc>Ask for material options</a></section> ` })} `;
}, "/home/user/luxehome/src/pages/shop.astro", void 0);

const $$file = "/home/user/luxehome/src/pages/shop.astro";
const $$url = "/shop";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Shop,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
