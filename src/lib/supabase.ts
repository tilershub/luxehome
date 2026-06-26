import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.PUBLIC_SUPABASE_URL as string | undefined;
const key = import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string | undefined;

/**
 * Supabase client — null when env vars are not configured.
 * All callers should check for null before using (graceful degradation).
 */
export const supabase = url && key ? createClient(url, key) : null;

/** Creates a fresh Supabase client for SSR pages (server-side context). */
export function createServerSupabase(env: Record<string, string | undefined>) {
  const u = env.PUBLIC_SUPABASE_URL;
  const k = env.PUBLIC_SUPABASE_ANON_KEY;
  if (!u || !k) return null;
  return createClient(u, k);
}

// ── Typed row shapes ──────────────────────────────────────────────────────

export interface LeadInsert {
  name: string;
  phone: string;
  service: string;
  location: string;
  service_details?: Record<string, string> | null;
  notes?: string | null;
  source_url?: string;
}

export interface CartEventInsert {
  session_id: string;
  service_name: string;
  price: number;
  details?: string;
  page_url?: string;
}

export interface Project {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  slug: string;
  category: 'bathroom' | 'flooring' | 'staircase' | 'kitchen';
  location: string;
  completion_date?: string;
  completion_year?: number;
  design_style?: 'modern' | 'minimalist' | 'luxury' | 'contemporary';
  status: 'draft' | 'published' | 'featured';
  cover_image?: string;
  hero_video?: string;
  before_images: string[];
  after_images: string[];
  progress_images: string[];
  gallery_images: string[];
  project_overview?: string;
  client_requirements?: string;
  design_concept?: string;
  scope_of_work?: string;
  materials_brands?: string;
  project_timeline: { phase: string; duration: string; description: string }[];
  challenges_solutions?: string;
  testimonial_text?: string;
  testimonial_author?: string;
  testimonial_role?: string;
  cost_range?: string;
  faqs: { question: string; answer: string }[];
  related_projects: string[];
  cta_book_consultation: boolean;
  cta_whatsapp: boolean;
  meta_title?: string;
  meta_description?: string;
  og_image?: string;
  canonical_url?: string;
  breadcrumb_title?: string;
  include_in_sitemap: boolean;
}

export type ProjectInsert = Omit<Project, 'id' | 'created_at' | 'updated_at'>;
