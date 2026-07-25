globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createClient, L as LUXE_SUPABASE_KEY, a as LUXE_SUPABASE_URL } from './luxe-supabase_BoRC35do.mjs';

const SB_URL = LUXE_SUPABASE_URL;
const SB_KEY = LUXE_SUPABASE_KEY;
let _client = null;
function sb() {
  if (!_client) _client = createClient(SB_URL, SB_KEY);
  return _client;
}
async function getDesigns(opts = {}) {
  const c = sb();
  if (!c) return [];
  let q = c.from("lx_designs").select("*, space:lx_spaces(id,slug,name,sinhala_name,sort_order)").order("sort_order");
  if (opts.featured) q = q.eq("featured", true);
  const { data } = await q;
  let rows = data ?? [];
  if (opts.spaceSlug) rows = rows.filter((d) => d.space?.slug === opts.spaceSlug);
  return rows;
}
async function getDesignBySlug(slug) {
  const c = sb();
  if (!c) return null;
  const { data: design } = await c.from("lx_designs").select("*, space:lx_spaces(id,slug,name,sinhala_name,sort_order)").eq("slug", slug).maybeSingle();
  if (!design) return null;
  const [drawings, fixtures, priceTiers, materials, timeline, faq] = await Promise.all([
    c.from("lx_design_drawings").select("*").eq("design_id", design.id).order("sort_order"),
    // Select all fields so deployments remain compatible while the additive
    // warranty column migration is being rolled out.
    c.from("lx_design_fixtures").select("*").eq("design_id", design.id).order("sort_order"),
    c.from("lx_design_price_tiers").select("label,sqm,new_price_lkr,renovation_price_lkr,sort_order").eq("design_id", design.id).order("sort_order"),
    c.from("lx_design_materials").select("*").eq("design_id", design.id).order("sort_order"),
    c.from("lx_design_timeline").select("week_label,title,description,sort_order").eq("design_id", design.id).order("sort_order"),
    c.from("lx_design_faq").select("question,answer,sort_order").eq("design_id", design.id).order("sort_order")
  ]);
  return {
    ...design,
    drawings: drawings.data ?? [],
    fixtures: fixtures.data ?? [],
    price_tiers: priceTiers.data ?? [],
    materials: materials.data ?? [],
    timeline: timeline.data ?? [],
    faq: faq.data ?? []
  };
}
async function getProjects(opts = {}) {
  const c = sb();
  if (!c) return [];
  let q = c.from("lx_projects").select("*, design:lx_designs(slug,name,collection)").order("created_at", { ascending: false });
  if (opts.featured) q = q.eq("featured", true);
  if (opts.designId) q = q.eq("design_id", opts.designId);
  const { data } = await q;
  return data ?? [];
}
async function getProjectBySlug(slug) {
  const c = sb();
  if (!c) return null;
  const { data: project } = await c.from("lx_projects").select("*, design:lx_designs(slug,name,collection)").eq("slug", slug).maybeSingle();
  if (!project) return null;
  const [gallery, journey, crew] = await Promise.all([
    c.from("lx_project_gallery").select("image_url,sort_order").eq("project_id", project.id).order("sort_order"),
    // Select all fields so deployments remain compatible while the additive
    // diary-photo column migration is being rolled out.
    c.from("lx_project_journey").select("*").eq("project_id", project.id).order("sort_order"),
    c.from("lx_project_crew").select("name,role,photo_url,tilershub_verified,sort_order").eq("project_id", project.id).order("sort_order")
  ]);
  return {
    ...project,
    gallery: gallery.data ?? [],
    journey: journey.data ?? [],
    crew: crew.data ?? []
  };
}
async function getTeam(opts = {}) {
  const c = sb();
  if (!c) return [];
  let q = c.from("lx_team_members").select("name,role,bio,photo_url,permanent,tilershub_verified,sort_order").order("sort_order");
  if (opts.permanentOnly) q = q.eq("permanent", true);
  const { data } = await q;
  return data ?? [];
}
async function getProducts(opts = {}) {
  const c = sb();
  if (!c) return [];
  let q = c.from("lx_products").select("*").order("sort_order");
  if (opts.featured) q = q.eq("featured", true);
  const { data } = await q;
  return data ?? [];
}
async function getProductBySlug(slug) {
  const c = sb();
  if (!c) return null;
  const { data } = await c.from("lx_products").select("*").eq("slug", slug).maybeSingle();
  return data;
}
function youtubeEmbed(url) {
  if (!url) return null;
  const m = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([a-zA-Z0-9_-]{11})/) || url.match(/^([a-zA-Z0-9_-]{11})$/);
  return m ? `https://www.youtube-nocookie.com/embed/${m[1]}` : null;
}

export { getProjects as a, getDesignBySlug as b, getProjectBySlug as c, getProductBySlug as d, getProducts as e, getTeam as f, getDesigns as g, youtubeEmbed as y };
