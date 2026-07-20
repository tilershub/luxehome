-- Blog content required by both the unified CMS and public Journal.
create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  author text not null default 'LUXEhome Team',
  category text,
  reading_time text,
  pub_date date not null default current_date,
  status text not null default 'draft' check (status in ('draft','published')),
  cover_image text,
  excerpt text,
  content text,
  meta_title text,
  meta_description text,
  og_image text,
  include_in_sitemap boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
drop trigger if exists blog_posts_touch on public.blog_posts;
create trigger blog_posts_touch before update on public.blog_posts for each row execute function public.lx_touch_updated_at();
alter table public.blog_posts enable row level security;
drop policy if exists "public read published blog" on public.blog_posts;
drop policy if exists "cms admin read" on public.blog_posts;
drop policy if exists "cms admin insert" on public.blog_posts;
drop policy if exists "cms admin update" on public.blog_posts;
drop policy if exists "cms admin delete" on public.blog_posts;
create policy "public read published blog" on public.blog_posts for select to anon, authenticated using (status = 'published');
create policy "cms admin read" on public.blog_posts for select to authenticated using ((select private.lx_is_admin()));
create policy "cms admin insert" on public.blog_posts for insert to authenticated with check ((select private.lx_is_admin()));
create policy "cms admin update" on public.blog_posts for update to authenticated using ((select private.lx_is_admin())) with check ((select private.lx_is_admin()));
create policy "cms admin delete" on public.blog_posts for delete to authenticated using ((select private.lx_is_admin()));
grant select on public.blog_posts to anon, authenticated;
grant insert, update, delete on public.blog_posts to authenticated;
revoke all on function public.lx_touch_updated_at() from public, anon, authenticated;
