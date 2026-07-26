"use client";

import { useMemo, useState } from "react";
import { X } from "lucide-react";
import { MediaPost } from "@/lib/supabase";
import MediaCard from "./MediaCard";
import YouTubePlayer from "./YouTubePlayer";

type Filter = "all" | "video" | "image";

export default function MediaGrid({ posts }: { posts: MediaPost[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [active, setActive] = useState<MediaPost | null>(null);

  const filtered = useMemo(() => {
    if (filter === "all") return posts;
    return posts.filter((p) => p.media_type === filter);
  }, [posts, filter]);

  return (
    <div>
      <div className="mb-8 flex justify-center gap-2">
        {(["all", "video", "image"] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              filter === f
                ? "bg-gold-500 text-night-950"
                : "border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
            }`}
          >
            {f === "all" ? "All" : f === "video" ? "Videos" : "Articles"}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-slate-400">
          Nothing here yet — new lessons are on the way.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <MediaCard key={post.id} post={post} onClick={() => setActive(post)} />
          ))}
        </div>
      )}

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-night-950/80 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <div
            className="glass w-full max-w-3xl overflow-hidden p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <h3 className="font-display text-lg font-semibold text-slate-50">{active.title}</h3>
              <button
                onClick={() => setActive(null)}
                aria-label="Close"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 text-slate-300 hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {active.media_type === "video" && active.youtube_id ? (
              <YouTubePlayer youtubeId={active.youtube_id} title={active.title} />
            ) : (
              active.media_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={active.media_url}
                  alt={active.title}
                  className="max-h-[70vh] w-full rounded-xl object-contain"
                />
              )
            )}

            {active.description && (
              <p className="mt-4 text-sm text-slate-300">{active.description}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
