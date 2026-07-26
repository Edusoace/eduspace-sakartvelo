import { getYouTubeEmbedUrl } from "@/lib/youtube";

interface YouTubePlayerProps {
  youtubeId: string;
  title: string;
  className?: string;
}

export default function YouTubePlayer({ youtubeId, title, className = "" }: YouTubePlayerProps) {
  return (
    <div className={`relative aspect-video w-full overflow-hidden rounded-xl bg-night-900 ${className}`}>
      <iframe
        src={getYouTubeEmbedUrl(youtubeId)}
        title={title}
        className="absolute inset-0 h-full w-full"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}
