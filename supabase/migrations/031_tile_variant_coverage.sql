-- Tile variants can contain different pack coverage from the parent tile.
alter table public.lx_shop_variants add column if not exists coverage_sqm_per_box numeric(10,3);
alter table public.lx_shop_variants add column if not exists pieces_per_box integer;
alter table public.lx_shop_variants drop constraint if exists lx_shop_variants_pack_coverage_positive;
alter table public.lx_shop_variants add constraint lx_shop_variants_pack_coverage_positive
 check ((coverage_sqm_per_box is null or coverage_sqm_per_box>0) and (pieces_per_box is null or pieces_per_box>0));
