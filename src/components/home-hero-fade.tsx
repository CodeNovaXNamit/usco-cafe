import Image from "next/image";
import type { CSSProperties } from "react";

export function HomeHeroFade() {
  return (
    <section className="home-hero overflow-hidden">
      <div className="mx-auto max-w-none">
        <div className="relative overflow-hidden">
          <div className="relative h-[calc(100svh-var(--header-offset))] min-h-[32rem] sm:h-[calc(100svh-var(--header-offset))] sm:min-h-[34rem] lg:min-h-[42rem]">
            <Image
              src="/home/Hero/Phone2.png"
              alt="USCO cafe exterior in daylight"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center sm:hidden"
            />
            <Image
              src="/home/Hero/Hero_1.jpeg"
              alt="USCO cafe interior with warm natural light"
              fill
              priority
              sizes="100vw"
              className="hidden object-cover object-center sm:block"
            />
            <div className="absolute left-4 top-4 px-1 py-1 text-matcha-deep sm:left-8 sm:top-8">
              <div
                className="home-motion-text home-motion-text--drift font-display text-[2rem] leading-none tracking-[0.08em] drop-shadow-[0_4px_12px_rgba(248,246,241,0.45)] sm:text-[2.6rem]"
                style={{ "--motion-delay": "0.05s" } as CSSProperties}
              >
                USCO
              </div>
              <div
                className="home-motion-text home-motion-text--drift mt-1 font-sans text-[0.56rem] uppercase tracking-[0.34em] text-matcha-deep/90 drop-shadow-[0_3px_10px_rgba(248,246,241,0.38)] sm:text-[0.68rem] sm:tracking-[0.38em]"
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
