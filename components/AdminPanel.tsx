"use client";

import { useState, useTransition } from "react";
import { ImageIcon, Video, Loader2, Trash2, PlayCircle, CheckCircle2 } from "lucide-react";
import { MediaPost } from "@/lib/supabase";
import { CloudinaryUploadResult } from "@/lib/cloudinary";
import { extractYouTubeId, getYouTubeThumbnail } from "@/lib/youtube";
import CloudinaryUploader from "./CloudinaryUploader";
import { createImagePost, createVideoPost, deletePost } from "@/app/admin/actions";

type PostType = "image" | "video";

export default function AdminPanel({ initialPosts }: { initialPosts: MediaPost[] }) {
  const [posts, setPosts] = useState<MediaPost[]>(initialPosts);
  const [postType, setPostType] = useState<PostType>("image");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [uploaded, setUploaded] = useState<CloudinaryUploadResult | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const previewYoutubeId = extractYouTubeId(youtubeUrl);

  function resetForm() {
    setTitle("");
    setDescription("");
    setYoutubeUrl("");
    setUploaded(null);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    setSuccessMsg(null);

    startTransition(async () => {
      const result =
        postType === "image"
          ? await createImagePost({
              title,
              description,
              mediaUrl: uploaded?.secure_url ?? "",
              publicId: uploaded?.public_id ?? "",
            })
          : await createVideoPost({ title, description, youtubeUrl });

      if (!result.success) {
        setFormError(result.error ?? "Something went wrong. Please try again.");
        return;
      }

      // Optimistically prepend a locally-shaped post so the list feels instant.
      const optimisticPost: MediaPost = {
        id: crypto.randomUUID(),
        title: title.trim(),
        description: description.trim() || null,
        media_type: postType,
        media_url: postType === "image" ? uploaded?.secure_url ?? null : null,
        public_id: postType === "image" ? uploaded?.public_id ?? null : null,
        youtube_id: postType === "video" ? previewYoutubeId : null,
        created_at: new Date().toISOString(),
      };
      setPosts((prev) => [optimisticPost, ...prev]);
      setSuccessMsg("Published successfully.");
      resetForm();
    });
  }

  function handleDelete(id: string) {
    setDeletingId(id);
    startTransition(async () => {
      const result = await deletePost(id);
      if (result.success) {
        setPosts((prev) => prev.filter((p) => p.id !== id));
      }
      setDeletingId(null);
    });
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[420px_1fr]">
      {/* Create form */}
      <form onSubmit={handleSubmit} className="glass h-fit space-y-5 p-6">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setPostType("image")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
              postType === "image"
                ? "bg-gold-500 text-night-950"
                : "border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
            }`}
          >
            <ImageIcon className="h-4 w-4" /> Image
          </button>
          <button
            type="button"
            onClick={() => setPostType("video")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
              postType === "video"
                ? "bg-gold-500 text-night-950"
                : "border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
            }`}
          >
            <Video className="h-4 w-4" /> Video
          </button>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-300">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Introduction to Georgian Literature"
            className="glass-input w-full"
            required
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-300">
            Description <span className="text-slate-500">(optional)</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Short summary shown on the card…"
            className="glass-input w-full resize-none"
          />
        </div>

        {postType === "image" ? (
          <CloudinaryUploader
            onUploaded={setUploaded}
            onClear={() => setUploaded(null)}
          />
        ) : (
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-300">
              YouTube URL
            </label>
            <input
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=…"
              className="glass-input w-full"
            />
            {youtubeUrl && !previewYoutubeId && (
              <p className="mt-1.5 text-xs text-red-400">
                Couldn't find a valid video ID in that link.
              </p>
            )}
            {previewYoutubeId && (
              <div className="mt-3 overflow-hidden rounded-xl border border-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getYouTubeThumbnail(previewYoutubeId)}
                  alt="Video preview"
                  className="w-full"
                />
              </div>
            )}
          </div>
        )}

        {formError && <p className="text-sm text-red-400">{formError}</p>}
        {successMsg && (
          <p className="flex items-center gap-1.5 text-sm text-teal-300">
            <CheckCircle2 className="h-4 w-4" /> {successMsg}
          </p>
        )}

        <button type="submit" disabled={isPending} className="btn-primary w-full">
          {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {isPending ? "Publishing…" : "Publish post"}
        </button>
      </form>

      {/* List */}
      <div className="space-y-3">
        {posts.length === 0 ? (
          <p className="glass p-8 text-center text-sm text-slate-400">No posts yet.</p>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="glass flex items-center gap-4 p-4"
            >
              <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-night-900">
                {(post.media_type === "video" && post.youtube_id
                  ? getYouTubeThumbnail(post.youtube_id)
                  : post.media_url) && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={
                      post.media_type === "video" && post.youtube_id
                        ? getYouTubeThumbnail(post.youtube_id)
                        : (post.media_url as string)
                    }
                    alt={post.title}
                    className="h-full w-full object-cover"
                  />
                )}
                {post.media_type === "video" && (
                  <PlayCircle className="absolute inset-0 m-auto h-6 w-6 text-white/90" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-slate-100">{post.title}</p>
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  {post.media_type} · {new Date(post.created_at).toLocaleDateString()}
                </p>
              </div>

              <button
                onClick={() => handleDelete(post.id)}
                disabled={deletingId === post.id}
                className="btn-danger shrink-0"
              >
                {deletingId === post.id ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Trash2 className="h-3.5 w-3.5" />
                )}
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
