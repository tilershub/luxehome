-- The four technical drawings are one shared preset shipped with the site
-- (STANDARD_DRAWINGS), identical on every design page. They are no longer
-- uploaded per design, so drop the stored rows and narrow the slot list to
-- the room photography a design actually needs.
delete from lx_design_drawings
 where kind in ('civil', 'supply_water', 'waste_drainage', 'electrical');

alter table lx_design_drawings drop constraint if exists lx_design_drawings_kind_check;
alter table lx_design_drawings add constraint lx_design_drawings_kind_check
  check (kind = any (array['vanity', 'water_closet', 'shower', 'ceiling']));
