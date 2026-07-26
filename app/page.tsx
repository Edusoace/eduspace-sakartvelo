import { supabase, MediaPost } from "@/lib/supabase";
import MediaGrid from "@/components/MediaGrid";

export const revalidate = 30; // refresh the public gallery every 30s

async function getPosts(): Promise<MediaPost[]> {
  const { data, error } = await supabase
    .from("media_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[home] Failed to load media_posts:", error.message);
    return [];
  }
  return data ?? [];
}

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-4 pb-16 pt-20 text-center md:pt-28">
        <span className="mb-5 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-teal-300">
          სწავლა · ცოდნა · ზრდა
        </span>
        <h1 className="font-display text-4xl font-semibold leading-[1.1] text-slate-50 md:text-6xl">
          Learn without limits,
          <br />
          <span className="text-gold-400">wherever you are in Sakartvelo.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base text-slate-400 md:text-lg">
          Video lessons, articles, and podcasts built for Georgian students, educators, and
          lifelong learners — free to watch, easy to share.
        </p>
        <div className="mt-9 flex justify-center gap-3">
          <a href="#videos" className="btn-primary">
            Browse lessons
          </a>
          <a href="#articles" className="btn-secondary">
            Read articles
          </a>
        </div>
      </section>

      {/* Gallery */}
      <section id="videos" className="mx-auto max-w-6xl scroll-mt-24 px-4 pb-24">
        <div className="mb-10 text-center">
          <h2 className="font-display text-2xl font-semibold text-slate-50 md:text-3xl">
            Latest lessons & articles
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Fresh content from the EduSpace Sakartvelo team.
          </p>
        </div>

        <MediaGrid posts={posts} />
      </section>
    </div>
  );
}
