-- Keep every issued proposal immutable. Status tracking may advance, but scope,
-- price, payment terms and media must move to a numbered revision.

create or replace function private.lx_enforce_proposal_lock()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  if old.status <> 'draft' then
    if (
      to_jsonb(new) - array['status', 'sent_at', 'accepted_at', 'updated_at']
    ) is distinct from (
      to_jsonb(old) - array['status', 'sent_at', 'accepted_at', 'updated_at']
    ) then
      raise exception 'Issued proposals are locked; create a revision to change proposal content.';
    end if;

    if not (
      new.status = old.status
      or (old.status = 'approved' and new.status in ('sent', 'accepted', 'declined'))
      or (old.status = 'sent' and new.status in ('accepted', 'declined'))
    ) then
      raise exception 'Invalid proposal status transition from % to %.', old.status, new.status;
    end if;
  elsif new.status not in ('draft', 'approved') then
    raise exception 'A draft proposal must be approved before its status can advance.';
  end if;

  return new;
end;
$$;

drop trigger if exists lx_proposals_enforce_lock on public.lx_proposals;
create trigger lx_proposals_enforce_lock
  before update on public.lx_proposals
  for each row execute function private.lx_enforce_proposal_lock();

revoke all on function private.lx_enforce_proposal_lock() from public, anon, authenticated;
