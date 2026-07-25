globalThis.process ??= {}; globalThis.process.env ??= {};
import { f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute, q as Fragment } from '../chunks/astro/server_qXath3RI.mjs';
import { $ as $$LuxeLayout } from '../chunks/LuxeLayout_nczARZOY.mjs';
import { f as getTeam } from '../chunks/luxe_CnbQKenw.mjs';
/* empty css                                */
export { renderers } from '../renderers.mjs';

const prerender = false;
const $$Team = createComponent(async ($$result, $$props, $$slots) => {
  const members = await getTeam();
  return renderTemplate`${renderComponent($$result, "LuxeLayout", $$LuxeLayout, { "title": "A permanent core. Verified specialists. \u2014 LUXEhome", "description": "Meet the permanent LUXEhome team and TILERSHUB Verified specialists responsible for design, construction quality and handover.", "data-astro-cid-6sqsh2pf": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="team-hero" data-astro-cid-6sqsh2pf><p class="lx-eyebrow" data-astro-cid-6sqsh2pf>The people responsible</p><h1 data-astro-cid-6sqsh2pf>A permanent core. Verified specialists.</h1><p data-astro-cid-6sqsh2pf>Every project has clear ownership from client communication through procurement, site quality and handover.</p></section> <section class="team-grid" data-astro-cid-6sqsh2pf>${members.length ? members.map((member) => renderTemplate`<article data-astro-cid-6sqsh2pf>${member.photo_url ? renderTemplate`<img${addAttribute(member.photo_url, "src")}${addAttribute(member.name, "alt")} loading="lazy" data-astro-cid-6sqsh2pf>` : renderTemplate`<div class="portrait" data-astro-cid-6sqsh2pf>${member.name.slice(0, 1)}</div>`}<p class="lx-eyebrow" data-astro-cid-6sqsh2pf>${member.permanent ? "Permanent team" : "Project specialist"}</p><h2 data-astro-cid-6sqsh2pf>${member.name}</h2><strong data-astro-cid-6sqsh2pf>${member.role}</strong><p data-astro-cid-6sqsh2pf>${member.bio}</p>${member.tilershub_verified && renderTemplate`<span data-astro-cid-6sqsh2pf>✓ TILERSHUB Verified</span>`}</article>`) : renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-6sqsh2pf": true }, { "default": async ($$result3) => renderTemplate`<article data-astro-cid-6sqsh2pf><h2 data-astro-cid-6sqsh2pf>Design & Client Experience</h2><p data-astro-cid-6sqsh2pf>Guides the brief, design selection and approvals.</p></article><article data-astro-cid-6sqsh2pf><h2 data-astro-cid-6sqsh2pf>Project Manager</h2><p data-astro-cid-6sqsh2pf>Coordinates procurement, programme and specialist teams.</p></article><article data-astro-cid-6sqsh2pf><h2 data-astro-cid-6sqsh2pf>Quality Supervisor</h2><p data-astro-cid-6sqsh2pf>Checks critical construction stages before work proceeds.</p></article><article data-astro-cid-6sqsh2pf><h2 data-astro-cid-6sqsh2pf>TILERSHUB Verified Specialists</h2><p data-astro-cid-6sqsh2pf>Trade teams selected for the needs and location of each project.</p></article>` })}`}</section> ` })} `;
}, "/home/user/luxehome/src/pages/team.astro", void 0);

const $$file = "/home/user/luxehome/src/pages/team.astro";
const $$url = "/team";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Team,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
