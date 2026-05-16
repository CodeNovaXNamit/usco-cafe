import type { CSSProperties } from "react";
import { HomeOfferingStrip } from "@/components/home-offering-strip";
import { HomeReviewSection } from "@/components/home-review-section";
import {
  HomeExploreSection,
  HomeIntroSection,
  HomePillarsSection,
} from "@/components/home/shared/home-sections";
import { MotionInView } from "@/components/home/shared/motion-in-view";
import { googleReviewCta, homeOfferingStripItems } from "@/data/site";
import { homeIntroContent, phoneTeaserCards } from "../shared/home-content";
import { PhoneHero } from "./phone-hero";

export default function PhoneHome() {
  return (
    <div className="home-motion-surface">
      <PhoneHero />
      <HomeIntroSection
        title={homeIntroContent.title}
        body={homeIntroContent.body}
        className="px-4 pb-10 pt-8"
      />
      <HomeOfferingStrip items={homeOfferingStripItems} />
      <section className="px-4 py-6">
        <div className="relative overflow-hidden rounded-[28px] border border-white/60 bg-white/70 shadow-[0_18px_50px_rgba(74,94,56,0.08)]">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="block aspect-[4/5] h-full w-full object-cover"
          >
            <source src="/media/phone/coffee-home.mp4" type="video/mp4" />
          </video>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,30,26,0)_34%,rgba(30,30,26,0.14)_68%,rgba(30,30,26,0.38)_100%)]" />
        </div>
      </section>
      <section className="px-4 pb-4">
        <MotionInView direction="left" delay="0.04s" className="rounded-[30px]">
          <div className="phone-speciality-card overflow-hidden rounded-[30px] border border-white/55 bg-[linear-gradient(180deg,rgba(255,255,255,0.34),rgba(248,246,241,0.22))] p-5 text-matcha-deep shadow-[0_22px_55px_rgba(74,94,56,0.14)] backdrop-blur-xl">
            <p className="home-motion-text font-sans text-[0.64rem] uppercase tracking-[0.3em] text-matcha-mid/90" style={{ "--motion-delay": "0.08s" } as CSSProperties}>
              Some Of Our Speciality
            </p>
            <h3 className="home-motion-text mt-3 font-display text-[2rem] leading-[0.95] text-matcha-deep" style={{ "--motion-delay": "0.16s" } as CSSProperties}>
              Coffee that feels like your coffee.
            </h3>
            <p className="home-motion-text mt-3 max-w-sm text-sm leading-6 text-charcoal/78" style={{ "--motion-delay": "0.24s" } as CSSProperties}>
              Slow pours, soft milk, deeper roasts, and the kind of cup that makes you stay for one more minute.
            </p>
            <div className="home-motion-text mt-5 inline-flex rounded-full border border-white/70 bg-white/46 px-4 py-2 font-sans text-[0.68rem] uppercase tracking-[0.22em] text-matcha-deep shadow-[0_10px_24px_rgba(74,94,56,0.08)]" style={{ "--motion-delay": "0.32s" } as CSSProperties}>
              Made for quiet mornings and slower evenings
            </div>
          </div>
        </MotionInView>
      </section>
      <HomePillarsSection
        className="px-4 py-10"
        gridClassName="mx-auto grid max-w-7xl gap-4"
        cardClassName="rounded-[24px] p-5"
      />
      <section className="px-4 pb-4">
        <div className="relative overflow-hidden rounded-[30px] border border-white/60 bg-white/70 shadow-[0_18px_50px_rgba(74,94,56,0.1)]">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="block aspect-[4/5] h-full w-full object-cover"
          >
            <source src="/media/phone/workspace-home.mp4" type="video/mp4" />
          </video>
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(30,30,26,0.18),rgba(30,30,26,0.02)_36%,rgba(30,30,26,0.42)_100%)]" />
          <div className="absolute left-4 top-4 rounded-full border border-white/30 bg-[rgba(248,246,241,0.18)] px-3 py-2 backdrop-blur-md">
            <p className="font-sans text-[0.56rem] uppercase tracking-[0.28em] text-white/92">
              Quiet Workspace
            </p>
          </div>
        </div>
      </section>
      <section className="px-4 pb-4">
        <MotionInView direction="right" delay="0.06s" className="rounded-[30px]">
          <div className="phone-speciality-card overflow-hidden rounded-[30px] border border-white/55 bg-[linear-gradient(180deg,rgba(255,255,255,0.34),rgba(248,246,241,0.22))] p-5 text-matcha-deep shadow-[0_22px_55px_rgba(74,94,56,0.14)] backdrop-blur-xl">
            <p className="home-motion-text font-sans text-[0.64rem] uppercase tracking-[0.3em] text-matcha-mid/90" style={{ "--motion-delay": "0.08s" } as CSSProperties}>
              Work From Here
            </p>
            <h3 className="home-motion-text mt-3 font-display text-[2rem] leading-[0.95] text-matcha-deep" style={{ "--motion-delay": "0.16s" } as CSSProperties}>
              A quiet table for deep work and slower hours.
            </h3>
            <p className="home-motion-text mt-3 max-w-sm text-sm leading-6 text-charcoal/78" style={{ "--motion-delay": "0.24s" } as CSSProperties}>
              Settle in with coffee, let the room stay calm around you, and get through the work that needs a little peace.
            </p>
            <div className="home-motion-text mt-5 inline-flex rounded-full border border-white/70 bg-white/46 px-4 py-2 font-sans text-[0.68rem] uppercase tracking-[0.22em] text-matcha-deep shadow-[0_10px_24px_rgba(74,94,56,0.08)]" style={{ "--motion-delay": "0.32s" } as CSSProperties}>
              Best for reading, writing, and long laptop sessions
            </div>
          </div>
        </MotionInView>
      </section>
      <HomeExploreSection
        cards={phoneTeaserCards}
        className="px-4 py-4"
        cardsClassName="grid gap-4"
        headingClassName="home-motion-text home-motion-text--drift mt-3 font-display text-[2.4rem] leading-[0.96] text-matcha-deep"
        showDesktopCta={false}
      />
      <HomeReviewSection
        reviewUrl={googleReviewCta.href}
        mobileReviewUrl={googleReviewCta.mobileHref}
        ratingLabel={googleReviewCta.ratingLabel}
        visitorLabel={googleReviewCta.visitorLabel}
      />
    </div>
  );
}
