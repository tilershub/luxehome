/* ============================================================
   LUXEhome catalogue — typed Supabase data layer
   Build-time fetches; every helper degrades to empty data when
   env vars are missing (local builds) or a query fails.
   ============================================================ */

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const SB_URL = import.meta.env.PUBLIC_SUPABASE_URL;
const SB_KEY = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

let _client: SupabaseClient | null = null;
function sb(): SupabaseClient | null {
  if (!SB_URL || !SB_KEY) return null;
  if (!_client) _client = createClient(SB_URL, SB_KEY);
  return _client;
}

/* ── Types ─────────────────────────────────────────────────── */

export type Collection = 'standard' | 'premium' | 'signature';
export type DrawingKind =
  | 'render_1' | 'render_2' | 'render_3' | 'render_4'
  | 'civil' | 'supply_water' | 'waste_drainage' | 'electrical';

export interface Space {
  id: string; slug: string; name: string;
  sinhala_name: string | null; sort_order: number;
}

export interface Design {
  id: string; slug: string; name: string;
  space_id: string; collection: Collection;
  tagline: string | null; description: string | null;
  starting_price_lkr: number; min_sqm: number | null;
  cover_image_url: string | null;
  video_3d_url: string | null; video_work_url: string | null;
  workflow_text: string | null;
  featured: boolean; sort_order: number;
  space?: Space;
}

export interface DesignDrawing { kind: DrawingKind; image_url: string; }
export interface DesignFixture {
  category: string; name: string; brand: string | null;
  spec: string | null; image_url: string | null; sort_order: number;
}
export interface DesignMaterial { category: string; brand: string; item: string | null; sort_order: number; }
export interface DesignTimelineStep { week_label: string; title: string; description: string | null; sort_order: number; }
export interface DesignFaq { question: string; answer: string; sort_order: number; }

export interface DesignFull extends Design {
  drawings: DesignDrawing[];
  fixtures: DesignFixture[];
  materials: DesignMaterial[];
  timeline: DesignTimelineStep[];
  faq: DesignFaq[];
}

export interface LuxeProject {
  id: string; slug: string; title: string; location: string | null;
  design_id: string | null; duration_label: string | null;
  completed_label: string | null; story: string | null;
  before_image_url: string | null; after_image_url: string | null;
  video_url: string | null;
  rating: number | null; review_text: string | null; review_by: string | null;
  featured: boolean;
  design?: Pick<Design, 'slug' | 'name' | 'collection'> | null;
}

export interface ProjectGalleryImage { image_url: string; sort_order: number; }
export interface ProjectJourneyStage {
  stage: string; date_label: string | null; note: string | null;
  issue: string | null; fix: string | null; sort_order: number;
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

  const [drawings, fixtures, materials, timeline, faq] = await Promise.all([
    c.from('lx_design_drawings').select('kind,image_url').eq('design_id', design.id),
    c.from('lx_design_fixtures').select('category,name,brand,spec,image_url,sort_order').eq('design_id', design.id).order('sort_order'),
    c.from('lx_design_materials').select('category,brand,item,sort_order').eq('design_id', design.id).order('sort_order'),
    c.from('lx_design_timeline').select('week_label,title,description,sort_order').eq('design_id', design.id).order('sort_order'),
    c.from('lx_design_faq').select('question,answer,sort_order').eq('design_id', design.id).order('sort_order'),
  ]);

  return {
    ...(design as Design),
    drawings: drawings.data ?? [],
    fixtures: fixtures.data ?? [],
    materials: materials.data ?? [],
    timeline: timeline.data ?? [],
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
    c.from('lx_project_journey').select('stage,date_label,note,issue,fix,sort_order').eq('project_id', project.id).order('sort_order'),
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

/** youtube-nocookie embed URL from any YouTube URL/ID, or null. */
export function youtubeEmbed(url: string | null | undefined): string | null {
  if (!url) return null;
  const m = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([a-zA-Z0-9_-]{11})/) || url.match(/^([a-zA-Z0-9_-]{11})$/);
  return m ? `https://www.youtube-nocookie.com/embed/${m[1]}` : null;
}
