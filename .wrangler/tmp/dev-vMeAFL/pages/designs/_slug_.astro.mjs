globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createAstro, f as createComponent, r as renderTemplate, k as renderComponent, q as Fragment, u as unescapeHTML, m as maybeRenderHead, h as addAttribute } from '../../chunks/astro/server_qXath3RI.mjs';
import { f as formatLKRM, c as cloudinary, $ as $$LuxeLayout, F as FIXTURE_CATEGORIES, a as WARRANTY_HEADLINE, l as lkrM, b as WARRANTY_SCHEDULE } from '../../chunks/LuxeLayout_nczARZOY.mjs';
import { $ as $$VideoCard } from '../../chunks/VideoCard_D-crGwfQ.mjs';
import { $ as $$ProjectCard } from '../../chunks/ProjectCard_IW7ueDvY.mjs';
import { b as getDesignBySlug, y as youtubeEmbed, a as getProjects } from '../../chunks/luxe_CnbQKenw.mjs';
import { C as CATALOGUE_DESIGNS, S as SPACE_PRESENTATION } from '../../chunks/luxe-catalogue_uH6Tziwp.mjs';
/* empty css                                     */
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a, _b;
const $$Astro = createAstro("https://luxehome.lk");
const prerender = false;
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const storedDesign = await getDesignBySlug(slug);
  const catalogueDesign = CATALOGUE_DESIGNS.find((item) => item.space === "bathrooms" && item.slug === slug);
  const design = storedDesign ?? (catalogueDesign ? {
    slug: catalogueDesign.slug,
    name: catalogueDesign.name,
    space_id: catalogueDesign.space,
    collection: catalogueDesign.collection,
    tagline: catalogueDesign.tagline,
    description: "A complete LUXEhome design file, customised for your room and documented before construction begins.",
    starting_price_lkr: catalogueDesign.startingPrice ?? 0,
    min_sqm: catalogueDesign.minSqm,
    new_starting_price_lkr: catalogueDesign.startingPrice ?? null,
    renovation_starting_price_lkr: catalogueDesign.renovationStartingPrice ?? null,
    cover_image_url: catalogueDesign.coverImage ?? null,
    video_3d_url: null,
    inspiration_image_url: null,
    workflow_text: "We inspect, customise and approve the complete design file before procurement and construction begin.",
    space: { id: catalogueDesign.space, slug: catalogueDesign.space, name: SPACE_PRESENTATION[catalogueDesign.space].name},
    drawings: [],
    fixtures: [],
    price_tiers: (catalogueDesign.pricingTiers ?? []).map((tier, sort_order) => ({
      label: tier.label,
      sqm: tier.sqm,
      new_price_lkr: tier.newPrice,
      renovation_price_lkr: tier.renovationPrice,
      sort_order
    })),
    materials: [
      { category: "Adhesive", brand: "Swisstek", item: "Tile Adhesive", sort_order: 0 },
      { category: "Grout", brand: "Swisstek", item: "Grout", sort_order: 1 },
      { category: "Waterproofing", brand: "Tokyo Super 2K", item: "Waterproofing", sort_order: 2 },
      { category: "Electrical", brand: "ACL", item: "Wiring & Cables", sort_order: 3 }
    ],
    timeline: [],
    faq: []
  } : null);
  if (!design) return Astro2.redirect("/designs");
  if (design.slug === "manel") {
    design.starting_price_lkr = 206e4;
    design.new_starting_price_lkr = 206e4;
    design.renovation_starting_price_lkr = 2175e3;
    design.min_sqm = 5;
    design.cover_image_url ||= "/images/designs/manel/cover.jpeg";
    design.inspiration_image_url ||= "/images/designs/manel/manel-flower.jpeg";
    design.video_3d_url ||= "https://youtube.com/shorts/LHkPOUT4ku8";
    design.workflow_text ||= "We inspect, customise and approve the complete design file before procurement and construction begin.";
    if (design.materials.length === 0) {
      design.materials.push(
        { category: "Adhesive", brand: "Swisstek", item: "Tile Adhesive", sort_order: 0 },
        { category: "Grout", brand: "Swisstek", item: "Grout", sort_order: 1 },
        { category: "Waterproofing", brand: "Tokyo Super 2K", item: "Waterproofing", sort_order: 2 },
        { category: "Electrical", brand: "ACL", item: "Wiring & Cables", sort_order: 3 }
      );
    }
    const samples = {
      render_1: "/images/designs/manel/render-1.jpeg",
      render_2: "/images/designs/manel/render-2.jpeg",
      render_3: "/images/designs/manel/render-3.jpeg",
      civil: "/images/designs/manel/sample-civil.webp",
      supply_water: "/images/designs/manel/sample-supply-water.webp",
      waste_drainage: "/images/designs/manel/sample-waste-drainage.webp",
      electrical: "/images/designs/manel/sample-electrical.webp"
    };
    for (const [kind, image_url] of Object.entries(samples)) {
      if (!design.drawings.some((drawing) => drawing.kind === kind)) {
        design.drawings.push({ kind, image_url });
      }
    }
  }
  const collectionLabel = design.collection.charAt(0).toUpperCase() + design.collection.slice(1);
  const priceLabel = design.starting_price_lkr > 0 ? formatLKRM(design.starting_price_lkr) : "Starting price to be confirmed";
  const newPrice = design.new_starting_price_lkr || design.starting_price_lkr || null;
  const renoPrice = design.renovation_starting_price_lkr ?? null;
  const inspectionHref = `/book-site-inspection?design=${encodeURIComponent(design.slug)}`;
  const drawingOf = (kind) => design.drawings.find((d) => d.kind === kind) ?? null;
  const renders = ["render_1", "render_2", "render_3", "render_4"].map((k) => drawingOf(k)).filter((r) => Boolean(r));
  const STEP_COPY = [
    { n: "I", kicker: "Step one \xB7 At the door", title: "The first glance across the room" },
    { n: "II", kicker: "Step two \xB7 The vanity wall", title: "Stone and warm mirror light" },
    { n: "III", kicker: "Step three \xB7 Into the shower", title: "The walk-in shower and niche" },
    { n: "IV", kicker: "Step four \xB7 Turn around", title: "The whole room, looking back" }
  ];
  const stepSources = [
    ...design.cover_image_url ? [{ image: design.cover_image_url, caption: null }] : [],
    ...renders.map((r) => ({ image: r.image_url, caption: r.caption ?? null }))
  ];
  const steps = stepSources.slice(0, STEP_COPY.length).map((source, i) => ({
    ...STEP_COPY[i],
    image: source.image,
    title: source.caption || STEP_COPY[i].title
  }));
  const TECH = [
    { kind: "civil", label: "Civil Drawing", tag: "Plan & levels" },
    { kind: "supply_water", label: "Water Supply Layout", tag: "Plumbing" },
    { kind: "waste_drainage", label: "Waste & Drainage Layout", tag: "Plumbing" },
    { kind: "electrical", label: "Electrical Layout", tag: "Points & lighting" }
  ];
  const video3d = youtubeEmbed(design.video_3d_url);
  const priceTiers = design.price_tiers.length > 0 ? design.price_tiers : (catalogueDesign?.pricingTiers ?? []).map((tier, sort_order) => ({
    label: tier.label,
    sqm: tier.sqm,
    new_price_lkr: tier.newPrice,
    renovation_price_lkr: tier.renovationPrice,
    sort_order
  }));
  const perSqmRate = (() => {
    if (priceTiers.length < 2) return null;
    const [a, b] = priceTiers;
    const span = b.sqm - a.sqm;
    if (span <= 0) return null;
    const rate = (b.new_price_lkr - a.new_price_lkr) / span;
    return rate > 0 ? Math.round(rate) : null;
  })();
  const categoryRank = (f) => {
    const i = FIXTURE_CATEGORIES.bathrooms.indexOf(f.category);
    return i === -1 ? FIXTURE_CATEGORIES.bathrooms.length : i;
  };
  const fixtures = [...design.fixtures].sort((a, b) => a.sort_order - b.sort_order || categoryRank(a) - categoryRank(b));
  const roomImage = renders[0]?.image_url ?? design.cover_image_url;
  const romanNumeral = (n) => ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX"][n - 1] ?? String(n);
  const allRelated = storedDesign?.id ? await getProjects({ designId: storedDesign.id }) : (await getProjects()).filter((project) => project.design?.slug === design.slug);
  const related = allRelated.filter((project) => project.after_image_url).slice(0, 3);
  const testimonials = allRelated.filter((project) => project.review_text).slice(0, 2).map((project) => ({
    text: project.review_text,
    who: [project.review_by, project.location].filter(Boolean).join(" \xB7 ") || "LUXEhome client"
  }));
  const nameHeading = design.name_heading || `Inspired by the ${design.name} flower.`;
  const nameStory = design.name_story || (design.slug === "manel" ? "Named after Sri Lanka\u2019s blue water lily, this design translates its deep blue character and quiet symmetry into a composed Signature bathroom." : design.description || `The ${design.name} carries its namesake\u2019s character into a fully documented ${collectionLabel} bathroom.`);
  const materialsWithPhotos = design.materials.filter((m) => m.image_url);
  const roomLength = design.room_length_m ?? (design.slug === "manel" ? 2.5 : null);
  const roomWidth = design.room_width_m ?? (design.slug === "manel" ? 2 : null);
  const productSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${design.name} \u2014 ${collectionLabel} ${design.space?.name ?? ""} Design`,
    description: design.tagline ?? design.description ?? "",
    ...design.cover_image_url ? { image: cloudinary(design.cover_image_url, 1200) } : {},
    brand: { "@type": "Brand", name: "LUXEhome" },
    ...design.starting_price_lkr > 0 ? { offers: {
      "@type": "Offer",
      price: design.starting_price_lkr,
      priceCurrency: "LKR",
      availability: "https://schema.org/InStock",
      url: new URL(`/designs/${design.slug}`, Astro2.site ?? "https://luxehome.lk").href
    } } : {}
  });
  return renderTemplate(_b || (_b = __template(["", " <script>\n(function () {\n  // Scroll cue \u2192 glide past the hero\n  var cue = document.getElementById('wx-hero-cue');\n  var hero = document.getElementById('wx-hero');\n  if (cue && hero) {\n    cue.addEventListener('click', function () {\n      window.scrollTo({ top: hero.offsetTop + hero.offsetHeight, behavior: 'smooth' });\n    });\n  }\n\n  // Sticky book bar appears once the hero has been passed\n  var bar = document.getElementById('wx-bar');\n  if (bar && hero && 'IntersectionObserver' in window) {\n    new IntersectionObserver(function (entries) {\n      bar.classList.toggle('show', !entries[0].isIntersecting);\n    }, { threshold: 0 }).observe(hero);\n  } else if (bar) {\n    bar.classList.add('show');\n  }\n\n  // Gentle hero parallax (skipped for reduced motion)\n  var media = document.getElementById('wx-hero-media');\n  if (media && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {\n    var ticking = false;\n    window.addEventListener('scroll', function () {\n      if (ticking) return;\n      ticking = true;\n      requestAnimationFrame(function () {\n        media.style.transform = 'translateY(' + (window.scrollY * 0.18) + 'px)';\n        ticking = false;\n      });\n    }, { passive: true });\n  }\n\n  // Fixture explorer\n  var explorer = document.querySelector('[data-fixture-explorer]');\n  if (explorer) {\n    explorer.addEventListener('click', function (event) {\n      var tab = event.target.closest('[data-fixture-tab]');\n      if (!tab) return;\n      var index = tab.getAttribute('data-fixture-tab');\n      explorer.querySelectorAll('[data-fixture-tab]').forEach(function (el) {\n        var on = el === tab;\n        el.classList.toggle('on', on);\n        el.setAttribute('aria-selected', on ? 'true' : 'false');\n      });\n      explorer.querySelectorAll('[data-fixture-panel]').forEach(function (el) {\n        el.classList.toggle('on', el.getAttribute('data-fixture-panel') === index);\n      });\n      explorer.querySelectorAll('[data-fixture-img]').forEach(function (el) {\n        el.classList.toggle('on', el.getAttribute('data-fixture-img') === index);\n      });\n    });\n  }\n})();\n<\/script> "])), renderComponent($$result, "LuxeLayout", $$LuxeLayout, { "title": `${design.name} \u2014 ${collectionLabel} ${design.space?.name ?? ""} Design | ${priceLabel} | LUXEhome`, "description": `${design.name}: ${design.tagline ?? "a fully documented LUXEhome design"}. ${priceLabel}. Walk through the renders, fixtures, drawings and pricing, then book a site inspection to check the fit.`, "ogImage": design.cover_image_url ? cloudinary(design.cover_image_url, 1200) : void 0, "data-astro-cid-dgwipaux": true }, { "default": async ($$result2) => renderTemplate`   ${maybeRenderHead()}<header class="wx-hero" id="wx-hero" data-astro-cid-dgwipaux> <div class="wx-hero-media" id="wx-hero-media" data-astro-cid-dgwipaux> ${design.cover_image_url ? renderTemplate`<img${addAttribute(cloudinary(design.cover_image_url, 1600), "src")}${addAttribute(`${design.name} \u2014 the view from the doorway`, "alt")} width="1600" height="1000" fetchpriority="high" data-astro-cid-dgwipaux>` : renderTemplate`<div class="wx-placeholder wx-placeholder--hero" data-astro-cid-dgwipaux><strong data-astro-cid-dgwipaux>LUXE</strong><em data-astro-cid-dgwipaux>home</em><span data-astro-cid-dgwipaux>${design.name}</span></div>`} </div> <div class="wx-hero-shade" aria-hidden="true" data-astro-cid-dgwipaux></div> <div class="wx-hero-copy" data-astro-cid-dgwipaux> <p class="wx-kicker wx-kicker--light" data-astro-cid-dgwipaux>${collectionLabel} Collection · Bathrooms</p> <h1 data-astro-cid-dgwipaux>${design.name}</h1> ${design.tagline && renderTemplate`<p class="wx-hero-tagline" data-astro-cid-dgwipaux>${design.tagline}</p>`} <div class="wx-hero-prices" data-astro-cid-dgwipaux> ${newPrice && renderTemplate`<div data-astro-cid-dgwipaux><span data-astro-cid-dgwipaux>New bathroom</span><strong data-astro-cid-dgwipaux>From ${lkrM(newPrice)}</strong></div>`} ${renoPrice && renderTemplate`<div data-astro-cid-dgwipaux><span data-astro-cid-dgwipaux>Renovation</span><strong data-astro-cid-dgwipaux>From ${lkrM(renoPrice)}</strong></div>`} </div> </div> <button class="wx-hero-cue" id="wx-hero-cue" aria-label="Scroll down" data-astro-cid-dgwipaux> <span data-astro-cid-dgwipaux>Step inside</span> <span class="wx-cue-line" aria-hidden="true" data-astro-cid-dgwipaux></span> <span aria-hidden="true" data-astro-cid-dgwipaux>↓</span> </button> </header>  <section class="wx-threshold" data-astro-cid-dgwipaux> <p class="wx-kicker" data-astro-cid-dgwipaux>You are standing at the doorway</p> <p class="wx-statement" data-astro-cid-dgwipaux>A complete bathroom, documented to the last fitting — <em data-astro-cid-dgwipaux>before</em> a single tile is laid.</p> <div class="wx-threshold-cta" data-astro-cid-dgwipaux> <a${addAttribute(inspectionHref, "href")} data-astro-cid-dgwipaux><span data-astro-cid-dgwipaux>Inspect my bathroom for this design</span><b aria-hidden="true" data-astro-cid-dgwipaux>→</b></a> <small data-astro-cid-dgwipaux>LKR 10,000 · No measurements needed</small> </div> </section>  ${(design.inspiration_image_url || nameStory) && renderTemplate`<section class="wx-name" data-astro-cid-dgwipaux> <div class="wx-name-grid" data-astro-cid-dgwipaux> <div class="wx-name-flower" data-astro-cid-dgwipaux> ${design.inspiration_image_url ? renderTemplate`<img${addAttribute(cloudinary(design.inspiration_image_url, 420), "src")}${addAttribute(`The ${design.name} flower \u2014 the inspiration behind this design`, "alt")} loading="lazy" width="420" height="420" data-astro-cid-dgwipaux>` : renderTemplate`<span aria-hidden="true" data-astro-cid-dgwipaux>${design.name.charAt(0)}</span>`} </div> <div data-astro-cid-dgwipaux> <p class="wx-kicker" data-astro-cid-dgwipaux>The name behind the design</p> <h2 data-astro-cid-dgwipaux>${nameHeading}</h2> <p class="wx-body" data-astro-cid-dgwipaux>${nameStory}</p> </div> </div> </section>`} ${steps.length >= 2 && renderTemplate`<section id="walkin" data-astro-cid-dgwipaux> <div class="wx-section wx-walkin-intro" data-astro-cid-dgwipaux> <p class="wx-kicker" data-astro-cid-dgwipaux>The walk-in</p> <h2 data-astro-cid-dgwipaux>Step inside, one view at a time.</h2> <p class="wx-body" data-astro-cid-dgwipaux>Scroll down and the room unfolds exactly as it does at the door — each view settling before the next arrives.</p> </div> <div class="wx-steps" data-astro-cid-dgwipaux> ${steps.map((step) => renderTemplate`<div class="wx-step" data-astro-cid-dgwipaux> <img${addAttribute(cloudinary(step.image, 1600), "src")}${addAttribute(`${design.name} \u2014 ${step.title}`, "alt")} loading="lazy" width="1600" height="1000" data-astro-cid-dgwipaux> <div class="wx-step-shade" aria-hidden="true" data-astro-cid-dgwipaux></div> <div class="wx-step-copy" data-astro-cid-dgwipaux> <div data-astro-cid-dgwipaux> <p class="wx-kicker wx-kicker--faded" data-astro-cid-dgwipaux>${step.kicker}</p> <strong data-astro-cid-dgwipaux>${step.title}</strong> </div> <em aria-hidden="true" data-astro-cid-dgwipaux>${step.n}</em> </div> </div>`)} </div> </section>`} <section id="fixtures" class="wx-section" data-fixture-explorer data-astro-cid-dgwipaux> <div class="wx-heading-row" data-astro-cid-dgwipaux> <div data-astro-cid-dgwipaux> <p class="wx-kicker" data-astro-cid-dgwipaux>Walk up to the vanity</p> <h2 data-astro-cid-dgwipaux>Every fixture, up close.</h2> </div> <p class="wx-aside" data-astro-cid-dgwipaux>Choose a fitting to see the exact specification${fixtures.some((f) => f.reference_price_label) ? " and its reference price" : ""}.</p> </div> ${fixtures.length > 0 ? renderTemplate`<div class="wxf-layout" data-astro-cid-dgwipaux> <div class="wxf-canvas" data-astro-cid-dgwipaux> ${fixtures.map((f, i) => renderTemplate`<img${addAttribute(["wxf-canvas-img", { on: i === 0 }], "class:list")}${addAttribute(i, "data-fixture-img")}${addAttribute(cloudinary(f.image_url || roomImage || design.cover_image_url || "", 900), "src")}${addAttribute(f.image_alt || `${f.brand ? `${f.brand} ` : ""}${f.name}`, "alt")}${addAttribute(i === 0 ? "eager" : "lazy", "loading")} width="900" height="1125" data-astro-cid-dgwipaux>`)} </div> <div class="wxf-right" data-astro-cid-dgwipaux> <div class="wxf-panels" data-astro-cid-dgwipaux> ${fixtures.map((f, i) => renderTemplate`<div${addAttribute(["wxf-panel", { on: i === 0 }], "class:list")}${addAttribute(i, "data-fixture-panel")} data-astro-cid-dgwipaux> <div data-astro-cid-dgwipaux> <div class="wxf-n" data-astro-cid-dgwipaux>${romanNumeral(i + 1).toLowerCase()} · ${f.category}</div> <h3 data-astro-cid-dgwipaux>${f.brand ? `${f.brand} \u2014 ` : ""}${f.name}</h3> ${f.spec && renderTemplate`<p class="wxf-spec" data-astro-cid-dgwipaux>${f.spec}</p>`} <dl class="wxf-meta" data-astro-cid-dgwipaux> ${f.model_code && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-dgwipaux": true }, { "default": async ($$result3) => renderTemplate`<dt data-astro-cid-dgwipaux>Model</dt><dd data-astro-cid-dgwipaux>${f.model_code}</dd>` })}`} ${f.finish && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-dgwipaux": true }, { "default": async ($$result3) => renderTemplate`<dt data-astro-cid-dgwipaux>Finish</dt><dd data-astro-cid-dgwipaux>${f.finish}</dd>` })}`} ${f.quantity > 1 && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-dgwipaux": true }, { "default": async ($$result3) => renderTemplate`<dt data-astro-cid-dgwipaux>Quantity</dt><dd data-astro-cid-dgwipaux>${f.quantity}</dd>` })}`} ${f.warranty_period && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-dgwipaux": true }, { "default": async ($$result3) => renderTemplate`<dt data-astro-cid-dgwipaux>Warranty</dt><dd data-astro-cid-dgwipaux>${f.warranty_period}</dd>` })}`} </dl> <span${addAttribute(["wxf-badge", { optional: f.included === false }], "class:list")} data-astro-cid-dgwipaux>${f.included === false ? "Optional upgrade" : "Included"}</span> </div> ${f.reference_price_label && renderTemplate`<div class="wxf-price" data-astro-cid-dgwipaux><span data-astro-cid-dgwipaux>Reference price</span><strong data-astro-cid-dgwipaux>${f.reference_price_label}</strong></div>`} </div>`)} </div> <div class="wxf-tabs" role="tablist" aria-label="Fixtures in this design" data-astro-cid-dgwipaux> ${fixtures.map((f, i) => renderTemplate`<button type="button"${addAttribute(i, "data-fixture-tab")}${addAttribute([{ on: i === 0 }], "class:list")} role="tab"${addAttribute(i === 0 ? "true" : "false", "aria-selected")} data-astro-cid-dgwipaux> <em aria-hidden="true" data-astro-cid-dgwipaux>${String(i + 1).padStart(2, "0")}</em> <span data-astro-cid-dgwipaux>${f.name}</span> ${f.reference_price_label && renderTemplate`<small data-astro-cid-dgwipaux>${f.reference_price_label}</small>`} </button>`)} </div> </div> </div>` : renderTemplate`<div class="wxf-empty" data-astro-cid-dgwipaux><strong data-astro-cid-dgwipaux>The full schedule is being prepared.</strong><p data-astro-cid-dgwipaux>The confirmed tiles, bathware, tapware, shower, lighting and accessory specification will be published here. A site inspection can still confirm whether this layout is suitable for your room.</p><a${addAttribute(inspectionHref, "href")} data-astro-cid-dgwipaux>Check this design against my bathroom →</a></div>`} </section>  <section id="pricing" class="wx-dark" data-astro-cid-dgwipaux> <div class="wx-section" data-astro-cid-dgwipaux> <p class="wx-kicker wx-kicker--sage" data-astro-cid-dgwipaux>Pricing</p> <h2 class="wx-dark-title" data-astro-cid-dgwipaux>A starting price for the minimum room.</h2> <p class="wx-body wx-body--dark" data-astro-cid-dgwipaux> ${renoPrice ? `Both prices hold the full ${design.name} specification for a ${design.min_sqm ?? priceTiers[0]?.sqm ?? "\u2014"} m\xB2 room.${perSqmRate ? " Every additional square metre of floor, wall and construction area is added at a flat rate." : ""}` : `The starting price holds the full ${design.name} specification for a ${design.min_sqm ?? priceTiers[0]?.sqm ?? "\u2014"} m\xB2 room.${perSqmRate ? " Every additional square metre of floor, wall and construction area is added at a flat rate." : ""}`} </p> <div class="wx-from-grid" data-astro-cid-dgwipaux> ${newPrice && renderTemplate`<div class="wx-from-card" data-astro-cid-dgwipaux> <span data-astro-cid-dgwipaux>New bathroom</span> <div data-astro-cid-dgwipaux><small data-astro-cid-dgwipaux>From</small><strong data-astro-cid-dgwipaux>${lkrM(newPrice)}</strong></div> <em data-astro-cid-dgwipaux>${design.min_sqm ? `Minimum ${design.min_sqm} m\xB2` : "Minimum fit"} · complete build</em> </div>`} ${renoPrice && renderTemplate`<div class="wx-from-card" data-astro-cid-dgwipaux> <span data-astro-cid-dgwipaux>Renovation</span> <div data-astro-cid-dgwipaux><small data-astro-cid-dgwipaux>From</small><strong data-astro-cid-dgwipaux>${lkrM(renoPrice)}</strong></div> <em data-astro-cid-dgwipaux>${design.min_sqm ? `Minimum ${design.min_sqm} m\xB2` : "Minimum fit"} · existing room</em> </div>`} </div> ${priceTiers.length > 0 && renderTemplate`<div class="wx-tiers" data-astro-cid-dgwipaux> <p class="wx-kicker wx-kicker--sage" data-astro-cid-dgwipaux>Choose by room size</p> <div class="wx-tier-head" role="row" data-astro-cid-dgwipaux><span data-astro-cid-dgwipaux>Fit</span><span data-astro-cid-dgwipaux>Area</span><span data-astro-cid-dgwipaux>New</span><span data-astro-cid-dgwipaux>Renovation</span></div> ${priceTiers.map((tier) => renderTemplate`<div class="wx-tier-row" role="row" data-astro-cid-dgwipaux> <span class="wx-tier-label" data-astro-cid-dgwipaux>${tier.label}</span> <span class="wx-tier-area" data-astro-cid-dgwipaux>${tier.sqm} m²</span> <span data-astro-cid-dgwipaux>${lkrM(tier.new_price_lkr)}</span> <span class="wx-tier-reno" data-astro-cid-dgwipaux>${lkrM(tier.renovation_price_lkr)}</span> </div>`)} </div>`} ${perSqmRate && renderTemplate`<div class="wx-rate" data-astro-cid-dgwipaux> <em data-astro-cid-dgwipaux>Each additional square metre</em> <strong data-astro-cid-dgwipaux>+ LKR ${perSqmRate.toLocaleString("en-LK")} <span data-astro-cid-dgwipaux>/ m²</span></strong> </div>`} <p class="wx-fineprint" data-astro-cid-dgwipaux>Final area is confirmed on site inspection. Larger or complex rooms are quoted from the same rate. Room proportions, ceiling height, access, service relocation and structural changes are assessed separately.</p> <a class="wx-dark-cta"${addAttribute(inspectionHref, "href")} data-astro-cid-dgwipaux>Check this design against my bathroom →</a> </div> </section>  ${design.materials.length > 0 && renderTemplate`<section id="materials" class="wx-section" data-astro-cid-dgwipaux> <p class="wx-kicker" data-astro-cid-dgwipaux>Reach out and touch</p> <h2 data-astro-cid-dgwipaux>Materials &amp; finishes.</h2> ${materialsWithPhotos.length > 0 && renderTemplate`<div class="wx-mat-grid" data-astro-cid-dgwipaux> ${materialsWithPhotos.map((m) => renderTemplate`<figure class="wx-mat" data-astro-cid-dgwipaux> <div class="wx-mat-img" data-astro-cid-dgwipaux> <img${addAttribute(cloudinary(m.image_url, 700), "src")}${addAttribute(`${m.brand}${m.item ? ` \u2014 ${m.item}` : ""}`, "alt")} loading="lazy" width="700" height="875" data-astro-cid-dgwipaux> </div> <figcaption data-astro-cid-dgwipaux> <span data-astro-cid-dgwipaux>${m.brand}</span> <em data-astro-cid-dgwipaux>${m.usage_label || m.category}</em> </figcaption> </figure>`)} </div>`} <div class="wx-chips" data-astro-cid-dgwipaux> ${design.materials.map((m) => renderTemplate`<span class="wx-chip" data-astro-cid-dgwipaux><strong data-astro-cid-dgwipaux>${m.brand}</strong>${m.item ? ` \xB7 ${m.item}` : ""}</span>`)} </div> </section>`} ${design.min_sqm && renderTemplate`<section id="plan" class="wx-panel-band" data-astro-cid-dgwipaux> <div class="wx-section wx-plan-grid" data-astro-cid-dgwipaux> <div data-astro-cid-dgwipaux> <p class="wx-kicker" data-astro-cid-dgwipaux>The room, from above</p> <h2 data-astro-cid-dgwipaux>A plan drawn for ${design.min_sqm} m².</h2> <p class="wx-body" data-astro-cid-dgwipaux>The ${design.name} layout is set out to the minimum fit — vanity, water closet and walk-in shower composed around a single clear line of movement.</p> <div class="wx-plan-stats" data-astro-cid-dgwipaux> ${roomLength && renderTemplate`<div data-astro-cid-dgwipaux><strong data-astro-cid-dgwipaux>${roomLength}<span data-astro-cid-dgwipaux>m</span></strong><em data-astro-cid-dgwipaux>Length</em></div>`} ${roomWidth && renderTemplate`<div data-astro-cid-dgwipaux><strong data-astro-cid-dgwipaux>${roomWidth}<span data-astro-cid-dgwipaux>m</span></strong><em data-astro-cid-dgwipaux>Width</em></div>`} <div data-astro-cid-dgwipaux><strong data-astro-cid-dgwipaux>${design.min_sqm}<span data-astro-cid-dgwipaux>m²</span></strong><em data-astro-cid-dgwipaux>Min. area</em></div> </div> </div> ${design.plan_image_url ? renderTemplate`<div class="wx-plan-canvas" data-astro-cid-dgwipaux> <img class="wx-plan-photo"${addAttribute(cloudinary(design.plan_image_url, 900), "src")}${addAttribute(`${design.name} floor plan at the minimum fit`, "alt")} loading="lazy" width="900" height="1125" data-astro-cid-dgwipaux> <small data-astro-cid-dgwipaux>Layout at the minimum fit — customised to your room in the design file.</small> </div>` : renderTemplate`<div class="wx-plan-canvas"${addAttribute(`Illustrative ${design.name} floor plan at the minimum fit`, "aria-label")} data-astro-cid-dgwipaux> <svg viewBox="0 0 400 500" width="100%" role="img" data-astro-cid-dgwipaux> <rect x="40" y="40" width="320" height="420" fill="none" stroke="#3B3B33" stroke-width="2" data-astro-cid-dgwipaux></rect> <path d="M150 460 L150 400 A60 60 0 0 1 210 460 Z" fill="none" stroke="#B7B09E" stroke-width="1.2" stroke-dasharray="4 4" data-astro-cid-dgwipaux></path> <line x1="150" y1="460" x2="210" y2="460" stroke="#F3EDE3" stroke-width="4" data-astro-cid-dgwipaux></line> <rect x="40" y="40" width="150" height="70" fill="#DDE1D4" stroke="#5B6349" stroke-width="1.4" data-astro-cid-dgwipaux></rect> <ellipse cx="115" cy="75" rx="34" ry="20" fill="none" stroke="#5B6349" stroke-width="1.4" data-astro-cid-dgwipaux></ellipse> <text x="115" y="130" text-anchor="middle" font-size="13" fill="#5B6349" letter-spacing="1.5" data-astro-cid-dgwipaux>VANITY</text> <rect x="270" y="40" width="90" height="90" fill="#DDE1D4" stroke="#5B6349" stroke-width="1.4" data-astro-cid-dgwipaux></rect> <ellipse cx="315" cy="90" rx="24" ry="30" fill="none" stroke="#5B6349" stroke-width="1.4" data-astro-cid-dgwipaux></ellipse> <text x="315" y="152" text-anchor="middle" font-size="13" fill="#5B6349" letter-spacing="1.5" data-astro-cid-dgwipaux>WC</text> <rect x="240" y="300" width="120" height="160" fill="#DDE1D4" stroke="#5B6349" stroke-width="1.4" data-astro-cid-dgwipaux></rect> <line x1="240" y1="300" x2="360" y2="460" stroke="#B7B09E" stroke-width="1" stroke-dasharray="3 3" data-astro-cid-dgwipaux></line> <circle cx="340" cy="322" r="7" fill="none" stroke="#5B6349" stroke-width="1.4" data-astro-cid-dgwipaux></circle> <text x="300" y="392" text-anchor="middle" font-size="13" fill="#5B6349" letter-spacing="1.5" data-astro-cid-dgwipaux>SHOWER</text> ${roomLength && renderTemplate`<text x="200" y="26" text-anchor="middle" font-size="12" fill="#8A897C" data-astro-cid-dgwipaux>${roomLength} m</text>`} ${roomWidth && renderTemplate`<text x="24" y="255" text-anchor="middle" font-size="12" fill="#8A897C" transform="rotate(-90 24 255)" data-astro-cid-dgwipaux>${roomWidth} m</text>`} </svg> <small data-astro-cid-dgwipaux>Illustrative layout at the minimum fit — customised to your room in the design file.</small> </div>`} </div> </section>`} <section id="drawings" class="wx-section" data-astro-cid-dgwipaux> <p class="wx-kicker" data-astro-cid-dgwipaux>Documented before construction</p> <h2 data-astro-cid-dgwipaux>Technical drawings.</h2> <p class="wx-body" data-astro-cid-dgwipaux>Four drawing sets — sampled here for a 2.5 m × 2 m (5 m²) room and customised to your bathroom in the design file. Illustrative only; not for construction.</p> <div class="wx-draw-grid" data-astro-cid-dgwipaux> ${TECH.map((t) => {
    const dr = drawingOf(t.kind);
    return renderTemplate`<figure class="wx-draw" data-astro-cid-dgwipaux> <div class="wx-draw-img" data-astro-cid-dgwipaux> ${dr ? renderTemplate`<img${addAttribute(cloudinary(dr.image_url, 800), "src")}${addAttribute(`${design.name} \u2014 ${t.label} sample`, "alt")} loading="lazy" width="800" height="600" data-astro-cid-dgwipaux>` : renderTemplate`<div class="wx-placeholder" data-astro-cid-dgwipaux><span data-astro-cid-dgwipaux>${t.label}</span><small data-astro-cid-dgwipaux>Coming soon</small></div>`} <div class="wx-watermark" aria-hidden="true" data-astro-cid-dgwipaux></div> </div> <figcaption data-astro-cid-dgwipaux><span data-astro-cid-dgwipaux>${t.label}</span><em data-astro-cid-dgwipaux>${t.tag}</em></figcaption> </figure>`;
  })} </div> </section>  ${video3d && design.cover_image_url && renderTemplate`<section class="wx-panel-band" data-astro-cid-dgwipaux> <div class="wx-section wx-video-grid" data-astro-cid-dgwipaux> <div data-astro-cid-dgwipaux> <p class="wx-kicker" data-astro-cid-dgwipaux>Vertical 3D walkthrough</p> <h2 data-astro-cid-dgwipaux>Walk through the ${design.name}.</h2> <p class="wx-body" data-astro-cid-dgwipaux>See the vanity, water closet, shower and complete room in one short walkthrough — the same route you’d take stepping in the door.</p> </div> ${renderComponent($$result2, "VideoCard", $$VideoCard, { "title": `${design.name} 3D Walkthrough`, "embedUrl": video3d, "coverImage": cloudinary(design.cover_image_url, 700), "eyebrow": "3D walkthrough", "description": "Tap to watch the complete vertical walkthrough.", "data-astro-cid-dgwipaux": true })} </div> </section>`} ${related.length > 0 && renderTemplate`<section class="wx-section" data-astro-cid-dgwipaux> <div class="wx-heading-row" data-astro-cid-dgwipaux> <div data-astro-cid-dgwipaux> <p class="wx-kicker" data-astro-cid-dgwipaux>From design to reality</p> <h2 data-astro-cid-dgwipaux>See the ${design.name} built.</h2> </div> <p class="wx-aside" data-astro-cid-dgwipaux>Real completed bathrooms based on this design, including their customisations and complete project stories.</p> </div> <div class="wx-related" data-astro-cid-dgwipaux> ${related.map((project) => renderTemplate`${renderComponent($$result2, "ProjectCard", $$ProjectCard, { "project": project, "compact": true, "data-astro-cid-dgwipaux": true })}`)} </div> </section>`} ${testimonials.length > 0 && renderTemplate`<section class="wx-dark" data-astro-cid-dgwipaux> <div class="wx-section wx-quote-grid" data-astro-cid-dgwipaux> ${testimonials.map((quote) => renderTemplate`<figure class="wx-quote" data-astro-cid-dgwipaux> <blockquote data-astro-cid-dgwipaux>“${quote.text}”</blockquote> <figcaption data-astro-cid-dgwipaux>${quote.who}</figcaption> </figure>`)} </div> </section>`} ${(design.workflow_text || design.timeline.length > 0) && renderTemplate`<section class="wx-section" data-astro-cid-dgwipaux> <p class="wx-kicker" data-astro-cid-dgwipaux>From approval to handover</p> <h2 data-astro-cid-dgwipaux>How it gets built.</h2> ${design.workflow_text && renderTemplate`<p class="wx-body" data-astro-cid-dgwipaux>${design.workflow_text}</p>`} ${design.timeline.length > 0 && renderTemplate`<ol class="wx-timeline" data-astro-cid-dgwipaux> ${design.timeline.map((t) => renderTemplate`<li data-astro-cid-dgwipaux> <span class="wx-tl-dot" aria-hidden="true" data-astro-cid-dgwipaux></span> <div class="wx-tl-week" data-astro-cid-dgwipaux>${t.week_label}</div> <div class="wx-tl-title" data-astro-cid-dgwipaux>${t.title}</div> ${t.description && renderTemplate`<p data-astro-cid-dgwipaux>${t.description}</p>`} </li>`)} </ol>`} </section>`} ${design.faq.length > 0 && renderTemplate`<section class="wx-section" data-astro-cid-dgwipaux> <p class="wx-kicker" data-astro-cid-dgwipaux>Before you ask</p> <h2 data-astro-cid-dgwipaux>Questions about ${design.name}.</h2> <div class="wx-faq" data-astro-cid-dgwipaux> ${design.faq.map((f) => renderTemplate`<details class="wx-faq-item" data-astro-cid-dgwipaux> <summary data-astro-cid-dgwipaux>${f.question}</summary> <p data-astro-cid-dgwipaux>${f.answer}</p> </details>`)} </div> </section>`} <section id="warranty" class="wx-section" data-astro-cid-dgwipaux> <p class="wx-kicker" data-astro-cid-dgwipaux>Warranty &amp; aftercare</p> <h2 data-astro-cid-dgwipaux>Protected after handover.</h2> <p class="wx-body" data-astro-cid-dgwipaux>Every LUXEhome bathroom is handed over with written warranties — ${WARRANTY_HEADLINE.period} on the complete bathroom, and a documented period against each component. <a class="wx-inline-link" href="/warranty-aftercare" data-astro-cid-dgwipaux>Read how warranty support works →</a></p> <div class="wx-warranty" data-astro-cid-dgwipaux> <div class="wx-warranty-headline" data-astro-cid-dgwipaux> <em data-astro-cid-dgwipaux>${WARRANTY_HEADLINE.period}</em> <strong data-astro-cid-dgwipaux>${WARRANTY_HEADLINE.label}</strong> <span data-astro-cid-dgwipaux>${WARRANTY_HEADLINE.note}</span> </div> <dl class="wx-warranty-schedule" data-astro-cid-dgwipaux> ${WARRANTY_SCHEDULE.map((w) => renderTemplate`<div data-astro-cid-dgwipaux><dt data-astro-cid-dgwipaux>${w.item}</dt><dd data-astro-cid-dgwipaux>${w.period}</dd></div>`)} </dl> </div> <p class="wx-fineprint wx-fineprint--light" data-astro-cid-dgwipaux>Periods run from handover and follow the agreed scope and care guidance. Where a specific product carries its own manufacturer cover, that period is listed against the item in the fixture schedule above.</p> </section>  <section id="book" class="wx-closing" data-astro-cid-dgwipaux> <p class="wx-kicker" data-astro-cid-dgwipaux>The practical next step</p> <h2 data-astro-cid-dgwipaux>Will the ${design.name} work in your bathroom?</h2> <p data-astro-cid-dgwipaux>We measure the room, review the site conditions and confirm the right fit before you commit to construction.</p> <a${addAttribute(inspectionHref, "href")} class="wx-book-btn" data-astro-cid-dgwipaux>Book site inspection · LKR 10,000</a> <small data-astro-cid-dgwipaux>No construction deposit is collected at this stage.</small> </section>  <div class="wx-bar" id="wx-bar" data-astro-cid-dgwipaux> <a${addAttribute(inspectionHref, "href")} data-astro-cid-dgwipaux> <span data-astro-cid-dgwipaux>Book ${design.name} inspection</span> <strong data-astro-cid-dgwipaux>LKR 10,000</strong> </a> </div> `, "head": async ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "head" }, { "default": async ($$result3) => renderTemplate(_a || (_a = __template([' <script type="application/ld+json">', "<\/script> "])), unescapeHTML(productSchema)) })}` }));
}, "/home/user/luxehome/src/pages/designs/[slug].astro", void 0);

const $$file = "/home/user/luxehome/src/pages/designs/[slug].astro";
const $$url = "/designs/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
