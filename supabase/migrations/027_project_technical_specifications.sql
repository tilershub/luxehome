-- BathSpace per-project technical specification schedule
-- Applied to the LUXEhome Supabase project; kept as a reproducible migration.
create table if not exists public.lx_project_specifications (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.lx_projects(id) on delete cascade,
  section text not null check (section in ('construction','finishes')),
  category text not null,
  item_name text not null,
  brand text,
  model_code text,
  specification text,
  sort_order integer not null default 0
);
create index if not exists lx_project_specifications_project_sort
  on public.lx_project_specifications(project_id,section,sort_order,id);
alter table public.lx_project_specifications enable row level security;
grant select on public.lx_project_specifications to anon;
grant select,insert,update,delete on public.lx_project_specifications to authenticated;
drop policy if exists "specifications public read published projects" on public.lx_project_specifications;
create policy "specifications public read published projects"
 on public.lx_project_specifications for select to anon,authenticated
 using (exists (
   select 1 from public.lx_projects p where p.id=project_id
    and p.published=true and coalesce(p.project_status,'completed') <> 'proposed'
 ));
drop policy if exists "specifications cms admin read" on public.lx_project_specifications;
create policy "specifications cms admin read"
 on public.lx_project_specifications for select to authenticated
 using ((select private.lx_is_admin()));
drop policy if exists "specifications cms admin insert" on public.lx_project_specifications;
create policy "specifications cms admin insert"
 on public.lx_project_specifications for insert to authenticated
 with check ((select private.lx_is_admin()));
drop policy if exists "specifications cms admin update" on public.lx_project_specifications;
create policy "specifications cms admin update"
 on public.lx_project_specifications for update to authenticated
 using ((select private.lx_is_admin())) with check ((select private.lx_is_admin()));
drop policy if exists "specifications cms admin delete" on public.lx_project_specifications;
create policy "specifications cms admin delete"
 on public.lx_project_specifications for delete to authenticated
 using ((select private.lx_is_admin()));
