-- Content model derived from the approved public-site and admin artifacts.

alter table public.lx_projects add column if not exists project_ref text;
alter table public.lx_projects add column if not exists area_label text;
alter table public.lx_projects add column if not exists episode_1_url text;
alter table public.lx_projects add column if not exists episode_2_url text;

alter table public.lx_products add column if not exists sku text;
alter table public.lx_products add column if not exists brand text;
alter table public.lx_products add column if not exists display_price text;
alter table public.lx_products add column if not exists specifications text;
alter table public.lx_products add column if not exists compatibility_notes text;

create table if not exists public.lx_categories (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('blog', 'product', 'media')),
  slug text not null,
  name text not null,
  description text,
  sort_order integer not null default 0,
  published boolean not null default true,
  unique (kind, slug)
);

create table if not exists public.lx_pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  eyebrow text,
  lead text,
  body jsonb not null default '[]'::jsonb,
  seo_title text,
  meta_description text,
  published boolean not null default false,
  updated_at timestamptz not null default now()
);

create table if not exists public.lx_media (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  storage_path text not null unique,
  public_url text not null,
  alt_text text,
  mime_type text,
  size_bytes bigint,
  category text,
  created_at timestamptz not null default now()
);

create table if not exists public.lx_settings (
  id boolean primary key default true check (id = true),
  business_name text not null default 'LUXEhome',
  whatsapp_number text not null default '94774503744',
  public_email text,
  business_address text,
  inspection_fee_lkr numeric not null default 10000,
  warranty_label text not null default '1-year service warranty',
  planner_multipliers jsonb not null default '{}'::jsonb,
  cloudinary_cloud_name text,
  integration_notes text,
  default_seo_title text,
  default_meta_description text,
  updated_at timestamptz not null default now()
);

drop trigger if exists lx_pages_touch on public.lx_pages;
create trigger lx_pages_touch before update on public.lx_pages for each row execute function public.lx_touch_updated_at();
drop trigger if exists lx_settings_touch on public.lx_settings;
create trigger lx_settings_touch before update on public.lx_settings for each row execute function public.lx_touch_updated_at();

alter table public.lx_categories enable row level security;
alter table public.lx_pages enable row level security;
alter table public.lx_media enable row level security;
alter table public.lx_settings enable row level security;

create policy "public read published" on public.lx_categories for select to anon, authenticated using (published = true);
create policy "public read published" on public.lx_pages for select to anon, authenticated using (published = true);

do $$
declare table_name text;
begin
  foreach table_name in array array['lx_categories','lx_pages','lx_media','lx_settings'] loop
    execute format('create policy "cms admin read" on public.%I for select to authenticated using ((select private.lx_is_admin()))', table_name);
    execute format('create policy "cms admin insert" on public.%I for insert to authenticated with check ((select private.lx_is_admin()))', table_name);
    execute format('create policy "cms admin update" on public.%I for update to authenticated using ((select private.lx_is_admin())) with check ((select private.lx_is_admin()))', table_name);
    execute format('create policy "cms admin delete" on public.%I for delete to authenticated using ((select private.lx_is_admin()))', table_name);
  end loop;
end $$;

grant select on public.lx_categories, public.lx_pages to anon, authenticated;
grant select, insert, update, delete on public.lx_categories, public.lx_pages, public.lx_media, public.lx_settings to authenticated;

insert into public.lx_settings (id, public_email, planner_multipliers, default_seo_title, default_meta_description)
values (true, 'luxehome@gmail.com', '{"small":0.88,"medium":1,"large":1.18}', 'LUXEhome — Custom Design & Build Sri Lanka', 'Named, documented designs for bathrooms, kitchens, staircases and floors.')
on conflict (id) do nothing;

insert into public.lx_categories (kind, slug, name, sort_order) values
  ('blog','planning','Planning',0), ('blog','design','Design',1), ('blog','construction','Construction',2),
  ('blog','materials','Materials',3), ('product','featured','Featured',0), ('product','bathroom','Bathroom',1),
  ('product','kitchen','Kitchen',2), ('product','finishes','Finishes',3), ('product','accessories','Accessories',4)
on conflict (kind, slug) do update set name = excluded.name, sort_order = excluded.sort_order;

with catalogue(space_slug, collection, name, tagline, price, min_sqm, sort_order) as (values
  ('bathrooms','standard','Araliya','A bright, beautifully practical beginning.',1000000::numeric,null::numeric,0),
  ('bathrooms','standard','Olu','Soft tones and effortless everyday function.',1150000,null,1),
  ('bathrooms','standard','Kumudu','Warm texture in a compact, complete design.',1300000,null,2),
  ('bathrooms','premium','Nelum','Calm, considered and quietly luxurious.',1600000,4,3),
  ('bathrooms','premium','Sandun','Natural warmth with a tailored finish.',1850000,4.5,4),
  ('bathrooms','premium','Orchid','Refined contrast with hotel-like comfort.',2100000,5,5),
  ('bathrooms','signature','Manel','Sculptural, serene and unmistakably special.',2500000,6,6),
  ('bathrooms','signature','Binara','A generous retreat built around ritual.',3000000,7,7),
  ('bathrooms','signature','Idda','Our most complete expression of private luxury.',3600000,8,8),
  ('kitchens','standard','Rampe','Fresh, light and beautifully organised for everyday cooking.',0,null,0),
  ('kitchens','standard','Karapincha','Natural greens, clean lines and hard-working storage.',0,null,1),
  ('kitchens','standard','Inguru','Warm, welcoming and confidently practical.',0,null,2),
  ('kitchens','premium','Karabu','Deep, aromatic contrast layered with tactile detail.',0,null,3),
  ('kitchens','premium','Goraka','Deep contrast balanced by quiet stone and soft light.',0,null,4),
  ('kitchens','premium','Siyambala','Earthy, generous and designed for cooking together.',0,null,5),
  ('kitchens','signature','Kurundu','Our iconic cinnamon-inspired kitchen, warm and sculptural.',0,null,6),
  ('kitchens','signature','Sadikka','Warm sophistication, crafted detail and quiet ceremony.',0,null,7),
  ('kitchens','signature','Wasawasi','Layered colour, rare character and architectural calm.',0,null,8),
  ('staircases','standard','Ritigala','Quiet strength, grounded materials and timeless lines.',0,null,0),
  ('staircases','standard','Dolukanda','A practical turn shaped with warmth and clarity.',0,null,1),
  ('staircases','standard','Hanthana','Soft rhythm and familiar comfort for a modern home.',0,null,2),
  ('staircases','premium','Namunukula','Layered levels with a composed architectural presence.',0,null,3),
  ('staircases','premium','Kirigalpotta','Crisp stone character balanced by lightness and detail.',0,null,4),
  ('staircases','premium','Thotupola','A generous transition with crafted rail and landing.',0,null,5),
  ('staircases','signature','Dumbara','Bold geometry inspired by the folds of the Knuckles range.',0,null,6),
  ('staircases','signature','Samanala','A graceful, light-filled ascent with sculptural movement.',0,null,7),
  ('staircases','signature','Pidurutalagala','Our highest expression of staircase design—created as the heart of a home.',0,null,8),
  ('floors','standard','Weligama','Soft sand tones and an easy, relaxed rhythm.',0,null,0),
  ('floors','standard','Kalpitiya','Clean, breezy and made for bright contemporary rooms.',0,null,1),
  ('floors','standard','Pasikuda','Gentle warmth with a seamless, open feeling.',0,null,2),
  ('floors','premium','Habarana','Grounded earth tones with natural variation and depth.',0,null,3),
  ('floors','premium','Ella','Cool highland calm expressed through soft stone movement.',0,null,4),
  ('floors','premium','Sinharaja','Deep natural character balanced with refined detailing.',0,null,5),
  ('floors','signature','Sigiriya','Monumental calm, warm stone and precise geometry.',0,null,6),
  ('floors','signature','Yala','Wild texture refined into a confident interior statement.',0,null,7),
  ('floors','signature','Horton','Expansive, quiet and detailed with highland precision.',0,null,8)
)
insert into public.lx_designs (slug,name,space_id,collection,tagline,starting_price_lkr,min_sqm,published,sort_order)
select lower(regexp_replace(c.name,'[^a-zA-Z0-9]+','-','g')), c.name, s.id, c.collection, c.tagline, c.price, c.min_sqm, true, c.sort_order
from catalogue c join public.lx_spaces s on s.slug = c.space_slug
on conflict (slug) do update set name=excluded.name, space_id=excluded.space_id, collection=excluded.collection,
  tagline=excluded.tagline, starting_price_lkr=excluded.starting_price_lkr, min_sqm=excluded.min_sqm, sort_order=excluded.sort_order;

insert into public.lx_pages (slug,title,eyebrow,lead,published) values
  ('how-it-works','A clear process. A fully resolved result.','From first message to handover','Every stage is documented, approved and communicated before the next begins.',true),
  ('materials-brands','Named materials. Documented choices.','Materials & brands','We specify brands and construction systems openly.',true),
  ('pricing-guide','Understand the investment before construction.','Pricing clarity','Catalogue prices are honest starting points.',true),
  ('warranty-aftercare','Our responsibility continues after handover.','Warranty & aftercare','Every completed project includes a documented service warranty.',true),
  ('faq','Before design. Before construction.','Questions, answered honestly','Clear answers help clients make better decisions.',true)
on conflict (slug) do update set title=excluded.title, eyebrow=excluded.eyebrow, lead=excluded.lead;

revoke all on function public.lx_touch_updated_at() from public, anon, authenticated;

-- Bring the existing blog CMS under the same admin authorization without
-- changing its public published-post contract.
do $$
begin
  if to_regclass('public.blog_posts') is not null then
    execute 'alter table public.blog_posts enable row level security';
    execute 'drop policy if exists "public read published blog" on public.blog_posts';
    execute 'drop policy if exists "cms admin read" on public.blog_posts';
    execute 'drop policy if exists "cms admin insert" on public.blog_posts';
    execute 'drop policy if exists "cms admin update" on public.blog_posts';
    execute 'drop policy if exists "cms admin delete" on public.blog_posts';
    execute 'create policy "public read published blog" on public.blog_posts for select to anon, authenticated using (status = ''published'')';
    execute 'create policy "cms admin read" on public.blog_posts for select to authenticated using ((select private.lx_is_admin()))';
    execute 'create policy "cms admin insert" on public.blog_posts for insert to authenticated with check ((select private.lx_is_admin()))';
    execute 'create policy "cms admin update" on public.blog_posts for update to authenticated using ((select private.lx_is_admin())) with check ((select private.lx_is_admin()))';
    execute 'create policy "cms admin delete" on public.blog_posts for delete to authenticated using ((select private.lx_is_admin()))';
    execute 'grant select on public.blog_posts to anon, authenticated';
    execute 'grant insert, update, delete on public.blog_posts to authenticated';
  end if;
end $$;
