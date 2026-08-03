-- Keep the CMS-backed Sigiriya record and its public price tiers aligned with
-- the catalogue values. The legacy slug remains supported until the collection
-- conversion migration has been applied to every environment.

begin;

set local lock_timeout = '5s';
set local statement_timeout = '30s';

do $$
declare
  design_count integer;
begin
  select count(*) into design_count
  from public.lx_designs
  where slug in ('manel', 'sigiriya-bathroom');

  if design_count <> 1 then
    raise exception 'Expected one Sigiriya design record, found %', design_count;
  end if;
end $$;

update public.lx_designs
set
  starting_price_lkr = 1870000,
  new_starting_price_lkr = 1870000,
  renovation_starting_price_lkr = 1978000,
  min_sqm = 4.5
where slug in ('manel', 'sigiriya-bathroom');

delete from public.lx_design_price_tiers
where design_id in (
  select id
  from public.lx_designs
  where slug in ('manel', 'sigiriya-bathroom')
)
and (label = 'Minimum fit' or sort_order = 0);

insert into public.lx_design_price_tiers
  (design_id, label, sqm, new_price_lkr, renovation_price_lkr, sort_order)
select
  design.id,
  tier.label,
  tier.sqm,
  tier.new_price_lkr,
  tier.renovation_price_lkr,
  tier.sort_order
from public.lx_designs as design
cross join (
  values
    ('Minimum fit', 4.5::numeric, 1870000::numeric, 1978000::numeric, 0),
    ('Recommended fit', 6::numeric, 2255000::numeric, 2370000::numeric, 1),
    ('Spacious fit', 7::numeric, 2450000::numeric, 2565000::numeric, 2)
) as tier(label, sqm, new_price_lkr, renovation_price_lkr, sort_order)
where design.slug in ('manel', 'sigiriya-bathroom')
on conflict (design_id, sqm) do update
set
  label = excluded.label,
  new_price_lkr = excluded.new_price_lkr,
  renovation_price_lkr = excluded.renovation_price_lkr,
  sort_order = excluded.sort_order;

commit;
