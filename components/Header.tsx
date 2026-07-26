import Link from "next/link";
import { GraduationCap } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full px-4 pt-4">
      <div className="glass mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold-500/15 text-gold-400">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-slate-50">
            EduSpace <span className="text-gold-400">Sakartvelo</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-300 md:flex">
          <Link href="/" className="transition-colors hover:text-slate-50">
            Home
          </Link>
          <Link href="/#videos" className="transition-colors hover:text-slate-50">
            Videos
          </Link>
          <Link href="/#articles" className="transition-colors hover:text-slate-50">
            Articles
          </Link>
          <Link href="/admin" className="transition-colors hover:text-slate-50">
            Admin
          </Link>
        </nav>

        <Link href="/#videos" className="btn-primary hidden text-sm md:inline-flex">
          Start Learning
        </Link>
      </div>
    </header>
  );
}
