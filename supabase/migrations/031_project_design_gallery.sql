-- Keep planned 3D concepts separate from photographs of completed bathrooms.
create table if not exists public.lx_project_design_gallery (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.lx_projects(id) on delete cascade,
  image_url text not null,
  caption text,
  sort_order integer not null default 0
);
create index if not exists lx_project_design_gallery_project_sort on public.lx_project_design_gallery(project_id,sort_order,id);
alter table public.lx_project_design_gallery enable row level security;
grant select on public.lx_project_design_gallery to anon;
grant select,insert,update,delete on public.lx_project_design_gallery to authenticated;

drop policy if exists "design gallery public view published project" on public.lx_project_design_gallery;
create policy "design gallery public view published project"
on public.lx_project_design_gallery for select to anon,authenticated
using (exists (select 1 from public.lx_projects p where p.id=project_id and p.published=true));

drop policy if exists "design gallery CMS admin read" on public.lx_project_design_gallery;
create policy "design gallery CMS admin read" on public.lx_project_design_gallery
for select to authenticated using ((select private.lx_is_admin()));

drop policy if exists "design gallery CMS admin insert" on public.lx_project_design_gallery;
create policy "design gallery CMS admin insert" on public.lx_project_design_gallery
for insert to authenticated with check ((select private.lx_is_admin()));

drop policy if exists "design gallery CMS admin update" on public.lx_project_design_gallery;
create policy "design gallery CMS admin update" on public.lx_project_design_gallery
for update to authenticated using ((select private.lx_is_admin())) with check ((select private.lx_is_admin()));

drop policy if exists "design gallery CMS admin delete" on public.lx_project_design_gallery;
create policy "design gallery CMS admin delete" on public.lx_project_design_gallery
for delete to authenticated using ((select private.lx_is_admin()));
