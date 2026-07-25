globalThis.process ??= {}; globalThis.process.env ??= {};
import { f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute, q as Fragment } from '../chunks/astro/server_qXath3RI.mjs';
import { $ as $$LuxeLayout, c as cloudinary, f as formatLKRM } from '../chunks/LuxeLayout_nczARZOY.mjs';
import { $ as $$ProjectCard } from '../chunks/ProjectCard_IW7ueDvY.mjs';
import { g as getDesigns, a as getProjects } from '../chunks/luxe_CnbQKenw.mjs';
import { C as CATALOGUE_DESIGNS } from '../chunks/luxe-catalogue_uH6Tziwp.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const storedDesigns = await getDesigns({ spaceSlug: "bathrooms" });
  const readyCatalogue = CATALOGUE_DESIGNS.filter((item) => item.space === "bathrooms" && item.coverImage);
  const designMap = /* @__PURE__ */ new Map();
  for (const item of readyCatalogue) {
    designMap.set(item.slug, {
      slug: item.slug,
      name: item.name,
      collection: item.collection,
      tagline: item.tagline,
      minSqm: item.minSqm,
      newPrice: item.startingPrice,
      renovationPrice: item.renovationStartingPrice ?? null,
      cover: item.coverImage
    });
  }
  for (const item of storedDesigns) {
    const fallback = readyCatalogue.find((candidate) => candidate.slug === item.slug);
    const cover = item.cover_image_url || fallback?.coverImage;
    if (!cover) continue;
    designMap.set(item.slug, {
      slug: item.slug,
      name: item.name,
      collection: item.collection,
      tagline: item.tagline || fallback?.tagline || "A complete, documented LUXEhome bathroom.",
      minSqm: item.min_sqm,
      newPrice: item.new_starting_price_lkr || item.starting_price_lkr || fallback?.startingPrice || null,
      renovationPrice: item.renovation_starting_price_lkr || fallback?.renovationStartingPrice || null,
      cover
    });
  }
  const designs = [...designMap.values()].slice(0, 4);
  const newPrices = designs.flatMap((design) => design.newPrice ? [design.newPrice] : []);
  const renovationPrices = designs.flatMap((design) => design.renovationPrice ? [design.renovationPrice] : []);
  const newFrom = newPrices.length ? Math.min(...newPrices) : null;
  const renovationFrom = renovationPrices.length ? Math.min(...renovationPrices) : null;
  const heroDesign = designs[0] ?? null;
  const projects = (await getProjects()).filter((project) => project.after_image_url).sort((a, b) => Number(b.featured) - Number(a.featured)).slice(0, 2);
  return renderTemplate`${renderComponent($$result, "LuxeLayout", $$LuxeLayout, { "title": "Complete Bathroom Design & Construction in Sri Lanka \u2014 LUXEhome", "description": "Choose a fully documented LUXEhome bathroom design, then book a LKR 10,000 site inspection. We measure, confirm the fit and manage new bathrooms or renovations through handover.", "data-astro-cid-j7pv25f6": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="home-hero" data-astro-cid-j7pv25f6> <div class="home-hero-copy" data-astro-cid-j7pv25f6> <p class="lx-eyebrow lxr" data-astro-cid-j7pv25f6>Complete bathroom design &amp; construction · Sri Lanka</p> <h1 class="lxr" data-astro-cid-j7pv25f6>Your bathroom,<br data-astro-cid-j7pv25f6>fully resolved.</h1> <p class="home-lead lxr" data-astro-cid-j7pv25f6>
Choose a complete LUXEhome design or adapt one to your room. One accountable team
        manages the design, specified materials, construction and final handover.
</p> <div class="home-actions lxr" data-astro-cid-j7pv25f6> <a class="lx-btn-wa" href="/book-site-inspection" data-astro-cid-j7pv25f6>Book Site Inspection · LKR 10,000</a> <a class="lx-btn-ghost" href="/designs" data-astro-cid-j7pv25f6>Explore bathroom designs</a> </div> <div class="home-proof lxr" aria-label="LUXEhome service commitments" data-astro-cid-j7pv25f6> <span data-astro-cid-j7pv25f6>No measurements needed</span> <span data-astro-cid-j7pv25f6>Fixed quotation</span> <span data-astro-cid-j7pv25f6>WhatsApp updates</span> <span data-astro-cid-j7pv25f6>5-year warranty</span> </div> </div> ${heroDesign && renderTemplate`<a class="home-hero-visual lxr"${addAttribute(`/designs/${heroDesign.slug}`, "href")}${addAttribute(`Explore the ${heroDesign.name} bathroom design`, "aria-label")} data-astro-cid-j7pv25f6> <img${addAttribute(cloudinary(heroDesign.cover, 1e3), "src")}${addAttribute(`${heroDesign.name} bathroom design preview`, "alt")} width="1000" height="750" fetchpriority="high" data-astro-cid-j7pv25f6> <span class="home-visual-shade" aria-hidden="true" data-astro-cid-j7pv25f6></span> <span class="home-visual-copy" data-astro-cid-j7pv25f6> <small data-astro-cid-j7pv25f6>${heroDesign.collection} collection · Design preview</small> <strong data-astro-cid-j7pv25f6>${heroDesign.name}</strong> <em data-astro-cid-j7pv25f6>View this bathroom design →</em> </span> </a>`} </section> <section class="home-first-step" aria-labelledby="first-step-title" data-astro-cid-j7pv25f6> <div class="home-first-price lxr" data-astro-cid-j7pv25f6> <p class="lx-eyebrow" data-astro-cid-j7pv25f6>Your first commitment</p> <h2 id="first-step-title" data-astro-cid-j7pv25f6>Site inspection</h2> <strong data-astro-cid-j7pv25f6>LKR 10,000</strong> <small data-astro-cid-j7pv25f6>Pay after the location and appointment are confirmed.</small> </div> <div class="home-first-flow" data-astro-cid-j7pv25f6> <article class="lxr" data-astro-cid-j7pv25f6><span data-astro-cid-j7pv25f6>01</span><h3 data-astro-cid-j7pv25f6>Request</h3><p data-astro-cid-j7pv25f6>Share your contact and location. Bathroom dimensions are optional.</p></article> <article class="lxr" data-astro-cid-j7pv25f6><span data-astro-cid-j7pv25f6>02</span><h3 data-astro-cid-j7pv25f6>Measure</h3><p data-astro-cid-j7pv25f6>We inspect the room, services, site condition and access.</p></article> <article class="lxr" data-astro-cid-j7pv25f6><span data-astro-cid-j7pv25f6>03</span><h3 data-astro-cid-j7pv25f6>Decide</h3><p data-astro-cid-j7pv25f6>We recommend the right design, budget path and next action.</p></article> </div> </section> <section class="home-paths" aria-labelledby="project-type-title" data-astro-cid-j7pv25f6> <div class="home-section-heading lxr" data-astro-cid-j7pv25f6> <div data-astro-cid-j7pv25f6> <p class="lx-eyebrow" data-astro-cid-j7pv25f6>Start with your project</p> <h2 id="project-type-title" data-astro-cid-j7pv25f6>New bathroom or renovation?</h2> </div> <p data-astro-cid-j7pv25f6>Choose the closest path. If you are unsure, the site inspection will settle it.</p> </div> <div class="home-path-grid" data-astro-cid-j7pv25f6> <a class="home-path-card lxr" href="/book-site-inspection?project=new" data-astro-cid-j7pv25f6> <span data-astro-cid-j7pv25f6>01</span> <div data-astro-cid-j7pv25f6> <p class="lx-eyebrow" data-astro-cid-j7pv25f6>New construction</p> <h3 data-astro-cid-j7pv25f6>Build a new bathroom</h3> <p data-astro-cid-j7pv25f6>Start with a resolved layout, technical drawings and a complete material and fixture specification.</p> ${newFrom && renderTemplate`<strong data-astro-cid-j7pv25f6>${formatLKRM(newFrom)}</strong>`} </div> <b aria-hidden="true" data-astro-cid-j7pv25f6>→</b> </a> <a class="home-path-card lxr" href="/book-site-inspection?project=renovation" data-astro-cid-j7pv25f6> <span data-astro-cid-j7pv25f6>02</span> <div data-astro-cid-j7pv25f6> <p class="lx-eyebrow" data-astro-cid-j7pv25f6>Existing bathroom</p> <h3 data-astro-cid-j7pv25f6>Renovate completely</h3> <p data-astro-cid-j7pv25f6>Rework the old room through demolition, repairs, services, waterproofing, finishes and handover.</p> ${renovationFrom && renderTemplate`<strong data-astro-cid-j7pv25f6>${formatLKRM(renovationFrom)}</strong>`} </div> <b aria-hidden="true" data-astro-cid-j7pv25f6>→</b> </a> </div> ${(newFrom || renovationFrom) && renderTemplate`<p class="home-price-note lxr" data-astro-cid-j7pv25f6>Current starting prices are based on the minimum room size and listed specification of the available design. Final fit and price follow room assessment.</p>`} </section> <section class="home-designs" id="available-designs" aria-labelledby="available-designs-title" data-astro-cid-j7pv25f6> <div class="home-section-heading lxr" data-astro-cid-j7pv25f6> <div data-astro-cid-j7pv25f6> <p class="lx-eyebrow" data-astro-cid-j7pv25f6>The floral collection</p> <h2 id="available-designs-title" data-astro-cid-j7pv25f6>Fully developed bathroom designs.</h2> </div> <p data-astro-cid-j7pv25f6>We publish one design at a time—only after its renders, pricing, drawings, fixtures and warranties are documented.</p> </div> <div class="home-design-grid" data-astro-cid-j7pv25f6> ${designs.map((design) => renderTemplate`<a class="home-design-card lxr"${addAttribute(`/designs/${design.slug}`, "href")} data-astro-cid-j7pv25f6> <div class="home-design-image" data-astro-cid-j7pv25f6> <img${addAttribute(cloudinary(design.cover, 800), "src")}${addAttribute(`${design.name} bathroom design`, "alt")} loading="lazy" width="800" height="600" data-astro-cid-j7pv25f6> <span data-astro-cid-j7pv25f6>${design.minSqm ? `Minimum ${design.minSqm} m\xB2` : "Custom fit"}</span> </div> <div class="home-design-body" data-astro-cid-j7pv25f6> <p class="lx-eyebrow" data-astro-cid-j7pv25f6>${design.collection} collection</p> <h3 data-astro-cid-j7pv25f6>${design.name}</h3> <p data-astro-cid-j7pv25f6>${design.tagline}</p> <dl data-astro-cid-j7pv25f6> ${design.newPrice && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-j7pv25f6": true }, { "default": async ($$result3) => renderTemplate`<dt data-astro-cid-j7pv25f6>New bathroom</dt><dd data-astro-cid-j7pv25f6>${formatLKRM(design.newPrice)}</dd>` })}`} ${design.renovationPrice && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-j7pv25f6": true }, { "default": async ($$result3) => renderTemplate`<dt data-astro-cid-j7pv25f6>Renovation</dt><dd data-astro-cid-j7pv25f6>${formatLKRM(design.renovationPrice)}</dd>` })}`} </dl> <strong data-astro-cid-j7pv25f6>View complete design <span aria-hidden="true" data-astro-cid-j7pv25f6>→</span></strong> </div> </a>`)} </div> </section> ${projects.length > 0 && renderTemplate`<section class="home-projects" aria-labelledby="home-projects-title" data-astro-cid-j7pv25f6> <div class="home-section-heading lxr" data-astro-cid-j7pv25f6> <div data-astro-cid-j7pv25f6> <p class="lx-eyebrow" data-astro-cid-j7pv25f6>Designs brought to life</p> <h2 id="home-projects-title" data-astro-cid-j7pv25f6>See what we actually built.</h2> </div> <a href="/projects" data-astro-cid-j7pv25f6>View all project stories →</a> </div> <div class="home-project-grid" data-astro-cid-j7pv25f6> ${projects.map((project) => renderTemplate`${renderComponent($$result2, "ProjectCard", $$ProjectCard, { "project": project, "data-astro-cid-j7pv25f6": true })}`)} </div> </section>`}<section class="home-trust" aria-labelledby="why-title" data-astro-cid-j7pv25f6> <div class="home-section-heading lxr" data-astro-cid-j7pv25f6> <div data-astro-cid-j7pv25f6><p class="lx-eyebrow" data-astro-cid-j7pv25f6>Why LUXEhome</p><h2 id="why-title" data-astro-cid-j7pv25f6>Clarity before construction.</h2></div> <p data-astro-cid-j7pv25f6>Every important decision is documented before the work reaches site.</p> </div> <div class="home-trust-grid" data-astro-cid-j7pv25f6> <article class="lxr" data-astro-cid-j7pv25f6><span data-astro-cid-j7pv25f6>01</span><h3 data-astro-cid-j7pv25f6>Complete design file</h3><p data-astro-cid-j7pv25f6>Renders, layouts, technical drawings, fixtures, finishes and warranties in one place.</p></article> <article class="lxr" data-astro-cid-j7pv25f6><span data-astro-cid-j7pv25f6>02</span><h3 data-astro-cid-j7pv25f6>Fixed quotation</h3><p data-astro-cid-j7pv25f6>The approved scope, selections, payment stages and exclusions are written before construction.</p></article> <article class="lxr" data-astro-cid-j7pv25f6><span data-astro-cid-j7pv25f6>03</span><h3 data-astro-cid-j7pv25f6>One responsible team</h3><p data-astro-cid-j7pv25f6>Design, procurement, civil work and specialist trades are coordinated through LUXEhome.</p></article> <article class="lxr" data-astro-cid-j7pv25f6><span data-astro-cid-j7pv25f6>04</span><h3 data-astro-cid-j7pv25f6>Visible progress</h3><p data-astro-cid-j7pv25f6>Stage-by-stage WhatsApp updates keep local and overseas clients informed.</p></article> </div> </section> <section class="home-cta lxr" data-astro-cid-j7pv25f6> <div data-astro-cid-j7pv25f6> <p class="lx-eyebrow" data-astro-cid-j7pv25f6>Do not know the bathroom size?</p> <h2 data-astro-cid-j7pv25f6>That is exactly where we start.</h2> <p data-astro-cid-j7pv25f6>We will inspect it, measure it and check which design can work before you commit to construction.</p> </div> <div class="home-cta-actions" data-astro-cid-j7pv25f6> <a class="cta-gold" href="/book-site-inspection" data-astro-cid-j7pv25f6>Book Inspection · LKR 10,000</a> <a href="/designs" data-astro-cid-j7pv25f6>Browse designs first</a> </div> </section> ` })} `;
}, "/home/user/luxehome/src/pages/index.astro", void 0);

const $$file = "/home/user/luxehome/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
