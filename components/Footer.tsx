'use client';

import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  const currentLocale = pathname.startsWith('/en') ? 'en' : 'ka';
  const isEn = currentLocale === 'en';

  return (
    <footer className="border-t border-white/10 bg-slate-950 py-12 text-slate-400">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* ბრენდი */}
        <div>
          <h3 className="text-xl font-bold text-white mb-3">
            EduSpace <span className="text-amber-400">Sakartvelo</span>
          </h3>
          <p className="text-sm leading-relaxed">
            {isEn
              ? 'Educational platform offering video lessons, articles, and podcasts.'
              : 'საგანმანათლებლო პლატფორმა — ვიდეოები, სტატიები და პოდკასტები.'}
          </p>
        </div>

        {/* სოციალური ქსელები */}
        <div>
          <h4 className="text-white font-semibold mb-3">
            {isEn ? 'Follow Us' : 'გამოგვყევით'}
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="https://www.youtube.com/channel/UCZV61qWuasofP9EvFwO1HGg" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition flex items-center gap-2">
                ▶ YouTube
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/eduspace.sakartvelo" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition flex items-center gap-2">
                🌐 Facebook
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/eduspace.sakartvelo/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition flex items-center gap-2">
                📸 Instagram
              </a>
            </li>
            <li>
              <a href="https://www.tiktok.com/@eduspace.sakartvelo" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition flex items-center gap-2">
                🎵 TikTok
              </a>
            </li>
          </ul>
        </div>

        {/* საკონტაქტო არხები */}
        <div>
          <h4 className="text-white font-semibold mb-3">
            {isEn ? 'Direct Contact' : 'პირდაპირი კონტაქტი'}
          </h4>
          <p className="text-sm mb-2">
            Email: <a href="mailto:eduspace.sakartvelo@gmail.com" className="hover:text-amber-400 transition">eduspace.sakartvelo@gmail.com</a>
          </p>
          <p className="text-sm">
            WhatsApp Business: <a href="https://wa.me/995557410800" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">+995 557 41 08 00</a>
          </p>
        </div>

      </div>

      <div className="max-w-6xl mx-auto px-4 mt-8 pt-6 border-t border-white/5 text-xs text-center">
        © {new Date().getFullYear()} EduSpace Sakartvelo. {isEn ? 'All rights reserved.' : 'ყველა უფლება დაცულია.'}
      </div>
    </footer>
  );
} 