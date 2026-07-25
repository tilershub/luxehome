globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../../chunks/astro/server_qXath3RI.mjs';
import { $ as $$LuxeLayout, w as waLink } from '../../chunks/LuxeLayout_nczARZOY.mjs';
import { d as getProductBySlug } from '../../chunks/luxe_CnbQKenw.mjs';
/* empty css                                     */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://luxehome.lk");
const prerender = false;
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const slug = Astro2.params.slug || "";
  const stored = await getProductBySlug(slug);
  const fallback = { name: slug.split("-").map((s) => s[0]?.toUpperCase() + s.slice(1)).join(" "), short_description: "A LUXEhome-specified product selected to work with a complete room design.", description: "Specification, finish, compatibility and installation requirements are confirmed for the project before ordering.", price_lkr: 0, cover_image_url: null, gallery_image_urls: [], features: ["Specified for the complete design", "Compatibility checked before ordering", "Installation coordinated by LUXEhome"], meta_title: null, meta_description: null };
  const product = stored || fallback;
  const price = Number(product.price_lkr) > 0 ? `From LKR ${Number(product.price_lkr).toLocaleString("en-LK")}` : "Price on request";
  const images = [product.cover_image_url, ...product.gallery_image_urls || []].filter(Boolean);
  return renderTemplate`${renderComponent($$result, "LuxeLayout", $$LuxeLayout, { "title": product.meta_title || `${product.name} \u2014 LUXEhome Shop`, "description": product.meta_description || product.short_description, "data-astro-cid-q5ghu2nj": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="product" data-astro-cid-q5ghu2nj><div class="gallery" data-astro-cid-q5ghu2nj>${images.length ? images.map((image, i) => renderTemplate`<img${addAttribute(image, "src")}${addAttribute(`${product.name} ${i + 1}`, "alt")}${addAttribute(i ? "lazy" : "eager", "loading")} data-astro-cid-q5ghu2nj>`) : renderTemplate`<div class="placeholder" data-astro-cid-q5ghu2nj>${product.name}</div>`}</div><div class="details" data-astro-cid-q5ghu2nj><a class="back" href="/shop" data-astro-cid-q5ghu2nj>← Shop</a><p class="lx-eyebrow" data-astro-cid-q5ghu2nj>Specified by LUXEhome</p><h1 data-astro-cid-q5ghu2nj>${product.name}</h1><strong class="price" data-astro-cid-q5ghu2nj>${price}</strong><p data-astro-cid-q5ghu2nj>${product.description || product.short_description}</p>${product.features?.length > 0 && renderTemplate`<ul data-astro-cid-q5ghu2nj>${product.features.map((f) => renderTemplate`<li data-astro-cid-q5ghu2nj>✓ ${f}</li>`)}</ul>`}<a class="wa"${addAttribute(waLink(`Hi LUXEhome! I am interested in ${product.name} (${price}).`), "href")} target="_blank" rel="noopener noreferrer" data-astro-cid-q5ghu2nj>Ask about this product</a><small data-astro-cid-q5ghu2nj>Final availability, compatibility, delivery and installation are confirmed for your project.</small></div></section> ` })} `;
}, "/home/user/luxehome/src/pages/shop/[slug].astro", void 0);

const $$file = "/home/user/luxehome/src/pages/shop/[slug].astro";
const $$url = "/shop/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
