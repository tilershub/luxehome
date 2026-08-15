-- Value-led proposal template. Existing issued proposals remain on template v1;
-- drafts and newly created proposals use the richer v2 snapshot.

alter table public.lx_proposals
  add column if not exists proposal_template_version integer not null default 1,
  add column if not exists project_title text not null default '',
  add column if not exists design_vision text not null default '',
  add column if not exists value_points jsonb not null default '[]'::jsonb,
  add column if not exists image_items jsonb not null default '[]'::jsonb,
  add column if not exists fixtures jsonb not null default '[]'::jsonb,
  add column if not exists assumptions text[] not null default '{}',
  add column if not exists client_supplied_items text[] not null default '{}',
  add column if not exists variation_terms text not null default '',
  add column if not exists estimated_duration text not null default '3–4 weeks',
  add column if not exists proposed_start_date date,
  add column if not exists proposed_handover_date date,
  add column if not exists programme_extension_days integer not null default 14,
  add column if not exists warranty_exclusions text[] not null default '{}',
  add column if not exists warranty_claim_contact text not null default '',
  add column if not exists price_items jsonb not null default '[]'::jsonb,
  add column if not exists discount_lkr numeric not null default 0,
  add column if not exists tax_lkr numeric not null default 0,
  add column if not exists adjustment_lkr numeric not null default 0,
  add column if not exists payment_schedule jsonb not null default '[]'::jsonb,
  add column if not exists prepared_by text not null default 'LUXEhome Project Team';

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'lx_proposals_template_version_check'
      and conrelid = 'public.lx_proposals'::regclass
  ) then
    alter table public.lx_proposals
      add constraint lx_proposals_template_version_check
      check (proposal_template_version in (1, 2));
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'lx_proposals_programme_extension_check'
      and conrelid = 'public.lx_proposals'::regclass
  ) then
    alter table public.lx_proposals
      add constraint lx_proposals_programme_extension_check
      check (programme_extension_days between 0 and 60);
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'lx_proposals_value_points_array_check'
      and conrelid = 'public.lx_proposals'::regclass
  ) then
    alter table public.lx_proposals
      add constraint lx_proposals_value_points_array_check
      check (jsonb_typeof(value_points) = 'array');
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'lx_proposals_image_items_array_check'
      and conrelid = 'public.lx_proposals'::regclass
  ) then
    alter table public.lx_proposals
      add constraint lx_proposals_image_items_array_check
      check (jsonb_typeof(image_items) = 'array');
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'lx_proposals_fixtures_array_check'
      and conrelid = 'public.lx_proposals'::regclass
  ) then
    alter table public.lx_proposals
      add constraint lx_proposals_fixtures_array_check
      check (jsonb_typeof(fixtures) = 'array');
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'lx_proposals_price_items_array_check'
      and conrelid = 'public.lx_proposals'::regclass
  ) then
    alter table public.lx_proposals
      add constraint lx_proposals_price_items_array_check
      check (jsonb_typeof(price_items) = 'array');
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'lx_proposals_payment_schedule_array_check'
      and conrelid = 'public.lx_proposals'::regclass
  ) then
    alter table public.lx_proposals
      add constraint lx_proposals_payment_schedule_array_check
      check (jsonb_typeof(payment_schedule) = 'array');
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'lx_proposals_discount_nonnegative_check'
      and conrelid = 'public.lx_proposals'::regclass
  ) then
    alter table public.lx_proposals
      add constraint lx_proposals_discount_nonnegative_check
      check (discount_lkr >= 0);
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'lx_proposals_tax_nonnegative_check'
      and conrelid = 'public.lx_proposals'::regclass
  ) then
    alter table public.lx_proposals
      add constraint lx_proposals_tax_nonnegative_check
      check (tax_lkr >= 0);
  end if;
end $$;

-- Drafts can move to the new template without affecting an issued snapshot.
update public.lx_proposals
set
  proposal_template_version = 2,
  project_title = case
    when project_title = '' and project_type = 'new' then 'New bathroom construction proposal'
    when project_title = '' then 'Bathroom renovation proposal'
    else project_title
  end,
  value_points = case
    when jsonb_array_length(value_points) = 0 then
      '["The room is resolved in 3D before construction, reducing avoidable site decisions and rework.","One accountable LUXEhome team coordinates design, procurement, construction, testing and handover.","Critical concealed work is inspected and tested before it is covered by finishes.","Fixtures, materials, brands and payment milestones are documented before appointment."]'::jsonb
    else value_points
  end,
  variation_terms = case
    when variation_terms = '' then 'Additional or changed work proceeds only after written client approval of the price and programme effect. The accepted proposal is never silently overwritten.'
    else variation_terms
  end,
  warranty_exclusions = case
    when cardinality(warranty_exclusions) = 0 then array[
      'Misuse, accidental damage, normal wear or inadequate routine maintenance.',
      'Abnormal water pressure, water quality, post-handover blockages or building movement.',
      'Unauthorised third-party alterations and product defects outside LUXEhome workmanship.',
      'Work, products or conditions outside the accepted written proposal scope.'
    ]
    else warranty_exclusions
  end,
  warranty_claim_contact = case
    when warranty_claim_contact = '' then 'WhatsApp 077 450 3744 · luxehome@gmail.com'
    else warranty_claim_contact
  end,
  payment_schedule = case
    when jsonb_array_length(payment_schedule) = 0 then
      '[{"stage":"Project confirmation","percentage":25,"due_milestone":"On signed acceptance, before procurement and mobilisation","evidence":"Approved proposal and commencement confirmation"},{"stage":"Demolition completed","percentage":25,"due_milestone":"After controlled demolition and debris bagging","evidence":"Stage photos and site update"},{"stage":"Waterproofing completed","percentage":20,"due_milestone":"After waterproofing application and before flood testing","evidence":"Waterproofing inspection record"},{"stage":"Tiling completed","percentage":10,"due_milestone":"After tiling and grouting are completed","evidence":"Tiling quality check"},{"stage":"Ceiling and lighting completed","percentage":10,"due_milestone":"After ceiling and light fixtures are installed","evidence":"Electrical and ceiling stage check"},{"stage":"Completion and handover","percentage":10,"due_milestone":"When final testing, cleaning and handover are ready","evidence":"Handover checklist"}]'::jsonb
    else payment_schedule
  end,
  price_items = case
    when jsonb_array_length(price_items) = 0 then jsonb_build_array(jsonb_build_object(
      'category', 'Complete bathroom project',
      'description', 'Design coordination, procurement, construction, quality checks, final installation and handover',
      'amount_lkr', contract_value_lkr
    ))
    else price_items
  end,
  validity_days = case when validity_days = 30 then 14 else validity_days end,
  valid_until = issued_at + case when validity_days = 30 then 14 else validity_days end
where status = 'draft';

update public.lx_proposals as proposal
set image_items = (
  select coalesce(
    jsonb_agg(
      jsonb_build_object(
        'url', image_url,
        'view', case when position = 1 then 'Cover' else 'Design view' end,
        'title', case when position = 1 then 'Hero design view' else 'Approved 3D view ' || position end,
        'caption', 'Approved project design visual'
      ) order by position
    ),
    '[]'::jsonb
  )
  from unnest(proposal.selected_image_urls) with ordinality as image(image_url, position)
)
where proposal.status = 'draft'
  and jsonb_array_length(proposal.image_items) = 0
  and cardinality(proposal.selected_image_urls) > 0;

alter table public.lx_proposals
  alter column proposal_template_version set default 2,
  alter column payment_schedule set default '[{"stage":"Project confirmation","percentage":25,"due_milestone":"On signed acceptance, before procurement and mobilisation","evidence":"Approved proposal and commencement confirmation"},{"stage":"Demolition completed","percentage":25,"due_milestone":"After controlled demolition and debris bagging","evidence":"Stage photos and site update"},{"stage":"Waterproofing completed","percentage":20,"due_milestone":"After waterproofing application and before flood testing","evidence":"Waterproofing inspection record"},{"stage":"Tiling completed","percentage":10,"due_milestone":"After tiling and grouting are completed","evidence":"Tiling quality check"},{"stage":"Ceiling and lighting completed","percentage":10,"due_milestone":"After ceiling and light fixtures are installed","evidence":"Electrical and ceiling stage check"},{"stage":"Completion and handover","percentage":10,"due_milestone":"When final testing, cleaning and handover are ready","evidence":"Handover checklist"}]'::jsonb;

comment on column public.lx_proposals.proposal_template_version is
  '1 preserves the original issued PDF; 2 uses the value-led proposal template.';
