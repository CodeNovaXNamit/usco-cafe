"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

export function PhoneHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [cardOffset, setCardOffset] = useState(-56);
  const [cardVisible, setCardVisible] = useState(false);

  useEffect(() => {
    let frame = 0;

    const updateCardOffset = () => {
      frame = 0;

      const section = sectionRef.current;
      if (!section) {
        return;
      }

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;

      if (rect.bottom <= 0 || rect.top >= viewportHeight) {
        setCardVisible(false);
        setCardOffset(-56);
        return;
      }

      const progress = Math.min(Math.max(-rect.top / Math.max(rect.height, 1), 0), 1);
      const hasStartedScrolling = progress > 0.015;

      setCardVisible(hasStartedScrolling);
      setCardOffset(hasStartedScrolling ? progress * 160 : -56);
    };

    const onScroll = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(updateCardOffset);
    };

    updateCardOffset();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="home-hero overflow-hidden">
      <div className="relative h-[100svh] min-h-[32rem]">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          data-loader-critical
          className="absolute inset-0 h-full w-full object-cover object-center"
        >
          <source src="/media/phone/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,246,241,0.12),rgba(248,246,241,0.02)_34%,rgba(30,30,26,0.34)_100%)]" />
        <div className="absolute left-4 top-[calc(var(--header-offset)-1.2rem)] z-10 px-1 py-1 text-[#f8f6f1]">
          <div
            className="home-motion-text home-motion-text--drift font-display text-[2rem] leading-none tracking-[0.08em] text-[#f8f6f1] drop-shadow-[0_8px_24px_rgba(30,30,26,0.55)]"
            style={{ "--motion-delay": "0.05s" } as CSSProperties}
          >
            USCO
          </div>
          <div
            className="home-motion-text home-motion-text--drift mt-1 font-sans text-[0.56rem] uppercase tracking-[0.3em] text-white/92 drop-shadow-[0_6px_18px_rgba(30,30,26,0.55)]"
            style={{ "--motion-delay": "0.14s" } as CSSProperties}
          >
            Coffee + Toast + Work
          </div>
        </div>
        <div
          className="absolute inset-x-4 bottom-5 rounded-[30px] border border-white/38 bg-[rgba(248,246,241,0.28)] p-5 text-matcha-deep shadow-[0_24px_44px_rgba(30,30,26,0.12)] backdrop-blur-md will-change-transform transition-[opacity,transform] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            transform: `translate3d(0, ${cardOffset}px, 0)`,
            opacity: cardVisible ? 1 : 0,
            pointerEvents: cardVisible ? "auto" : "none",
          }}
        >
          <div
            className="home-motion-text home-motion-text--drift font-display text-[2.2rem] leading-none tracking-[0.08em] text-[#f7eed4] drop-shadow-[0_6px_18px_rgba(30,30,26,0.4)]"
            style={{ "--motion-delay": "0.05s" } as CSSProperties}
          >
            USCO
          </div>
          <div
            className="home-motion-text home-motion-text--drift mt-2 font-sans text-[0.62rem] uppercase tracking-[0.34em] text-white/90"
            style={{ "--motion-delay": "0.16s" } as CSSProperties}
          >
            Coffee + Toast + Work
          </div>
          <p
            className="home-motion-text mt-4 max-w-xs font-sans text-[0.68rem] uppercase tracking-[0.28em] text-white/88"
            style={{ "--motion-delay": "0.24s" } as CSSProperties}
          >
            Open daily, 10 a.m. to 8 p.m.
          </p>
          <p
            className="home-motion-text mt-3 max-w-xs text-sm leading-6 text-white/92"
            style={{ "--motion-delay": "0.3s" } as CSSProperties}
          >
            Come by before the day slips away. We&apos;re waiting with warm cups and a quiet corner for you.
          </p>
          <div className="mt-5 flex gap-3">
            <Link
              href="/menu"
              className="home-motion-text inline-flex min-h-11 items-center justify-center rounded-full bg-matcha-deep px-4 font-sans text-[10px] uppercase tracking-[0.24em] text-white"
              style={{ "--motion-delay": "0.36s" } as CSSProperties}
            >
              See the menu
            </Link>
            <Link
              href="/find-us"
              className="home-motion-text inline-flex min-h-11 items-center justify-center rounded-full border border-matcha-deep/18 bg-white/80 px-4 font-sans text-[10px] uppercase tracking-[0.24em] text-matcha-deep"
              style={{ "--motion-delay": "0.42s" } as CSSProperties}
            >
              Find us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
