-- ============================================================
-- EduSpace Sakartvelo — media_posts schema
-- Run this in the Supabase SQL Editor (Project > SQL Editor > New query)
-- ============================================================

create extension if not exists "pgcrypto";

create table if not exists public.media_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  media_type text not null check (media_type in ('image', 'video')),
  media_url text,        -- Cloudinary secure_url (images only)
  public_id text,        -- Cloudinary public_id, needed if you later want to delete/transform the asset
  youtube_id text,       -- YouTube video ID (videos only)
  created_at timestamptz not null default now()
);

-- Guard rails: an image post must have a media_url, a video post must have a youtube_id
alter table public.media_posts
  add constraint media_posts_type_consistency check (
    (media_type = 'image' and media_url is not null)
    or
    (media_type = 'video' and youtube_id is not null)
  );

create index if not exists media_posts_created_at_idx on public.media_posts (created_at desc);
create index if not exists media_posts_media_type_idx on public.media_posts (media_type);

-- ============================================================
-- Row Level Security
-- Public site only needs to READ posts. Writes happen through the
-- admin panel using the anon key in this build (no auth wired up yet),
-- so we allow public inserts/deletes too. Tighten this once you add
-- Supabase Auth to protect /admin.
-- ============================================================
alter table public.media_posts enable row level security;

create policy "Public can read media_posts"
  on public.media_posts for select
  using (true);

create policy "Public can insert media_posts"
  on public.media_posts for insert
  with check (true);

create policy "Public can delete media_posts"
  on public.media_posts for delete
  using (true);

-- ============================================================
-- IMPORTANT SECURITY NOTE
-- The insert/delete policies above are intentionally open so the
-- /admin panel works out of the box with the anon key. Before going
-- to production, add Supabase Auth and replace these policies with
-- checks against auth.uid() so only signed-in admins can write.
-- ============================================================
