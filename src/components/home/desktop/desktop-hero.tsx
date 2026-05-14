import Image from "next/image";
import type { CSSProperties } from "react";

export function DesktopHero() {
  return (
    <section className="home-hero overflow-hidden">
      <div className="mx-auto max-w-none">
        <div className="relative overflow-hidden">
          <div className="relative h-[calc(100svh-var(--header-offset))] min-h-[42rem]">
            <Image
              src="/media/desktop/hero-image.jpeg"
              alt="USCO cafe interior with warm natural light"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute left-8 top-8 px-1 py-1 text-matcha-deep">
              <div
                className="home-motion-text home-motion-text--drift font-display text-[2.6rem] leading-none tracking-[0.08em] drop-shadow-[0_4px_12px_rgba(248,246,241,0.45)]"
                style={{ "--motion-delay": "0.05s" } as CSSProperties}
              >
                USCO
              </div>
              <div
                className="home-motion-text home-motion-text--drift mt-1 font-sans text-[0.68rem] uppercase tracking-[0.38em] text-matcha-deep/90 drop-shadow-[0_3px_10px_rgba(248,246,241,0.38)]"
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
