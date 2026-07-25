globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createAstro, f as createComponent, m as maybeRenderHead, h as addAttribute, r as renderTemplate, n as renderScript } from './astro/server_qXath3RI.mjs';
/* empty css                          */

const $$Astro = createAstro("https://luxehome.lk");
const $$VideoCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$VideoCard;
  const {
    title,
    embedUrl,
    coverImage,
    eyebrow = "3D walkthrough",
    duration,
    description = "Open the vertical walkthrough without leaving this design."
  } = Astro2.props;
  const dialogId = `video-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
  const separator = embedUrl.includes("?") ? "&" : "?";
  const playerUrl = `${embedUrl}${separator}autoplay=1&playsinline=1`;
  return renderTemplate`${maybeRenderHead()}<article class="lv-card lxr" data-video-card data-astro-cid-6otujyuj> <button class="lv-cover" type="button" data-video-open${addAttribute(playerUrl, "data-video-src")} aria-haspopup="dialog"${addAttribute(dialogId, "aria-controls")} aria-expanded="false"${addAttribute(`Play ${title}`, "aria-label")} data-astro-cid-6otujyuj> <img${addAttribute(coverImage, "src")} alt="" loading="lazy" width="540" height="960" data-astro-cid-6otujyuj> <span class="lv-shade" aria-hidden="true" data-astro-cid-6otujyuj></span> <span class="lv-play" aria-hidden="true" data-astro-cid-6otujyuj> <svg viewBox="0 0 24 24" data-astro-cid-6otujyuj><path d="M8 5.5v13l10-6.5z" data-astro-cid-6otujyuj></path></svg> </span> <span class="lv-cover-copy" data-astro-cid-6otujyuj> <small data-astro-cid-6otujyuj>${eyebrow}</small> <strong data-astro-cid-6otujyuj>${title}</strong> ${duration && renderTemplate`<em data-astro-cid-6otujyuj>${duration}</em>`} </span> </button> <p data-astro-cid-6otujyuj>${description}</p> <div class="lv-modal"${addAttribute(dialogId, "id")} data-video-modal role="dialog" aria-modal="true"${addAttribute(title, "aria-label")} hidden data-astro-cid-6otujyuj> <div class="lv-player-shell" data-astro-cid-6otujyuj> <button class="lv-close" type="button" data-video-close aria-label="Close video" data-astro-cid-6otujyuj>×</button> <div class="lv-player" data-video-frame data-astro-cid-6otujyuj></div> </div> </div> </article> ${renderScript($$result, "/home/user/luxehome/src/components/luxe/VideoCard.astro?astro&type=script&index=0&lang.ts")} `;
}, "/home/user/luxehome/src/components/luxe/VideoCard.astro", void 0);

export { $$VideoCard as $ };
