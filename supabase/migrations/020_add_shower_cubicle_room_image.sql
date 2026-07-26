-- Add a dedicated shower-cubicle photograph to each design's room walk-through.
alter table public.lx_design_drawings
  drop constraint if exists lx_design_drawings_kind_check;

alter table public.lx_design_drawings
  add constraint lx_design_drawings_kind_check
  check (kind = any (array[
    'vanity',
    'water_closet',
    'shower',
    'shower_cubicle',
    'ceiling'
  ]));
