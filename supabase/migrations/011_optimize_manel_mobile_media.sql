-- Use rasterised drawing previews for consistent mobile browser rendering and
-- remove the invalid zero-byte fourth render so the UI shows its placeholder.

update public.lx_design_drawings as drawing
set image_url = replacement.image_url
from public.lx_designs as design
cross join (values
  ('civil', '/images/designs/manel/sample-civil.webp'),
  ('supply_water', '/images/designs/manel/sample-supply-water.webp'),
  ('waste_drainage', '/images/designs/manel/sample-waste-drainage.webp'),
  ('electrical', '/images/designs/manel/sample-electrical.webp')
) as replacement(kind, image_url)
where drawing.design_id = design.id
  and design.slug = 'manel'
  and drawing.kind = replacement.kind;

delete from public.lx_design_drawings as drawing
using public.lx_designs as design
where drawing.design_id = design.id
  and design.slug = 'manel'
  and drawing.kind = 'render_4'
  and drawing.image_url = '/images/designs/manel/render-4.jpeg';
