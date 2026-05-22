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
  showHeading?: boolean;
};

export function HomeExploreSection({
  cards,
  className = "",
  cardsClassName = "home-explore-grid",
  showHeading = true,
}: ExploreSectionProps) {
  return (
    <section className={`home-explore-premium ${className}`}>
      <div className="home-explore-shell">
        {showHeading ? (
          <div className="home-explore-heading">
            <p className="home-section-kicker home-motion-text home-motion-text--drift" style={{ "--motion-delay": "0.08s" } as CSSProperties}>
              Explore next
            </p>
          </div>
        ) : null}

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

type FeaturedMenuSectionProps = {
  card: HomeTeaserCard;
  className?: string;
};

export function HomeFeaturedMenuSection({ card, className = "" }: FeaturedMenuSectionProps) {
  return (
    <section className={`home-featured-menu ${className}`}>
      <div className="home-featured-menu-media">
        <Image
          src={card.image}
          alt={`${card.title} at USCO Cafe in Shahpur Jat, New Delhi`}
          width={1200}
          height={840}
          sizes="(max-width: 767px) 100vw, 50vw"
        />
      </div>
      <div className="home-featured-menu-copy">
        <p className="home-featured-menu-kicker">Carefully chosen</p>
        <h2>Menu</h2>
        <p>
          Coffee, toast, matcha, and small comforts served quietly through the day.
        </p>
        <Link href="/menu" className="home-featured-menu-button">
          Explore the menu
        </Link>
      </div>
    </section>
  );
}

type SecondaryExploreSectionProps = {
  cards: HomeTeaserCard[];
  className?: string;
};

export function HomeSecondaryExploreSection({ cards, className = "" }: SecondaryExploreSectionProps) {
  return (
    <section className={`home-secondary-explore ${className}`}>
      <div className="home-secondary-explore-header">
        <p className="home-secondary-explore-kicker">CONTINUE THE VISIT</p>
        <h2>Map &amp; little moments.</h2>
        <p>Find the lane, then peek at the corners before you come.</p>
      </div>
      <div className="home-secondary-explore-grid">
        {cards.map((card, index) => (
          <Link key={card.href} href={card.href} className="group home-explore-card home-secondary-explore-card">
            <div className="home-explore-media">
              <Image
                src={card.image}
                alt={`${card.title} at USCO Cafe in Shahpur Jat, New Delhi`}
                fill
                sizes="(max-width: 1023px) 100vw, 50vw"
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
    </section>
  );
}
