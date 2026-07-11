-- Run this once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.
--
-- Creates the "Books I Read" table and its comments table, with Row Level
-- Security so only approved private members can read or write them (mirrors
-- the app_metadata.approved flag the admin panel already sets). This is a
-- second layer of defense: the app's middleware already blocks unapproved
-- users from reaching these pages, but RLS enforces it at the database
-- level too, in case anything ever queries Supabase directly.
--
-- If you ever change ADMIN_EMAIL in Cloudflare, update the email literal
-- below to match, or the admin account will lose implicit access here.

create table if not exists public.books (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  author text not null,
  cover_url text,
  lessons text,
  summary text,
  snippets text,
  added_at timestamptz not null default now()
);

alter table public.books enable row level security;

create policy "Approved members can read books"
  on public.books for select
  to authenticated
  using (
    coalesce((auth.jwt() -> 'app_metadata' ->> 'approved')::boolean, false)
    or lower(auth.jwt() ->> 'email') = lower('mathlacome@gmail.com')
  );

create table if not exists public.book_comments (
  id uuid primary key default gen_random_uuid(),
  book_id uuid not null references public.books(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  user_email text not null,
  body text not null,
  created_at timestamptz not null default now()
);

alter table public.book_comments enable row level security;

create policy "Approved members can read comments"
  on public.book_comments for select
  to authenticated
  using (
    coalesce((auth.jwt() -> 'app_metadata' ->> 'approved')::boolean, false)
    or lower(auth.jwt() ->> 'email') = lower('mathlacome@gmail.com')
  );

create policy "Approved members can post their own comments"
  on public.book_comments for insert
  to authenticated
  with check (
    auth.uid() = user_id
    and (
      coalesce((auth.jwt() -> 'app_metadata' ->> 'approved')::boolean, false)
      or lower(auth.jwt() ->> 'email') = lower('mathlacome@gmail.com')
    )
  );

-- Optional: a couple of placeholder rows so you can see the page working
-- immediately. Feel free to edit/delete these from Table Editor -> books.
insert into public.books (title, author, cover_url, lessons, summary, snippets)
values
  (
    'Atomic Habits',
    'James Clear',
    'https://covers.openlibrary.org/b/isbn/0735211299-L.jpg',
    'Small, consistent systems beat big, occasional efforts. Identity-based habits stick better than outcome-based ones -- decide who you want to be, then let habits be the evidence.',
    'A practical framework for behavior change built on four laws: make it obvious, make it attractive, make it easy, make it satisfying. Light on theory, heavy on actionable structure.',
    E'"You do not rise to the level of your goals. You fall to the level of your systems."\n\n"Every action you take is a vote for the type of person you wish to become."'
  ),
  (
    'Thinking, Fast and Slow',
    'Daniel Kahneman',
    'https://covers.openlibrary.org/b/isbn/0374533555-L.jpg',
    'Most of our daily decisions run on fast, intuitive, and frequently biased judgment. Naming the bias is the first step to correcting for it.',
    'A tour of the two-system model of the mind -- System 1 (fast, automatic) and System 2 (slow, deliberate) -- and the long list of predictable errors that follow from over-relying on System 1.',
    E'"Nothing in life is as important as you think it is while you are thinking about it."'
  )
on conflict do nothing;
