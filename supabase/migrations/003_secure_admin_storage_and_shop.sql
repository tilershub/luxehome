-- Secure the LUXEhome CMS, add managed shop content, and enable media uploads.
--
-- Bootstrap after this migration (run once in the Supabase SQL editor):
-- insert into private.lx_admin_users (user_id, role)
-- values ('<AUTH_USER_UUID>', 'owner')
-- on conflict (user_id) do update set role = excluded.role, active = true;

create schema if not exists private;
revoke all on schema private from public, anon;
grant usage on schema private to authenticated;

create table if not exists private.lx_admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'editor' check (role in ('owner', 'editor')),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table private.lx_admin_users enable row level security;
revoke all on private.lx_admin_users from public, anon, authenticated;

create or replace function private.lx_is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select (select auth.uid()) is not null
    and exists (
      select 1
      from private.lx_admin_users admin_user
      where admin_user.user_id = (select auth.uid())
        and admin_user.active = true
    );
$$;

revoke all on function private.lx_is_admin() from public, anon;
grant execute on function private.lx_is_admin() to authenticated;

alter table public.lx_designs
  add column if not exists highlights text[] not null default '{}';

create table if not exists public.lx_products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  category text,
  short_description text,
  description text,
  price_lkr numeric not null check (price_lkr >= 0),
  compare_at_price_lkr numeric check (compare_at_price_lkr is null or compare_at_price_lkr >= 0),
  cover_image_url text,
  gallery_image_urls text[] not null default '{}',
  features text[] not null default '{}',
  preorder boolean not null default true,
  stock_status text not null default 'made_to_order'
    check (stock_status in ('in_stock', 'made_to_order', 'out_of_stock')),
  featured boolean not null default false,
  published boolean not null default false,
  sort_order integer not null default 0,
  meta_title text,
  meta_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.lx_site_inspections (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  location text,
  space_slug text,
  preferred_date date,
  preferred_time text,
  notes text,
  source_url text,
  status text not null default 'new'
    check (status in ('new', 'contacted', 'scheduled', 'completed', 'cancelled')),
  assigned_to text,
  internal_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists lx_products_touch on public.lx_products;
create trigger lx_products_touch
  before update on public.lx_products
  for each row execute function public.lx_touch_updated_at();

drop trigger if exists lx_site_inspections_touch on public.lx_site_inspections;
create trigger lx_site_inspections_touch
  before update on public.lx_site_inspections
  for each row execute function public.lx_touch_updated_at();

alter table public.lx_products enable row level security;
alter table public.lx_site_inspections enable row level security;

drop policy if exists "public read published" on public.lx_products;
create policy "public read published" on public.lx_products
  for select to anon, authenticated
  using (published = true);

drop policy if exists "public create inspection" on public.lx_site_inspections;
create policy "public create inspection" on public.lx_site_inspections
  for insert to anon, authenticated
  with check (status = 'new' and internal_notes is null and assigned_to is null);

-- Replace the original blanket authenticated policies with explicit CMS admin checks.
do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'lx_spaces', 'lx_designs', 'lx_design_drawings', 'lx_design_fixtures',
    'lx_design_materials', 'lx_design_timeline', 'lx_design_faq',
    'lx_projects', 'lx_project_gallery', 'lx_project_journey',
    'lx_project_crew', 'lx_team_members', 'lx_products', 'lx_site_inspections'
  ] loop
    execute format('drop policy if exists "auth full read" on public.%I', table_name);
    execute format('drop policy if exists "auth insert" on public.%I', table_name);
    execute format('drop policy if exists "auth update" on public.%I', table_name);
    execute format('drop policy if exists "auth delete" on public.%I', table_name);
    execute format('drop policy if exists "cms admin read" on public.%I', table_name);
    execute format('drop policy if exists "cms admin insert" on public.%I', table_name);
    execute format('drop policy if exists "cms admin update" on public.%I', table_name);
    execute format('drop policy if exists "cms admin delete" on public.%I', table_name);

    execute format(
      'create policy "cms admin read" on public.%I for select to authenticated using ((select private.lx_is_admin()))',
      table_name
    );
    execute format(
      'create policy "cms admin insert" on public.%I for insert to authenticated with check ((select private.lx_is_admin()))',
      table_name
    );
    execute format(
      'create policy "cms admin update" on public.%I for update to authenticated using ((select private.lx_is_admin())) with check ((select private.lx_is_admin()))',
      table_name
    );
    execute format(
      'create policy "cms admin delete" on public.%I for delete to authenticated using ((select private.lx_is_admin()))',
      table_name
    );
  end loop;
end $$;

grant select on public.lx_products to anon, authenticated;
grant insert on public.lx_site_inspections to anon, authenticated;
grant select, insert, update, delete on
  public.lx_spaces, public.lx_designs, public.lx_design_drawings,
  public.lx_design_fixtures, public.lx_design_materials,
  public.lx_design_timeline, public.lx_design_faq, public.lx_projects,
  public.lx_project_gallery, public.lx_project_journey,
  public.lx_project_crew, public.lx_team_members, public.lx_products,
  public.lx_site_inspections
to authenticated;

-- Public delivery bucket. Upload, replacement, and deletion remain admin-only.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'luxehome-media',
  'luxehome-media',
  true,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "public read luxehome media" on storage.objects;
create policy "public read luxehome media" on storage.objects
  for select to anon, authenticated
  using (bucket_id = 'luxehome-media');

drop policy if exists "cms admin upload luxehome media" on storage.objects;
create policy "cms admin upload luxehome media" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'luxehome-media' and (select private.lx_is_admin()));

drop policy if exists "cms admin update luxehome media" on storage.objects;
create policy "cms admin update luxehome media" on storage.objects
  for update to authenticated
  using (bucket_id = 'luxehome-media' and (select private.lx_is_admin()))
  with check (bucket_id = 'luxehome-media' and (select private.lx_is_admin()));

drop policy if exists "cms admin delete luxehome media" on storage.objects;
create policy "cms admin delete luxehome media" on storage.objects
  for delete to authenticated
  using (bucket_id = 'luxehome-media' and (select private.lx_is_admin()));

-- Trigger functions do not need to be directly callable through the Data API.
revoke all on function public.lx_touch_updated_at() from public, anon, authenticated;
