-- Run this once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.
--
-- Invite / voucher system for the word-of-mouth access experiment.
--
-- Each invite code is single-use. Registration REQUIRES a valid, active,
-- unredeemed code -> the new account gets instant access to /private, but
-- its own 2 codes stay dormant (active = false) until Mathieu "vets" the
-- member from the admin panel. The full referral tree is reconstructable
-- from this one table: your parent is whoever created the code you
-- redeemed; your children are the codes you created that got redeemed.
--
-- All writes go through the server-side service-role client (signup,
-- vetting, minting, removal), which bypasses RLS. The only thing members
-- do directly is READ their own codes to share them.

create table if not exists public.invites (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  created_by uuid references auth.users(id) on delete set null,
  created_by_email text,
  redeemed_by uuid references auth.users(id) on delete set null,
  redeemed_by_email text,
  active boolean not null default false,   -- creator vetted? seed/admin codes = true
  revoked boolean not null default false,
  created_at timestamptz not null default now(),
  redeemed_at timestamptz
);

create index if not exists invites_created_by_idx on public.invites(created_by);
create index if not exists invites_redeemed_by_idx on public.invites(redeemed_by);

alter table public.invites enable row level security;

create policy "Members read their own invites"
  on public.invites for select
  to authenticated
  using (created_by = auth.uid());

-- ---------------------------------------------------------------------------
-- Backfill: everyone already on the platform becomes a vetted root member
-- with 2 live invite codes. Roots have no redeemed invite (they predate the
-- system). Safe to re-run: it skips users who already have codes.
-- ---------------------------------------------------------------------------
do $$
declare
  u record;
  i int;
begin
  for u in select id, email from auth.users loop
    update auth.users
      set raw_app_meta_data =
        coalesce(raw_app_meta_data, '{}'::jsonb) || '{"approved": true, "vetted": true}'::jsonb
      where id = u.id;

    if not exists (select 1 from public.invites where created_by = u.id) then
      for i in 1..2 loop
        insert into public.invites (code, created_by, created_by_email, active)
          values (upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 8)), u.id, u.email, true);
      end loop;
    end if;
  end loop;
end $$;
