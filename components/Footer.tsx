import Link from "next/link";
import { Instagram, Facebook, Youtube } from "lucide-react";

const SOCIAL_LINKS = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/eduspace.sakartvelo/",
    icon: Instagram,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/eduspace.sakartvelo",
    icon: Facebook,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/channel/UCZV61qWuasofP9EvFwO1HGg",
    icon: Youtube,
  },
];

// Lucide has no TikTok glyph, so it's rendered as inline SVG to match icon sizing.
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16.6 5.82c-.98-.9-1.6-2.16-1.66-3.57h-3.1v13.7c0 1.55-1.26 2.8-2.8 2.8a2.8 2.8 0 0 1-2.8-2.8 2.8 2.8 0 0 1 2.8-2.8c.28 0 .55.04.8.12v-3.15a6 6 0 0 0-.8-.05 5.9 5.9 0 0 0-5.9 5.9 5.9 5.9 0 0 0 5.9 5.9 5.9 5.9 0 0 0 5.9-5.9V9.4a8.4 8.4 0 0 0 4.8 1.5V7.8a5.3 5.3 0 0 1-3.14-1.98z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative mt-24">
      {/* Signature element: a low Caucasus ridge silhouette separating content from footer,
          a nod to Sakartvelo's mountains rather than a generic divider line. */}
      <svg
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className="h-16 w-full text-night-900/80"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M0 90V52l120-30 90 22 140-40 110 28 160-38 130 30 150-24 120 32 160-20 120 26 130-18V90z"
        />
      </svg>

      <div className="bg-night-900/80 px-4 pb-10 pt-8">
        <div className="glass mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-8 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <p className="font-display text-lg font-semibold text-slate-50">
              EduSpace <span className="text-gold-400">Sakartvelo</span>
            </p>
            <p className="mt-1 max-w-sm text-sm text-slate-400">
              Video lessons, articles, and podcasts for Georgian students and lifelong learners.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map(({ name, href, icon: Icon }) => (
              <Link
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10
                  bg-white/5 text-slate-300 transition-all hover:border-teal-400/40 hover:bg-white/10 hover:text-teal-300"
              >
                <Icon className="h-4.5 w-4.5" />
              </Link>
            ))}
            <Link
              href="https://www.tiktok.com/@eduspace.sakartvelo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10
                bg-white/5 text-slate-300 transition-all hover:border-teal-400/40 hover:bg-white/10 hover:text-teal-300"
            >
              <TikTokIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} EduSpace Sakartvelo. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
