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
      <section className="phone-story-section relative px-4 pb-9 pt-4">
        <MotionInView direction="left" delay="0.04s">
          <article className="phone-story-card phone-story-card--coffee relative isolate">
            <div className="phone-story-media relative h-[min(132vw,560px)] min-h-[470px] overflow-hidden rounded-[32px] border border-white/60 bg-white/50 shadow-[0_24px_68px_rgba(55,70,48,0.16)]">
              <video
                className="phone-story-video h-full w-full object-cover"
                src="/media/phone/coffee-home.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
            </div>
            <div className="phone-story-copy relative z-10 mx-[0.45rem] -mt-10 rounded-[30px] border border-white/80 bg-white/80 px-5 py-6 shadow-[0_22px_58px_rgba(55,70,48,0.14)] backdrop-blur-xl">
              <span className="phone-story-index pointer-events-none absolute right-5 top-5 font-serif text-[2.6rem] leading-none text-[#7e9a68]/30">
                01
              </span>
              <p className="phone-story-kicker m-0 text-[0.68rem] font-extrabold uppercase tracking-[0.24em] text-[#7e9a68]/75">
                Some Of Our Speciality
              </p>
              <h2 className="phone-story-title mt-3 max-w-[92%] font-serif text-[clamp(2rem,10vw,3.2rem)] font-normal leading-none tracking-[-0.052em] text-[#526b4e]">
                Coffee that feels like your coffee.
              </h2>
              <p className="phone-story-text mt-4 text-[0.98rem] leading-[1.75] text-[#3a3e34]/80">
                Slow pours, soft milk, deeper roasts, and the kind of cup that makes you stay for one more minute.
              </p>
              <p className="phone-story-pill mt-5 inline-flex max-w-full rounded-full border border-white/70 bg-white/70 px-4 py-3 text-[0.66rem] font-extrabold uppercase leading-snug tracking-[0.2em] text-[#5b6f4e]/85">
                Made for quiet mornings and slower evenings
              </p>
            </div>
          </article>
        </MotionInView>
      </section>
      <HomePillarsSection
        className="px-4 py-10"
        gridClassName="mx-auto grid max-w-7xl gap-4"
        cardClassName="rounded-[24px] p-5"
      />
      <section className="phone-story-section relative px-4 pb-9 pt-4">
        <MotionInView direction="right" delay="0.06s">
          <article className="phone-story-card phone-story-card--workspace relative isolate">
            <div className="phone-story-media relative h-[min(132vw,560px)] min-h-[470px] overflow-hidden rounded-[32px] border border-white/60 bg-white/50 shadow-[0_24px_68px_rgba(55,70,48,0.16)]">
              <video
                className="phone-story-video h-full w-full object-cover"
                src="/media/phone/workspace-home.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
              <span className="phone-story-media-badge absolute left-4 top-4 z-20 inline-flex min-h-[34px] items-center rounded-full border border-white/30 bg-[#142318]/40 px-4 text-[0.66rem] font-extrabold uppercase tracking-[0.2em] text-white/90 backdrop-blur-xl">
                Quiet Workspace
              </span>
            </div>
            <div className="phone-story-copy relative z-10 mx-[0.45rem] -mt-10 rounded-[30px] border border-white/80 bg-white/80 px-5 py-6 shadow-[0_22px_58px_rgba(55,70,48,0.14)] backdrop-blur-xl">
              <span className="phone-story-index pointer-events-none absolute right-5 top-5 font-serif text-[2.6rem] leading-none text-[#7e9a68]/30">
                02
              </span>
              <p className="phone-story-kicker m-0 text-[0.68rem] font-extrabold uppercase tracking-[0.24em] text-[#7e9a68]/75">
                Work From Here
              </p>
              <h2 className="phone-story-title mt-3 max-w-[92%] font-serif text-[clamp(2rem,10vw,3.2rem)] font-normal leading-none tracking-[-0.052em] text-[#526b4e]">
                A quiet table for deep work and slower hours.
              </h2>
              <p className="phone-story-text mt-4 text-[0.98rem] leading-[1.75] text-[#3a3e34]/80">
                Settle in with coffee, let the room stay calm around you, and get through the work that needs a little peace.
              </p>
              <p className="phone-story-pill mt-5 inline-flex max-w-full rounded-full border border-white/70 bg-white/70 px-4 py-3 text-[0.66rem] font-extrabold uppercase leading-snug tracking-[0.2em] text-[#5b6f4e]/85">
                Best for reading, writing, and long laptop sessions
              </p>
            </div>
          </article>
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
