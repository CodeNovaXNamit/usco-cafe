/* eslint-disable @next/next/no-img-element */
import { SectionIntro } from "@/components/section-intro";
import { SiteShell } from "@/components/site-shell";
import { SpecialityAccordion } from "@/components/speciality-accordion";
import { specialityItems } from "@/data/site";

export default function SpecialityPage() {
  return (
    <SiteShell currentPath="/speciality">
      <section className="px-4 pb-18 pt-16 sm:px-6 sm:pb-24 sm:pt-18 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="Speciality"
            title="Some things deserve to be savoured twice."
            body="Our specialities are made slowly, for people in no hurry."
          />

          <div className="mt-14 space-y-10 sm:mt-20 sm:space-y-16">
            {specialityItems.map((item, index) => (
              <article
                key={item.id}
                className={`grid items-center gap-6 overflow-hidden rounded-[36px] border border-white/50 bg-white/80 p-5 shadow-[0_18px_50px_rgba(74,94,56,0.07)] sm:gap-8 sm:p-6 lg:grid-cols-[1.2fr_0.8fr] lg:p-10 ${
                  index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="overflow-hidden rounded-[28px]">
                  <img src={item.image} alt={item.name} className="aspect-[5/4] h-full w-full object-cover" />
                </div>
                <div>
                  <p className="font-sans text-[11px] uppercase tracking-[0.26em] text-matcha-mid sm:text-xs sm:tracking-[0.32em]">
                    {item.origin}
                  </p>
                  <h2 className="mt-4 font-display text-[2.7rem] italic leading-[0.96] text-matcha-deep sm:text-6xl">
                    {item.name}
                  </h2>
                  <p className="mt-5 text-base leading-7 text-charcoal/80 sm:mt-6 sm:text-lg sm:leading-8">
                    {item.story}
                  </p>
                  <ol className="mt-6 space-y-2 font-sans text-xs uppercase tracking-[0.14em] text-matcha-deep sm:mt-8 sm:text-sm sm:tracking-[0.16em]">
                    {item.process.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                  <div className="mt-6 sm:mt-8">
                    <SpecialityAccordion label="How it&apos;s made" content={item.details} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
