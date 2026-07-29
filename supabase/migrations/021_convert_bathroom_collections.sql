-- Replace the public bathroom tier taxonomy with four Sri Lankan
-- inspiration-led collections while preserving every design UUID and all
-- related fixtures, drawings, materials, prices and projects.

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

update public.lx_designs
set collection = 'flora'
where slug in ('araliya', 'kumudu', 'olu');

update public.lx_designs
set description = 'Olu brings warm tile tones and a more generous vanity into the Flora Collection — an easy, restful space that works in almost any home.'
where slug = 'olu';

update public.lx_designs
set description = 'Kumudu completes the Flora Collection with larger-format tiles and an upgraded shower area — a refined, practical bathroom with every decision clearly documented.'
where slug = 'kumudu';

update public.lx_designs
set
  slug = 'bentota',
  name = 'Bentota',
  collection = 'island',
  tagline = 'Calm, considered and quietly luxurious.',
  description = 'Bentota brings resort calm to the Island Collection, with large-format tiles, a full glass shower enclosure and fittings selected for daily comfort as carefully as the final finish.',
  inspiration_image_url = null,
  name_heading = 'Inspired by the calm of Bentota.',
  name_story = 'Named for Sri Lanka''s southwest coastal retreat, Bentota translates still water, soft sand tones and relaxed resort comfort into a composed bathroom.'
where slug = 'nelum';

update public.lx_designs
set
  slug = 'ella-bathroom',
  name = 'Ella',
  collection = 'island',
  tagline = 'Natural warmth with a tailored highland finish.',
  description = 'Ella brings timber-look warmth, layered lighting and a generous shower into an Island Collection bathroom inspired by the calm of Sri Lanka''s hill country.',
  inspiration_image_url = null,
  name_heading = 'Inspired by the highland calm of Ella.',
  name_story = 'Ella pairs natural warmth, soft misty tones and carefully layered light to create a relaxed bathroom with the atmosphere of a private highland retreat.'
where slug = 'sandun';

update public.lx_designs
set
  slug = 'mirissa',
  name = 'Mirissa',
  collection = 'island',
  tagline = 'Refined contrast with coastal hotel comfort.',
  description = 'Mirissa is a richly resolved Island Collection bathroom with feature wall tiling, concealed storage and the relaxed comfort of a modern southern-coast hotel.',
  inspiration_image_url = null,
  name_heading = 'Inspired by the coastal ease of Mirissa.',
  name_story = 'Mirissa combines clean contrast, resort-like comfort and a relaxed coastal atmosphere in a bathroom designed for unhurried everyday use.'
where slug = 'orchid';

update public.lx_designs
set
  slug = 'sigiriya-bathroom',
  name = 'Sigiriya',
  collection = 'heritage',
  tagline = 'Sculptural, serene and unmistakably special.',
  description = 'Sigiriya opens the Heritage Collection with concealed bathware, frameless glass, stone-look porcelain and a composed architectural character inspired by Sri Lanka''s iconic rock citadel and water gardens.',
  inspiration_image_url = null,
  name_heading = 'Inspired by the architecture and water gardens of Sigiriya.',
  name_story = 'Sigiriya translates monumental stone, precise geometry and the calm intelligence of its historic water gardens into a composed architectural bathroom.'
where slug = 'manel';

update public.lx_designs
set
  slug = 'yapahuwa',
  name = 'Yapahuwa',
  collection = 'heritage',
  tagline = 'A dramatic retreat built around ritual.',
  description = 'Yapahuwa is a Heritage Collection statement — deep tones, brushed fittings and layered lighting shaped into a dramatic yet carefully balanced private retreat.',
  inspiration_image_url = null,
  name_heading = 'Inspired by the sculptural strength of Yapahuwa.',
  name_story = 'Yapahuwa draws on strong stone forms, carved detail and dramatic contrast to create a bathroom with a confident architectural presence.'
where slug = 'binara';

update public.lx_designs
set
  slug = 'kuttam-pokuna',
  name = 'Kuttam Pokuna',
  collection = 'heritage',
  tagline = 'A complete expression of private bathing ritual.',
  description = 'Kuttam Pokuna brings the order, symmetry and water-centred calm of Sri Lanka''s historic bathing ponds into a highly resolved Heritage Collection bathroom.',
  inspiration_image_url = null,
  name_heading = 'Inspired by the historic bathing ponds of Kuttam Pokuna.',
  name_story = 'Kuttam Pokuna translates a celebrated Sri Lankan bathing tradition into balanced proportions, calm surfaces and a complete contemporary bathroom ritual.'
where slug = 'idda';

update public.lx_designs
set
  slug = 'moonstone',
  name = 'Moonstone',
  collection = 'gems',
  tagline = 'A luminous retreat made for unhurried rituals.',
  description = 'Moonstone is the first Ceylon Gems Collection bathroom. A long double vanity, freestanding bathtub with a concealed bath mixer, separate frameless shower and two waterproofed niches create a complete private retreat.',
  inspiration_image_url = null,
  name_heading = 'Inspired by the soft luminosity of Ceylon moonstone.',
  name_story = 'Moonstone uses warm ivory stone, pale oak and softly layered light to create a luminous flagship bathroom with generous storage and clearly separated bathing zones.'
where slug = 'pichcha';

update public.lx_design_fixtures
set image_alt = replace(
  replace(image_alt, 'Pichcha', 'Moonstone'),
  'Signature',
  'Ceylon Gems'
)
where design_id = (
  select id from public.lx_designs where slug = 'moonstone'
)
and image_alt is not null;

do $$
declare
  converted_count integer;
begin
  select count(*) into converted_count
  from public.lx_designs
  where (slug in ('araliya', 'kumudu', 'olu') and collection = 'flora')
     or (slug in ('bentota', 'ella-bathroom', 'mirissa') and collection = 'island')
     or (slug in ('sigiriya-bathroom', 'yapahuwa', 'kuttam-pokuna') and collection = 'heritage')
     or (slug = 'moonstone' and collection = 'gems');

  if converted_count <> 10 then
    raise exception 'Expected 10 converted bathroom designs, found %', converted_count;
  end if;
end $$;

commit;
