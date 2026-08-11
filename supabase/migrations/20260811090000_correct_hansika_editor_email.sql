-- Replace the incorrectly supplied editor email with Hansika's correct address.
delete from private.lx_admin_emails
where email = 'thamalihansika0518@gmail.com';

insert into private.lx_admin_emails (email, role, active)
values ('hansikathamali298@gmail.com', 'editor', true)
on conflict (email) do update set
  role = excluded.role,
  active = excluded.active;
