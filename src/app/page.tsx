/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { FrameSequenceHero } from "@/components/frame-sequence-hero";
import { IconMark } from "@/components/icon-mark";
import { SectionIntro } from "@/components/section-intro";
import { SiteShell } from "@/components/site-shell";
import { galleryItems, pillars } from "@/data/site";

export default function HomePage() {
  const teaserCards = [
    {
      href: "/menu",
      title: "Menu",
      image: galleryItems[2]?.image,
      blurb: "Carefully chosen. Quietly served.",
    },
    {
      href: "/speciality",
      title: "Speciality",
      image: galleryItems[6]?.image,
      blurb: "Slow drinks with longer stories.",
    },
    {
      href: "/gallery",
      title: "Gallery",
      image: galleryItems[0]?.image,
      blurb: "Warm corners, still frames, small rituals.",
    },
  ];

  return (
    <SiteShell currentPath="/">
      <FrameSequenceHero />

      <section className="px-4 py-24 sm:px-6 lg:px-10">
        <SectionIntro
          title="Somewhere between your first sip and your last thought."
          body="USCO is a small place that asks very little of you. Sit. Breathe. Let the coffee do the rest."
        />
      </section>

      <section className="px-4 pb-24 sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <article
              key={pillar.title}
              className="grain rounded-[28px] border border-matcha-light bg-matcha-light/60 p-8 shadow-[0_18px_50px_rgba(74,94,56,0.08)]"
            >
              <IconMark kind={pillar.icon as "cup" | "leaf" | "clock"} />
              <h3 className="mt-8 font-display text-4xl text-matcha-deep">{pillar.title}</h3>
              <p className="mt-3 text-lg leading-8 text-charcoal/75">{pillar.line}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="font-sans text-xs uppercase tracking-[0.32em] text-matcha-mid">Explore next</p>
              <h2 className="mt-3 font-display text-5xl text-matcha-deep sm:text-6xl">
                A few ways in.
              </h2>
            </div>
            <Link href="/find-us" className="hidden font-sans text-xs uppercase tracking-[0.26em] text-matcha-mid sm:block">
              Find the lane
            </Link>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {teaserCards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group overflow-hidden rounded-[28px] border border-white/60 bg-white/80 shadow-[0_18px_50px_rgba(74,94,56,0.08)]"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03] group-hover:saturate-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-4xl text-matcha-deep">{card.title}</h3>
                  <p className="mt-3 text-lg leading-8 text-charcoal/75">{card.blurb}</p>
                  <p className="mt-6 font-sans text-xs uppercase tracking-[0.24em] text-matcha-mid">
                    Explore →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
