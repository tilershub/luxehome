-- Renders become named bathroom areas so each design page shows the same
-- five views: the cover (on the design record) plus vanity, water closet,
-- shower and ceiling. Generic render_1..4 slots told nobody what to upload.
alter table lx_design_drawings drop constraint if exists lx_design_drawings_kind_check;

update lx_design_drawings set kind = 'vanity'       where kind = 'render_1';
update lx_design_drawings set kind = 'water_closet' where kind = 'render_2';
update lx_design_drawings set kind = 'shower'       where kind = 'render_3';
update lx_design_drawings set kind = 'ceiling'      where kind = 'render_4';

alter table lx_design_drawings add constraint lx_design_drawings_kind_check
  check (kind = any (array[
    'vanity', 'water_closet', 'shower', 'ceiling',
    'civil', 'supply_water', 'waste_drainage', 'electrical'
  ]));
