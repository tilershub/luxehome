-- Publish Moonstone's approved 9 m2 starting prices, deterministic larger-room
-- tiers, and canonical customer-facing identity across legacy environments.

begin;

set local lock_timeout = '5s';
set local statement_timeout = '30s';

alter table public.lx_designs
  drop constraint if exists lx_designs_collection_check;

alter table public.lx_designs
  add constraint lx_designs_collection_check
  check (
    collection in (
      'standard', 'premium', 'signature',
      'flora', 'island', 'heritage', 'gems'
    )
  ) not valid;

alter table public.lx_designs
  validate constraint lx_designs_collection_check;

do $$
declare
  design_count integer;
begin
  select count(*) into design_count
  from public.lx_designs
  where slug in ('pichcha', 'moonstone');

  if design_count <> 1 then
    raise exception 'Expected one Moonstone design record, found %', design_count;
  end if;
end $$;

update public.lx_designs
set
  slug = 'moonstone',
  name = 'Moonstone',
  collection = 'gems',
  tagline = 'A luminous retreat made for unhurried rituals.',
  description = 'Moonstone is the first Ceylon Gems Collection bathroom. A long double vanity, freestanding bathtub with a concealed bath mixer, separate frameless shower and two waterproofed niches create a complete private retreat.',
  starting_price_lkr = 2787000,
  new_starting_price_lkr = 2787000,
  renovation_starting_price_lkr = 3087000,
  min_sqm = 9,
  inspiration_image_url = null,
  name_heading = 'Inspired by the soft luminosity of Ceylon moonstone.',
  name_story = 'Moonstone uses warm ivory stone, pale oak and softly layered light to create a luminous flagship bathroom with generous storage and clearly separated bathing zones.',
  updated_at = now()
where slug in ('pichcha', 'moonstone');

update public.lx_design_faq
set
  question = replace(replace(question, 'Pichcha', 'Moonstone'), 'pichcha', 'Moonstone'),
  answer = replace(replace(answer, 'Pichcha', 'Moonstone'), 'pichcha', 'Moonstone')
where design_id = (
  select id from public.lx_designs where slug = 'moonstone'
);

update public.lx_design_fixtures
set
  category = replace(replace(category, 'Pichcha', 'Moonstone'), 'pichcha', 'Moonstone'),
  name = replace(replace(name, 'Pichcha', 'Moonstone'), 'pichcha', 'Moonstone'),
  brand = replace(replace(brand, 'Pichcha', 'Moonstone'), 'pichcha', 'Moonstone'),
  spec = replace(replace(spec, 'Pichcha', 'Moonstone'), 'pichcha', 'Moonstone'),
  model_code = replace(replace(model_code, 'Pichcha', 'Moonstone'), 'pichcha', 'Moonstone'),
  finish = replace(replace(finish, 'Pichcha', 'Moonstone'), 'pichcha', 'Moonstone'),
  image_alt = replace(
    replace(
      replace(image_alt, 'Pichcha', 'Moonstone'),
      'pichcha',
      'Moonstone'
    ),
    'Signature',
    'Ceylon Gems'
  ),
  notes = replace(replace(notes, 'Pichcha', 'Moonstone'), 'pichcha', 'Moonstone'),
  warranty_period = replace(replace(warranty_period, 'Pichcha', 'Moonstone'), 'pichcha', 'Moonstone'),
  reference_price_label = replace(replace(reference_price_label, 'Pichcha', 'Moonstone'), 'pichcha', 'Moonstone')
where design_id = (
  select id from public.lx_designs where slug = 'moonstone'
);

update public.lx_design_drawings
set caption = replace(replace(caption, 'Pichcha', 'Moonstone'), 'pichcha', 'Moonstone')
where design_id = (
  select id from public.lx_designs where slug = 'moonstone'
);

update public.lx_design_materials
set
  category = replace(replace(category, 'Pichcha', 'Moonstone'), 'pichcha', 'Moonstone'),
  brand = replace(replace(brand, 'Pichcha', 'Moonstone'), 'pichcha', 'Moonstone'),
  item = replace(replace(item, 'Pichcha', 'Moonstone'), 'pichcha', 'Moonstone'),
  usage_label = replace(replace(usage_label, 'Pichcha', 'Moonstone'), 'pichcha', 'Moonstone')
where design_id = (
  select id from public.lx_designs where slug = 'moonstone'
);

update public.lx_design_timeline
set
  week_label = replace(replace(week_label, 'Pichcha', 'Moonstone'), 'pichcha', 'Moonstone'),
  title = replace(replace(title, 'Pichcha', 'Moonstone'), 'pichcha', 'Moonstone'),
  description = replace(replace(description, 'Pichcha', 'Moonstone'), 'pichcha', 'Moonstone')
where design_id = (
  select id from public.lx_designs where slug = 'moonstone'
);

delete from public.lx_design_price_tiers
where design_id = (
  select id from public.lx_designs where slug = 'moonstone'
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
    ('Minimum fit', 9::numeric, 2787000::numeric, 3087000::numeric, 0),
    ('Recommended fit', 10::numeric, 3007000::numeric, 3307000::numeric, 1),
    ('Spacious fit', 12::numeric, 3447000::numeric, 3747000::numeric, 2)
) as tier(label, sqm, new_price_lkr, renovation_price_lkr, sort_order)
where design.slug = 'moonstone';

insert into public.lx_design_internal_pricing
  (design_id, additional_cost_per_sqm_lkr, sort_order)
select id, 220000, 0
from public.lx_designs
where slug = 'moonstone'
on conflict (design_id) do update
set
  additional_cost_per_sqm_lkr = excluded.additional_cost_per_sqm_lkr,
  sort_order = excluded.sort_order,
  updated_at = now();

do $$
declare
  tier_count integer;
begin
  if not exists (
    select 1
    from public.lx_designs
    where slug = 'moonstone'
      and name = 'Moonstone'
      and collection = 'gems'
      and min_sqm = 9
      and starting_price_lkr = 2787000
      and new_starting_price_lkr = 2787000
      and renovation_starting_price_lkr = 3087000
  ) then
    raise exception 'Moonstone design identity or starting pricing was not updated';
  end if;

  select count(*) into tier_count
  from public.lx_design_price_tiers as tier
  join public.lx_designs as design on design.id = tier.design_id
  where design.slug = 'moonstone';

  if tier_count <> 3 then
    raise exception 'Expected three Moonstone price tiers, found %', tier_count;
  end if;

  if exists (
    select 1
    from public.lx_design_price_tiers as tier
    join public.lx_designs as design on design.id = tier.design_id
    where design.slug = 'moonstone'
      and tier.new_price_lkr - 2787000 <> (tier.sqm - 9) * 220000
  ) then
    raise exception 'Moonstone new-build price tiers do not use the LKR 220,000 per m2 rate';
  end if;

  if exists (
    select 1
    from public.lx_design_price_tiers as tier
    join public.lx_designs as design on design.id = tier.design_id
    where design.slug = 'moonstone'
      and tier.renovation_price_lkr - 3087000 <> (tier.sqm - 9) * 220000
  ) then
    raise exception 'Moonstone renovation price tiers do not use the LKR 220,000 per m2 rate';
  end if;

  if exists (
    select 1
    from public.lx_design_faq as faq
    join public.lx_designs as design on design.id = faq.design_id
    where design.slug = 'moonstone'
      and (faq.question ilike '%pichcha%' or faq.answer ilike '%pichcha%')
  ) then
    raise exception 'Legacy Pichcha copy remains in the Moonstone FAQ';
  end if;

  if exists (
    select 1
    from public.lx_design_fixtures as fixture
    join public.lx_designs as design on design.id = fixture.design_id
    where design.slug = 'moonstone'
      and (
        coalesce(fixture.name, '') ilike '%pichcha%'
        or coalesce(fixture.spec, '') ilike '%pichcha%'
        or coalesce(fixture.image_alt, '') ilike '%pichcha%'
        or coalesce(fixture.notes, '') ilike '%pichcha%'
      )
  ) then
    raise exception 'Legacy Pichcha copy remains in the Moonstone fixtures';
  end if;
end $$;

commit;
