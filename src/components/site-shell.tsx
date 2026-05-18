import Link from "next/link";
import { ReactNode } from "react";
import { navLinks } from "@/data/site";
import { HeaderHeightSync } from "@/components/header-height-sync";

type SiteShellProps = {
  children: ReactNode;
  currentPath?: string;
};

export function SiteShell({ children, currentPath = "/" }: SiteShellProps) {
  const hasInnerPageBackdrop = ["/menu", "/gallery", "/find-us"].includes(currentPath);
  const isHomePage = currentPath === "/";
  const currentYear = new Date().getFullYear();

  return (
    <div className={`site-shell min-h-screen flex flex-col text-charcoal ${hasInnerPageBackdrop ? "inner-page-shell" : ""}`}>
      <HeaderHeightSync />
      <header className={`site-header ${isHomePage ? "site-header--home" : "border-b border-matcha-light/70"}`}>
        <div className="site-header-shell">
          <Link href="/" className="site-brand">
            <span className="site-brand-logo">USCO</span>
            <span className="site-brand-copy">
              <span>COFFEE+TOAST+WORK</span>
              <em>A slower cup in Shahpur Jat</em>
            </span>
          </Link>
          <nav
            aria-label="Primary"
            className="site-nav header-glass-nav"
          >
            {navLinks.map((link) => {
              const active = currentPath === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`header-glass-link ${active ? "is-active" : ""}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="site-status-pill">
            Open Today / 10am-8pm
          </div>
        </div>
      </header>
      <main className={`site-main relative z-10 flex-1 ${isHomePage ? "site-main--flush" : ""}`}>{children}</main>
      <footer className="site-footer relative z-20 mt-16 bg-matcha-deep text-white sm:mt-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 sm:py-12 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-10">
          <div>
            <div className="font-display text-[2.2rem] tracking-[0.08em] sm:text-4xl">USCO</div>
            <div className="font-accent text-[11px] uppercase tracking-[0.3em] text-matcha-light sm:text-sm sm:tracking-[0.35em]">
              COFFEE+TOAST+WORK
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
        <div className="border-t border-matcha-light/25">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 text-[11px] uppercase tracking-[0.14em] text-matcha-light sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10">
            <p>© {currentYear} USCO Cafe. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="/privacy-policy" className="hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
