-- Client proposal builder: one measured bathroom, one locked issued proposal.

create sequence if not exists public.lx_proposal_number_seq start 1;

create table if not exists public.lx_proposals (
  id uuid primary key default gen_random_uuid(),
  proposal_number text not null default (
    'LX-P-' || to_char(current_date, 'YYYY') || '-' ||
    lpad(nextval('public.lx_proposal_number_seq')::text, 4, '0')
  ),
  revision integer not null default 0 check (revision >= 0),
  revision_of uuid references public.lx_proposals(id) on delete set null,
  status text not null default 'draft'
    check (status in ('draft', 'approved', 'sent', 'accepted', 'declined', 'expired')),
  source_inspection_id uuid references public.lx_site_inspections(id) on delete set null,
  design_id uuid references public.lx_designs(id) on delete set null,
  client_name text not null,
  client_phone text,
  client_email text,
  property_location text,
  project_type text not null default 'renovation'
    check (project_type in ('renovation', 'new')),
  bathroom_name text not null default 'Main bathroom',
  room_dimensions text,
  room_sqm numeric check (room_sqm is null or room_sqm > 0),
  client_brief text,
  site_findings text,
  design_name text,
  design_collection text,
  selected_image_urls text[] not null default '{}',
  video_url text,
  scope_items jsonb not null default '[]'::jsonb,
  exclusions text[] not null default '{}',
  materials jsonb not null default '[]'::jsonb,
  timeline jsonb not null default '[]'::jsonb,
  quality_items jsonb not null default '[]'::jsonb,
  warranties jsonb not null default '[]'::jsonb,
  contract_value_lkr numeric not null default 0 check (contract_value_lkr >= 0),
  initiation_credit_lkr numeric not null default 50000 check (initiation_credit_lkr >= 0),
  validity_days integer not null default 30 check (validity_days > 0),
  issued_at date not null default current_date,
  valid_until date not null default (current_date + 30),
  commencement_days integer not null default 7 check (commencement_days > 0),
  internal_notes text,
  approved_at timestamptz,
  sent_at timestamptz,
  accepted_at timestamptz,
  created_by uuid default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (proposal_number, revision)
);

drop trigger if exists lx_proposals_touch on public.lx_proposals;
create trigger lx_proposals_touch
  before update on public.lx_proposals
  for each row execute function public.lx_touch_updated_at();

alter table public.lx_proposals enable row level security;

drop policy if exists "cms admin read" on public.lx_proposals;
create policy "cms admin read" on public.lx_proposals
  for select to authenticated using ((select private.lx_is_admin()));

drop policy if exists "cms admin insert" on public.lx_proposals;
create policy "cms admin insert" on public.lx_proposals
  for insert to authenticated with check ((select private.lx_is_admin()));

drop policy if exists "cms admin update" on public.lx_proposals;
create policy "cms admin update" on public.lx_proposals
  for update to authenticated
  using ((select private.lx_is_admin()))
  with check ((select private.lx_is_admin()));

drop policy if exists "cms admin delete" on public.lx_proposals;
create policy "cms admin delete" on public.lx_proposals
  for delete to authenticated using ((select private.lx_is_admin()));

grant select, insert, update, delete on public.lx_proposals to authenticated;
grant usage, select on sequence public.lx_proposal_number_seq to authenticated;

revoke all on function public.lx_touch_updated_at() from public, anon, authenticated;

