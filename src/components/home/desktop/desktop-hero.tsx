import Image from "next/image";
import type { CSSProperties } from "react";

export function DesktopHero() {
  return (
    <section className="home-hero overflow-hidden">
      <div className="mx-auto max-w-none">
        <div className="relative overflow-hidden">
          <div className="relative h-[100svh] min-h-[42rem]">
            <Image
              src="/media/desktop/hero-image.jpeg"
              alt="USCO cafe interior with warm natural light"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(30,30,26,0.24),rgba(30,30,26,0.06)_26%,rgba(30,30,26,0.12)_56%,rgba(30,30,26,0.28)_100%)]" />
            <div className="absolute left-4 top-[calc(var(--header-offset)-1.35rem)] px-1 py-1 text-[#f8f6f1] sm:left-6 sm:top-[calc(var(--header-offset)-1.15rem)] lg:left-8 lg:top-[calc(var(--header-offset)-1rem)]">
              <div
                className="home-motion-text home-motion-text--drift font-display text-[2.3rem] leading-none tracking-[0.08em] text-[#f8f6f1] drop-shadow-[0_8px_24px_rgba(30,30,26,0.55)] sm:text-[2.6rem]"
                style={{ "--motion-delay": "0.05s" } as CSSProperties}
              >
                USCO
              </div>
              <div
                className="home-motion-text home-motion-text--drift mt-1 font-sans text-[0.62rem] uppercase tracking-[0.32em] text-white/92 drop-shadow-[0_6px_18px_rgba(30,30,26,0.55)] sm:text-[0.68rem] sm:tracking-[0.38em]"
                style={{ "--motion-delay": "0.16s" } as CSSProperties}
              >
                Coffee + Toast + Work
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
