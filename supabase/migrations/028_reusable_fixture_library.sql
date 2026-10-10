-- Reusable BathSpace fixture / material catalogue.
create table if not exists public.lx_fixture_library (
  id uuid primary key default gen_random_uuid(),
  section text not null check (section in ('construction','finishes')),
  category text not null,
  item_name text not null,
  brand text,
  model_code text,
  specification text,
  image_url text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);
create index if not exists lx_fixture_library_browse on public.lx_fixture_library(section,category,item_name);
alter table public.lx_fixture_library enable row level security;
grant select on public.lx_fixture_library to anon;
grant select, insert, update, delete on public.lx_fixture_library to authenticated;
create policy "library public visible" on public.lx_fixture_library
  for select to anon,authenticated using (active = true);
create policy "library admin read" on public.lx_fixture_library
  for select to authenticated using ((select private.lx_is_admin()));
create policy "library admin insert" on public.lx_fixture_library
  for insert to authenticated with check ((select private.lx_is_admin()));
create policy "library admin update" on public.lx_fixture_library
  for update to authenticated using ((select private.lx_is_admin()))
  with check ((select private.lx_is_admin()));
create policy "library admin delete" on public.lx_fixture_library
  for delete to authenticated using ((select private.lx_is_admin()));

alter table public.lx_project_specifications
  add column if not exists catalog_item_id uuid references public.lx_fixture_library(id) on delete set null,
  add column if not exists image_url text;
create index if not exists lx_project_specs_catalog_fk on public.lx_project_specifications(catalog_item_id);

-- One-time reuse bootstrap: existing project specifications become editable catalogue records.
insert into public.lx_fixture_library(section,category,item_name,brand,model_code,specification,image_url)
select distinct s.section,s.category,s.item_name,s.brand,s.model_code,s.specification,s.image_url
from public.lx_project_specifications s
where not exists (
 select 1 from public.lx_fixture_library l
 where l.section=s.section and l.category=s.category and l.item_name=s.item_name
 and l.brand is not distinct from s.brand and l.model_code is not distinct from s.model_code
);

update public.lx_project_specifications s set catalog_item_id=l.id
from public.lx_fixture_library l
where s.catalog_item_id is null and s.section=l.section and s.category=l.category
and s.item_name=l.item_name and s.brand is not distinct from l.brand
and s.model_code is not distinct from l.model_code;
