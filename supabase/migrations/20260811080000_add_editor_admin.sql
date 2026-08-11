-- Grant the LUXEhome CMS editor access requested for Thamali Hansika.
insert into private.lx_admin_emails (email, role, active)
values ('thamalihansika0518@gmail.com', 'editor', true)
on conflict (email) do update set
  role = excluded.role,
  active = excluded.active;
