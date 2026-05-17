import type { Metadata } from "next";
import { HomeLoadingGate } from "@/components/home/home-loading-gate";
import { ResponsiveHome } from "@/components/home/responsive-home";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "USCO - Coffee + Toast + Work | USCO Cafe in Shahpur Jat, New Delhi",
  description:
    "Visit USCO Cafe in Shahpur Jat, New Delhi for coffee, toast, quiet cafe moments, warm natural light, and a cozy work-friendly space. View our menu, gallery, location, and opening hours.",
  alternates: {
    canonical: "https://www.uscocollective.com/",
  },
  openGraph: {
    title: "USCO - Coffee + Toast + Work | USCO Cafe in Shahpur Jat, New Delhi",
    description:
      "Visit USCO Cafe in Shahpur Jat, New Delhi for coffee, toast, quiet cafe moments, warm natural light, and a cozy work-friendly space. View our menu, gallery, location, and opening hours.",
    url: "https://www.uscocollective.com/",
    siteName: "USCO Cafe",
    type: "website",
    images: [
      {
        url: "https://www.uscocollective.com/home/Logo/logo-rounded.png",
        width: 1200,
        height: 630,
        alt: "USCO Cafe in Shahpur Jat, New Delhi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "USCO - Coffee + Toast + Work | USCO Cafe in Shahpur Jat, New Delhi",
    description:
      "Visit USCO Cafe in Shahpur Jat, New Delhi for coffee, toast, quiet cafe moments, warm natural light, and a cozy work-friendly space. View our menu, gallery, location, and opening hours.",
    images: ["https://www.uscocollective.com/home/Logo/logo-rounded.png"],
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",
  "@id": "https://www.uscocollective.com/#localbusiness",
  name: "USCO Cafe",
  alternateName: ["USCO CAFE", "USCO - Coffee + Toast + Work"],
  url: "https://www.uscocollective.com/",
  image: "https://www.uscocollective.com/home/Logo/logo-rounded.png",
  description:
    "USCO Cafe in Shahpur Jat, New Delhi serves coffee, toast, and quiet work-friendly cafe moments in a warm, cozy setting.",
  telephone: "+91-7628-827-848",
  priceRange: "₹200–₹400",
  servesCuisine: ["Cafe", "Coffee", "Toast", "Tea", "Beverages", "Snacks"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Shop Number 4, Shahpur Jat, Siri Fort",
    addressLocality: "New Delhi",
    addressRegion: "Delhi",
    postalCode: "110049",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 28.5474734,
    longitude: 77.2164567,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "10:00",
      closes: "20:00",
    },
  ],
  sameAs: ["https://www.instagram.com/uscocafe/"],
  menu: "https://www.uscocollective.com/menu",
};

export default function HomePage() {
  return (
    <SiteShell currentPath="/">
      <h1 className="sr-only">USCO Cafe in Shahpur Jat, New Delhi</h1>
      <p className="sr-only">
        Visit USCO Cafe in Shahpur Jat, New Delhi for coffee, toast, quiet cafe moments, warm natural light, and a
        cozy work-friendly space. Explore our menu, gallery, location, and opening hours.
      </p>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <HomeLoadingGate>
        <ResponsiveHome />
      </HomeLoadingGate>
    </SiteShell>
  );
}
