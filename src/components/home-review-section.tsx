"use client";

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
  mobileReviewUrl?: string;
  ratingLabel: string;
  visitorLabel: string;
};

function isMobileDevice() {
  if (typeof navigator === "undefined") {
    return false;
  }

  return /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
}

export function HomeReviewSection({ reviewUrl, mobileReviewUrl, ratingLabel, visitorLabel }: HomeReviewSectionProps) {
  const repeatedReviews = [...reviewItems, ...reviewItems];

  return (
    <section className="px-4 pb-14 sm:px-6 sm:pb-24 lg:px-10">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[34px] border border-matcha-light/70 bg-[linear-gradient(135deg,rgba(244,241,231,0.98),rgba(230,237,219,0.96))] px-4 py-5 shadow-[0_24px_70px_rgba(74,94,56,0.08)] sm:px-6 sm:py-7">
        <div className="review-cta-card mb-5 rounded-[28px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(248,246,241,0.9))] p-4 shadow-[0_16px_40px_rgba(74,94,56,0.06)] sm:mb-6 sm:p-5">
          <div className="flex flex-wrap items-center gap-2.5">
            <p className="home-motion-text home-motion-text--drift font-sans text-[11px] uppercase tracking-[0.3em] text-matcha-mid sm:text-xs">
              Leave a little note
            </p>
            <div className="review-cta-pulse" aria-hidden>
              <span />
              <span />
              <span />
            </div>
          </div>

          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <h3 className="home-motion-text home-motion-text--drift font-display text-[2rem] leading-[0.96] text-matcha-deep sm:text-[2.5rem]">
                Loved your visit?
              </h3>
              <p className="home-motion-text mt-2 max-w-xl text-sm leading-6 text-charcoal/72 sm:text-base sm:leading-7">
                Write a Google review. Takes less than 30 seconds.
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2.5">
                <div className="home-motion-text home-motion-text--drift rounded-full border border-matcha-light/80 bg-matcha-light/45 px-4 py-2 font-sans text-[0.72rem] uppercase tracking-[0.16em] text-matcha-deep sm:text-sm sm:tracking-[0.18em]">
                  {ratingLabel}
                </div>
                <div className="home-motion-text home-motion-text--drift rounded-full border border-matcha-light/80 bg-white/80 px-4 py-2 font-sans text-[0.72rem] uppercase tracking-[0.16em] text-matcha-deep sm:text-sm sm:tracking-[0.18em]">
                  {visitorLabel}
                </div>
              </div>
            </div>

            <a
              href={reviewUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(event) => {
                if (!mobileReviewUrl || !isMobileDevice()) {
                  return;
                }

                event.preventDefault();
                window.open(mobileReviewUrl, "_blank", "noopener,noreferrer");
              }}
              className="home-motion-text home-motion-text--drift inline-flex min-h-11 items-center justify-center rounded-full border border-matcha-deep/18 bg-matcha-deep px-5 py-3 font-sans text-[10px] uppercase tracking-[0.24em] text-white hover:scale-[1.02] hover:bg-matcha-deep/92 sm:text-[11px]"
            >
              Write a Google Review
            </a>
          </div>
        </div>

        <div className="mb-4 flex flex-wrap items-center gap-2.5 sm:mb-5 sm:gap-3">
          <p className="home-motion-text home-motion-text--drift font-sans text-[11px] uppercase tracking-[0.3em] text-matcha-mid sm:text-xs">
            Guest Notes
          </p>
        </div>

        <div className="review-marquee">
          <div className="review-marquee__track">
            {repeatedReviews.map((review, index) => (
              <article
                key={`${review.text}-${index}`}
                className="review-chip flex min-h-[8.5rem] w-[16.5rem] flex-none flex-col justify-between rounded-[24px] border border-white/75 bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(248,246,241,0.92))] p-4 shadow-[0_14px_34px_rgba(74,94,56,0.06)] sm:w-[18rem] sm:p-5"
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
    </section>
  );
}
