-- BathSpace fixture catalogue as single source of truth for project records and fixed-price sales.
-- Products start hidden from the shop until marked sellable and priced by an editor.
alter table public.lx_fixture_library
  add column if not exists for_sale boolean not null default false,
  add column if not exists sale_price_lkr numeric(12,2),
  add column if not exists sale_unit text not null default 'item',
  add column if not exists sale_availability text not null default 'made_to_order',
  add column if not exists sale_notes text;
alter table public.lx_fixture_library
  drop constraint if exists lx_fixture_library_sale_price_check;
alter table public.lx_fixture_library
  add constraint lx_fixture_library_sale_price_check
  check (sale_price_lkr is null or sale_price_lkr > 0);
alter table public.lx_fixture_library
  drop constraint if exists lx_fixture_library_sale_availability_check;
alter table public.lx_fixture_library
  add constraint lx_fixture_library_sale_availability_check
  check (sale_availability in ('in_stock','made_to_order','out_of_stock'));
create index if not exists lx_fixture_library_sellable_idx
  on public.lx_fixture_library (category,item_name)
  where active=true and for_sale=true and sale_price_lkr is not null;
