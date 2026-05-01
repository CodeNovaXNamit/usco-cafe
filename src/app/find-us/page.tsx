import Link from "next/link";
import { SectionIntro } from "@/components/section-intro";
import { SiteShell } from "@/components/site-shell";
import { findUs } from "@/data/site";

export default function FindUsPage() {
  return (
    <SiteShell currentPath="/find-us">
      <section className="px-4 pb-24 pt-18 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="Find Us"
            title="You don&apos;t need directions. You need an excuse to come."
            body="We&apos;re at No. 4. The door is usually open."
          />

          <div className="mt-16 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="overflow-hidden rounded-[36px] border border-matcha-light bg-white shadow-[0_18px_50px_rgba(74,94,56,0.08)]">
              <div className="bg-matcha-light/60 px-6 py-4 font-sans text-xs uppercase tracking-[0.26em] text-matcha-deep">
                The lane
              </div>
              <iframe
                title="USCO location"
                src={findUs.mapUrl}
                className="h-[520px] w-full"
                loading="lazy"
              />
            </div>

            <div className="rounded-[36px] border border-white/50 bg-white/82 p-8 shadow-[0_18px_50px_rgba(74,94,56,0.08)]">
              <div className="space-y-10">
                <div>
                  <p className="font-sans text-xs uppercase tracking-[0.28em] text-matcha-mid">Address</p>
                  <div className="mt-3 space-y-1 text-lg leading-8 text-charcoal/80">
                    {findUs.addressLines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-sans text-xs uppercase tracking-[0.28em] text-matcha-mid">Opening hours</p>
                  <div className="mt-3 space-y-2 font-sans text-sm uppercase tracking-[0.16em] text-matcha-deep">
                    {findUs.hours.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-sans text-xs uppercase tracking-[0.28em] text-matcha-mid">Social</p>
                  <Link href="https://instagram.com/usco.cafe" className="mt-3 inline-block text-lg text-charcoal/80 hover:text-matcha-deep">
                    Instagram: {findUs.instagram}
                  </Link>
                </div>
                <div>
                  <p className="font-sans text-xs uppercase tracking-[0.28em] text-matcha-mid">Getting here</p>
                  <p className="mt-3 text-lg leading-8 text-charcoal/80">
                    We&apos;re down a quiet lane. Look for the yellow sign. You&apos;ll know.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
