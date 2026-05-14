import { HomeOfferingStrip } from "@/components/home-offering-strip";
import { HomeReviewSection } from "@/components/home-review-section";
import {
  HomeExploreSection,
  HomeIntroSection,
  HomePillarsSection,
} from "@/components/home/shared/home-sections";
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
      <HomePillarsSection
        className="px-4 py-10"
        gridClassName="mx-auto grid max-w-7xl gap-4"
        cardClassName="rounded-[24px] p-5"
      />
      <HomeExploreSection
        cards={phoneTeaserCards}
        className="px-4 py-4"
        cardsClassName="grid gap-4"
        headingClassName="home-motion-text home-motion-text--drift mt-3 font-display text-[2.4rem] leading-[0.96] text-matcha-deep"
        showDesktopCta={false}
      />
      <HomeReviewSection
        reviewUrl={googleReviewCta.href}
        ratingLabel={googleReviewCta.ratingLabel}
        visitorLabel={googleReviewCta.visitorLabel}
      />
    </div>
  );
}
