-- Manel canonical pricing, repository-backed render/drawing samples, and a
-- genuinely private per-square-metre rate editable only by CMS admins.

alter table public.lx_designs
  add column if not exists new_starting_price_lkr numeric,
  add column if not exists renovation_starting_price_lkr numeric;

update public.lx_designs
set new_starting_price_lkr = coalesce(new_starting_price_lkr, starting_price_lkr),
    renovation_starting_price_lkr = coalesce(renovation_starting_price_lkr, starting_price_lkr);

create table if not exists public.lx_design_internal_pricing (
  id uuid primary key default gen_random_uuid(),
  design_id uuid not null unique references public.lx_designs(id) on delete cascade,
  additional_cost_per_sqm_lkr numeric not null check (additional_cost_per_sqm_lkr >= 0),
  sort_order integer not null default 0,
  updated_at timestamptz not null default now()
);

alter table public.lx_design_internal_pricing enable row level security;
revoke all on public.lx_design_internal_pricing from public, anon;
grant select, insert, update, delete on public.lx_design_internal_pricing to authenticated;

create policy "cms admin read internal design pricing"
  on public.lx_design_internal_pricing for select to authenticated
  using ((select private.lx_is_admin()));
create policy "cms admin insert internal design pricing"
  on public.lx_design_internal_pricing for insert to authenticated
  with check ((select private.lx_is_admin()));
create policy "cms admin update internal design pricing"
  on public.lx_design_internal_pricing for update to authenticated
  using ((select private.lx_is_admin()))
  with check ((select private.lx_is_admin()));
create policy "cms admin delete internal design pricing"
  on public.lx_design_internal_pricing for delete to authenticated
  using ((select private.lx_is_admin()));

update public.lx_designs
set starting_price_lkr = 2060000,
    new_starting_price_lkr = 2060000,
    renovation_starting_price_lkr = 2175000,
    min_sqm = 5,
    cover_image_url = '/images/designs/manel/cover.jpeg'
where slug = 'manel';

insert into public.lx_design_internal_pricing (design_id, additional_cost_per_sqm_lkr)
select id, 195000 from public.lx_designs where slug = 'manel'
on conflict (design_id) do update
set additional_cost_per_sqm_lkr = excluded.additional_cost_per_sqm_lkr,
    updated_at = now();

insert into public.lx_design_drawings (design_id, kind, image_url)
select d.id, sample.kind, sample.image_url
from public.lx_designs d
cross join (values
  ('render_1', '/images/designs/manel/render-1.jpeg'),
  ('render_2', '/images/designs/manel/render-2.jpeg'),
  ('render_3', '/images/designs/manel/render-3.jpeg'),
  ('render_4', '/images/designs/manel/render-4.jpeg'),
  ('civil', '/images/designs/manel/sample-civil.svg'),
  ('supply_water', '/images/designs/manel/sample-supply-water.svg'),
  ('waste_drainage', '/images/designs/manel/sample-waste-drainage.svg'),
  ('electrical', '/images/designs/manel/sample-electrical.svg')
) as sample(kind, image_url)
where d.slug = 'manel'
on conflict (design_id, kind) do update set image_url = excluded.image_url;

comment on table public.lx_design_internal_pricing is
  'Admin-only commercial rates. No anon or public privileges; never fetched by public site queries.';
