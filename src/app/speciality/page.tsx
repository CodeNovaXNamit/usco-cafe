/* eslint-disable @next/next/no-img-element */
import { SectionIntro } from "@/components/section-intro";
import { SiteShell } from "@/components/site-shell";
import { SpecialityAccordion } from "@/components/speciality-accordion";
import { specialityItems } from "@/data/site";

export default function SpecialityPage() {
  return (
    <SiteShell currentPath="/speciality">
      <section className="px-4 pb-24 pt-18 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="Speciality"
            title="Some things deserve to be savoured twice."
            body="Our specialities are made slowly, for people in no hurry."
          />

          <div className="mt-20 space-y-16">
            {specialityItems.map((item, index) => (
              <article
                key={item.id}
                className={`grid items-center gap-8 overflow-hidden rounded-[36px] border border-white/50 bg-white/80 p-6 shadow-[0_18px_50px_rgba(74,94,56,0.07)] lg:grid-cols-[1.2fr_0.8fr] lg:p-10 ${
                  index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="overflow-hidden rounded-[28px]">
                  <img src={item.image} alt={item.name} className="aspect-[5/4] h-full w-full object-cover" />
                </div>
                <div>
                  <p className="font-sans text-xs uppercase tracking-[0.32em] text-matcha-mid">{item.origin}</p>
                  <h2 className="mt-4 font-display text-5xl italic text-matcha-deep sm:text-6xl">
                    {item.name}
                  </h2>
                  <p className="mt-6 text-lg leading-8 text-charcoal/80">{item.story}</p>
                  <ol className="mt-8 space-y-2 font-sans text-sm uppercase tracking-[0.16em] text-matcha-deep">
                    {item.process.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                  <div className="mt-8">
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
