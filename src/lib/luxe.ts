/* ============================================================
   LUXEhome catalogue — typed Supabase data layer
   Build-time fetches; every helper degrades to empty data when
   env vars are missing (local builds) or a query fails.
   ============================================================ */

import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { LUXE_SUPABASE_KEY, LUXE_SUPABASE_URL } from './luxe-supabase';

// Read from exactly the project the CMS writes to. The Cloudflare Pages
// environment still carries PUBLIC_SUPABASE_* values from an older
// deployment, so those are deliberately not consulted here — otherwise
// content published in the CMS would never reach the public pages.
const SB_URL = LUXE_SUPABASE_URL;
const SB_KEY = LUXE_SUPABASE_KEY;

let _client: SupabaseClient | null = null;
function sb(): SupabaseClient | null {
  if (!SB_URL || !SB_KEY) return null;
  if (!_client) _client = createClient(SB_URL, SB_KEY);
  return _client;
}

/* ── Types ─────────────────────────────────────────────────── */

export type Collection = 'standard' | 'premium' | 'signature';
/** Per-design room photography. The four technical drawings are a shared
    preset (STANDARD_DRAWINGS) and are not stored per design. */
export type DrawingKind = 'vanity' | 'water_closet' | 'shower' | 'shower_cubicle' | 'ceiling';

export interface Space {
  id: string; slug: string; name: string;
  sinhala_name: string | null; sort_order: number;
}

export interface Design {
  id: string; slug: string; name: string;
  space_id: string; collection: Collection;
  tagline: string | null; description: string | null;
  starting_price_lkr: number; min_sqm: number | null;
  new_starting_price_lkr: number | null;
  renovation_starting_price_lkr: number | null;
  cover_image_url: string | null;
  inspiration_image_url: string | null;
  name_heading?: string | null; name_story?: string | null;
  plan_image_url?: string | null;
  room_length_m?: number | null; room_width_m?: number | null;
  video_3d_url: string | null; video_work_url: string | null;
  workflow_text: string | null;
  highlights: string[];
  featured: boolean; sort_order: number;
  created_at?: string;
  space?: Space;
}

export interface DesignDrawing { kind: DrawingKind; image_url: string; caption?: string | null; sort_order?: number; }
export interface DesignFixture {
  category: string; name: string; brand: string | null;
  model_code: string | null; finish: string | null; quantity: number;
  included: boolean; spec: string | null; notes: string | null;
  warranty_period: string | null;
  reference_price_label?: string | null;
  image_url: string | null; image_alt: string | null; sort_order: number;
}
export interface DesignPriceTier {
  label: string; sqm: number;
  new_price_lkr: number; renovation_price_lkr: number;
  sort_order: number;
}
export interface DesignMaterial { category: string; brand: string; item: string | null; sort_order: number; image_url?: string | null; usage_label?: string | null; }
export interface DesignFaq { question: string; answer: string; sort_order: number; }

export interface DesignFull extends Design {
  drawings: DesignDrawing[];
  fixtures: DesignFixture[];
  price_tiers: DesignPriceTier[];
  materials: DesignMaterial[];
  faq: DesignFaq[];
}

export interface LuxeProject {
  id: string; slug: string; title: string; location: string | null;
  project_ref: string | null; area_label: string | null;
  design_id: string | null; duration_label: string | null;
  completed_label: string | null; story: string | null;
  client_requirements?: string | null; estimate_label?: string | null;
  before_image_url: string | null; after_image_url: string | null;
  video_url: string | null;
  episode_1_url: string | null; episode_2_url: string | null;
  rating: number | null; review_text: string | null; review_by: string | null;
  review_screenshot_url?: string | null;
  featured: boolean;
  created_at?: string;
  design?: Pick<Design, 'slug' | 'name' | 'collection'> | null;
}

export interface ProjectGalleryImage { image_url: string; sort_order: number; }
export interface ProjectJourneyStage {
  stage: string; date_label: string | null; note: string | null;
  issue: string | null; fix: string | null; sort_order: number;
  image_urls?: string[] | null;
}
export interface ProjectCrewMember {
  name: string; role: string | null; photo_url: string | null;
  tilershub_verified: boolean; sort_order: number;
}

export interface ProjectFull extends LuxeProject {
  gallery: ProjectGalleryImage[];
  journey: ProjectJourneyStage[];
  crew: ProjectCrewMember[];
}

export interface TeamMember {
  name: string; role: string | null; bio: string | null;
  photo_url: string | null; permanent: boolean;
  tilershub_verified: boolean; sort_order: number;
}

export interface LuxeProduct {
  id: string; slug: string; name: string; category: string | null;
  short_description: string | null; description: string | null;
  price_lkr: number; compare_at_price_lkr: number | null;
  cover_image_url: string | null; gallery_image_urls: string[];
  features: string[]; preorder: boolean;
  stock_status: 'in_stock' | 'made_to_order' | 'out_of_stock';
  featured: boolean; sort_order: number;
  meta_title: string | null; meta_description: string | null;
}

/* ── Queries ───────────────────────────────────────────────── */

export async function getSpaces(): Promise<Space[]> {
  const c = sb();
  if (!c) return [];
  const { data } = await c.from('lx_spaces')
    .select('id,slug,name,sinhala_name,sort_order')
    .order('sort_order');
  return data ?? [];
}

export async function getDesigns(opts: { spaceSlug?: string; featured?: boolean } = {}): Promise<Design[]> {
  const c = sb();
  if (!c) return [];
  let q = c.from('lx_designs')
    .select('*, space:lx_spaces(id,slug,name,sinhala_name,sort_order)')
    .order('sort_order');
  if (opts.featured) q = q.eq('featured', true);
  const { data } = await q;
  let rows = (data ?? []) as Design[];
  if (opts.spaceSlug) rows = rows.filter((d) => d.space?.slug === opts.spaceSlug);
  return rows;
}

export async function getDesignBySlug(slug: string): Promise<DesignFull | null> {
  const c = sb();
  if (!c) return null;
  const { data: design } = await c.from('lx_designs')
    .select('*, space:lx_spaces(id,slug,name,sinhala_name,sort_order)')
    .eq('slug', slug)
    .maybeSingle();
  if (!design) return null;

  const [drawings, fixtures, priceTiers, materials, faq] = await Promise.all([
    c.from('lx_design_drawings').select('*').eq('design_id', design.id).order('sort_order'),
    // Select all fields so deployments remain compatible while the additive
    // warranty column migration is being rolled out.
    c.from('lx_design_fixtures').select('*').eq('design_id', design.id).order('sort_order'),
    c.from('lx_design_price_tiers').select('label,sqm,new_price_lkr,renovation_price_lkr,sort_order').eq('design_id', design.id).order('sort_order'),
    c.from('lx_design_materials').select('*').eq('design_id', design.id).order('sort_order'),
    c.from('lx_design_faq').select('question,answer,sort_order').eq('design_id', design.id).order('sort_order'),
  ]);

  return {
    ...(design as Design),
    drawings: drawings.data ?? [],
    fixtures: fixtures.data ?? [],
    price_tiers: priceTiers.data ?? [],
    materials: materials.data ?? [],
    faq: faq.data ?? [],
  };
}

export async function getProjects(opts: { featured?: boolean; designId?: string } = {}): Promise<LuxeProject[]> {
  const c = sb();
  if (!c) return [];
  let q = c.from('lx_projects')
    .select('*, design:lx_designs(slug,name,collection)')
    .order('created_at', { ascending: false });
  if (opts.featured) q = q.eq('featured', true);
  if (opts.designId) q = q.eq('design_id', opts.designId);
  const { data } = await q;
  return (data ?? []) as LuxeProject[];
}

export async function getProjectBySlug(slug: string): Promise<ProjectFull | null> {
  const c = sb();
  if (!c) return null;
  const { data: project } = await c.from('lx_projects')
    .select('*, design:lx_designs(slug,name,collection)')
    .eq('slug', slug)
    .maybeSingle();
  if (!project) return null;

  const [gallery, journey, crew] = await Promise.all([
    c.from('lx_project_gallery').select('image_url,sort_order').eq('project_id', project.id).order('sort_order'),
    // Select all fields so deployments remain compatible while the additive
    // diary-photo column migration is being rolled out.
    c.from('lx_project_journey').select('*').eq('project_id', project.id).order('sort_order'),
    c.from('lx_project_crew').select('name,role,photo_url,tilershub_verified,sort_order').eq('project_id', project.id).order('sort_order'),
  ]);

  return {
    ...(project as LuxeProject),
    gallery: gallery.data ?? [],
    journey: journey.data ?? [],
    crew: crew.data ?? [],
  };
}

export async function getTeam(opts: { permanentOnly?: boolean } = {}): Promise<TeamMember[]> {
  const c = sb();
  if (!c) return [];
  let q = c.from('lx_team_members')
    .select('name,role,bio,photo_url,permanent,tilershub_verified,sort_order')
    .order('sort_order');
  if (opts.permanentOnly) q = q.eq('permanent', true);
  const { data } = await q;
  return data ?? [];
}

export async function getProducts(opts: { featured?: boolean } = {}): Promise<LuxeProduct[]> {
  const c = sb();
  if (!c) return [];
  let q = c.from('lx_products').select('*').order('sort_order');
  if (opts.featured) q = q.eq('featured', true);
  const { data } = await q;
  return (data ?? []) as LuxeProduct[];
}

export async function getProductBySlug(slug: string): Promise<LuxeProduct | null> {
  const c = sb();
  if (!c) return null;
  const { data } = await c.from('lx_products').select('*').eq('slug', slug).maybeSingle();
  return data as LuxeProduct | null;
}

/** True when the URL is a YouTube Short, i.e. shot vertically. The embed
    player is always 16:9, so a Short has to be cropped to fill a portrait
    frame rather than sat inside one. */
export function isYouTubeShort(url: string | null | undefined): boolean {
  return Boolean(url && url.includes('/shorts/'));
}

/** youtube-nocookie embed URL from any YouTube URL/ID, or null. */
export function youtubeEmbed(url: string | null | undefined): string | null {
  if (!url) return null;
  const m = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([a-zA-Z0-9_-]{11})/) || url.match(/^([a-zA-Z0-9_-]{11})$/);
  return m ? `https://www.youtube-nocookie.com/embed/${m[1]}` : null;
}
