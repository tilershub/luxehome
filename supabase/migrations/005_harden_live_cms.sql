-- Hardening and query indexes identified by the Supabase advisors after the
-- first production bootstrap.

alter function public.lx_touch_updated_at() set search_path = '';

-- The bucket is public, so public object URLs work without a broad SELECT
-- policy. Keep SELECT for CMS admins because Storage upserts require it.
drop policy if exists "public read luxehome media" on storage.objects;
drop policy if exists "cms admin read luxehome media" on storage.objects;
create policy "cms admin read luxehome media" on storage.objects
  for select to authenticated
  using (bucket_id = 'luxehome-media' and (select private.lx_is_admin()));

-- This legacy prototype helper is not an application RPC.
do $$
begin
  if to_regprocedure('public.rls_auto_enable()') is not null then
    revoke all on function public.rls_auto_enable() from public, anon, authenticated;
  end if;
end $$;

create index if not exists lx_designs_space_id_idx on public.lx_designs (space_id);
create index if not exists lx_design_drawings_design_id_idx on public.lx_design_drawings (design_id);
create index if not exists lx_design_fixtures_design_id_idx on public.lx_design_fixtures (design_id);
create index if not exists lx_design_materials_design_id_idx on public.lx_design_materials (design_id);
create index if not exists lx_design_timeline_design_id_idx on public.lx_design_timeline (design_id);
create index if not exists lx_design_faq_design_id_idx on public.lx_design_faq (design_id);
create index if not exists lx_projects_design_id_idx on public.lx_projects (design_id);
create index if not exists lx_project_gallery_project_id_idx on public.lx_project_gallery (project_id);
create index if not exists lx_project_journey_project_id_idx on public.lx_project_journey (project_id);
create index if not exists lx_project_crew_project_id_idx on public.lx_project_crew (project_id);
