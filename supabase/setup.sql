-- ============================================================
-- TILERSHUB — Supabase Setup
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================


-- ── 1. leads table ─────────────────────────────────────────
-- Every inspection request submitted through the contact form.

create table if not exists leads (
  id              uuid        primary key default gen_random_uuid(),
  created_at      timestamptz not null    default now(),
  name            text        not null,
  phone           text        not null,
  service         text        not null,
  location        text        not null,
  service_details jsonb,                        -- service-specific fields as key/value
  notes           text,
  source_url      text,
  status          text        not null default 'new'
    check (status in ('new', 'contacted', 'inspected', 'booked', 'completed', 'cancelled'))
);

-- Index for filtering by status in the dashboard
create index if not exists leads_status_idx on leads (status);
create index if not exists leads_created_at_idx on leads (created_at desc);


-- ── 2. cart_events table ───────────────────────────────────
-- Every "Add to Cart" tap across all service pages.
-- Useful for knowing which services are most popular.

create table if not exists cart_events (
  id           uuid        primary key default gen_random_uuid(),
  created_at   timestamptz not null    default now(),
  session_id   text        not null,             -- anonymous browser session
  service_name text        not null,
  price        integer     not null,             -- in LKR
  details      text,
  page_url     text
);

create index if not exists cart_events_service_idx    on cart_events (service_name);
create index if not exists cart_events_created_at_idx on cart_events (created_at desc);


-- ── 3. Row Level Security ──────────────────────────────────
-- Anon (public) users can INSERT only — they cannot read other people's data.
-- You (authenticated via Supabase dashboard) can read everything.

alter table leads       enable row level security;
alter table cart_events enable row level security;

-- Allow anonymous inserts (contact form, cart)
create policy "anon can insert leads"
  on leads for insert to anon with check (true);

create policy "anon can insert cart_events"
  on cart_events for insert to anon with check (true);

-- Allow authenticated users (you, in the dashboard) to read all rows
create policy "auth can select leads"
  on leads for select to authenticated using (true);

create policy "auth can update leads"
  on leads for update to authenticated using (true);

create policy "auth can select cart_events"
  on cart_events for select to authenticated using (true);


-- ── 4. Useful dashboard queries ───────────────────────────
-- Copy-paste these into the SQL Editor whenever you need them.

-- All new leads, newest first:
-- select * from leads where status = 'new' order by created_at desc;

-- Mark a lead as contacted:
-- update leads set status = 'contacted' where id = 'PASTE-UUID-HERE';

-- Most requested services (last 30 days):
-- select service, count(*) as total
-- from leads
-- where created_at > now() - interval '30 days'
-- group by service order by total desc;

-- Most added-to-cart services:
-- select service_name, count(*) as adds, sum(price) as total_value
-- from cart_events
-- group by service_name order by adds desc;
