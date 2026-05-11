/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { CSSProperties } from "react";
import { HomeHeroFade } from "@/components/home-hero-fade";
import { HomeOfferingStrip } from "@/components/home-offering-strip";
import { HomeReviewSection } from "@/components/home-review-section";
import { IconMark } from "@/components/icon-mark";
import { SectionIntro } from "@/components/section-intro";
import { SiteShell } from "@/components/site-shell";
import { googleReviewCta, homeOfferingStripItems, pillars } from "@/data/site";

export default function HomePage() {
  const teaserCards = [
    {
      href: "/menu",
      title: "Menu",
      image: "/home/menu-cover.png",
      blurb: "Carefully chosen. Quietly served.",
    },
    {
      href: "/find-us",
      title: "Find Us",
      image: "/home/Hero/Phone2.png",
      blurb: "A quiet lane, warm light, and a place worth finding.",
    },
    {
      href: "/gallery",
      title: "Gallery",
      image: "/home/Hero/Hero_1.jpeg",
      blurb: "Warm corners, still frames, small rituals.",
    },
  ];

  return (
    <SiteShell currentPath="/">
      <div className="home-motion-surface">
        <HomeHeroFade />
        <HomeOfferingStrip items={homeOfferingStripItems} />

        <section className="px-4 pb-14 pt-8 sm:px-6 sm:pb-24 sm:pt-12 lg:px-10">
        <SectionIntro
          animated
          title="Somewhere between your first sip and your last thought."
          body="USCO is a small place that asks very little of you. Sit. Breathe. Let the coffee do the rest."
        />
        </section>

        <section className="px-4 pb-14 sm:px-6 sm:pb-24 lg:px-10">
          <div className="mx-auto grid max-w-7xl gap-4 sm:gap-5 lg:grid-cols-3">
            {pillars.map((pillar, index) => (
              <article
                key={pillar.title}
                className="grain rounded-[28px] border border-matcha-light bg-matcha-light/60 p-6 shadow-[0_18px_50px_rgba(74,94,56,0.08)] sm:p-8"
              >
                <IconMark kind={pillar.icon as "cup" | "leaf" | "clock"} />
                <h3
                  className="home-motion-text home-motion-text--drift mt-6 font-display text-3xl text-matcha-deep sm:mt-8 sm:text-4xl"
                  style={{ "--motion-delay": `${0.12 + index * 0.1}s` } as CSSProperties}
                >
                  {pillar.title}
                </h3>
                <p
                  className="home-motion-text mt-3 text-base leading-7 text-charcoal/75 sm:text-lg sm:leading-8"
                  style={{ "--motion-delay": `${0.2 + index * 0.1}s` } as CSSProperties}
                >
                  {pillar.line}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="px-4 py-6 sm:px-6 sm:py-10 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
              <div>
                <p
                  className="home-motion-text home-motion-text--drift font-sans text-[11px] uppercase tracking-[0.28em] text-matcha-mid sm:text-xs sm:tracking-[0.32em]"
                  style={{ "--motion-delay": "0.08s" } as CSSProperties}
                >
                  Explore next
                </p>
                <h2
                  className="home-motion-text home-motion-text--drift mt-3 font-display text-[2.8rem] leading-[0.96] text-matcha-deep sm:text-6xl"
                  style={{ "--motion-delay": "0.16s" } as CSSProperties}
                >
                  A few ways in.
                </h2>
              </div>
              <Link
                href="/find-us"
                className="home-motion-text hidden font-sans text-xs uppercase tracking-[0.26em] text-matcha-mid sm:block"
                style={{ "--motion-delay": "0.24s" } as CSSProperties}
              >
                Find the lane
              </Link>
            </div>
            <div className="grid gap-4 sm:gap-5 lg:grid-cols-3">
              {teaserCards.map((card, index) => (
                <Link
                  key={card.href}
                  href={card.href}
                  className="group overflow-hidden rounded-[28px] border border-white/60 bg-white/80 shadow-[0_18px_50px_rgba(74,94,56,0.08)]"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03] group-hover:saturate-110"
                    />
                  </div>
                  <div className="p-5 sm:p-6">
                    <h3
                      className="home-motion-text home-motion-text--drift font-display text-3xl text-matcha-deep sm:text-4xl"
                      style={{ "--motion-delay": `${0.12 + index * 0.1}s` } as CSSProperties}
                    >
                      {card.title}
                    </h3>
                    <p
                      className="home-motion-text mt-3 text-base leading-7 text-charcoal/75 sm:text-lg sm:leading-8"
                      style={{ "--motion-delay": `${0.2 + index * 0.1}s` } as CSSProperties}
                    >
                      {card.blurb}
                    </p>
                    <p
                      className="home-motion-text mt-5 font-sans text-[11px] uppercase tracking-[0.24em] text-matcha-mid sm:mt-6 sm:text-xs"
                      style={{ "--motion-delay": `${0.28 + index * 0.1}s` } as CSSProperties}
                    >
                      Explore onward
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <HomeReviewSection
          reviewUrl={googleReviewCta.href}
          ratingLabel={googleReviewCta.ratingLabel}
          visitorLabel={googleReviewCta.visitorLabel}
        />
      </div>
    </SiteShell>
  );
}
