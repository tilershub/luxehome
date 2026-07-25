globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createAstro, f as createComponent, r as renderTemplate, h as addAttribute, o as renderSlot, l as renderHead, m as maybeRenderHead, n as renderScript } from './astro/server_qXath3RI.mjs';
/* empty css                          */

const WHATSAPP_NUMBER = "94774503744";
function waLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
function lkrM(rupees) {
  const millions = rupees / 1e6;
  const label = millions >= 10 ? millions.toFixed(0) : (Math.round(millions * 1e3) / 1e3).toString();
  return `LKR ${label}M`;
}
function formatLKRM(rupees) {
  const millions = rupees / 1e6;
  const label = millions >= 10 ? millions.toFixed(0) : (Math.round(millions * 1e3) / 1e3).toString();
  return `From LKR ${label}M`;
}
function cloudinary(url, width) {
  if (!url) return "";
  if (!url.includes("res.cloudinary.com") || !url.includes("/upload/")) return url;
  const t = width ? `f_auto,q_auto,w_${width}` : "f_auto,q_auto";
  return url.replace("/upload/", `/upload/${t}/`);
}
const FIXTURE_CATEGORIES = {
  // Ordered the way clients actually look through a bathroom. This order also
  // sequences the fixture schedule on the design page when sort_order is unset.
  bathrooms: [
    "Tile",
    "Water Closet",
    "Wash Basin",
    "Basin Mixer / Taps",
    "Shower",
    "Accessories",
    "Ceiling",
    "Light Fixtures",
    "Gully Covers",
    "Shower Cubicle",
    "Niche",
    "Mirror",
    "Cupboard / Vanity",
    "Bidet Spray",
    "Bathtub & Mixer",
    "Door",
    "Window",
    "Other"
  ]};
const WARRANTY_HEADLINE = {
  period: "5 years",
  label: "Complete bathroom",
  note: "Workmanship across the finished room, running from the tested handover."
};
const WARRANTY_SCHEDULE = [
  { item: "Bathware", period: "15 years" },
  { item: "Waterproofing", period: "10 years" },
  { item: "Plumbing", period: "10 years" },
  { item: "Taps & showers", period: "5 years" },
  { item: "Light fixtures", period: "1 year" },
  { item: "Ceiling", period: "1 year" }
];
const BRAND_STRIP = [
  "Swiss Bathware",
  "Rocell",
  "Swisstek",
  "S-lon",
  "Tokyo Super 2K",
  "ACL",
  "iPanel",
  "10mm Malaysian Tempered Glass",
  "Eco Board",
  "5mm Mirrors"
];
const PLANNER = {
  collections: {
    standard: { label: "Standard", basePrice: 1e6 },
    premium: { label: "Premium", basePrice: 16e5 },
    signature: { label: "Signature", basePrice: 2175e3 }
  },
  /** Size multipliers applied to a collection's base price. */
  sizeMultipliers: {
    compact: { label: "Compact (under 4 m²)", factor: 1 },
    standard: { label: "Standard (4–6 m²)", factor: 1.15 },
    large: { label: "Large (6 m²+)", factor: 1.35 }
  }
};

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://luxehome.lk");
const $$LuxeLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$LuxeLayout;
  const {
    title = "LUXEhome \u2014 Complete Bathroom Design & Construction, Sri Lanka",
    description = "Choose a fully documented bathroom design, then book a LKR 10,000 site inspection. LUXEhome measures, adapts and builds bathrooms in Sri Lanka.",
    ogImage = "https://luxehome.lk/og-bathroom.jpg",
    bare = false
  } = Astro2.props;
  const canonicalURL = new URL(Astro2.url.pathname, Astro2.site);
  Astro2.response.headers.set(
    "Cache-Control",
    "public, max-age=0, s-maxage=60, stale-while-revalidate=300"
  );
  return renderTemplate(_a || (_a = __template(['<html lang="en" class="luxe"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover"><meta name="theme-color" content="#F7F3EB">', "<title>", '</title><meta name="description"', '><link rel="canonical"', '><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="apple-touch-icon" href="/apple-touch-icon.png"><!-- Open Graph --><meta property="og:type" content="website"><meta property="og:title"', '><meta property="og:description"', '><meta property="og:site_name" content="LUXEhome"><meta property="og:url"', '><meta property="og:image"', '><meta property="og:locale" content="en_LK"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"', '><meta name="twitter:description"', '><meta name="twitter:image"', `><!-- Fonts: Cormorant Garamond (display) \xB7 Jost (body) \xB7 Noto Sans Sinhala --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,500;1,600&family=Jost:wght@300;400;500;600&family=Noto+Sans+Sinhala:wght@400;500&display=swap" media="print" onload="this.media='all'">`, '<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,500;1,600&family=Jost:wght@300;400;500;600&family=Noto+Sans+Sinhala:wght@400;500&display=swap"></noscript>', `<!-- Meta Pixel (same install as the rest of the site): stub + PageView
         immediately, network fetch deferred; Contact on wa.me/tel clicks --><script>
      (function (f, b) {
        var n = f.fbq = f.fbq || function () {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = n.queue || [];
        fbq('init', '1904211696933513');
        fbq('track', 'PageView');
        function loadPixel() {
          if (f.__fbLoaded) return;
          f.__fbLoaded = true;
          var t = b.createElement('script'); t.async = !0;
          t.src = 'https://connect.facebook.net/en_US/fbevents.js';
          var s = b.getElementsByTagName('script')[0];
          s.parentNode.insertBefore(t, s);
        }
        var idle = f.requestIdleCallback || function (cb) { return setTimeout(cb, 1500); };
        f.addEventListener('load', function () { idle(loadPixel); });
        b.addEventListener('click', function (e) {
          var a = e.target && e.target.closest && e.target.closest('a[href]');
          if (!a) return;
          var href = a.getAttribute('href') || '';
          if (href.indexOf('wa.me') !== -1 || href.indexOf('tel:') === 0) {
            fbq('track', 'Contact');
          }
        }, true);
      })(window, document);
    <\/script><noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1904211696933513&ev=PageView&noscript=1"></noscript>`, '</head> <body class="luxe-body"> ', ' <main id="main-content"> ', " </main> ", " <!-- Scroll reveal (respects prefers-reduced-motion via CSS) --> <script>\n      (function () {\n        var els = document.querySelectorAll('.lxr');\n        if (!('IntersectionObserver' in window) || !els.length) {\n          els.forEach && els.forEach(function (el) { el.classList.add('lxr-in'); });\n          return;\n        }\n        var io = new IntersectionObserver(function (entries) {\n          entries.forEach(function (en) {\n            if (en.isIntersecting) { en.target.classList.add('lxr-in'); io.unobserve(en.target); }\n          });\n        }, { threshold: 0.08 });\n        els.forEach(function (el) {\n          var r = el.getBoundingClientRect();\n          if (r.top < window.innerHeight) el.classList.add('lxr-in');\n          else io.observe(el);\n        });\n      })();\n    <\/script> <script>\n      (function () {\n        var burger = document.getElementById('lx-burger');\n        var menu = document.getElementById('lx-mobile-menu');\n        if (!burger || !menu) return;\n        burger.addEventListener('click', function () {\n          var open = !menu.hidden;\n          menu.hidden = open;\n          burger.setAttribute('aria-expanded', String(!open));\n          burger.classList.toggle('is-open', !open);\n        });\n      })();\n    <\/script> </body> </html> "])), renderScript($$result, "/home/user/luxehome/src/layouts/LuxeLayout.astro?astro&type=script&index=0&lang.ts"), title, addAttribute(description, "content"), addAttribute(canonicalURL, "href"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(canonicalURL, "content"), addAttribute(ogImage, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(ogImage, "content"), maybeRenderHead(), renderSlot($$result, $$slots["head"]), renderHead(), !bare && renderTemplate`<header class="lx-nav"> <a href="/" class="lx-wordmark" aria-label="LUXEhome — Home"><strong>LUXE</strong><em>home</em></a> <nav class="lx-nav-links" aria-label="Main"> <a href="/">Home</a> <a href="/designs">Designs</a> <a href="/projects">Projects</a> <a href="/how-it-works">How it works</a> <a href="/pricing-guide">Pricing</a> <a href="/blog">Journal</a> <a href="/about">About</a> <a href="/book-site-inspection">Book inspection · LKR 10k</a> </nav> <a${addAttribute(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi LUXEhome! I would like to talk about a project.")}`, "href")} class="lx-nav-wa" target="_blank" rel="noopener noreferrer">WhatsApp Us</a> <button class="lx-nav-burger" id="lx-burger" aria-label="Open menu" aria-expanded="false"> <span></span><span></span> </button> </header>
      <div class="lx-mobile-menu" id="lx-mobile-menu" hidden> <a href="/">Home</a> <a href="/designs">Bathroom designs</a> <a href="/projects">Projects</a> <a href="/how-it-works">How it works</a> <a href="/pricing-guide">Pricing</a> <a href="/blog">Journal</a> <a href="/about">About</a> <a href="/book-site-inspection">Book inspection · LKR 10k</a> <a${addAttribute(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi LUXEhome! I would like to talk about a project.")}`, "href")} class="lx-mobile-wa" target="_blank" rel="noopener noreferrer">WhatsApp Us</a> </div>`, renderSlot($$result, $$slots["default"]), !bare && renderTemplate`<footer class="lx-footer"> <div class="lx-footer-inner"> <a href="/" class="lx-wordmark lx-wordmark--footer"><strong>LUXE</strong><em>home</em></a> <p class="lx-footer-tag">Complete bathroom design &amp; construction · Sri Lanka<br>A sister brand of TILERSHUB</p> <div class="lx-footer-links"> <a href="/designs">Bathroom designs</a> <a href="/projects">Projects</a> <a href="/blog">Journal</a> <a href="/how-it-works">How it works</a> <a href="/materials-brands">Materials</a> <a href="/pricing-guide">Pricing</a> <a href="/team">Team</a> <a href="/faq">FAQ</a> <a href="/about">About</a> <a href="/contact">Contact</a> <a href="/book-site-inspection">Book inspection</a> </div> <div class="lx-footer-contact"> <a${addAttribute(`https://wa.me/${WHATSAPP_NUMBER}`, "href")} target="_blank" rel="noopener noreferrer">077 450 3744</a> <span>·</span> <span>luxehome.lk</span> </div> <div class="lx-footer-legal"> <a href="/terms">Terms</a> <a href="/privacy">Privacy</a> <a href="/warranty-terms">Warranty</a> <a href="/payment-cancellation">Payments</a> </div> </div> </footer>`);
}, "/home/user/luxehome/src/layouts/LuxeLayout.astro", void 0);

export { $$LuxeLayout as $, BRAND_STRIP as B, FIXTURE_CATEGORIES as F, PLANNER as P, WHATSAPP_NUMBER as W, WARRANTY_HEADLINE as a, WARRANTY_SCHEDULE as b, cloudinary as c, formatLKRM as f, lkrM as l, waLink as w };
