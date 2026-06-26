-- ── Projects table ────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS projects (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now(),

  -- Basic Details
  title           TEXT NOT NULL,
  slug            TEXT NOT NULL UNIQUE,
  category        TEXT NOT NULL CHECK (category IN ('bathroom','flooring','staircase','kitchen')),
  location        TEXT NOT NULL,
  completion_date DATE,
  completion_year INTEGER,
  design_style    TEXT CHECK (design_style IN ('modern','minimalist','luxury','contemporary')),
  status          TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published','featured')),

  -- Media (URL strings and JSON arrays of URL strings)
  cover_image     TEXT,
  hero_video      TEXT,
  before_images   JSONB DEFAULT '[]',
  after_images    JSONB DEFAULT '[]',
  progress_images JSONB DEFAULT '[]',
  gallery_images  JSONB DEFAULT '[]',

  -- Story & Scope
  project_overview     TEXT,
  client_requirements  TEXT,
  design_concept       TEXT,
  scope_of_work        TEXT,
  materials_brands     TEXT,

  -- Timeline
  project_timeline     JSONB DEFAULT '[]',
  challenges_solutions TEXT,

  -- Testimonial & Extras
  testimonial_text   TEXT,
  testimonial_author TEXT,
  testimonial_role   TEXT,
  cost_range         TEXT,
  faqs               JSONB DEFAULT '[]',
  related_projects   JSONB DEFAULT '[]',
  cta_book_consultation BOOLEAN DEFAULT true,
  cta_whatsapp       BOOLEAN DEFAULT true,

  -- SEO
  meta_title         TEXT,
  meta_description   TEXT,
  og_image           TEXT,
  canonical_url      TEXT,
  breadcrumb_title   TEXT,
  include_in_sitemap BOOLEAN DEFAULT true
);

-- Auto-update updated_at on every row change
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS projects_updated_at ON projects;
CREATE TRIGGER projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ── Row Level Security ─────────────────────────────────────────────────────

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Public (anon) can only read published / featured projects
CREATE POLICY "public_select_published" ON projects
  FOR SELECT TO anon
  USING (status IN ('published', 'featured'));

-- Authenticated users (CRM admin) can read everything
CREATE POLICY "auth_select_all" ON projects
  FOR SELECT TO authenticated
  USING (true);

-- Allow anon to INSERT/UPDATE/DELETE (admin page has no auth — match existing pattern)
-- TODO: restrict to authenticated once admin auth is added
CREATE POLICY "anon_insert" ON projects FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon_update" ON projects FOR UPDATE TO anon USING (true) WITH CHECK (true);
CREATE POLICY "anon_delete" ON projects FOR DELETE TO anon USING (true);

-- ── Storage bucket for project media ──────────────────────────────────────

INSERT INTO storage.buckets (id, name, public)
VALUES ('project-media', 'project-media', true)
ON CONFLICT (id) DO NOTHING;

-- Public can read any object in the bucket
CREATE POLICY "project_media_public_read" ON storage.objects
  FOR SELECT USING (bucket_id = 'project-media');

-- Anon can upload to the bucket
CREATE POLICY "project_media_anon_insert" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'project-media');

-- Anon can delete their uploads
CREATE POLICY "project_media_anon_delete" ON storage.objects
  FOR DELETE USING (bucket_id = 'project-media');
