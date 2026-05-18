const reviewItems = [
  {
    emoji: "🍵",
    text: "Matcha feels soft, balanced, and comforting.",
  },
  {
    emoji: "☕",
    text: "Coffee worth slowing down for.",
  },
  {
    emoji: "✨",
    text: "Beautiful space with a calm little energy.",
  },
  {
    emoji: "🥐",
    text: "Toast, coffee, and a very cozy mood.",
  },
  {
    emoji: "🌿",
    text: "Peaceful vibe and lovely presentation.",
  },
  {
    emoji: "💛",
    text: "A place that makes you want to stay longer.",
  },
];

type HomeReviewSectionProps = {
  reviewUrl: string;
  ratingLabel: string;
  visitorLabel: string;
};
export function HomeReviewSection({ reviewUrl, ratingLabel, visitorLabel }: HomeReviewSectionProps) {
  const repeatedReviews = [...reviewItems, ...reviewItems];

  return (
    <section className="home-review-lounge">
      <div className="home-review-lounge-shell">
        <div className="home-review-cta-card">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <p className="home-section-kicker home-motion-text home-motion-text--drift">
              Leave a little note
            </p>
            <div className="review-cta-pulse" aria-hidden>
              <span />
              <span />
              <span />
            </div>
          </div>

            <div className="mt-3">
              <h2 className="home-motion-text home-motion-text--drift">
                Loved your visit?
              </h2>
              <p className="home-motion-text mt-2 max-w-2xl text-sm leading-7 text-charcoal/72 sm:text-base">
                Write a Google review. Takes less than 30 seconds.
              </p>

              <div className="home-review-stat-row">
                <div className="home-motion-text home-motion-text--drift home-review-stat">
                  {ratingLabel}
                </div>
                <div className="home-motion-text home-motion-text--drift home-review-stat">
                  {visitorLabel}
                </div>
              </div>
            </div>
          </div>

          <div>
            <a
              href={reviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="home-motion-text home-motion-text--drift home-review-button"
            >
              Write a Google Review
            </a>
          </div>
        </div>

        <div className="home-review-notes">
          <div className="mb-4 flex flex-wrap items-center gap-2.5 sm:mb-5 sm:gap-3">
            <p className="home-section-kicker home-motion-text home-motion-text--drift">
            Guest Notes
          </p>
        </div>

          <div className="review-marquee">
            <div className="review-marquee__track">
              {repeatedReviews.map((review, index) => (
                <article
                  key={`${review.text}-${index}`}
                  className="review-chip home-review-note-card flex min-h-[8.5rem] w-[16.5rem] flex-none flex-col justify-between sm:w-[18rem]"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-matcha-light/55 text-xl">
                      {review.emoji}
                    </span>
                    <span className="home-motion-text font-sans text-[10px] uppercase tracking-[0.24em] text-matcha-mid">
                      What people feel
                    </span>
                  </div>
                  <p className="home-motion-text mt-4 text-[0.98rem] leading-7 text-charcoal/78 sm:text-lg sm:leading-8">
                    {review.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
