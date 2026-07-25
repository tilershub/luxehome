// <define:__ROUTES__>
var define_ROUTES_default = {
  version: 1,
  include: [
    "/*"
  ],
  exclude: [
    "/_astro/*",
    "/#",
    "/services/*",
    "/estimator",
    "/.assetsignore",
    "/apple-touch-icon.png",
    "/favicon-16x16.png",
    "/favicon-32x32.png",
    "/favicon.ico",
    "/favicon.svg",
    "/floor-tiling-hero.svg",
    "/hero-bathroom-card.webp",
    "/hero-bathroom-mobile.webp",
    "/hero-bathroom.webp",
    "/hero-kitchen-card.svg",
    "/hero-staircase-card.webp",
    "/hero-staircase.webp",
    "/og-bathroom.jpg",
    "/qmk.css",
    "/robots.txt",
    "/shop/premium-mirror.webp",
    "/shop/vanity-with-mirror.webp",
    "/spaces/bathroom.webp",
    "/spaces/floor.webp",
    "/spaces/kitchen.webp",
    "/spaces/staircase.webp",
    "/images/designs/manel/cover.jpeg",
    "/images/designs/manel/manel-flower.jpeg",
    "/images/designs/manel/render-1.jpeg",
    "/images/designs/manel/render-2.jpeg",
    "/images/designs/manel/render-3.jpeg",
    "/images/designs/manel/sample-civil.svg",
    "/images/designs/manel/sample-civil.webp",
    "/images/designs/manel/sample-electrical.svg",
    "/images/designs/manel/sample-electrical.webp",
    "/images/designs/manel/sample-supply-water.svg",
    "/images/designs/manel/sample-supply-water.webp",
    "/images/designs/manel/sample-waste-drainage.svg",
    "/images/designs/manel/sample-waste-drainage.webp",
    "/images/fixtures/swiss-pop/pop-floor-mount-rimless.jpg",
    "/about",
    "/admin",
    "/admin/blog",
    "/admin/catalogue",
    "/admin/catalogue/designs",
    "/admin/catalogue/designs/new",
    "/admin/catalogue/projects",
    "/admin/catalogue/projects/new",
    "/admin/catalogue/team",
    "/admin/catalogue/team/new",
    "/admin/cms",
    "/admin/cms/designs",
    "/admin/cms/projects",
    "/admin/cms/blog",
    "/admin/cms/pages",
    "/admin/cms/products",
    "/admin/cms/categories",
    "/admin/cms/inspections",
    "/admin/cms/team",
    "/admin/cms/media",
    "/admin/cms/settings",
    "/admin/crm",
    "/admin/luxehome",
    "/admin/projects",
    "/admin/shop",
    "/design-recommendation",
    "/thank-you",
    "/whole-home-planner"
  ]
};

// node_modules/wrangler/templates/pages-dev-pipeline.ts
import worker from "/home/user/luxehome/.wrangler/tmp/pages-iU2apo/bundledWorker-0.7416652032454507.mjs";
import { isRoutingRuleMatch } from "/home/user/luxehome/node_modules/wrangler/templates/pages-dev-util.ts";
export * from "/home/user/luxehome/.wrangler/tmp/pages-iU2apo/bundledWorker-0.7416652032454507.mjs";
var routes = define_ROUTES_default;
var pages_dev_pipeline_default = {
  fetch(request, env, context) {
    const { pathname } = new URL(request.url);
    for (const exclude of routes.exclude) {
      if (isRoutingRuleMatch(pathname, exclude)) {
        return env.ASSETS.fetch(request);
      }
    }
    for (const include of routes.include) {
      if (isRoutingRuleMatch(pathname, include)) {
        const workerAsHandler = worker;
        if (workerAsHandler.fetch === void 0) {
          throw new TypeError("Entry point missing `fetch` handler");
        }
        return workerAsHandler.fetch(request, env, context);
      }
    }
    return env.ASSETS.fetch(request);
  }
};
export {
  pages_dev_pipeline_default as default
};
//# sourceMappingURL=3wyo4la12v9.js.map
