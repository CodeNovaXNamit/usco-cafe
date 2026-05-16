import { HomeOfferingStrip } from "@/components/home-offering-strip";
import { HomeReviewSection } from "@/components/home-review-section";
import {
  HomeExploreSection,
  HomeIntroSection,
  HomePillarsSection,
} from "@/components/home/shared/home-sections";
import { googleReviewCta, homeOfferingStripItems } from "@/data/site";
import { desktopTeaserCards, homeIntroContent } from "../shared/home-content";
import { DesktopHero } from "./desktop-hero";

export default function DesktopHome() {
  return (
    <div className="home-motion-surface">
      <DesktopHero />
      <HomeOfferingStrip items={homeOfferingStripItems} />
      <HomeIntroSection
        title={homeIntroContent.title}
        body={homeIntroContent.body}
        className="px-4 pb-14 pt-8 sm:px-6 sm:pb-24 sm:pt-12 lg:px-10"
      />
      <HomePillarsSection className="px-4 pb-14 sm:px-6 sm:pb-24 lg:px-10" />
      <HomeExploreSection
        cards={desktopTeaserCards}
        className="px-4 py-6 sm:px-6 sm:py-10 lg:px-10"
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
