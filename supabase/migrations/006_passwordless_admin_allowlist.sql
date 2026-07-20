-- Passwordless CMS administration. An email may receive a Supabase magic link,
-- but only addresses in this private allowlist pass the CMS RLS policies.

create table if not exists private.lx_admin_emails (
  email text primary key,
  role text not null default 'editor' check (role in ('owner', 'editor')),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  check (email = lower(email))
);

alter table private.lx_admin_emails enable row level security;
revoke all on private.lx_admin_emails from public, anon, authenticated;

insert into private.lx_admin_emails (email, role, active)
values ('wildplus4@gmail.com', 'owner', true)
on conflict (email) do update set role = excluded.role, active = true;

create or replace function private.lx_is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select (select auth.uid()) is not null
    and (
      exists (
        select 1
        from private.lx_admin_users admin_user
        where admin_user.user_id = (select auth.uid())
          and admin_user.active = true
      )
      or exists (
        select 1
        from private.lx_admin_emails allowed
        join auth.users auth_user on lower(auth_user.email) = allowed.email
        where auth_user.id = (select auth.uid())
          and allowed.active = true
      )
    );
$$;

revoke all on function private.lx_is_admin() from public, anon;
grant execute on function private.lx_is_admin() to authenticated;
