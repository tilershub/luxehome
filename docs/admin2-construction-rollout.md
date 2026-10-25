# LUXEhome Admin 2.0 — Construction Operations Rollout

Status: **draft PR only**. Do **not** merge or deploy until this checklist passes.

## Scope
- Remove retired design CMS routes and forward old catalogue bookmarks to the maintained Projects / Team CMS.
- Add a mobile-first, admin-only construction-task and QA form at `/admin/operations/tasks`.
- Keep the public project story (`lx_project_journey`) entirely separate from site tasks (`lx_site_tasks`).
- Reuse the *existing* administrator allowlist: `private.lx_is_admin()`. Do not use the legacy public `admin_users` table.

## Deployment order (important)
1. Take a normal Supabase database backup/snapshot and review existing policies on `lx_projects`, `lx_project_journey`, and `private.lx_is_admin()`. Confirm the correct LUXEhome project `ctxugrhuanygycjgijcf`.
2. Test the migration on a **non-production Supabase environment** first. Inspect the SQL in `supabase/migrations/20261025181500_admin2_internal_site_tasks.sql` before running it. The new `public.lx_admin_access()` RPC is required by the updated AdminAuthGate.
3. Check unauthenticated requests cannot execute `lx_admin_access` or read `lx_site_tasks`. Signed-in non-admins must get `false` and must not read/write tasks. Existing allowlisted admins must get `true` and be able to create/edit task rows. Confirm the API's schema exposure and grants.
4. Ensure RLS is enabled and each task SELECT / INSERT / UPDATE / DELETE policy uses `private.lx_is_admin()`. Check there is **no public SELECT policy** on `lx_site_tasks`.
5. Apply the reviewed migration to production **before** deploying frontend changes (otherwise admin pages will display an access-check-unavailable message).
6. Confirm `npm ci --ignore-scripts && npm run build && npm run verify:routes` succeed on GitHub Actions. Check the new operations routes exist and `/admin/cms/designs` is not generated.
7. Open the admin app on iPhone-sized and desktop browsers. Sign in with an allowlisted account and test task creation, edit, blocked/completed transitions, QA pending/passed/failed, date validation, team assignment, and changing projects.
8. Check old design URLs still redirect to relevant projects; public project pages, shop, blog, proposals, enquiries, and media CMS still work.
9. Review and approve PR #266, then merge/deploy. There is **no automatic production database migration** in the repository's GitHub Actions workflow.

## Known limitations
- Initial site tasks can be edited **only by existing administrators**. Supervisor/worker access is not implemented yet; do not invite staff before fine-grained RLS is designed.
- Existing public construction-journey records are not copied into private tasks; administrators may add operational tasks as needed.
- This release does not implement payroll, finance, procurement, alerts, photo uploads, or audit history.
- The UI uses `lx_team_members` for available assignments; some contractors may not be in that table yet.
- Migration has **not** been applied to the live database during development.
- Build/route tests do not prove browser runtime auth/RLS. Test against a staged Supabase database.
- A separate dependency audit should address any vulnerabilities reported by `npm ci`.

## SQL verification snippets (after migration on staging)
```sql
select relrowsecurity
from pg_class where oid='public.lx_site_tasks'::regclass;

select policyname, cmd, roles, qual, with_check
from pg_policies
where schemaname='public' and tablename='lx_site_tasks';

select has_function_privilege('authenticated',
  'public.lx_admin_access()', 'EXECUTE') as authenticated_can_check,
  has_function_privilege('anon',
  'public.lx_admin_access()', 'EXECUTE') as anonymous_can_check;
```

**Do not use a service-role key or SQL editor credentials in browser testing**: they bypass normal user policies.
