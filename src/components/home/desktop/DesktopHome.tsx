import { HomeReviewSection } from "@/components/home-review-section";
import { FrameSequenceHero } from "@/components/frame-sequence-hero";
import { DesktopStoryCards } from "./desktop-story-cards";
import {
  HomeFeaturedMenuSection,
  HomeSecondaryExploreSection,
} from "@/components/home/shared/home-sections";
import { googleReviewCta } from "@/data/site";
import { desktopTeaserCards } from "../shared/home-content";

export default function DesktopHome() {
  const menuCard = desktopTeaserCards.find((card) => card.title === "Menu");
  const secondaryExploreCards = desktopTeaserCards.filter((card) => card.title !== "Menu");

  return (
    <div className="home-motion-surface">
      <FrameSequenceHero />
      {menuCard ? <HomeFeaturedMenuSection card={menuCard} /> : null}
      <DesktopStoryCards />
      <HomeSecondaryExploreSection cards={secondaryExploreCards} />
      <HomeReviewSection
        reviewUrl={googleReviewCta.href}
        ratingLabel={googleReviewCta.ratingLabel}
        visitorLabel={googleReviewCta.visitorLabel}
      />
    </div>
  );
}
