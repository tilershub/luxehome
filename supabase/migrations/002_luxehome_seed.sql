-- LUXEhome seed: 4 spaces + 9 canonical bathroom designs

insert into lx_spaces (slug, name, sinhala_name, sort_order, published) values
  ('bathrooms',  'Bathrooms',  'නාන කාමර',     1, true),
  ('kitchens',   'Kitchens',   'මුළුතැන්ගෙය',  2, true),
  ('staircases', 'Staircases', 'පඩිපෙළ',       3, true),
  ('floors',     'Floors',     'ගෙබිම',        4, true)
on conflict (slug) do nothing;

with bathroom as (select id from lx_spaces where slug = 'bathrooms')
insert into lx_designs
  (slug, name, space_id, collection, tagline, description,
   starting_price_lkr, min_sqm, featured, published, sort_order)
values
  ('araliya', 'Araliya', (select id from bathroom), 'standard',
   'Bright, honest, beautifully simple.',
   'The Araliya is where a LUXEhome bathroom begins — a complete, fully documented design with quality fittings, clean lines, and nothing left vague. Every fixture is named before work starts.',
   1000000, null, true,  true, 1),
  ('olu', 'Olu', (select id from bathroom), 'standard',
   'Calm tones, quiet confidence.',
   'The Olu softens the standard bathroom with warmer tile tones and a more generous vanity — an easy, restful space that works in almost any home.',
   1150000, null, false, true, 2),
  ('kumudu', 'Kumudu', (select id from bathroom), 'standard',
   'The standard, perfected.',
   'The Kumudu completes the Standard collection with larger-format tiles and an upgraded shower area — the most refined bathroom you can build without stepping up a collection.',
   1300000, null, false, true, 3),
  ('nelum', 'Nelum', (select id from bathroom), 'premium',
   'Where comfort becomes design.',
   'The Nelum opens the Premium collection: large-format tiles, a full glass shower enclosure, and fittings chosen for how they feel every day — not just how they look on handover day.',
   1600000, 4, true,  true, 4),
  ('sandun', 'Sandun', (select id from bathroom), 'premium',
   'Warm wood tones, spa calm.',
   'The Sandun brings warmth into the Premium collection — timber-look finishes, layered lighting, and a shower you will not want to leave.',
   1850000, 4.5, false, true, 5),
  ('orchid', 'Orchid', (select id from bathroom), 'premium',
   'The premium collection in full bloom.',
   'The Orchid is the most complete Premium design — feature wall tiling, concealed storage, and fixtures a step below our Signature line.',
   2100000, 5, false, true, 6),
  ('manel', 'Manel', (select id from bathroom), 'signature',
   'Hotel luxury, built for home.',
   'The Manel opens the Signature collection: concealed bathware, frameless glass, stone-look porcelain, and the quiet perfection of a five-star bathroom in your own home.',
   2500000, 6, true,  true, 7),
  ('binara', 'Binara', (select id from bathroom), 'signature',
   'Dark, dramatic, unforgettable.',
   'The Binara is a statement — deep tones, brushed fittings, and lighting design that turns a bathroom into a destination.',
   3000000, 7, false, true, 8),
  ('idda', 'Idda', (select id from bathroom), 'signature',
   'Our finest bathroom. Full stop.',
   'The Idda is the summit of the LUXEhome catalogue — a freestanding bathtub, double vanity, and every detail resolved. Built rarely, remembered always.',
   3600000, 8, false, true, 9)
on conflict (slug) do nothing;
