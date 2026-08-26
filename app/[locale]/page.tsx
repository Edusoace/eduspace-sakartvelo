import { getTranslations } from 'next-intl/server';
import { supabase, MediaPost } from "@/lib/supabase";
import MediaGrid from "@/components/MediaGrid";

export const revalidate = 30;

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
  // Server Component-ში ვართ, ამიტომ getTranslations და await უნდა:
  const t = await getTranslations('HomePage');

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-4 pb-16 pt-20 text-center md:pt-28">
        <span className="mb-5 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-slate-300">
          {t('badge')}
        </span>
        <h1 className="font-display text-4xl font-semibold leading-[1.1] text-slate-50 md:text-6xl">
          {t('title1')}
          <br />
          <span className="text-amber-400">{t('title2')}</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base text-slate-400 md:text-lg">
          {t('description')}
        </p>

        <div className="mt-9 flex justify-center gap-3">
          <a href="#videos" className="px-5 py-2.5 rounded-lg bg-amber-400 text-slate-950 font-semibold hover:bg-amber-300 transition">
            {t('browseLessons')}
          </a>
          <a href="#articles" className="px-5 py-2.5 rounded-lg border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10 transition">
            {t('readArticles')}
          </a>
        </div>
      </section>

      {/* Gallery */}
      <section id="videos" className="mx-auto max-w-6xl scroll-mt-24 px-4 pb-24">
        <div className="mb-10 text-center">
          <h2 className="font-display text-2xl font-semibold text-slate-50 md:text-3xl">
            {t('latestTitle')}
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            {t('latestDesc')}
          </p>
        </div>
        <MediaGrid posts={posts} />
      </section>
    </div>
  );
}