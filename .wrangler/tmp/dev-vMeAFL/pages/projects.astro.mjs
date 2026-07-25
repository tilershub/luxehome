globalThis.process ??= {}; globalThis.process.env ??= {};
import { f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_qXath3RI.mjs';
import { $ as $$LuxeLayout, w as waLink } from '../chunks/LuxeLayout_nczARZOY.mjs';
import { $ as $$ProjectCard } from '../chunks/ProjectCard_IW7ueDvY.mjs';
import { a as getProjects } from '../chunks/luxe_CnbQKenw.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const projects = (await getProjects()).filter((project) => project.after_image_url).sort((a, b) => Number(b.featured) - Number(a.featured));
  return renderTemplate`${renderComponent($$result, "LuxeLayout", $$LuxeLayout, { "title": "Completed Bathroom Project Stories \u2014 LUXEhome", "description": "Real LUXEhome bathroom projects documented from inquiry and design through construction, problem-solving, the team and final handover.", "data-astro-cid-2hwget37": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="pj-hero" data-astro-cid-2hwget37> <p class="lx-eyebrow lxr" data-astro-cid-2hwget37>Real bathrooms · Complete stories</p> <h1 class="lxr" data-astro-cid-2hwget37>From first inquiry<br data-astro-cid-2hwget37><em data-astro-cid-2hwget37>to final handover.</em></h1> <p class="pj-intro lxr" data-astro-cid-2hwget37>
Every published project shows the design, the existing conditions, what we discovered,
      how we solved it, the construction journey and the team responsible.
</p> </section> <section class="pj-body" data-astro-cid-2hwget37> ${projects.length === 0 ? renderTemplate`<div class="pj-empty lxr" data-astro-cid-2hwget37> <p data-astro-cid-2hwget37>Complete project stories are being prepared. We publish them one by one when the full inquiry-to-handover record and real completed photographs are ready.</p> <a${addAttribute(waLink("Hi LUXEhome! Can you share photos of your recent completed bathroom projects?"), "href")} class="lx-btn-wa" target="_blank" rel="noopener noreferrer" data-astro-cid-2hwget37>Ask for recent work</a> </div>` : renderTemplate`<div class="pj-grid" data-astro-cid-2hwget37> ${projects.map((project) => renderTemplate`${renderComponent($$result2, "ProjectCard", $$ProjectCard, { "project": project, "data-astro-cid-2hwget37": true })}`)} </div>`} </section> ` })} `;
}, "/home/user/luxehome/src/pages/projects/index.astro", void 0);

const $$file = "/home/user/luxehome/src/pages/projects/index.astro";
const $$url = "/projects";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
