"use client";

import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { navLinks } from "@/data/site";

type SiteShellProps = {
  children: ReactNode;
  currentPath?: string;
};

export function SiteShell({ children, currentPath = "/" }: SiteShellProps) {
  const hasInnerPageBackdrop = ["/menu", "/gallery", "/find-us"].includes(currentPath);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <div className={`site-shell min-h-screen text-charcoal ${hasInnerPageBackdrop ? "inner-page-shell" : ""}`}>
      <header className="site-header h-16 border-b border-matcha-light/70 sm:h-[72px]">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-3 px-4 sm:gap-4 sm:px-6 lg:px-10">
          <Link
            href="/"
            className="min-w-0 flex-1 font-display text-[1.65rem] tracking-[0.08em] text-matcha-deep sm:flex-none sm:text-3xl"
          >
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
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-site-menu"
            className="ml-auto flex min-h-11 shrink-0 items-center justify-center rounded-full border border-matcha-light bg-white/88 px-3.5 font-sans text-[10px] uppercase tracking-[0.24em] text-matcha-deep shadow-[0_10px_24px_rgba(74,94,56,0.08)] sm:min-w-[5.25rem] sm:px-4 sm:text-[11px] sm:tracking-[0.28em] lg:hidden"
          >
            {isMenuOpen ? "Close" : "Menu"}
          </button>
        </div>
        {isMenuOpen ? (
          <div
            id="mobile-site-menu"
            className="fixed inset-x-0 top-16 bottom-0 z-50 overflow-y-auto bg-matcha-deep/94 px-4 pb-8 pt-5 text-white shadow-[0_24px_80px_rgba(30,30,26,0.22)] backdrop-blur-md sm:top-[72px] sm:px-6 lg:hidden"
          >
            <div className="mx-auto w-full max-w-xl rounded-[30px] border border-white/12 bg-[linear-gradient(180deg,rgba(248,246,241,0.08),rgba(248,246,241,0.04))] p-5 shadow-[0_20px_44px_rgba(0,0,0,0.12)]">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div className="font-sans text-[10px] uppercase tracking-[0.32em] text-matcha-light/80">
                  Coffee + Quiet
                </div>
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-full border border-white/12 bg-white/8 px-3 py-2 font-sans text-[10px] uppercase tracking-[0.22em] text-matcha-light"
                >
                  Close
                </button>
              </div>
              <div className="flex flex-col gap-3 font-display text-[2.2rem] leading-none">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="rounded-[20px] border border-white/10 bg-white/6 px-4 py-4 transition-colors duration-300 hover:bg-white/10"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="mt-6 border-t border-white/12 pt-4 font-sans text-[11px] uppercase tracking-[0.22em] text-matcha-light">
                Open 8am - 8pm
              </div>
            </div>
          </div>
        ) : null}
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
