globalThis.process ??= {}; globalThis.process.env ??= {};
import { f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_qXath3RI.mjs';
import { $ as $$LuxeLayout, w as waLink } from '../chunks/LuxeLayout_nczARZOY.mjs';
import { $ as $$InspectionBookingForm } from '../chunks/InspectionBookingForm_BwUNSKZa.mjs';
/* empty css                                   */
export { renderers } from '../renderers.mjs';

const prerender = false;
const $$Contact = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "LuxeLayout", $$LuxeLayout, { "title": "Contact LUXEhome \u2014 Bathroom Design & Construction", "description": "Contact LUXEhome about a bathroom renovation or new bathroom in Sri Lanka, or request a professional LKR 10,000 site inspection.", "data-astro-cid-uw5kdbxl": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="contact-hero" data-astro-cid-uw5kdbxl> <p class="lx-eyebrow" data-astro-cid-uw5kdbxl>Contact LUXEhome</p> <h1 data-astro-cid-uw5kdbxl>Tell us what you want to transform.</h1> <p data-astro-cid-uw5kdbxl>Talk to us about a new bathroom or complete renovation, or request the site inspection when you are ready for us to measure the room.</p> </section> <section class="contact-body" data-astro-cid-uw5kdbxl> <div class="contact-cards" data-astro-cid-uw5kdbxl> <article data-astro-cid-uw5kdbxl><h2 data-astro-cid-uw5kdbxl>WhatsApp</h2><p data-astro-cid-uw5kdbxl>The fastest way to ask a question or share bathroom photographs. Dimensions are not required.</p><a${addAttribute(waLink("Hi LUXEhome! I would like to discuss a bathroom project."), "href")} target="_blank" rel="noopener noreferrer" data-astro-cid-uw5kdbxl>Start a conversation →</a></article> <article data-astro-cid-uw5kdbxl><h2 data-astro-cid-uw5kdbxl>Service area</h2><p data-astro-cid-uw5kdbxl>Projects across Sri Lanka, subject to scope, location and site assessment.</p></article> <article data-astro-cid-uw5kdbxl><h2 data-astro-cid-uw5kdbxl>Business hours</h2><p data-astro-cid-uw5kdbxl>Monday to Saturday · 8:00 am–6:00 pm</p><a href="tel:+94774503744" data-astro-cid-uw5kdbxl>077 450 3744</a></article> </div> <div class="contact-form" data-astro-cid-uw5kdbxl>${renderComponent($$result2, "InspectionBookingForm", $$InspectionBookingForm, { "data-astro-cid-uw5kdbxl": true })}</div> </section> ` })} `;
}, "/home/user/luxehome/src/pages/contact.astro", void 0);

const $$file = "/home/user/luxehome/src/pages/contact.astro";
const $$url = "/contact";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Contact,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
