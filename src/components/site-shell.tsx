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
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-10">
          <Link href="/" className="font-display text-3xl tracking-[0.08em] text-matcha-deep">
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
            Open Today · 8am-8pm
          </div>
          <details className="lg:hidden">
            <summary className="cursor-pointer list-none font-sans text-xs uppercase tracking-[0.3em] text-matcha-deep">
              Menu
            </summary>
            <div className="absolute left-0 right-0 top-full border-b border-matcha-light bg-matcha-deep px-6 py-8 text-white">
              <div className="flex flex-col gap-4 font-display text-4xl">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </details>
        </div>
      </header>
      <main>{children}</main>
      <footer className="mt-24 bg-matcha-deep text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-10">
          <div>
            <div className="font-display text-4xl tracking-[0.08em]">USCO</div>
            <div className="font-accent text-sm uppercase tracking-[0.35em] text-matcha-light">
              Coffee + Quiet
            </div>
          </div>
          <div className="flex flex-col gap-2 font-sans text-sm uppercase tracking-[0.18em] text-matcha-light">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
          <div className="space-y-3 text-sm text-matcha-light">
            <p className="font-sans uppercase tracking-[0.2em]">@usco.cafe</p>
            <p className="font-sans uppercase tracking-[0.2em]">Open 8am - 8pm</p>
            <p>No WiFi password. No rush. No. 4.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
