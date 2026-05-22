"use client";

import type { CSSProperties } from "react";

export function PhoneHero() {
  return (
    <section className="home-hero overflow-hidden">
      <div className="relative h-[100svh] min-h-[32rem]">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          data-loader-critical
          className="absolute inset-0 h-full w-full object-cover object-center"
        >
          <source src="/media/phone/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,246,241,0.12),rgba(248,246,241,0.02)_34%,rgba(30,30,26,0.34)_100%)]" />
        <div className="phone-hero-brand absolute z-10 px-1 py-1 text-[#f8f6f1]">
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
      </div>
    </section>
  );
}
