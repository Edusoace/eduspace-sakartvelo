'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  // მიმდინარე ენის გაგება URL-იდან (/ka ან /en)
  const currentLocale = pathname.startsWith('/en') ? 'en' : 'ka';

  const switchLanguage = (newLocale: string) => {
    // URL-ში /ka-ს ჩანაცვლება /en-ით ან პირიქით
    const newPathname = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPathname || `/${newLocale}`);
  };

  return (
    <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* ლოგო */}
        <Link href={`/${currentLocale}`} className="font-bold text-xl text-white tracking-wide">
          EduSpace <span className="text-amber-400">Sakartvelo</span>
        </Link>

        {/* ენის გადამრთველი ღილაკები */}
        <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-lg border border-white/10">
          <button
            onClick={() => switchLanguage('ka')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition ${
              currentLocale === 'ka'
                ? 'bg-amber-400 text-slate-950 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            KA
          </button>
          <button
            onClick={() => switchLanguage('en')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition ${
              currentLocale === 'en'
                ? 'bg-amber-400 text-slate-950 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            EN
          </button>
        </div>
      </div>
    </header>
  );
}