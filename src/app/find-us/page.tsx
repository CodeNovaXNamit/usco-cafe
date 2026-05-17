import Link from "next/link";
import { SectionIntro } from "@/components/section-intro";
import { SiteShell } from "@/components/site-shell";
import { findUs } from "@/data/site";

export default function FindUsPage() {
  const googleMapsUrl =
    "https://www.google.com/maps/search/?api=1&query=USCO%20Cafe%20Shop%20Number%204%20Shahpur%20Jat%20New%20Delhi";

  return (
    <SiteShell currentPath="/find-us">
      <section className="inner-page-surface find-page-surface">
        <div className="find-hero-wrap">
          <SectionIntro
            eyebrow="Find Us"
            title="You don&apos;t need directions. You need an excuse to come."
            body="We&apos;re at No. 4. The door is usually open."
          />
        </div>

        <div className="find-visit-shell">
          <article className="find-map-card">
            <div className="find-card-topline">
              <span>The lane</span>
              <Link href={googleMapsUrl} target="_blank" rel="noreferrer noopener">
                Open map
              </Link>
            </div>

            <div className="find-map-frame">
              <iframe
                title="USCO Cafe location map"
                src={findUs.mapUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            <div className="find-map-footer">
              <p>Look for the yellow sign, a quiet lane, and plants near the entrance.</p>
              <Link href={googleMapsUrl} target="_blank" rel="noreferrer noopener">
                Open in Google Maps
              </Link>
            </div>
          </article>

          <aside className="find-info-panel">
            <div className="find-info-card find-info-card--address">
              <p className="find-section-kicker">Address</p>
              <h2>{findUs.addressLines[0]}</h2>
              <div className="find-address-lines">
                {findUs.addressLines.slice(1).map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </div>
            </div>

            <div className="find-info-grid">
              <div className="find-info-card find-info-card--hours">
                <p className="find-section-kicker">Opening hours</p>
                <div className="find-hours-list">
                  <div className="find-hour-row">
                    <span className="find-hour-dot" />
                    <div>
                      <strong>Daily</strong>
                      <span>{findUs.hours[0]?.replace(/^Daily\s*/i, "") ?? "10:00 am - 8:00 pm"}</span>
                    </div>
                  </div>
                  <div className="find-hour-row">
                    <span className="find-hour-dot" />
                    <div>
                      <strong>Quietest corner</strong>
                      <span>{findUs.hours[1] ?? "Upstairs stays quieter for long reads."}</span>
                    </div>
                  </div>
                  <div className="find-hour-row">
                    <span className="find-hour-dot" />
                    <div>
                      <strong>Before heading over</strong>
                      <span>Best to verify on Instagram.</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="find-info-card">
                <p className="find-section-kicker">Social</p>
                <h3>{findUs.instagram}</h3>
                <Link
                  href="https://www.instagram.com/uscocafe/"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="USCO Cafe on Instagram"
                  className="find-social-link"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-4 w-4 fill-none stroke-current"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
                    <path d="M16.5 7.5h.01" />
                    <circle cx="12" cy="12" r="4" />
                  </svg>
                  Open Instagram
                </Link>
                <p className="mt-3 text-sm text-[#3a3e34]/80">WhatsApp: 7628 827 848</p>
                <p className="mt-1 text-sm text-[#3a3e34]/80">Email: uscocafe@gmail.com</p>
              </div>
            </div>

            <div className="find-info-card find-info-card--note">
              <p className="find-section-kicker">Getting here</p>
              <p>We&apos;re down a quiet lane. Look for the yellow sign. You&apos;ll know.</p>
            </div>

            <div className="find-action-row">
              <Link href={googleMapsUrl} target="_blank" rel="noreferrer noopener" className="find-primary-button">
                Open in Google Maps
              </Link>
              <Link
                href="https://www.instagram.com/uscocafe/"
                target="_blank"
                rel="noreferrer noopener"
                className="find-secondary-button"
              >
                Instagram
              </Link>
            </div>
          </aside>
        </div>

        <div className="find-before-row">
          <div className="find-before-card">
            <p className="find-section-kicker">Before you come</p>
            <h3>Look for the yellow sign.</h3>
            <p>It&apos;s a quiet lane. Plants near the entrance make it easier to spot.</p>
          </div>
          <div className="find-before-card">
            <p className="find-section-kicker">Quiet tip</p>
            <h3>Upstairs stays calmer.</h3>
            <p>Best for long reads, focused laptop time, or slower conversations.</p>
          </div>
          <div className="find-before-card">
            <p className="find-section-kicker">Latest update</p>
            <h3>Check Instagram first.</h3>
            <p>Quick stories usually mention special hours, crowd flow, and fresh drops.</p>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
