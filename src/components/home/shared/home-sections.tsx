import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { IconMark } from "@/components/icon-mark";
import { SectionIntro } from "@/components/section-intro";
import { pillars } from "@/data/site";
import type { HomeTeaserCard } from "./home-content";

type IntroSectionProps = {
  title: string;
  body: string;
  className?: string;
};

export function HomeIntroSection({ title, body, className = "" }: IntroSectionProps) {
  return (
    <section className={className}>
      <SectionIntro animated title={title} body={body} />
    </section>
  );
}

type PillarsSectionProps = {
  className?: string;
  cardClassName?: string;
  gridClassName?: string;
};

export function HomePillarsSection({
  className = "",
  cardClassName = "",
  gridClassName = "mx-auto grid max-w-7xl gap-4 sm:gap-5 lg:grid-cols-3",
}: PillarsSectionProps) {
  return (
    <section className={className}>
      <div className={gridClassName}>
        {pillars.map((pillar, index) => (
          <article
            key={pillar.title}
            className={`grain rounded-[28px] border border-matcha-light bg-matcha-light/60 p-6 shadow-[0_18px_50px_rgba(74,94,56,0.08)] sm:p-8 ${cardClassName}`}
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
  );
}

type ExploreSectionProps = {
  cards: HomeTeaserCard[];
  className?: string;
  cardsClassName?: string;
  headingClassName?: string;
  showDesktopCta?: boolean;
};

export function HomeExploreSection({
  cards,
  className = "",
  cardsClassName = "grid gap-4 sm:gap-5 lg:grid-cols-3",
  headingClassName = "home-motion-text home-motion-text--drift mt-3 font-display text-[2.8rem] leading-[0.96] text-matcha-deep sm:text-6xl",
  showDesktopCta = true,
}: ExploreSectionProps) {
  return (
    <section className={className}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <div>
            <p
              className="home-motion-text home-motion-text--drift font-sans text-[11px] uppercase tracking-[0.28em] text-matcha-mid sm:text-xs sm:tracking-[0.32em]"
              style={{ "--motion-delay": "0.08s" } as CSSProperties}
            >
              Explore next
            </p>
            <h2 className={headingClassName} style={{ "--motion-delay": "0.16s" } as CSSProperties}>
              A few ways in.
            </h2>
          </div>
          {showDesktopCta ? (
            <Link
              href="/find-us"
              className="home-motion-text hidden font-sans text-xs uppercase tracking-[0.26em] text-matcha-mid sm:block"
              style={{ "--motion-delay": "0.24s" } as CSSProperties}
            >
              Find the lane
            </Link>
          ) : null}
        </div>
        <div className={cardsClassName}>
          {cards.map((card, index) => (
            <Link
              key={card.href}
              href={card.href}
              className="group overflow-hidden rounded-[28px] border border-white/60 bg-white/80 shadow-[0_18px_50px_rgba(74,94,56,0.08)]"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 767px) 100vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.03] group-hover:saturate-110"
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
  );
}
