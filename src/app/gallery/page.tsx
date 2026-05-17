import type { Metadata } from "next";
import Link from "next/link";
import { GalleryExperience } from "@/components/gallery-experience";
import { SectionIntro } from "@/components/section-intro";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "USCO Cafe Gallery | Coffee, Toast & Quiet Corners",
  description:
    "View photos of USCO Cafe in Shahpur Jat, including coffee, toast, interiors, quiet corners and cafe moments from our New Delhi space.",
  alternates: {
    canonical: "https://www.uscocollective.com/gallery",
  },
  openGraph: {
    title: "USCO Cafe Gallery | Coffee, Toast & Quiet Corners",
    description:
      "View photos of USCO Cafe in Shahpur Jat, including coffee, toast, interiors, quiet corners and cafe moments from our New Delhi space.",
    url: "https://www.uscocollective.com/gallery",
  },
  twitter: {
    card: "summary_large_image",
    title: "USCO Cafe Gallery | Coffee, Toast & Quiet Corners",
    description:
      "View photos of USCO Cafe in Shahpur Jat, including coffee, toast, interiors, quiet corners and cafe moments from our New Delhi space.",
  },
};

export default function GalleryPage() {
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
        name: "Gallery",
        item: "https://www.uscocollective.com/gallery",
      },
    ],
  };

  return (
    <SiteShell currentPath="/gallery">
      <section className="inner-page-surface px-4 pb-18 pt-16 sm:px-6 sm:pb-24 sm:pt-18 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
          />
          <SectionIntro
            eyebrow="Gallery"
            title="USCO Cafe Gallery"
            body="See coffee, toast, interiors, and quiet corners from USCO Cafe in Shahpur Jat, New Delhi."
            headingLevel={1}
          />
          <p className="mx-auto mt-4 max-w-3xl text-center text-sm text-charcoal/75">
            Planning your visit? Check the{" "}
            <Link href="/menu" className="underline decoration-matcha-mid/60 underline-offset-4 hover:text-matcha-deep">
              menu
            </Link>{" "}
            and head to{" "}
            <Link href="/find-us" className="underline decoration-matcha-mid/60 underline-offset-4 hover:text-matcha-deep">
              Find Us
            </Link>{" "}
            for directions and opening hours.
          </p>
          <div className="mt-16">
            <GalleryExperience />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
