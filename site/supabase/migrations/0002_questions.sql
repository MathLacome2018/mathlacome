-- Run this once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.
--
-- Creates the "Your Questions -> My Answers" forum: approved members ask
-- and like questions; you answer the most-liked ones from /private/admin,
-- which tags them and marks them "answered". Same RLS approach as the
-- books/comments migration -- update the email literal below if you ever
-- change ADMIN_EMAIL in Cloudflare.
--
-- No placeholder rows this time: questions need a real author_id tied to
-- an actual auth.users row, so there's nothing sensible to seed before
-- you've signed up. Ask yourself a test question once this is deployed.

create table if not exists public.questions (
  id uuid primary key default gen_random_uuid(),
  body text not null,
  author_id uuid not null references auth.users(id) on delete cascade,
  author_email text not null,
  status text not null default 'open' check (status in ('open', 'answered')),
  answer text,
  tags text[] not null default '{}',
  like_count integer not null default 0,
  answered_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.questions enable row level security;

create policy "Approved members can read questions"
  on public.questions for select
  to authenticated
  using (
    coalesce((auth.jwt() -> 'app_metadata' ->> 'approved')::boolean, false)
    or lower(auth.jwt() ->> 'email') = lower('mathlacome@gmail.com')
  );

create policy "Approved members can ask questions"
  on public.questions for insert
  to authenticated
  with check (
    auth.uid() = author_id
    and (
      coalesce((auth.jwt() -> 'app_metadata' ->> 'approved')::boolean, false)
      or lower(auth.jwt() ->> 'email') = lower('mathlacome@gmail.com')
    )
  );

-- Deliberately no update/delete policy for regular members: answering and
-- tagging a question happens server-side with the service role key (see
-- /private/admin), which bypasses RLS entirely. No one can answer their
-- own question, or anyone else's, through the normal client.

create table if not exists public.question_likes (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references public.questions(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (question_id, user_id)
);

alter table public.question_likes enable row level security;

create policy "Approved members can read likes"
  on public.question_likes for select
  to authenticated
  using (
    coalesce((auth.jwt() -> 'app_metadata' ->> 'approved')::boolean, false)
    or lower(auth.jwt() ->> 'email') = lower('mathlacome@gmail.com')
  );

create policy "Approved members can like questions"
  on public.question_likes for insert
  to authenticated
  with check (
    auth.uid() = user_id
    and (
      coalesce((auth.jwt() -> 'app_metadata' ->> 'approved')::boolean, false)
      or lower(auth.jwt() ->> 'email') = lower('mathlacome@gmail.com')
    )
  );

create policy "Members can remove their own like"
  on public.question_likes for delete
  to authenticated
  using (auth.uid() = user_id);

-- Keeps questions.like_count in sync so sorting by likes is a plain
-- "order by", instead of joining/counting question_likes on every read.
-- security definer so a member's own insert/delete (which only grants
-- them rights on question_likes) can still update the questions row.
create or replace function public.update_question_like_count()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if TG_OP = 'INSERT' then
    update public.questions set like_count = like_count + 1 where id = NEW.question_id;
    return NEW;
  elsif TG_OP = 'DELETE' then
    update public.questions set like_count = like_count - 1 where id = OLD.question_id;
    return OLD;
  end if;
  return null;
end;
$$;

drop trigger if exists question_likes_count_trigger on public.question_likes;
create trigger question_likes_count_trigger
after insert or delete on public.question_likes
for each row execute function public.update_question_like_count();
