import { HomeOfferingStrip } from "@/components/home-offering-strip";
import { HomeReviewSection } from "@/components/home-review-section";
import { FrameSequenceHero } from "@/components/frame-sequence-hero";
import { DesktopStoryCards } from "./desktop-story-cards";
import {
  HomeExploreSection,
  HomeIntroSection,
  HomePillarsSection,
} from "@/components/home/shared/home-sections";
import { googleReviewCta, homeOfferingStripItems } from "@/data/site";
import { desktopTeaserCards, homeIntroContent } from "../shared/home-content";

export default function DesktopHome() {
  return (
    <div className="home-motion-surface">
      <FrameSequenceHero />
      <HomeIntroSection title={homeIntroContent.title} body={homeIntroContent.body} className="home-philosophy-section--lead" />
      <HomePillarsSection className="" />
      <HomeOfferingStrip items={homeOfferingStripItems} />
      <DesktopStoryCards />
      <HomeExploreSection
        cards={desktopTeaserCards}
        className=""
      />
      <HomeReviewSection
        reviewUrl={googleReviewCta.href}
        ratingLabel={googleReviewCta.ratingLabel}
        visitorLabel={googleReviewCta.visitorLabel}
      />
    </div>
  );
}
