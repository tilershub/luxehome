globalThis.process ??= {}; globalThis.process.env ??= {};
import { f as createComponent, k as renderComponent, r as renderTemplate } from '../chunks/astro/server_qXath3RI.mjs';
import { $ as $$LuxeLayout } from '../chunks/LuxeLayout_nczARZOY.mjs';
import { $ as $$SpaceDesigns } from '../chunks/SpaceDesigns_D5E02576.mjs';
import { C as CATALOGUE_DESIGNS } from '../chunks/luxe-catalogue_uH6Tziwp.mjs';
export { renderers } from '../renderers.mjs';

const prerender = false;
const $$StaircaseDesigns = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "LuxeLayout", $$LuxeLayout, { "title": "Sri Lankan Highland Staircase Designs \u2014 LUXEhome" }, { "default": ($$result2) => renderTemplate`${renderComponent($$result2, "SpaceDesigns", $$SpaceDesigns, { "space": "staircases", "designs": CATALOGUE_DESIGNS.filter((d) => d.space === "staircases") })}` })}`;
}, "/home/user/luxehome/src/pages/staircase-designs.astro", void 0);

const $$file = "/home/user/luxehome/src/pages/staircase-designs.astro";
const $$url = "/staircase-designs";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$StaircaseDesigns,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
