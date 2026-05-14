import Link from "next/link";
import { ReactNode } from "react";
import { navLinks } from "@/data/site";

type SiteShellProps = {
  children: ReactNode;
  currentPath?: string;
};

export function SiteShell({ children, currentPath = "/" }: SiteShellProps) {
  const hasInnerPageBackdrop = ["/menu", "/gallery", "/find-us"].includes(currentPath);

  return (
    <div className={`site-shell min-h-screen text-charcoal ${hasInnerPageBackdrop ? "inner-page-shell" : ""}`}>
      <header className="site-header border-b border-matcha-light/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 sm:py-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:px-10">
          <Link
            href="/"
            className="min-w-0 flex-1 font-display text-[1.65rem] tracking-[0.08em] text-matcha-deep sm:text-3xl"
          >
            USCO
          </Link>
          <div className="flex items-center justify-between gap-3 sm:gap-4 lg:flex-none">
            <nav
              aria-label="Primary"
              className="header-glass-nav flex min-w-0 flex-1 items-center gap-1 overflow-x-auto rounded-full px-2 py-2 text-matcha-deep sm:gap-1.5 sm:px-2.5"
            >
              {navLinks.map((link) => {
                const active = currentPath === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`header-glass-link relative min-w-fit rounded-full px-3 py-2 text-center font-sans text-[10px] uppercase tracking-[0.2em] sm:px-4 sm:text-[11px] sm:tracking-[0.24em] ${
                      active ? "is-active bg-white/68 text-matcha-deep" : "text-matcha-deep/82 hover:text-matcha-deep"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
            <div className="hidden rounded-full border border-matcha-light/60 bg-white/46 px-4 py-2 font-sans text-[11px] uppercase tracking-[0.18em] text-matcha-mid shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] md:block">
              Open Today / 8am-8pm
            </div>
          </div>
        </div>
      </header>
      <main className="site-main relative z-10">{children}</main>
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
            <p className="font-sans text-xs uppercase tracking-[0.18em] sm:text-sm sm:tracking-[0.2em]">@usco.cafe</p>
            <p className="font-sans text-xs uppercase tracking-[0.18em] sm:text-sm sm:tracking-[0.2em]">Open 8am - 8pm</p>
            <p>No WiFi password. No rush. No. 4.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
