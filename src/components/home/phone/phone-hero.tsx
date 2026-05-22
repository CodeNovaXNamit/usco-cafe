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
        <div className="phone-hero-brand absolute z-10">
          <div
            className="home-motion-text home-motion-text--drift"
            style={{ "--motion-delay": "0.05s" } as CSSProperties}
          >
            <img
              src="/media/Loading%20screen/usco-loading-logo.png"
              alt="USCO"
              className="phone-hero-logo-image"
            />
          </div>
          <p
            className="home-motion-text home-motion-text--drift phone-hero-brand-tagline"
            style={{ "--motion-delay": "0.14s" } as CSSProperties}
          >
            Coffee + Toast + Work
          </p>
        </div>
      </div>
    </section>
  );
}
