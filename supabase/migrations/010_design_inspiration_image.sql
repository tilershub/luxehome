alter table public.lx_designs
  add column if not exists inspiration_image_url text;

update public.lx_designs
set inspiration_image_url = '/images/designs/manel/manel-flower.jpeg'
where slug = 'manel';
