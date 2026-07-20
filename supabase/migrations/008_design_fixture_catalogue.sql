-- Rich, image-led fixture specifications for every named design.
-- Existing fixture rows are preserved; new fields are nullable/defaulted.

alter table public.lx_design_fixtures
  add column if not exists model_code text,
  add column if not exists finish text,
  add column if not exists quantity integer not null default 1,
  add column if not exists included boolean not null default true,
  add column if not exists image_alt text,
  add column if not exists notes text;

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'lx_design_fixtures_quantity_positive'
      and conrelid = 'public.lx_design_fixtures'::regclass
  ) then
    alter table public.lx_design_fixtures
      add constraint lx_design_fixtures_quantity_positive check (quantity > 0);
  end if;
end $$;

comment on table public.lx_design_fixtures is
  'Complete visual fixture and finish schedule for each LUXEhome named design.';
comment on column public.lx_design_fixtures.included is
  'True when included in the design starting specification; false for an optional upgrade.';
