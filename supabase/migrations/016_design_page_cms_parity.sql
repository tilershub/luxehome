-- Bring the CMS in line with everything the bathroom design page renders.
-- Previously the name story, the floor plan, the walk-in step captions and
-- the material photographs were hardcoded in the template.

-- "The name behind the design" section
alter table lx_designs add column if not exists name_heading text;
alter table lx_designs add column if not exists name_story text;

-- Floor plan: either a supplied plan image, or the drawn plan with real dims
alter table lx_designs add column if not exists plan_image_url text;
alter table lx_designs add column if not exists room_length_m numeric(4,2);
alter table lx_designs add column if not exists room_width_m  numeric(4,2);

-- Walk-in step captions ride on the render rows
alter table lx_design_drawings add column if not exists caption text;
alter table lx_design_drawings add column if not exists sort_order integer not null default 0;

-- Materials become a photo grid, not just brand chips
alter table lx_design_materials add column if not exists image_url text;
alter table lx_design_materials add column if not exists usage_label text;

-- Camera-roll uploads arrive as HEIC on iOS; the CMS converts to WebP before
-- upload, but allow the source types so a failed conversion is still saveable.
update storage.buckets
   set allowed_mime_types = array[
         'image/jpeg', 'image/png', 'image/webp', 'image/avif',
         'image/heic', 'image/heif'
       ]
 where id = 'luxehome-media';
