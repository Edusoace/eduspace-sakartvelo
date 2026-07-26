import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Fail loudly in development rather than silently returning a broken client.
  console.warn(
    "[supabase] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY env vars."
  );
}

/**
 * Single shared Supabase client using the public anon key.
 * Safe to import in both Server Components / Server Actions and Client Components.
 * RLS policies (see supabase/schema.sql) control what the anon key can actually do.
 */
export const supabase: SupabaseClient = createClient(
  supabaseUrl ?? "",
  supabaseAnonKey ?? "",
  {
    auth: {
      persistSession: false,
    },
  }
);

export type MediaType = "image" | "video";

export interface MediaPost {
  id: string;
  title: string;
  description: string | null;
  media_type: MediaType;
  media_url: string | null;
  public_id: string | null;
  youtube_id: string | null;
  created_at: string;
}
