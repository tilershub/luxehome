-- Public, editable size-price tiers for each named design, plus the product
-- warranty shown on each fixture card.

alter table public.lx_design_fixtures
  add column if not exists warranty_period text;

comment on column public.lx_design_fixtures.warranty_period is
  'Manufacturer or supplier warranty shown with the specified fixture.';

-- Legacy catalogue names remain available for future development, but an
-- unfinished design must not be publicly queryable.
update public.lx_designs
set published = false
where cover_image_url is null
  and published;

create table if not exists public.lx_design_price_tiers (
  id uuid primary key default gen_random_uuid(),
  design_id uuid not null references public.lx_designs(id) on delete cascade,
  label text not null,
  sqm numeric not null check (sqm > 0),
  new_price_lkr numeric not null check (new_price_lkr >= 0),
  renovation_price_lkr numeric not null check (renovation_price_lkr >= 0),
  sort_order integer not null default 0,
  unique (design_id, sqm)
);

comment on table public.lx_design_price_tiers is
  'Public size-based new-build and renovation prices for a published named design.';

alter table public.lx_design_price_tiers enable row level security;

drop policy if exists "public read via design" on public.lx_design_price_tiers;
create policy "public read via design" on public.lx_design_price_tiers
  for select to anon, authenticated
  using (
    exists (
      select 1
      from public.lx_designs design
      where design.id = lx_design_price_tiers.design_id
        and design.published
    )
  );

drop policy if exists "cms admin read" on public.lx_design_price_tiers;
create policy "cms admin read" on public.lx_design_price_tiers
  for select to authenticated
  using ((select private.lx_is_admin()));

drop policy if exists "cms admin insert" on public.lx_design_price_tiers;
create policy "cms admin insert" on public.lx_design_price_tiers
  for insert to authenticated
  with check ((select private.lx_is_admin()));

drop policy if exists "cms admin update" on public.lx_design_price_tiers;
create policy "cms admin update" on public.lx_design_price_tiers
  for update to authenticated
  using ((select private.lx_is_admin()))
  with check ((select private.lx_is_admin()));

drop policy if exists "cms admin delete" on public.lx_design_price_tiers;
create policy "cms admin delete" on public.lx_design_price_tiers
  for delete to authenticated
  using ((select private.lx_is_admin()));

revoke all on public.lx_design_price_tiers from public, anon, authenticated;
grant select on public.lx_design_price_tiers to anon;
grant select, insert, update, delete on public.lx_design_price_tiers to authenticated;

insert into public.lx_design_price_tiers
  (design_id, label, sqm, new_price_lkr, renovation_price_lkr, sort_order)
select
  design.id,
  tier.label,
  tier.sqm,
  tier.new_price_lkr,
  tier.renovation_price_lkr,
  tier.sort_order
from public.lx_designs design
cross join (
  values
    ('Minimum fit', 5::numeric, 2060000::numeric, 2175000::numeric, 0),
    ('Recommended fit', 6::numeric, 2255000::numeric, 2370000::numeric, 1),
    ('Spacious fit', 7::numeric, 2450000::numeric, 2565000::numeric, 2)
) as tier(label, sqm, new_price_lkr, renovation_price_lkr, sort_order)
where design.slug = 'manel'
on conflict (design_id, sqm) do update
set label = excluded.label,
    new_price_lkr = excluded.new_price_lkr,
    renovation_price_lkr = excluded.renovation_price_lkr,
    sort_order = excluded.sort_order;
