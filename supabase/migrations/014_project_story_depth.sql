-- Deeper project stories: the client brief and estimate, the Google
-- review screenshot, and per-stage diary photos for the build journal.
alter table lx_projects add column if not exists client_requirements text;
alter table lx_projects add column if not exists estimate_label text;
alter table lx_projects add column if not exists review_screenshot_url text;
alter table lx_project_journey add column if not exists image_urls text[] not null default '{}';
