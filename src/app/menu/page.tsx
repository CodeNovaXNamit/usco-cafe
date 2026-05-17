import type { Metadata } from "next";
import Link from "next/link";
import { MenuTabs } from "@/components/menu-tabs";
import { SectionIntro } from "@/components/section-intro";
import { SiteShell } from "@/components/site-shell";
import { getMenuItems } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "USCO Cafe Menu | Coffee, Toast & Drinks in Shahpur Jat",
  description:
    "Explore the USCO Cafe menu with coffee, toast, drinks and simple cafe bites in Shahpur Jat, New Delhi. See what is brewing today.",
  alternates: {
    canonical: "https://www.uscocollective.com/menu",
  },
  openGraph: {
    title: "USCO Cafe Menu | Coffee, Toast & Drinks in Shahpur Jat",
    description:
      "Explore the USCO Cafe menu with coffee, toast, drinks and simple cafe bites in Shahpur Jat, New Delhi. See what is brewing today.",
    url: "https://www.uscocollective.com/menu",
  },
  twitter: {
    card: "summary_large_image",
    title: "USCO Cafe Menu | Coffee, Toast & Drinks in Shahpur Jat",
    description:
      "Explore the USCO Cafe menu with coffee, toast, drinks and simple cafe bites in Shahpur Jat, New Delhi. See what is brewing today.",
  },
};

export default async function MenuPage() {
  const menuItems = await getMenuItems();
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
        name: "Menu",
        item: "https://www.uscocollective.com/menu",
      },
    ],
  };

  return (
    <SiteShell currentPath="/menu">
      <section className="inner-page-surface menu-page-surface">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <div className="menu-hero">
          <div className="menu-hero-copy">
            <SectionIntro
              eyebrow="Menu"
              title="USCO Cafe Menu"
              body="Explore coffee, toast, drinks, and simple cafe bites from USCO Cafe in Shahpur Jat, New Delhi."
              align="left"
              headingLevel={1}
            />
            <div className="menu-hero-facts">
              <span>Freshly Prepared</span>
              <span>Soft Cream Tones</span>
              <span>Prices Stay Scannable</span>
            </div>
            <p className="mt-4 text-sm text-charcoal/75">
              Looking for photos first? Visit our{" "}
              <Link href="/gallery" className="underline decoration-matcha-mid/60 underline-offset-4 hover:text-matcha-deep">
                gallery
              </Link>{" "}
              or{" "}
              <Link href="/find-us" className="underline decoration-matcha-mid/60 underline-offset-4 hover:text-matcha-deep">
                find us
              </Link>{" "}
              page for directions and opening hours.
            </p>
          </div>

          <div className="menu-hero-note grain">
            <p className="home-section-kicker">Menu Note</p>
            <h3>
              Matcha, cream,
              <br />
              toasted edges.
            </h3>
            <p>Every cup and bite is plated to feel calm, warm, and quietly satisfying.</p>
          </div>
        </div>

        <MenuTabs items={menuItems} />
      </section>
    </SiteShell>
  );
}
