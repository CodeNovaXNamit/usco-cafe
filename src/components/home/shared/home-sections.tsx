import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { IconMark } from "@/components/icon-mark";
import { pillars } from "@/data/site";
import type { HomeTeaserCard } from "./home-content";
import { MotionInView } from "./motion-in-view";

type IntroSectionProps = {
  title: string;
  body: string;
  className?: string;
};

export function HomeIntroSection({ title, body, className = "" }: IntroSectionProps) {
  return (
    <section className={`home-philosophy-section ${className}`}>
      <div className="home-philosophy-shell">
        <div className="home-philosophy-copy">
          <p className="home-section-kicker">A Slower Kind of Place</p>
          <h2>{title}</h2>
          <p>{body}</p>
        </div>
      </div>
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
  gridClassName = "home-philosophy-cards",
}: PillarsSectionProps) {
  return (
    <section className={`home-philosophy-section home-philosophy-section--cards ${className}`}>
      <div className="home-philosophy-shell">
        <div className={gridClassName}>
        {pillars.map((pillar, index) => (
          <MotionInView
            key={pillar.title}
            direction={index % 3 === 1 ? "bottom" : index % 3 === 2 ? "right" : "left"}
            delay={`${0.04 + index * 0.08}s`}
            className="home-philosophy-card"
          >
            <article
              className={`home-philosophy-card__inner ${cardClassName}`}
            >
              <div className="home-philosophy-icon">
                <IconMark kind={pillar.icon as "cup" | "leaf" | "clock"} />
              </div>
              <h3
                className="home-motion-text home-motion-text--drift home-philosophy-title"
                style={{ "--motion-delay": `${0.12 + index * 0.1}s` } as CSSProperties}
              >
                {pillar.title}
              </h3>
              <p
                className="home-motion-text home-philosophy-text"
                style={{ "--motion-delay": `${0.2 + index * 0.1}s` } as CSSProperties}
              >
                {pillar.line}
              </p>
            </article>
          </MotionInView>
        ))}
        </div>
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
  cardsClassName = "home-explore-grid",
  headingClassName = "home-motion-text home-motion-text--drift",
  showDesktopCta = true,
}: ExploreSectionProps) {
  return (
    <section className={`home-explore-premium ${className}`}>
      <div className="home-explore-shell">
        <div className="home-explore-heading">
          <div>
            <p className="home-section-kicker home-motion-text home-motion-text--drift" style={{ "--motion-delay": "0.08s" } as CSSProperties}>
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
              Start where it feels right
            </Link>
          ) : null}
        </div>

        <div className={cardsClassName}>
          {cards.map((card, index) => (
            <Link
              key={card.href}
              href={card.href}
              className="group home-explore-card"
            >
              <div className="home-explore-media">
                <Image
                  src={card.image}
                  alt={`${card.title} at USCO Cafe in Shahpur Jat, New Delhi`}
                  fill
                  sizes="(max-width: 1023px) 100vw, 33vw"
                  className="home-explore-image"
                />
              </div>
              <div className="home-explore-content">
                <h3
                  className="home-motion-text home-motion-text--drift"
                  style={{ "--motion-delay": `${0.12 + index * 0.1}s` } as CSSProperties}
                >
                  {card.title}
                </h3>
                <p
                  className="home-motion-text"
                  style={{ "--motion-delay": `${0.2 + index * 0.1}s` } as CSSProperties}
                >
                  {card.blurb}
                </p>
                <span
                  className="home-motion-text home-explore-cta"
                  style={{ "--motion-delay": `${0.28 + index * 0.1}s` } as CSSProperties}
                >
                  Explore onward
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
