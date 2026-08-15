-- Keep database-created drafts aligned with the value-led proposal builder.

alter table public.lx_proposals
  alter column project_title set default 'Bathroom renovation proposal',
  alter column validity_days set default 14,
  alter column valid_until set default (current_date + 14),
  alter column value_points set default '["The room is resolved in 3D before construction, reducing avoidable site decisions and rework.","One accountable LUXEhome team coordinates design, procurement, construction, testing and handover.","Critical concealed work is inspected and tested before it is covered by finishes.","Fixtures, materials, brands and payment milestones are documented before appointment."]'::jsonb,
  alter column variation_terms set default 'Additional or changed work proceeds only after written client approval of the price and programme effect. The accepted proposal is never silently overwritten.',
  alter column warranty_exclusions set default array[
    'Misuse, accidental damage, normal wear or inadequate routine maintenance.',
    'Abnormal water pressure, water quality, post-handover blockages or building movement.',
    'Unauthorised third-party alterations and product defects outside LUXEhome workmanship.',
    'Work, products or conditions outside the accepted written proposal scope.'
  ],
  alter column warranty_claim_contact set default 'WhatsApp 077 450 3744 · luxehome@gmail.com';
