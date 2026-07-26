import { PlayCircle } from "lucide-react";
import { MediaPost } from "@/lib/supabase";
import { getYouTubeThumbnail } from "@/lib/youtube";

interface MediaCardProps {
  post: MediaPost;
  onClick?: () => void;
}

export default function MediaCard({ post, onClick }: MediaCardProps) {
  const thumbnail =
    post.media_type === "video" && post.youtube_id
      ? getYouTubeThumbnail(post.youtube_id)
      : post.media_url;

  return (
    <article
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) onClick();
      }}
      className="glass glass-hover group cursor-pointer overflow-hidden"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-night-900">
        {thumbnail && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumbnail}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        )}

        {post.media_type === "video" && (
          <div className="absolute inset-0 flex items-center justify-center bg-night-950/20 transition-colors group-hover:bg-night-950/35">
            <PlayCircle className="h-14 w-14 text-white/90 drop-shadow-lg" />
          </div>
        )}

        <span
          className="absolute left-3 top-3 rounded-full border border-white/15 bg-night-950/60 px-2.5 py-1
            text-xs font-medium uppercase tracking-wide text-slate-200 backdrop-blur"
        >
          {post.media_type === "video" ? "Video" : "Article"}
        </span>
      </div>

      <div className="space-y-1.5 p-5">
        <h3 className="font-display text-base font-semibold leading-snug text-slate-50">
          {post.title}
        </h3>
        {post.description && (
          <p className="line-clamp-2 text-sm text-slate-400">{post.description}</p>
        )}
      </div>
    </article>
  );
}
