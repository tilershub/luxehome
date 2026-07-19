-- LUXEhome design-led catalogue schema
-- All tables prefixed lx_ to avoid colliding with existing tables
-- in the shared Supabase project.

-- ── Spaces ──────────────────────────────────────────────────
create table if not exists lx_spaces (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique,
  name         text not null,
  sinhala_name text,
  sort_order   integer not null default 0,
  published    boolean not null default true
);

-- ── Designs ─────────────────────────────────────────────────
create table if not exists lx_designs (
  id                 uuid primary key default gen_random_uuid(),
  slug               text not null unique,
  name               text not null,
  space_id           uuid not null references lx_spaces(id),
  collection         text not null check (collection in ('standard','premium','signature')),
  tagline            text,
  description        text,
  starting_price_lkr numeric not null,
  min_sqm            numeric,          -- null = fits any size
  cover_image_url    text,
  video_3d_url       text,
  video_work_url     text,
  workflow_text      text,
  featured           boolean not null default false,
  published          boolean not null default false,
  sort_order         integer not null default 0,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

create or replace function lx_touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists lx_designs_touch on lx_designs;
create trigger lx_designs_touch
  before update on lx_designs
  for each row execute function lx_touch_updated_at();

-- ── Design children ─────────────────────────────────────────
create table if not exists lx_design_drawings (
  id        uuid primary key default gen_random_uuid(),
  design_id uuid not null references lx_designs(id) on delete cascade,
  kind      text not null check (kind in
              ('render_1','render_2','render_3','render_4',
               'civil','supply_water','waste_drainage','electrical')),
  image_url text not null,
  unique (design_id, kind)
);

create table if not exists lx_design_fixtures (
  id         uuid primary key default gen_random_uuid(),
  design_id  uuid not null references lx_designs(id) on delete cascade,
  category   text not null,
  name       text not null,
  brand      text,
  spec       text,
  image_url  text,
  sort_order integer not null default 0
);

create table if not exists lx_design_materials (
  id         uuid primary key default gen_random_uuid(),
  design_id  uuid not null references lx_designs(id) on delete cascade,
  category   text not null,
  brand      text not null,
  item       text,
  sort_order integer not null default 0
);

create table if not exists lx_design_timeline (
  id          uuid primary key default gen_random_uuid(),
  design_id   uuid not null references lx_designs(id) on delete cascade,
  week_label  text not null,
  title       text not null,
  description text,
  sort_order  integer not null default 0
);

create table if not exists lx_design_faq (
  id         uuid primary key default gen_random_uuid(),
  design_id  uuid not null references lx_designs(id) on delete cascade,
  question   text not null,
  answer     text not null,
  sort_order integer not null default 0
);

-- ── Project stories ─────────────────────────────────────────
create table if not exists lx_projects (
  id               uuid primary key default gen_random_uuid(),
  slug             text not null unique,
  title            text not null,
  location         text,
  design_id        uuid references lx_designs(id),
  duration_label   text,
  completed_label  text,
  story            text,
  before_image_url text,
  after_image_url  text,
  video_url        text,
  rating           integer check (rating between 1 and 5),
  review_text      text,
  review_by        text,
  featured         boolean not null default false,
  published        boolean not null default false,
  created_at       timestamptz not null default now()
);

create table if not exists lx_project_gallery (
  id         uuid primary key default gen_random_uuid(),
  project_id uuid not null references lx_projects(id) on delete cascade,
  image_url  text not null,
  sort_order integer not null default 0
);

create table if not exists lx_project_journey (
  id         uuid primary key default gen_random_uuid(),
  project_id uuid not null references lx_projects(id) on delete cascade,
  stage      text not null,
  date_label text,
  note       text,
  issue      text,
  fix        text,
  sort_order integer not null default 0
);

create table if not exists lx_project_crew (
  id                 uuid primary key default gen_random_uuid(),
  project_id         uuid not null references lx_projects(id) on delete cascade,
  name               text not null,
  role               text,
  photo_url          text,
  tilershub_verified boolean not null default false,
  sort_order         integer not null default 0
);

-- ── Team ────────────────────────────────────────────────────
create table if not exists lx_team_members (
  id                 uuid primary key default gen_random_uuid(),
  name               text not null,
  role               text,
  bio                text,
  photo_url          text,
  permanent          boolean not null default false,
  tilershub_verified boolean not null default false,
  sort_order         integer not null default 0,
  published          boolean not null default true
);

-- ── RLS ─────────────────────────────────────────────────────
-- Public: SELECT only where published (children via parent).
-- Writes: authenticated users only.

alter table lx_spaces           enable row level security;
alter table lx_designs          enable row level security;
alter table lx_design_drawings  enable row level security;
alter table lx_design_fixtures  enable row level security;
alter table lx_design_materials enable row level security;
alter table lx_design_timeline  enable row level security;
alter table lx_design_faq       enable row level security;
alter table lx_projects         enable row level security;
alter table lx_project_gallery  enable row level security;
alter table lx_project_journey  enable row level security;
alter table lx_project_crew     enable row level security;
alter table lx_team_members     enable row level security;

-- Parents
create policy "public read published" on lx_spaces
  for select using (published = true);
create policy "public read published" on lx_designs
  for select using (published = true);
create policy "public read published" on lx_projects
  for select using (published = true);
create policy "public read published" on lx_team_members
  for select using (published = true);

-- Design children readable when parent design is published
create policy "public read via design" on lx_design_drawings
  for select using (exists (select 1 from lx_designs d where d.id = design_id and d.published));
create policy "public read via design" on lx_design_fixtures
  for select using (exists (select 1 from lx_designs d where d.id = design_id and d.published));
create policy "public read via design" on lx_design_materials
  for select using (exists (select 1 from lx_designs d where d.id = design_id and d.published));
create policy "public read via design" on lx_design_timeline
  for select using (exists (select 1 from lx_designs d where d.id = design_id and d.published));
create policy "public read via design" on lx_design_faq
  for select using (exists (select 1 from lx_designs d where d.id = design_id and d.published));

-- Project children readable when parent project is published
create policy "public read via project" on lx_project_gallery
  for select using (exists (select 1 from lx_projects p where p.id = project_id and p.published));
create policy "public read via project" on lx_project_journey
  for select using (exists (select 1 from lx_projects p where p.id = project_id and p.published));
create policy "public read via project" on lx_project_crew
  for select using (exists (select 1 from lx_projects p where p.id = project_id and p.published));

-- Authenticated writes (admin dashboard)
do $$
declare t text;
begin
  foreach t in array array[
    'lx_spaces','lx_designs','lx_design_drawings','lx_design_fixtures',
    'lx_design_materials','lx_design_timeline','lx_design_faq',
    'lx_projects','lx_project_gallery','lx_project_journey',
    'lx_project_crew','lx_team_members'
  ] loop
    execute format('create policy "auth full read" on %I for select to authenticated using (true)', t);
    execute format('create policy "auth insert" on %I for insert to authenticated with check (true)', t);
    execute format('create policy "auth update" on %I for update to authenticated using (true)', t);
    execute format('create policy "auth delete" on %I for delete to authenticated using (true)', t);
  end loop;
end $$;
