-- Product detail, variants and guarded future checkout data
alter table public.lx_fixture_library
  add column if not exists slug text,
  add column if not exists sku text,
  add column if not exists gallery_urls text[] not null default '{}',
  add column if not exists description text,
  add column if not exists width_mm numeric(10,2),
  add column if not exists height_mm numeric(10,2),
  add column if not exists depth_mm numeric(10,2),
  add column if not exists tile_length_mm numeric(10,2),
  add column if not exists tile_width_mm numeric(10,2),
  add column if not exists coverage_sqm_per_box numeric(10,3),
  add column if not exists pieces_per_box integer,
  add column if not exists warranty_terms text,
  add column if not exists product_type text not null default 'standard',
  add column if not exists delivery_class text not null default 'standard';
create unique index if not exists lx_fixture_library_slug_unique on public.lx_fixture_library(slug) where slug is not null;
alter table public.lx_fixture_library drop constraint if exists lx_fixture_slug_safe;
alter table public.lx_fixture_library add constraint lx_fixture_slug_safe
 check (slug is null or slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$');
alter table public.lx_fixture_library drop constraint if exists lx_fixture_dimensions_positive;
alter table public.lx_fixture_library add constraint lx_fixture_dimensions_positive
 check (coalesce(width_mm,1)>0 and coalesce(height_mm,1)>0 and coalesce(depth_mm,1)>0 and
 coalesce(tile_length_mm,1)>0 and coalesce(tile_width_mm,1)>0 and coalesce(coverage_sqm_per_box,1)>0 and coalesce(pieces_per_box,1)>0);

create table if not exists public.lx_shop_variants(
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.lx_fixture_library(id) on delete cascade,
  label text not null,
  sku text,
  size_label text,
  finish_label text,
  price_lkr numeric(12,2) not null check(price_lkr > 0),
  stock_quantity integer check(stock_quantity is null or stock_quantity >= 0),
  availability text not null default 'made_to_order'
    check(availability in('in_stock','made_to_order','out_of_stock')),
  active boolean not null default true,
  sort_order integer not null default 0,
  unique(product_id,label)
);
create index if not exists lx_shop_variants_product_idx on public.lx_shop_variants(product_id,sort_order);
alter table public.lx_shop_variants enable row level security;
grant select on public.lx_shop_variants to anon;
grant select,insert,update,delete on public.lx_shop_variants to authenticated;
drop policy if exists "Public read available shop variants" on public.lx_shop_variants;
create policy "Public read available shop variants" on public.lx_shop_variants for select to anon,authenticated
 using(active and exists(select 1 from public.lx_fixture_library f
 where f.id=product_id and f.active and f.for_sale and f.image_url is not null));
drop policy if exists "Admin read all shop variants" on public.lx_shop_variants;
create policy "Admin read all shop variants" on public.lx_shop_variants for select to authenticated using ((select private.lx_is_admin()));
drop policy if exists "Admin insert shop variants" on public.lx_shop_variants;
create policy "Admin insert shop variants" on public.lx_shop_variants for insert to authenticated with check ((select private.lx_is_admin()));
drop policy if exists "Admin update shop variants" on public.lx_shop_variants;
create policy "Admin update shop variants" on public.lx_shop_variants for update to authenticated using ((select private.lx_is_admin())) with check ((select private.lx_is_admin()));
drop policy if exists "Admin delete shop variants" on public.lx_shop_variants;
create policy "Admin delete shop variants" on public.lx_shop_variants for delete to authenticated using ((select private.lx_is_admin()));

-- Purchase data is private. Do not enable payments until merchant verification, delivery rates
-- and server-side order creation + verified gateway notifications are deployed.
create table if not exists public.lx_shop_orders(
 id uuid primary key default gen_random_uuid(),
 public_reference text not null unique,
 customer_name text not null,
 customer_email text not null,
 customer_phone text not null,
 delivery_address text not null,
 delivery_city text not null,
 fulfillment_method text not null check(fulfillment_method in ('delivery','collection')),
 currency text not null default 'LKR',
 subtotal_lkr numeric(12,2) not null check(subtotal_lkr>=0),
 delivery_lkr numeric(12,2) not null default 0 check(delivery_lkr>=0),
 total_lkr numeric(12,2) not null check(total_lkr>=0),
 status text not null default 'pending_payment' check(status in ('pending_payment','paid','processing','shipped','fulfilled','cancelled','failed','refunded')),
 payment_provider text,
 payment_reference text,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);
create table if not exists public.lx_shop_order_items(
 id uuid primary key default gen_random_uuid(),
 order_id uuid not null references public.lx_shop_orders(id) on delete cascade,
 product_id uuid references public.lx_fixture_library(id) on delete set null,
 variant_id uuid references public.lx_shop_variants(id) on delete set null,
 product_name text not null,
 sku text,
 selection text,
 quantity integer not null check(quantity between 1 and 100),
 unit_price_lkr numeric(12,2) not null check(unit_price_lkr > 0),
 line_total_lkr numeric(12,2) not null check(line_total_lkr >= 0)
);
create index if not exists lx_shop_orders_created on public.lx_shop_orders(created_at desc);
create index if not exists lx_shop_order_items_order on public.lx_shop_order_items(order_id);
alter table public.lx_shop_orders enable row level security;
alter table public.lx_shop_order_items enable row level security;
grant select,insert,update,delete on public.lx_shop_orders to authenticated;
grant select,insert,update,delete on public.lx_shop_order_items to authenticated;
drop policy if exists "CMS admins manage orders" on public.lx_shop_orders;
create policy "CMS admins manage orders" on public.lx_shop_orders for all to authenticated
 using ((select private.lx_is_admin())) with check ((select private.lx_is_admin()));
drop policy if exists "CMS admins manage order lines" on public.lx_shop_order_items;
create policy "CMS admins manage order lines" on public.lx_shop_order_items for all to authenticated
 using ((select private.lx_is_admin())) with check ((select private.lx_is_admin()));
