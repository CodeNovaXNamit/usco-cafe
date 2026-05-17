import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import {
  Cormorant_Garamond,
  Cormorant_SC,
  DM_Serif_Text,
  Syne,
} from "next/font/google";
import "./globals.css";

const googleTagId = "G-KCLRMC4ZYD";

const displayFont = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const bodyFont = DM_Serif_Text({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400"],
});

const uiFont = Syne({
  variable: "--font-ui",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const accentFont = Cormorant_SC({
  variable: "--font-accent",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.uscocollective.com"),
  title: {
    default: "USCO - Coffee + Toast + Work | USCO Cafe in Shahpur Jat, New Delhi",
    template: "%s | USCO Cafe",
  },
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
    locale: "en_US",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${displayFont.variable} ${bodyFont.variable} ${uiFont.variable} ${accentFont.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${googleTagId}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${googleTagId}');
          `}
        </Script>
      </body>
    </html>
  );
}
