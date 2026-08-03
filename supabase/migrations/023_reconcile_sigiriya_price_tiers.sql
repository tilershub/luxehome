-- Reconcile every Sigiriya price tier before reseeding the canonical set.
-- This prevents a previously customised room-area tier from surviving beside
-- the published Minimum, Recommended and Spacious rows.

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

delete from public.lx_design_price_tiers
where design_id in (
  select id
  from public.lx_designs
  where slug in ('manel', 'sigiriya-bathroom')
);

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
where design.slug in ('manel', 'sigiriya-bathroom');

do $$
declare
  tier_count integer;
begin
  select count(*) into tier_count
  from public.lx_design_price_tiers as tier
  where tier.design_id in (
    select id
    from public.lx_designs
    where slug in ('manel', 'sigiriya-bathroom')
  );

  if tier_count <> 3 then
    raise exception 'Expected three Sigiriya price tiers, found %', tier_count;
  end if;
end $$;

commit;
