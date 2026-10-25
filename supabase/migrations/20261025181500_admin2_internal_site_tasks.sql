-- LUXEhome Admin 2.0: internal site task and quality tracking
-- ADDITIVE ONLY. Apply through the reviewed migration workflow BEFORE deploying
-- the matching Admin 2.0 frontend. Do not copy records from lx_project_journey:
-- that table is part of the public project story.
--
-- The existing admin identity source is private.lx_is_admin(); public.admin_users
-- is a legacy table and MUST NOT be used as the access gate.

-- A narrow, non-privileged RPC allows the website admin login gate to check
-- the same existing allowlist that the production CMS RLS policies use.
create or replace function public.lx_admin_access()
returns boolean
language sql
stable
security invoker
set search_path = ''
as $$
  select (select auth.uid()) is not null
    and (select private.lx_is_admin());
$$;

revoke all on function public.lx_admin_access() from public;
revoke all on function public.lx_admin_access() from anon;
grant execute on function public.lx_admin_access() to authenticated;

-- All details here are INTERNAL. Never copy budget, worker notes or QA findings
-- into lx_projects or lx_project_journey: published records are public-facing.
create table public.lx_site_tasks (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.lx_projects(id) on delete restrict,
  stage_key text not null check (stage_key in (
    'survey', 'demolition', 'plumbing', 'electrical', 'civil',
    'waterproofing', 'tiling', 'ceiling_lighting', 'bathware', 'handover', 'other'
  )),
  title text not null check (length(btrim(title)) between 1 and 180),
  status text not null default 'not_started'
    check (status in ('not_started','in_progress','blocked','completed')),
  planned_start_date date,
  due_date date,
  completed_at timestamptz,
  assigned_team_member_id uuid references public.lx_team_members(id) on delete set null,
  qa_result text not null default 'not_required'
    check (qa_result in ('not_required','pending','passed','failed')),
  qa_notes text,
  internal_notes text,
  created_by uuid default auth.uid() references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint lx_site_task_dates_valid
    check (planned_start_date is null or due_date is null or due_date >= planned_start_date),
  constraint lx_site_task_completion_valid
    check (completed_at is null or status = 'completed')
);

create index lx_site_tasks_project_due_idx on public.lx_site_tasks (project_id, due_date);
create index lx_site_tasks_project_status_idx on public.lx_site_tasks (project_id, status);
comment on table public.lx_site_tasks is
  'Internal construction stages, assignments and QA checks; never publicly exposed.';

alter table public.lx_site_tasks enable row level security;

-- The first rollout is existing-admin-only. Do not broaden access to all signed-in
-- users; department/worker-specific RLS will require a separate reviewed migration.
revoke all on table public.lx_site_tasks from public, anon;
grant select, insert, update, delete on table public.lx_site_tasks to authenticated;

create policy "site tasks admin select"
  on public.lx_site_tasks for select to authenticated
  using ((select private.lx_is_admin()));

create policy "site tasks admin insert"
  on public.lx_site_tasks for insert to authenticated
  with check ((select private.lx_is_admin()));

create policy "site tasks admin update"
  on public.lx_site_tasks for update to authenticated
  using ((select private.lx_is_admin()))
  with check ((select private.lx_is_admin()));

create policy "site tasks admin delete"
  on public.lx_site_tasks for delete to authenticated
  using ((select private.lx_is_admin()));

-- Verify after applying:
-- select relrowsecurity from pg_class where oid='public.lx_site_tasks'::regclass;
-- select * from pg_policies where schemaname='public' and tablename='lx_site_tasks';
-- As anon: selecting lx_site_tasks must be denied or return zero records.
-- As a signed-in non-admin: lx_admin_access() must return false and
-- lx_site_tasks must be inaccessible. As an allowlisted admin: access succeeds.
