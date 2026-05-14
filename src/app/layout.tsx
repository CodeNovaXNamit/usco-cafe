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
  metadataBase: new URL("https://uscocafe.com"),
  title: "USCO - Coffee + Quiet",
  description:
    "A small cafe that asks very little of you. Come in, sit down, let the coffee do the rest. At No. 4.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "USCO - Coffee + Quiet",
    description:
      "A small cafe that asks very little of you. Come in, sit down, let the coffee do the rest. At No. 4.",
    url: "https://uscocafe.com",
    siteName: "USCO",
    locale: "en_US",
    type: "website",
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
      className={`${displayFont.variable} ${bodyFont.variable} ${uiFont.variable} ${accentFont.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
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
    </html>
  );
}
