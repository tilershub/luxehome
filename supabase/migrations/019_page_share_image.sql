-- Info pages (/how-it-works, /pricing-guide, /faq, /terms …) share the site
-- default image. Give each one its own, editable in the CMS.
alter table lx_pages add column if not exists og_image text;
