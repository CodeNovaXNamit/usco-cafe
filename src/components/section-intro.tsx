import type { CSSProperties } from "react";

type SectionIntroProps = {
  eyebrow?: string;
  title: string;
  body: string;
  align?: "left" | "center";
  animated?: boolean;
};

export function SectionIntro({
  eyebrow,
  title,
  body,
  align = "center",
  animated = false,
}: SectionIntroProps) {
  const alignment =
    align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl text-left";

  return (
    <div className={`${alignment} section-fade`}>
      {eyebrow ? (
        <p
          className={`mb-4 font-sans text-[11px] uppercase tracking-[0.28em] text-matcha-mid sm:text-xs sm:tracking-[0.32em] ${
            animated ? "home-motion-text home-motion-text--drift" : ""
          }`}
          style={animated ? ({ "--motion-delay": "0.08s" } as CSSProperties) : undefined}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`text-balance font-display text-[2.7rem] leading-[0.94] text-matcha-deep sm:text-6xl lg:text-7xl ${
          animated ? "home-motion-text home-motion-text--drift" : ""
        }`}
        style={animated ? ({ "--motion-delay": "0.16s" } as CSSProperties) : undefined}
      >
        {title}
      </h2>
      <p
        className={`mt-5 text-base leading-7 text-charcoal/80 sm:mt-6 sm:text-xl sm:leading-8 ${
          animated ? "home-motion-text" : ""
        }`}
        style={animated ? ({ "--motion-delay": "0.26s" } as CSSProperties) : undefined}
      >
        {body}
      </p>
    </div>
  );
}
