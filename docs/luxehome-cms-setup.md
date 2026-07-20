# LUXEhome CMS setup

The CMS uses the browser-safe Supabase publishable/anon key. Authorization is enforced by RLS through an explicit admin allow-list; no service-role key is used in the website.

## 1. Apply migrations

Apply the files in `supabase/migrations` in order. Migration `003_secure_admin_storage_and_shop.sql`:

- replaces the original blanket authenticated write rules with admin-only policies;
- creates the `luxehome-media` public delivery bucket with admin-only uploads;
- adds design card highlights;
- creates managed shop products and site-inspection records.

Migration `004_public_site_content_model.sql` matches the approved public-site and admin proposals. It seeds all 36 bathroom, kitchen, staircase and floor designs; adds website pages, categories, media and global settings; and adds project-reference, area and two-episode fields.

## 2. Bootstrap the first administrator

Create the staff member in Supabase Authentication, copy their user UUID, then run this once in the Supabase SQL editor:

```sql
insert into private.lx_admin_users (user_id, role)
values ('AUTH_USER_UUID', 'owner')
on conflict (user_id) do update
set role = excluded.role, active = true;
```

Use role `editor` for other staff. Set `active = false` to revoke CMS access without deleting their Auth account.

## 3. Cloudflare environment variables

Set these for Preview and Production and redeploy:

```text
PUBLIC_SUPABASE_URL=https://ctxugrhuanygycjgijcf.supabase.co
PUBLIC_SUPABASE_ANON_KEY=<publishable-or-legacy-anon-key>
```

Never configure a Supabase secret/service-role key as a `PUBLIC_` variable.

## CMS routes

- `/admin` — operations dashboard, quotation and invoice tools
- `/admin/cms` — complete website CMS dashboard
- `/admin/catalogue/designs` — design files
- `/admin/catalogue/designs/new` — add a design
- `/admin/catalogue/projects` — transparent project stories
- `/admin/catalogue/projects/new` — add a project story
- `/admin/catalogue/team` — permanent and project team
- `/admin/cms/blog` — blog publishing
- `/admin/cms/products` — product publishing
- `/admin/crm` — leads and follow-up
- `/admin/cms/pages` — website and legal pages
- `/admin/cms/categories` — blog/product/media categories
- `/admin/cms/inspections` — site-inspection queue
- `/admin/cms/media` — Supabase Storage media library
- `/admin/cms/settings` — WhatsApp, warranty, inspection fee and SEO defaults

The public shop uses published `lx_products` rows and keeps the existing two hard-coded products as a safe fallback until the first managed product is published.
