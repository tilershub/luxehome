globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createAstro, f as createComponent, m as maybeRenderHead, h as addAttribute, r as renderTemplate, k as renderComponent, q as Fragment } from './astro/server_qXath3RI.mjs';
import { S as SPACE_PRESENTATION } from './luxe-catalogue_uH6Tziwp.mjs';
import { w as waLink, f as formatLKRM } from './LuxeLayout_nczARZOY.mjs';
/* empty css                                    */

const $$Astro = createAstro("https://luxehome.lk");
const $$SpaceDesigns = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$SpaceDesigns;
  const { space, designs } = Astro2.props;
  const presentation = SPACE_PRESENTATION[space];
  const spaceLabel = space.slice(0, -1);
  const publishedDesigns = designs.filter((design) => design.coverImage);
  const hasPublishedDesigns = publishedDesigns.length > 0;
  const collections = [
    { key: "standard", eyebrow: space === "staircases" ? "Simple & enduring" : "Fresh & versatile" },
    { key: "premium", eyebrow: "Elevated & crafted" },
    { key: "signature", eyebrow: "Architectural & iconic" }
  ];
  return renderTemplate`${maybeRenderHead()}<section class="space-hero" data-astro-cid-ryczhaee> <p class="lx-eyebrow" data-astro-cid-ryczhaee>${presentation.eyebrow}</p> <h1 data-astro-cid-ryczhaee>${presentation.title}</h1> <p data-astro-cid-ryczhaee> ${hasPublishedDesigns ? "Choose a named, documented design and customise it for your home before construction begins. New designs are published one by one when their complete decision file is ready." : `The ${presentation.name.toLowerCase()} collection is in development. We will publish each design only when its renders, pricing, specifications and technical details are complete.`} </p> </section> <div class="space-body" data-astro-cid-ryczhaee> ${!hasPublishedDesigns && renderTemplate`<section class="coming-soon" data-astro-cid-ryczhaee> <p class="lx-eyebrow" data-astro-cid-ryczhaee>Collection in development</p> <h2 data-astro-cid-ryczhaee>Bathrooms are our focus right now.</h2> <p data-astro-cid-ryczhaee>Explore the completed bathroom designs available today, or ask our team to keep you informed about this collection.</p> <div data-astro-cid-ryczhaee> <a class="lx-btn-wa" href="/designs" data-astro-cid-ryczhaee>Browse bathroom designs</a> <a class="lx-btn-ghost"${addAttribute(waLink(`Hi LUXEhome! Please let me know when the ${presentation.name.toLowerCase()} collection is available.`), "href")} target="_blank" rel="noopener noreferrer" data-astro-cid-ryczhaee>Ask about this collection</a> </div> </section>`} ${collections.map((collection) => {
    const group = publishedDesigns.filter((item) => item.collection === collection.key);
    if (group.length === 0) return null;
    return renderTemplate`<section class="collection" data-astro-cid-ryczhaee> <p class="lx-eyebrow" data-astro-cid-ryczhaee>${collection.eyebrow}</p><h2 data-astro-cid-ryczhaee>${collection.key[0].toUpperCase() + collection.key.slice(1)} Collection</h2> <div class="design-grid" data-astro-cid-ryczhaee>${group.map((item) => renderTemplate`<a class="design-card"${addAttribute(`/designs/${item.slug}`, "href")} data-astro-cid-ryczhaee> <div class="art" data-astro-cid-ryczhaee><img${addAttribute(item.coverImage, "src")}${addAttribute(`${item.name} ${spaceLabel} design`, "alt")} loading="lazy" data-astro-cid-ryczhaee></div> <div class="body" data-astro-cid-ryczhaee> <div class="meta" data-astro-cid-ryczhaee><span data-astro-cid-ryczhaee>${collection.key}</span><span data-astro-cid-ryczhaee>${item.minSqm ? `Minimum ${item.minSqm} m\xB2` : "Custom fit"}</span></div> <h3 data-astro-cid-ryczhaee>${item.name}</h3><p data-astro-cid-ryczhaee>${item.tagline}</p> <dl data-astro-cid-ryczhaee> ${item.startingPrice && renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-ryczhaee": true }, { "default": ($$result2) => renderTemplate`<dt data-astro-cid-ryczhaee>New bathroom</dt><dd data-astro-cid-ryczhaee>${formatLKRM(item.startingPrice)}</dd>` })}`} ${item.renovationStartingPrice && renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-ryczhaee": true }, { "default": ($$result2) => renderTemplate`<dt data-astro-cid-ryczhaee>Renovation</dt><dd data-astro-cid-ryczhaee>${formatLKRM(item.renovationStartingPrice)}</dd>` })}`} </dl> <strong data-astro-cid-ryczhaee>View complete design →</strong> </div> </a>`)}</div> </section>`;
  })} </div> ${hasPublishedDesigns && renderTemplate`<section class="space-cta" data-astro-cid-ryczhaee> <div data-astro-cid-ryczhaee> <p class="lx-eyebrow" data-astro-cid-ryczhaee>Your ${presentation.name.toLowerCase()}, fully resolved</p> <h2 data-astro-cid-ryczhaee>${space === "bathrooms" ? "We will measure the room." : "Which design feels like home?"}</h2> ${space === "bathrooms" && renderTemplate`<p data-astro-cid-ryczhaee>No dimensions are required to request the visit.</p>`} </div> ${space === "bathrooms" ? renderTemplate`<a href="/book-site-inspection" data-astro-cid-ryczhaee>Book inspection · LKR 10,000</a>` : renderTemplate`<a${addAttribute(waLink(`Hi LUXEhome! I would like help choosing a ${space} design.`), "href")} target="_blank" rel="noopener noreferrer" data-astro-cid-ryczhaee>Ask on WhatsApp</a>`} </section>`} `;
}, "/home/user/luxehome/src/components/luxe/SpaceDesigns.astro", void 0);

export { $$SpaceDesigns as $ };
