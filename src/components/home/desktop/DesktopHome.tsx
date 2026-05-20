import { HomeReviewSection } from "@/components/home-review-section";
import { FrameSequenceHero } from "@/components/frame-sequence-hero";
import { DesktopStoryCards } from "./desktop-story-cards";
import {
  HomeExploreSection,
} from "@/components/home/shared/home-sections";
import { googleReviewCta } from "@/data/site";
import { desktopTeaserCards } from "../shared/home-content";

export default function DesktopHome() {
  return (
    <div className="home-motion-surface">
      <FrameSequenceHero />
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
