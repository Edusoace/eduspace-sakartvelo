# EduSpace Sakartvelo

Modern educational portal built with Next.js (App Router), Tailwind CSS, Supabase, and Cloudinary.

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment variables** — copy `.env.local.example` to `.env.local` and fill in:
   ```
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=miokcift
   NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=eduspace_preset
   CLOUDINARY_API_KEY=753582923863619
   CLOUDINARY_API_SECRET=your_secret
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

3. **Cloudinary upload preset** — in the Cloudinary console, create an **unsigned** upload preset named
   `eduspace_preset` (Settings → Upload → Upload presets → Add preset → Signing Mode: Unsigned).

4. **Supabase database** — open the Supabase SQL Editor and run `supabase/schema.sql`. This creates the
   `media_posts` table, indexes, and starter RLS policies.

5. **Run locally**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000` for the public site and `http://localhost:3000/admin` for the dashboard.

## Project structure

```
app/
  layout.tsx          Root layout: fonts, header, footer, WhatsApp widget
  page.tsx             Public homepage — hero + media gallery (Server Component, fetches from Supabase)
  globals.css           Tailwind base + glassmorphism utility classes
  admin/
    page.tsx            Admin dashboard (Server Component, fetches initial posts)
    actions.ts           Server Actions: createImagePost, createVideoPost, deletePost, getAllPosts
components/
  Header.tsx             Glass nav bar
  Footer.tsx              Social links + signature ridge divider
  WhatsAppButton.tsx       Fixed, pulsing floating action button
  CloudinaryUploader.tsx    Unsigned client-side image upload with progress
  YouTubePlayer.tsx          Responsive iframe embed
  MediaCard.tsx               Gallery card (image or video)
  MediaGrid.tsx                 Client grid with filter tabs + playback modal
  AdminPanel.tsx                 Create form + manage/delete list
lib/
  supabase.ts             Shared Supabase client + MediaPost type
  cloudinary.ts             uploadImageToCloudinary() — unsigned upload via XHR
  youtube.ts                 extractYouTubeId() + embed/thumbnail URL helpers
supabase/
  schema.sql                media_posts table, constraints, indexes, RLS policies
```

## Security notes before going to production

- The RLS policies in `schema.sql` allow public inserts/deletes so `/admin` works with just the anon key.
  Add **Supabase Auth** and gate `/admin` (middleware + policies checking `auth.uid()`) before shipping.
- `CLOUDINARY_API_SECRET` is never used client-side — uploads are unsigned and only need the cloud name
  + upload preset. Keep the secret server-only if you later add signed uploads or asset deletion.
