/** One room, metres. Camera positions stay in the clear central aisle. */
export const CHAPTER_STOPS = [0, 0.32, 0.65, 0.88];
const keys = [
  { at: 0, position: [0, 1.58, 2.65], target: [0, 1.15, -2.2], fov: 63 },
  { at: .15, position: [0, 1.55, .85], target: [-.35, 1.15, -2.1], fov: 63 },
  { at: .32, position: [-.1, 1.48, -.05], target: [-1.62, 1.12, -.85], fov: 57 },
  { at: .47, position: [0, 1.55, -.65], target: [.05, 1.2, -3.05], fov: 64 },
  { at: .65, position: [.15, 1.6, -.9], target: [1.38, 1.45, -2.8], fov: 60 },
  { at: .76, position: [.15, 1.5, -.5], target: [1.25, .65, -1.5], fov: 63 },
  { at: .88, position: [.15, 1.35, .65], target: [1.5, .58, .05], fov: 58 },
  { at: 1, position: [0, 1.58, 1.6], target: [0, 1.15, -2.2], fov: 65 },
];
export const clamp01 = value => Math.max(0, Math.min(1, Number.isFinite(value) ? value : 0));
export function cameraPose(progress, portrait = false) {
  const p = clamp01(progress);
  const end = keys.findIndex(key => key.at >= p);
  const b = keys[Math.max(1, end < 0 ? keys.length - 1 : end)];
  const a = keys[Math.max(0, (end < 0 ? keys.length - 1 : Math.max(1, end)) - 1)];
  const t = clamp01((p - a.at) / (b.at - a.at));
  const eased = t * t * (3 - 2 * t);
  const mix = (from, to) => from + (to - from) * eased;
  return {
    position: a.position.map((v,i)=>mix(v,b.position[i])),
    target: a.target.map((v,i)=>mix(v,b.target[i])),
    // Portrait gets its own lens, not a crop of the desktop render.
    fov: mix(a.fov,b.fov) + (portrait ? 13 : 0),
  };
}
export function chapterAt(progress) {
  const p = clamp01(progress);
  if (p < .235) return 0;
  if (p < .56) return 1;
  if (p < .82) return 2;
  return 3;
}
export function scrollProgress(top, height, stageHeight, stickyTop = 0) {
  return clamp01((stickyTop - top) / Math.max(1, height - stageHeight));
}
export function shouldLoadRoom({reducedMotion=false,saveData=false,effectiveType='',deviceMemory=8}={}) {
  return !reducedMotion && !saveData && !['slow-2g','2g','3g'].includes(effectiveType) && deviceMemory > 2;
}
