import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { SiteShell } from "@/components/site-shell";
import storefrontImage from "../../../public/clothing/731328508_18120927568664971_3049198902341412717_n.webp";

const instagramUrl = "https://www.instagram.com/usco_collective?igsh=bXprYnZkbzlnem96";
const storefrontImagePath = "/clothing/731328508_18120927568664971_3049198902341412717_n.webp";

export const metadata: Metadata = {
  title: "USCO Collective Clothing | Clothing, Objects & Everyday Essentials",
  description:
    "Explore USCO Collective, an independent clothing space shaped by the same quiet, thoughtful design world as USCO Cafe.",
  alternates: {
    canonical: "https://www.uscocollective.com/clothing",
  },
  openGraph: {
    title: "USCO Collective Clothing | Clothing, Objects & Everyday Essentials",
    description:
      "Explore USCO Collective, an independent clothing space shaped by the same quiet, thoughtful design world as USCO Cafe.",
    url: "https://www.uscocollective.com/clothing",
    siteName: "USCO Cafe",
    type: "website",
    images: [
      {
        url: `https://www.uscocollective.com${storefrontImagePath}`,
        width: 1170,
        height: 1560,
        alt: "White exterior of the USCO Collective clothing shop surrounded by green trees.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "USCO Collective Clothing | Clothing, Objects & Everyday Essentials",
    description:
      "Explore USCO Collective, an independent clothing space shaped by the same quiet, thoughtful design world as USCO Cafe.",
    images: [`https://www.uscocollective.com${storefrontImagePath}`],
  },
};

function InstagramCta({
  children,
  className = "",
  ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  ariaLabel: string;
}) {
  return (
    <a
      href={instagramUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={`clothing-primary-link ${className}`.trim()}
    >
      <span>{children}</span>
      <span className="clothing-link-arrow" aria-hidden="true">
        &#8599;
      </span>
    </a>
  );
}

export default function ClothingPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.uscocollective.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Clothing",
        item: "https://www.uscocollective.com/clothing",
      },
    ],
  };

  return (
    <SiteShell currentPath="/clothing">
      <article className="inner-page-surface clothing-page">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />

        <section className="clothing-hero" aria-labelledby="clothing-page-title">
          <div className="clothing-hero-copy section-fade">
            <h1 id="clothing-page-title" className="clothing-hero-title">
              <span>USCO</span>
              <span>COLLECTIVE</span>
            </h1>
            <InstagramCta ariaLabel="Explore USCO Collective on Instagram, opens in a new tab">
              Explore on Instagram
            </InstagramCta>
          </div>

          <figure className="clothing-hero-media">
            <Image
              src={storefrontImage}
              alt="White exterior of the USCO Collective clothing shop surrounded by green trees."
              fill
              priority
              placeholder="blur"
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="clothing-hero-image"
            />
            <figcaption className="sr-only">
              Exterior of the USCO Collective clothing store.
            </figcaption>
          </figure>
        </section>

        <section className="clothing-instagram-section" aria-labelledby="clothing-instagram-title">
          <div>
            <span className="clothing-section-marker" aria-hidden="true" />
            <p className="clothing-kicker">See what&apos;s in store</p>
          </div>
          <div className="clothing-instagram-copy">
            <h2 id="clothing-instagram-title">
              New pieces, store updates and everyday moments from USCO Collective.
            </h2>
            <InstagramCta
              ariaLabel="Follow USCO Collective on Instagram, opens in a new tab"
              className="clothing-primary-link--wide"
            >
              Follow @USCO_COLLECTIVE
            </InstagramCta>
          </div>
        </section>

        <section className="clothing-visit-section" aria-labelledby="clothing-visit-title">
          <div className="clothing-visit-copy">
            <p className="clothing-kicker">Store information</p>
            <h2 id="clothing-visit-title">Visit the Collective</h2>
          </div>
          <dl className="clothing-visit-list">
            <div>
              <dt>Address</dt>
              <dd>
                Shop Number 10 Shahpurjat
                <br />
                Next to UCO Bank
              </dd>
            </div>
          </dl>
        </section>
      </article>
    </SiteShell>
  );
}
