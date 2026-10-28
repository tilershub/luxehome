# Continuous bathroom journey

This iteration builds on the existing homepage in tilershub/luxehome. It does not create or publish a ChatGPT Site.

## Visual scope

The room is a procedural interpretation of the existing limestone/oak concept: double vanity and mirror on the left, freestanding tub at the back, shower and linear drain on the right, WC/accessories near the entrance. It is not an exact architectural reconstruction or a new set of AI-generated photographs. All interactive close-ups come from the same geometry/materials and continuous camera path.

The approved photographic concept renders remain the static fallback and can be selected with “Use still views”. No source renders are overwritten.

## Behaviour

- Four chapters share a continuous, eased camera path. Scroll runs normally and remains reversible; navigation buttons select the corresponding camera stop.
- Mobile separates the visual area from text and controls, shortens the scroll track and uses the actual canvas aspect ratio to frame the scene.
- Reduced-motion users start with still views and manual chapter controls. Data saving, slow connections and very low device memory skip the 3D import.
- The initial poster is prioritised; the renderer loads after that image decodes. The next still is prepared only on unconstrained connections. Rendering runs only while the camera changes and the section is visible.
- Pixel density and shadow resolution are capped. Persistent expensive rendering or context loss returns to stills. Rendering cost checks are heuristics, not a device-performance guarantee.
- Open detail descriptions hold the camera; skip-to-projects moves keyboard focus. No-JavaScript users get sequential, readable scenes with lazy images.
- The existing homepage content and enquiries are otherwise unchanged.

## Build

`npm run build`, `npm run dev` and `npm run deploy` prepare responsive posters from the tracked originals. `scripts/prepare-bathroom-assets.mjs` emits 640/1024/1440px WebP files into the ignored `public/images/bathroom-tour/` directory. These files belong in deployment output, not the source commit. Do not invoke `astro build` directly without preparing the posters first.

## Validation and release

Run:

```
node --test tests/bathroom-journey.test.mjs
npm run build
npm run verify:routes
```

Numeric tests cover path continuity, bounds, camera clearance against fixture geometry, chapter stops, portrait lens and download eligibility. They do not establish visual quality.

Before merging: inspect desktop and iPhone-sized layouts, mirror/glass rendering, mobile landscape, all chapter controls, pause/resume without scroll jumps, image/network failures, reduced motion, no-JavaScript, WebGL context loss, and actual scroll responsiveness on a physical phone. Confirm the reconstruction is visually acceptable alongside the existing renders. Browser QA was blocked in the authoring session; the live site has not been updated by this branch.
