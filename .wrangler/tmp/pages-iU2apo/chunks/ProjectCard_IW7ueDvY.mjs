globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createAstro, f as createComponent, m as maybeRenderHead, h as addAttribute, r as renderTemplate } from './astro/server_qXath3RI.mjs';
import { c as cloudinary } from './LuxeLayout_nczARZOY.mjs';
/* empty css                          */

const $$Astro = createAstro("https://luxehome.lk");
const $$ProjectCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ProjectCard;
  const { project, compact = false } = Astro2.props;
  const cover = project.after_image_url || project.before_image_url;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(`/projects/${project.slug}`, "href")}${addAttribute(["lp-card", { "lp-card--compact": compact }], "class:list")} data-astro-cid-mzo6l7ks> <div class="lp-cover" data-astro-cid-mzo6l7ks> ${cover ? renderTemplate`<img${addAttribute(cloudinary(cover, 800), "src")}${addAttribute(`${project.title} \u2014 completed LUXEhome project`, "alt")} loading="lazy" width="800" height="560" data-astro-cid-mzo6l7ks>` : renderTemplate`<div class="lp-placeholder" data-astro-cid-mzo6l7ks><strong data-astro-cid-mzo6l7ks>LUXE</strong><em data-astro-cid-mzo6l7ks>home</em></div>`} <span class="lp-badge" data-astro-cid-mzo6l7ks>Completed project</span> </div> <div class="lp-body" data-astro-cid-mzo6l7ks> <h3 data-astro-cid-mzo6l7ks>${project.title}</h3> <p class="lp-meta" data-astro-cid-mzo6l7ks> ${[project.location, project.area_label, project.duration_label].filter(Boolean).join(" \xB7 ")} </p> ${project.design && renderTemplate`<p class="lp-design" data-astro-cid-mzo6l7ks>Built from the ${project.design.name} design</p>`} <span class="lp-link" data-astro-cid-mzo6l7ks>View complete project story <b aria-hidden="true" data-astro-cid-mzo6l7ks>→</b></span> </div> </a> `;
}, "/home/user/luxehome/src/components/luxe/ProjectCard.astro", void 0);

export { $$ProjectCard as $ };
