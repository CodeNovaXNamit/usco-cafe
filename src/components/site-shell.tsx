import Link from "next/link";
import { ReactNode } from "react";
import { navLinks } from "@/data/site";

type SiteShellProps = {
  children: ReactNode;
  currentPath?: string;
};

export function SiteShell({ children, currentPath = "/" }: SiteShellProps) {
  const hasInnerPageBackdrop = ["/menu", "/gallery", "/find-us"].includes(currentPath);
  const isHomePage = currentPath === "/";

  return (
    <div className={`site-shell min-h-screen text-charcoal ${hasInnerPageBackdrop ? "inner-page-shell" : ""}`}>
      <header className="site-header border-b border-matcha-light/70">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4 lg:gap-5 lg:px-10">
          <Link href="/" className="flex min-w-0 shrink-0 items-center gap-3 text-matcha-deep">
            <span className="font-display text-[1.65rem] tracking-[0.08em] sm:text-3xl">USCO</span>
            <span className="hidden h-10 w-px bg-matcha-light/80 sm:block" aria-hidden="true" />
            <span className="hidden min-w-0 sm:flex sm:flex-col">
              <span className="font-sans text-[10px] uppercase tracking-[0.28em] text-matcha-mid">Coffee + Quiet</span>
              <span className="font-serif text-sm italic text-matcha-deep/72">A slower cup in Shahpur Jat</span>
            </span>
          </Link>
          <nav
            aria-label="Primary"
            className="header-glass-nav flex min-w-0 flex-1 items-center gap-0.5 overflow-x-auto rounded-full px-1.5 py-1.5 text-matcha-deep sm:gap-1 sm:px-2"
          >
            {navLinks.map((link) => {
              const active = currentPath === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`header-glass-link relative min-w-0 rounded-full px-2.5 py-1.5 text-center font-sans text-[9px] uppercase tracking-[0.16em] sm:px-3 sm:py-2 sm:text-[10px] sm:tracking-[0.18em] ${
                    active ? "is-active bg-white/68 text-matcha-deep" : "text-matcha-deep/82 hover:text-matcha-deep"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="hidden shrink-0 rounded-full border border-matcha-light/60 bg-white/46 px-4 py-2 font-sans text-[11px] uppercase tracking-[0.18em] text-matcha-mid shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] xl:block">
            Open Today / 10am-8pm
          </div>
        </div>
      </header>
      <main className={`site-main relative z-10 ${isHomePage ? "site-main--flush" : ""}`}>{children}</main>
      <footer className="relative z-20 mt-16 bg-matcha-deep text-white sm:mt-24">
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
            <a
              href="https://www.instagram.com/uscocafe/"
              target="_blank"
              rel="noreferrer"
              aria-label="USCO Cafe on Instagram"
              className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.18em] text-matcha-light transition hover:text-white sm:text-sm sm:tracking-[0.2em]"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4 fill-none stroke-current"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
                <path d="M16.5 7.5h.01" />
                <circle cx="12" cy="12" r="4" />
              </svg>
              @uscocafe
            </a>
            <p className="font-sans text-xs uppercase tracking-[0.18em] sm:text-sm sm:tracking-[0.2em]">Open 10am - 8pm</p>
            <p>No WiFi password. No rush. No. 4.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
