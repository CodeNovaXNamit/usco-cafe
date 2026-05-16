/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

import type { HomeOfferingStripItem } from "@/data/site";

type HomeOfferingStripProps = {
  items: HomeOfferingStripItem[];
};

function OfferingRow({
  items,
  direction,
}: {
  items: HomeOfferingStripItem[];
  direction: "left" | "right";
}) {
  return (
    <div className="home-offering-row">
      <div
        className={`home-offering-track ${direction === "left" ? "home-offering-track-left" : "home-offering-track-right"}`}
      >
        {[0, 1].map((groupIndex) => (
          <div
            key={groupIndex}
            aria-hidden={groupIndex === 1}
            className="home-offering-group"
          >
            {items.map((item) => (
              <Link
                key={`${item.id}-${groupIndex}`}
                href={item.href}
                tabIndex={groupIndex === 1 ? -1 : undefined}
                className="group home-offering-item"
              >
                <div className="relative flex h-[88px] w-[116px] items-end justify-center sm:h-[96px] sm:w-[132px] lg:h-[108px] lg:w-[144px]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="max-h-[78px] w-auto max-w-[112px] object-contain drop-shadow-[0_12px_24px_rgba(74,94,56,0.22)] transition duration-500 group-hover:-translate-y-1 group-hover:scale-[1.04] sm:max-h-[86px] sm:max-w-[126px] lg:max-h-[98px] lg:max-w-[138px]"
                  />
                </div>
                <span className="home-motion-text home-motion-text--drift mt-3 inline-flex rounded-full bg-[rgba(248,246,241,0.78)] px-3 py-1 font-sans text-[10px] uppercase tracking-[0.2em] text-matcha-deep shadow-[0_10px_20px_rgba(74,94,56,0.08)] backdrop-blur-sm sm:text-[11px]">
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function HomeOfferingStrip({ items }: HomeOfferingStripProps) {
  const secondRow = [...items.slice(Math.floor(items.length / 2)), ...items.slice(0, Math.floor(items.length / 2))];
  const desktopFirstRow = [...items, ...items];
  const desktopSecondRow = [...secondRow, ...secondRow];

  return (
    <>
      <section className="overflow-hidden bg-matcha-light py-5 sm:py-6 lg:hidden">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r from-[#f8f6f1] via-[#f8f6f1]/80 to-transparent sm:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-[#f8f6f1] via-[#f8f6f1]/80 to-transparent sm:w-24" />
          <div className="absolute inset-x-0 top-0 h-px bg-white/45" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-matcha-deep/10" />
          <div className="space-y-7 sm:space-y-9">
            <OfferingRow items={items} direction="left" />
            <OfferingRow items={secondRow} direction="right" />
          </div>
        </div>
      </section>

      <section className="offering-runway-section hidden lg:block" aria-label="USCO menu glimpses">
        <div className="offering-runway-shell">
          <div className="offering-runway-header">
            <div>
              <p className="home-section-kicker">Menu Glimpses</p>
              <h2>A few little reasons to stay longer.</h2>
            </div>
            <p>Small comforts, quiet flavors, and cups that ask for one more minute.</p>
          </div>

          <div className="offering-runway-frame">
            <div className="offering-runway-row offering-runway-row--left">
              {desktopFirstRow.map((item, index) => (
                <Link key={`${item.id}-runway-left-${index}`} href={item.href} className="offering-runway-item">
                  <div className="offering-runway-orb">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <span className="offering-runway-label">{item.name}</span>
                </Link>
              ))}
            </div>

            <div className="offering-runway-row offering-runway-row--right">
              {desktopSecondRow.map((item, index) => (
                <Link key={`${item.id}-runway-right-${index}`} href={item.href} className="offering-runway-item">
                  <div className="offering-runway-orb">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <span className="offering-runway-label">{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
