type SectionIntroProps = {
  eyebrow?: string;
  title: string;
  body: string;
  align?: "left" | "center";
};

export function SectionIntro({
  eyebrow,
  title,
  body,
  align = "center",
}: SectionIntroProps) {
  const alignment =
    align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl text-left";

  return (
    <div className={`${alignment} section-fade`}>
      {eyebrow ? (
        <p className="mb-4 font-sans text-xs uppercase tracking-[0.32em] text-matcha-mid">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-balance font-display text-5xl leading-none text-matcha-deep sm:text-6xl lg:text-7xl">
        {title}
      </h2>
      <p className="mt-6 text-lg leading-8 text-charcoal/80 sm:text-xl">{body}</p>
    </div>
  );
}
