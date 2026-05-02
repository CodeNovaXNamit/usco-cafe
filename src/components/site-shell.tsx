import Link from "next/link";
import { ReactNode } from "react";
import { navLinks } from "@/data/site";

type SiteShellProps = {
  children: ReactNode;
  currentPath?: string;
};

export function SiteShell({ children, currentPath = "/" }: SiteShellProps) {
  return (
    <div className="site-shell min-h-screen text-charcoal">
      <header className="sticky top-0 z-50 border-b border-matcha-light/70 bg-[var(--glass-white)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6 sm:py-4 lg:px-10">
          <Link href="/" className="font-display text-[1.9rem] tracking-[0.08em] text-matcha-deep sm:text-3xl">
            USCO
          </Link>
          <nav className="hidden items-center gap-5 font-sans text-[12px] uppercase tracking-[0.3em] text-matcha-deep lg:flex">
            {navLinks.map((link) => {
              const active = currentPath === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative pb-1 ${active ? "text-matcha-mid" : "hover:text-matcha-mid"}`}
                >
                  {link.label}
                  <span
                    className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-matcha-mid ${
                      active ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>
          <div className="hidden font-sans text-[12px] uppercase tracking-[0.2em] text-matcha-mid md:block">
            Open Today / 8am-8pm
          </div>
          <details className="relative lg:hidden">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-center rounded-full border border-matcha-light bg-white/70 px-4 font-sans text-[11px] uppercase tracking-[0.28em] text-matcha-deep">
              Menu
            </summary>
            <div className="absolute right-0 top-[calc(100%+0.75rem)] w-[min(21rem,calc(100vw-2rem))] overflow-hidden rounded-[28px] border border-matcha-light/70 bg-matcha-deep p-6 text-white shadow-[0_24px_80px_rgba(30,30,26,0.22)]">
              <div className="mb-5 font-sans text-[10px] uppercase tracking-[0.32em] text-matcha-light/80">
                Coffee + Quiet
              </div>
              <div className="flex flex-col gap-4 font-display text-4xl">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="leading-none">
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="mt-6 border-t border-white/12 pt-4 font-sans text-[11px] uppercase tracking-[0.22em] text-matcha-light">
                Open 8am - 8pm
              </div>
            </div>
          </details>
        </div>
      </header>
      <main>{children}</main>
      <footer className="mt-16 bg-matcha-deep text-white sm:mt-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 sm:py-12 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-10">
          <div>
            <div className="font-display text-[2.2rem] tracking-[0.08em] sm:text-4xl">USCO</div>
            <div className="font-accent text-[11px] uppercase tracking-[0.3em] text-matcha-light sm:text-sm sm:tracking-[0.35em]">
              Coffee + Quiet
            </div>
          </div>
          <div className="flex flex-col gap-2 font-sans text-xs uppercase tracking-[0.16em] text-matcha-light sm:text-sm sm:tracking-[0.18em]">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
          <div className="space-y-3 text-sm text-matcha-light">
            <p className="font-sans text-xs uppercase tracking-[0.18em] sm:text-sm sm:tracking-[0.2em]">@usco.cafe</p>
            <p className="font-sans text-xs uppercase tracking-[0.18em] sm:text-sm sm:tracking-[0.2em]">Open 8am - 8pm</p>
            <p>No WiFi password. No rush. No. 4.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
