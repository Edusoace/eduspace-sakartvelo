"use server";

import { revalidatePath } from "next/cache";
import { supabase, MediaPost } from "@/lib/supabase";
import { extractYouTubeId } from "@/lib/youtube";

export interface ActionResult {
  success: boolean;
  error?: string;
}

interface CreateImagePostInput {
  title: string;
  description: string;
  mediaUrl: string;
  publicId: string;
}

export async function createImagePost(input: CreateImagePostInput): Promise<ActionResult> {
  const { title, description, mediaUrl, publicId } = input;

  if (!title.trim()) return { success: false, error: "Title is required." };
  if (!mediaUrl) return { success: false, error: "Please upload an image first." };

  const { error } = await supabase.from("media_posts").insert({
    title: title.trim(),
    description: description.trim() || null,
    media_type: "image",
    media_url: mediaUrl,
    public_id: publicId,
  });

  if (error) return { success: false, error: error.message };

  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true };
}

interface CreateVideoPostInput {
  title: string;
  description: string;
  youtubeUrl: string;
}

export async function createVideoPost(input: CreateVideoPostInput): Promise<ActionResult> {
  const { title, description, youtubeUrl } = input;

  if (!title.trim()) return { success: false, error: "Title is required." };

  const youtubeId = extractYouTubeId(youtubeUrl);
  if (!youtubeId) {
    return { success: false, error: "Couldn't find a valid YouTube video ID in that link." };
  }

  const { error } = await supabase.from("media_posts").insert({
    title: title.trim(),
    description: description.trim() || null,
    media_type: "video",
    youtube_id: youtubeId,
  });

  if (error) return { success: false, error: error.message };

  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true };
}

export async function deletePost(id: string): Promise<ActionResult> {
  const { error } = await supabase.from("media_posts").delete().eq("id", id);
  if (error) return { success: false, error: error.message };

  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true };
}

export async function getAllPosts(): Promise<MediaPost[]> {
  const { data, error } = await supabase
    .from("media_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[admin] Failed to load posts:", error.message);
    return [];
  }
  return data ?? [];
}
