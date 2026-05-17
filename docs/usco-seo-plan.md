# USCO Cafe SEO Engineering Plan for Node.js / Vercel Website

**Website:** https://www.uscocollective.com/  
**Project:** USCO Cafe / USCO CAFE search visibility, branded ranking, local SEO, and technical SEO improvement  
**Platform:** Node.js website deployed on Vercel  
**Primary business listing observed:** USCO CAFE, Shop Number 4, Shahpur Jat, Siri Fort, New Delhi, Delhi 110049, India  
**Current visible brand identity:** Coffee + Quiet / Coffee + Toast + Work  
**Current Google Business Profile signals observed from screenshot:** 4.7 rating, 147 Google reviews, ₹200–400, Cafe, Open, 10am–8pm  
**Prepared as:** Professional implementation document for developer, SEO engineer, and project presentation

---

## 1. Executive Summary

The USCO Cafe website is already indexed by Google and appears for the branded search query `usco cafe`, but the current organic search result is not strong enough yet. In the screenshot, Google is showing the official website result below Instagram, Zomato, goSTOPS, District by Zomato, Goto Where, and other directory-style pages. The official result currently appears as:

```text
USCO - Coffee + Quiet
16 hours ago — USCOCoffee + QuietA slower cup in Shahpur Jat HomeMenuGalleryFind Us. Open Today / 10am-8pm. USCO cafe interior with warm natural light.
```

This tells us something very important: Google can crawl the website, but it is pulling a messy snippet from visible text on the page. The phrase `USCOCoffee + QuietA slower cup... HomeMenuGalleryFind Us` suggests that the page content, navigation, heading structure, or metadata is not being presented to Google in a clean, semantic way.

The goal is not just to “change the Google description.” The bigger goal is to make Google clearly understand that:

- `uscocollective.com` is the official website of USCO CAFE.
- USCO CAFE is a real cafe located at Shop Number 4, Shahpur Jat, Siri Fort, New Delhi.
- The cafe is known for coffee, toast, quiet ambience, work-friendly visits, and a calm Shahpur Jat experience.
- The website has proper page metadata, structured data, sitemap, robots.txt, canonical domain, and crawlable internal pages.
- Google Business Profile, Instagram, website, local directory listings, and social profiles all point to the same business entity.

The fastest improvement will come from fixing metadata, structured content, schema, sitemap, canonical URL, and Google Business Profile alignment. The long-term ranking improvement will come from entity consistency, local citations, review growth, high-quality photos, page speed, and strong official-brand signals.

---

## 2. Current Situation From Google Screenshot

### 2.1 What is already good

The project already has several strong SEO advantages:

1. **Google Business Profile is visible and strong.**  
   The knowledge panel appears at the top for `usco cafe`, which means Google already recognizes the business entity.

2. **The cafe has good review strength.**  
   The screenshot shows a 4.7 rating and 147 Google reviews. This is valuable for local trust and branded searches.

3. **The official website is already indexed.**  
   The `uscocollective.com` result is visible in Google, so the website is not blocked from indexing.

4. **The brand has third-party mentions.**  
   Instagram, Zomato, goSTOPS, Goto Where, and local cafe guide results are already appearing. This gives Google more external confidence that USCO is a real local entity.

5. **The website has a clear aesthetic identity.**  
   “Coffee + Quiet” and “Coffee + Toast + Work” are strong brand phrases. These should be preserved, but supported with clearer SEO copy.

### 2.2 What needs improvement

The main SEO weaknesses visible from the screenshot are:

1. **Official website result is not ranking high enough organically.**  
   For a branded query like `usco cafe`, the official website should ideally appear near the top, usually just below or around the Google Business Profile/Instagram result.

2. **Snippet is messy.**  
   Google is showing navigation and compressed text together:
   
   ```text
   USCOCoffee + QuietA slower cup in Shahpur Jat HomeMenuGalleryFind Us...
   ```

   This suggests that the homepage content needs better semantic structure, spacing, metadata, and a clean introductory paragraph.

3. **Title does not clearly say “Cafe” or “Shahpur Jat.”**  
   Current title:

   ```text
   USCO - Coffee + Quiet
   ```

   This is beautiful for branding, but weak for local SEO. It should include “Cafe” and “Shahpur Jat” while preserving the brand tone.

4. **The website may not have enough crawlable text.**  
   If the homepage is mostly animation, visuals, or short slogans, Google may depend on navigation text and random visible sections to generate snippets.

5. **Directory sites are competing with the official website.**  
   Zomato, goSTOPS, Goto Where, and Shahpur Jat cafe guide pages have strong textual descriptions. The official website needs stronger, clearer, official information.

6. **There may be a brand naming inconsistency.**  
   Google Business Profile shows `USCO CAFE`, while the website title shows `USCO - Coffee + Quiet`. Both are fine creatively, but SEO needs a consistent official entity name.

---

## 3. Main SEO Objective

The main objective is:

```text
When someone searches “USCO Cafe”, “USCO CAFE Shahpur Jat”, “USCO Coffee Shahpur Jat”, “USCO Cafe menu”, or “USCO Cafe location”, Google should clearly understand that https://www.uscocollective.com/ is the official website and should show it with a clean title, useful description, and sitelinks.
```

### 3.1 Primary branded keywords

Use these as the main tracking keywords:

```text
USCO Cafe
USCO CAFE
USCO Cafe Shahpur Jat
USCO Coffee Shahpur Jat
USCO Cafe New Delhi
USCO Cafe Siri Fort
USCO Cafe menu
USCO Cafe location
USCO Cafe reviews
USCO Coffee + Quiet
USCO Coffee Toast Work
```

### 3.2 Secondary local keywords

These are useful for long-term local visibility:

```text
cafe in Shahpur Jat
coffee in Shahpur Jat
quiet cafe in Shahpur Jat
work cafe in Shahpur Jat
coffee shop near Siri Fort
cafe near Siri Fort
best coffee in Shahpur Jat
toast and coffee cafe in Delhi
quiet cafe in New Delhi
aesthetic cafe in Shahpur Jat
```

Do not force all of these into every page. Use them naturally where relevant.

---

## 4. Recommended Brand Positioning for SEO

The brand should not lose its creative identity. The goal is to combine brand emotion with search clarity.

### Current brand feel

```text
USCO
Coffee + Quiet
Coffee + Toast + Work
A slower cup in Shahpur Jat
No WiFi password. No rush. No. 4.
```

This is good branding. The problem is that search engines also need direct business context.

### Recommended SEO-friendly brand line

Use this as the main search-facing positioning:

```text
USCO Cafe is a quiet coffee and toast cafe in Shahpur Jat, New Delhi.
```

Use this as the emotional brand line:

```text
Coffee + Toast + Work. A slower cup in Shahpur Jat.
```

### Recommended homepage H1

```html
<h1>USCO Cafe in Shahpur Jat, New Delhi</h1>
```

### Recommended hero subheading

```text
Coffee + Toast + Work. A slower cup in Shahpur Jat.
```

### Recommended short homepage intro

```text
USCO Cafe is a quiet coffee and toast cafe at Shop Number 4, Shahpur Jat, Siri Fort, New Delhi. Built for slower cups, calm corners, good coffee, simple toast, and easy work moments, USCO gives you a peaceful pause inside one of Delhi’s most creative neighbourhoods.
```

This paragraph should be visible on the page, not hidden only inside metadata.

---

## 5. Best Homepage SEO Title and Meta Description

### 5.1 Recommended homepage title

Use this:

```text
USCO Cafe Shahpur Jat | Coffee, Toast & Quiet Work Cafe
```

Why this works:

- Includes official brand: `USCO Cafe`
- Includes location: `Shahpur Jat`
- Includes product/service: `Coffee, Toast`
- Includes differentiator: `Quiet Work Cafe`
- Still matches the brand feeling

### 5.2 Alternative homepage title options

Option 2:

```text
USCO Cafe | Coffee + Toast + Work in Shahpur Jat
```

Option 3:

```text
USCO CAFE New Delhi | Coffee, Toast & Quiet Corners
```

Option 4:

```text
USCO Cafe Shahpur Jat | A Slower Cup in New Delhi
```

### 5.3 Recommended homepage meta description

Use this:

```text
Visit USCO Cafe in Shahpur Jat, New Delhi for coffee, toast, calm corners and quiet work moments. View our menu, gallery, hours and directions.
```

This is clean, human, and search-friendly.

### 5.4 Alternative meta description

```text
USCO Cafe is a quiet coffee and toast cafe at Shop Number 4, Shahpur Jat, Siri Fort, New Delhi. Explore our menu, photos, hours and location.
```

### 5.5 Why this should fix the weak snippet

Google may not always show the exact meta description, but this gives Google a much better option. More importantly, the same message must appear in visible homepage content. If metadata and visible content match, the chance of a cleaner snippet becomes much higher.

---

## 6. Page-by-Page SEO Metadata Plan

Use different metadata for every important page. Do not use the same title and description everywhere.

### 6.1 Homepage

**URL:**

```text
https://www.uscocollective.com/
```

**Title:**

```text
USCO Cafe Shahpur Jat | Coffee, Toast & Quiet Work Cafe
```

**Description:**

```text
Visit USCO Cafe in Shahpur Jat, New Delhi for coffee, toast, calm corners and quiet work moments. View our menu, gallery, hours and directions.
```

**H1:**

```text
USCO Cafe in Shahpur Jat, New Delhi
```

---

### 6.2 Menu page

**URL:**

```text
https://www.uscocollective.com/menu
```

**Title:**

```text
USCO Cafe Menu | Coffee, Toast & Drinks in Shahpur Jat
```

**Description:**

```text
Explore the USCO Cafe menu with coffee, toast, drinks and simple cafe bites in Shahpur Jat, New Delhi. See what is brewing today.
```

**H1:**

```text
USCO Cafe Menu
```

**Important content requirement:**

The menu must not be only images. Add actual text for menu categories and items. Google cannot fully understand a menu if it is only a picture.

Suggested menu categories:

```text
Coffee
Cold Coffee
Vietnamese Coffee
Tea
Toast
Nibbles
Cakes
Cold Drinks
```

Only use categories that actually exist.

---

### 6.3 Gallery page

**URL:**

```text
https://www.uscocollective.com/gallery
```

**Title:**

```text
USCO Cafe Gallery | Coffee, Toast & Quiet Corners
```

**Description:**

```text
View photos of USCO Cafe in Shahpur Jat, including coffee, toast, interiors, quiet corners and cafe moments from our New Delhi space.
```

**H1:**

```text
USCO Cafe Gallery
```

**Important content requirement:**

Every image should have meaningful alt text.

Example:

```html
<img src="/images/usco-cafe-interior-shahpur-jat.webp" alt="USCO Cafe interior with warm natural light in Shahpur Jat">
```

---

### 6.4 Find Us page

**URL:**

```text
https://www.uscocollective.com/find-us
```

**Title:**

```text
Find USCO Cafe | Location, Hours & Directions
```

**Description:**

```text
Find USCO Cafe at Shop Number 4, Shahpur Jat, Siri Fort, New Delhi. Check opening hours, Google Maps directions and contact details.
```

**H1:**

```text
Find USCO Cafe in Shahpur Jat
```

**Must include:**

```text
USCO CAFE
Shop Number 4, Shahpur Jat, Siri Fort, New Delhi, Delhi 110049, India
Open daily: 10am–8pm
Phone: +91 84482 25163
Instagram: @uscocafe
```

Verify the phone number before publishing.

---

### 6.5 Optional About page

This is not compulsory, but it can help the official website outrank directory sites because it gives Google a stronger first-party brand story.

**URL:**

```text
https://www.uscocollective.com/about
```

**Title:**

```text
About USCO Cafe | Coffee + Quiet in Shahpur Jat
```

**Description:**

```text
Learn about USCO Cafe, a quiet coffee and toast cafe in Shahpur Jat, New Delhi, built around slower cups, calm corners and simple food.
```

**H1:**

```text
About USCO Cafe
```

---

## 7. Next.js / Node.js Metadata Implementation

Because the website is built with Node.js and deployed on Vercel, the implementation depends on the framework. If it is Next.js App Router, use the Metadata API. If it is React/Vite or custom Node, add the same tags manually in the HTML head.

---

## 8. Next.js App Router Implementation

If your project uses the `app/` directory, use this structure:

```text
app/
  layout.tsx
  page.tsx
  menu/page.tsx
  gallery/page.tsx
  find-us/page.tsx
  sitemap.ts
  robots.ts
public/
  og-usco-cafe.jpg
  favicon.ico
```

### 8.1 Root metadata in `app/layout.tsx`

```tsx
import type { Metadata } from "next";

const siteUrl = "https://www.uscocollective.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "USCO Cafe Shahpur Jat | Coffee, Toast & Quiet Work Cafe",
    template: "%s | USCO Cafe",
  },
  description:
    "Visit USCO Cafe in Shahpur Jat, New Delhi for coffee, toast, calm corners and quiet work moments. View our menu, gallery, hours and directions.",
  applicationName: "USCO Cafe",
  authors: [{ name: "USCO Cafe" }],
  creator: "USCO Cafe",
  publisher: "USCO Cafe",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "USCO Cafe",
    title: "USCO Cafe Shahpur Jat | Coffee, Toast & Quiet Work Cafe",
    description:
      "Coffee + Toast + Work. A slower cup in Shahpur Jat, New Delhi.",
    images: [
      {
        url: "/og-usco-cafe.jpg",
        width: 1200,
        height: 630,
        alt: "USCO Cafe in Shahpur Jat, New Delhi",
      },
    ],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "USCO Cafe Shahpur Jat | Coffee, Toast & Quiet Work Cafe",
    description:
      "Visit USCO Cafe in Shahpur Jat for coffee, toast, calm corners and quiet work moments.",
    images: ["/og-usco-cafe.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN">
      <body>{children}</body>
    </html>
  );
}
```

---

## 9. Page-Specific Metadata Examples

### 9.1 Menu page metadata

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "USCO Cafe Menu | Coffee, Toast & Drinks in Shahpur Jat",
  description:
    "Explore the USCO Cafe menu with coffee, toast, drinks and simple cafe bites in Shahpur Jat, New Delhi. See what is brewing today.",
  alternates: {
    canonical: "https://www.uscocollective.com/menu",
  },
  openGraph: {
    title: "USCO Cafe Menu",
    description:
      "Coffee, toast, drinks and cafe bites from USCO Cafe in Shahpur Jat.",
    url: "https://www.uscocollective.com/menu",
    images: ["/og-usco-cafe.jpg"],
  },
};

export default function MenuPage() {
  return (
    <main>
      <h1>USCO Cafe Menu</h1>
      <p>
        Explore the USCO Cafe menu with coffee, toast, drinks and simple cafe
        bites in Shahpur Jat, New Delhi.
      </p>
    </main>
  );
}
```

### 9.2 Gallery page metadata

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "USCO Cafe Gallery | Coffee, Toast & Quiet Corners",
  description:
    "View photos of USCO Cafe in Shahpur Jat, including coffee, toast, interiors, quiet corners and cafe moments from our New Delhi space.",
  alternates: {
    canonical: "https://www.uscocollective.com/gallery",
  },
};

export default function GalleryPage() {
  return (
    <main>
      <h1>USCO Cafe Gallery</h1>
      <p>
        A look inside USCO Cafe — coffee, toast, warm corners and quiet cafe
        moments in Shahpur Jat.
      </p>
    </main>
  );
}
```

### 9.3 Find Us page metadata

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find USCO Cafe | Location, Hours & Directions",
  description:
    "Find USCO Cafe at Shop Number 4, Shahpur Jat, Siri Fort, New Delhi. Check opening hours, Google Maps directions and contact details.",
  alternates: {
    canonical: "https://www.uscocollective.com/find-us",
  },
};

export default function FindUsPage() {
  return (
    <main>
      <h1>Find USCO Cafe in Shahpur Jat</h1>
      <p>
        USCO Cafe is located at Shop Number 4, Shahpur Jat, Siri Fort, New Delhi,
        Delhi 110049, India. We are open daily from 10am to 8pm.
      </p>
    </main>
  );
}
```

---

## 10. If the Project Uses React/Vite Instead of Next.js

If this is not Next.js and the site is React/Vite, add basic metadata in `index.html`.

```html
<title>USCO Cafe Shahpur Jat | Coffee, Toast & Quiet Work Cafe</title>
<meta
  name="description"
  content="Visit USCO Cafe in Shahpur Jat, New Delhi for coffee, toast, calm corners and quiet work moments. View our menu, gallery, hours and directions."
/>
<link rel="canonical" href="https://www.uscocollective.com/" />

<meta property="og:type" content="website" />
<meta property="og:site_name" content="USCO Cafe" />
<meta property="og:title" content="USCO Cafe Shahpur Jat | Coffee, Toast & Quiet Work Cafe" />
<meta
  property="og:description"
  content="Coffee + Toast + Work. A slower cup in Shahpur Jat, New Delhi."
/>
<meta property="og:url" content="https://www.uscocollective.com/" />
<meta property="og:image" content="https://www.uscocollective.com/og-usco-cafe.jpg" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="USCO Cafe Shahpur Jat | Coffee, Toast & Quiet Work Cafe" />
<meta
  name="twitter:description"
  content="Visit USCO Cafe in Shahpur Jat for coffee, toast, calm corners and quiet work moments."
/>
<meta name="twitter:image" content="https://www.uscocollective.com/og-usco-cafe.jpg" />
```

For React/Vite, remember that page-specific metadata can be harder if the app is fully client-rendered. For SEO, Next.js or another SSR/static-rendering setup is much better.

---

## 11. Structured Data / Schema Implementation

Add JSON-LD schema to the homepage. Use `CafeOrCoffeeShop` if supported. This helps Google understand the business entity.

### 11.1 Important schema warnings

Do not add fake ratings or fake review schema. Since the Google reviews are on Google Business Profile, do not manually add `aggregateRating` unless the same review data is legitimately displayed and collected on the website according to Google’s structured data rules.

Use schema for:

- business name
- address
- phone
- hours
- website URL
- menu URL
- Instagram
- image
- price range
- geo coordinates, once verified

### 11.2 JSON-LD for homepage

Replace latitude and longitude after verifying them from Google Maps.

```tsx
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",
  "@id": "https://www.uscocollective.com/#localbusiness",
  name: "USCO CAFE",
  alternateName: ["USCO Cafe", "USCO Coffee + Quiet"],
  url: "https://www.uscocollective.com/",
  image: "https://www.uscocollective.com/og-usco-cafe.jpg",
  description:
    "USCO Cafe is a quiet coffee and toast cafe at Shop Number 4, Shahpur Jat, Siri Fort, New Delhi, built for slower cups, calm corners and easy work moments.",
  telephone: "+918448225163",
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
    latitude: "VERIFY_LATITUDE",
    longitude: "VERIFY_LONGITUDE",
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
  sameAs: [
    "https://www.instagram.com/uscocafe/",
    "https://www.google.com/search?q=USCO+CAFE+Shahpur+Jat",
  ],
  hasMenu: "https://www.uscocollective.com/menu",
};
```

### 11.3 Insert schema in homepage

```tsx
export default function HomePage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />

      <h1>USCO Cafe in Shahpur Jat, New Delhi</h1>
      <p>
        USCO Cafe is a quiet coffee and toast cafe at Shop Number 4, Shahpur Jat,
        Siri Fort, New Delhi. Built for slower cups, calm corners, good coffee,
        simple toast, and easy work moments.
      </p>
    </main>
  );
}
```

### 11.4 Schema testing

After deployment, test:

```text
https://search.google.com/test/rich-results
https://validator.schema.org/
```

Fix all required errors.

---

## 12. Sitemap Implementation

A sitemap helps Google discover the important URLs.

### 12.1 Next.js App Router `app/sitemap.ts`

```tsx
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.uscocollective.com";

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/menu`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/find-us`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}
```

After deployment, it should open at:

```text
https://www.uscocollective.com/sitemap.xml
```

### 12.2 Submit sitemap in Search Console

Submit:

```text
https://www.uscocollective.com/sitemap.xml
```

Then inspect these pages manually:

```text
https://www.uscocollective.com/
https://www.uscocollective.com/menu
https://www.uscocollective.com/gallery
https://www.uscocollective.com/find-us
```

---

## 13. Robots.txt Implementation

### 13.1 Next.js App Router `app/robots.ts`

```tsx
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://www.uscocollective.com/sitemap.xml",
    host: "https://www.uscocollective.com",
  };
}
```

It should open at:

```text
https://www.uscocollective.com/robots.txt
```

### 13.2 Do not block the full website

Never deploy:

```txt
Disallow: /
```

That would block crawling.

---

## 14. Canonical Domain and Vercel Domain Control

This is very important because Vercel projects often have multiple accessible URLs.

### 14.1 Choose one canonical domain

Recommended canonical:

```text
https://www.uscocollective.com/
```

Then make sure these do not compete:

```text
https://uscocollective.com/
https://www.uscocollective.com/
https://your-project.vercel.app/
https://preview-branch.vercel.app/
```

### 14.2 Required setup

In Vercel:

1. Go to Project Settings.
2. Open Domains.
3. Make `www.uscocollective.com` the primary domain if that is the chosen version.
4. Redirect the non-primary version to the primary version.
5. Do not let the Vercel preview/domain version get indexed as a duplicate official site.

### 14.3 Add canonical tags

Every page should include canonical tags:

```html
<link rel="canonical" href="https://www.uscocollective.com/" />
```

For each page:

```text
Homepage: https://www.uscocollective.com/
Menu: https://www.uscocollective.com/menu
Gallery: https://www.uscocollective.com/gallery
Find Us: https://www.uscocollective.com/find-us
```

---

## 15. Fix the Messy Google Snippet Problem

The current snippet is messy because Google is pulling text like this:

```text
USCOCoffee + QuietA slower cup in Shahpur Jat HomeMenuGalleryFind Us...
```

This needs a direct fix in page structure.

### 15.1 Add clean semantic spacing

Make sure visible text is separated in proper HTML elements:

Bad:

```html
<div>USCO</div><div>Coffee + Quiet</div><div>A slower cup in Shahpur Jat</div><nav>HomeMenuGalleryFind Us</nav>
```

Better:

```html
<header>
  <nav aria-label="Main navigation">
    <a href="/">Home</a>
    <a href="/menu">Menu</a>
    <a href="/gallery">Gallery</a>
    <a href="/find-us">Find Us</a>
  </nav>
</header>

<main>
  <section aria-labelledby="home-heading">
    <p className="eyebrow">Coffee + Toast + Work</p>
    <h1 id="home-heading">USCO Cafe in Shahpur Jat, New Delhi</h1>
    <p>
      A slower cup in Shahpur Jat. USCO Cafe is a quiet coffee and toast cafe
      at Shop Number 4, Siri Fort, built for calm corners, focused work and
      simple cafe moments.
    </p>
  </section>
</main>
```

### 15.2 Make navigation text readable

Each nav link must be a separate anchor:

```html
<nav aria-label="Main navigation">
  <a href="/">Home</a>
  <a href="/menu">Menu</a>
  <a href="/gallery">Gallery</a>
  <a href="/find-us">Find Us</a>
</nav>
```

Avoid rendering nav as one compressed string.

### 15.3 Add a high-quality intro paragraph near the top

Use this:

```text
USCO Cafe is a quiet coffee and toast cafe at Shop Number 4, Shahpur Jat, Siri Fort, New Delhi. Built for slower cups, calm corners, good coffee, simple toast, and easy work moments, USCO gives you a peaceful pause inside one of Delhi’s most creative neighbourhoods.
```

This paragraph should be crawlable HTML text.

---

## 16. Google Business Profile Optimization

The Google Business Profile is already strong and visible. Now it should be aligned with the website.

### 16.1 Business name consistency

Choose one official name:

```text
USCO CAFE
```

or

```text
USCO Cafe
```

Since Google currently displays `USCO CAFE`, keep that format in schema and footer. Use `USCO Cafe` in natural website writing.

### 16.2 Website link

The Google Business Profile website button must point to:

```text
https://www.uscocollective.com/
```

not the Vercel preview URL.

### 16.3 Menu link

Add menu link in Google Business Profile:

```text
https://www.uscocollective.com/menu
```

### 16.4 Business description for GBP

Use:

```text
USCO CAFE is a quiet coffee and toast cafe in Shahpur Jat, New Delhi. Located at Shop Number 4 near Siri Fort, USCO is built for slower cups, calm corners, simple toast, good coffee and easy work moments. Visit us daily from 10am to 8pm.
```

### 16.5 Categories

Recommended:

```text
Primary category: Cafe
Secondary category: Coffee shop
Optional: Restaurant, if accurate
```

Do not add irrelevant categories.

### 16.6 Google Business Profile photo plan

Upload these regularly:

```text
usco-cafe-exterior-shop-number-4.webp
usco-cafe-interior-shahpur-jat.webp
usco-cafe-coffee-counter.webp
usco-cafe-toast-menu.webp
usco-cafe-quiet-corner.webp
usco-cafe-upstairs-seating.webp
usco-cafe-shahpur-jat-map-area.webp
```

### 16.7 Review response strategy

Reply to every review in a natural way. Use real details when possible.

Example positive reply:

```text
Thank you for visiting USCO CAFE. We are glad you enjoyed the coffee and the quiet atmosphere. Hope to welcome you again soon for another slower cup in Shahpur Jat.
```

Example negative reply:

```text
Thank you for sharing your experience. We are sorry your visit did not feel as expected. We will review this with our team and work to make your next visit smoother.
```

Do not use identical copy-paste replies for every review.

---

## 17. Review Button and Direct Google Review Link

Add a review section on the website.

### 17.1 Suggested section copy

```text
Loved your visit?

Your words help more people discover our quiet corner in Shahpur Jat. If USCO’s coffee, toast, calm space or service made your day better, you can share your experience on Google.
```

Button text:

```text
Write a Google Review
```

### 17.2 Implementation idea

Use a direct Google review link from Google Business Profile.

The button should open the review page directly, especially on mobile.

Example:

```html
<a
  href="YOUR_DIRECT_GOOGLE_REVIEW_LINK"
  target="_blank"
  rel="noopener noreferrer"
>
  Write a Google Review
</a>
```

Replace `YOUR_DIRECT_GOOGLE_REVIEW_LINK` with the real review URL from Google Business Profile.

---

## 18. Image SEO Plan

Images are important because the website is visual and cafe-related.

### 18.1 File naming

Avoid names like:

```text
IMG_1234.jpg
WhatsApp Image 2026-05-17.jpg
photo-final-new.webp
```

Use names like:

```text
usco-cafe-exterior-shahpur-jat.webp
usco-cafe-interior-warm-natural-light.webp
usco-cafe-coffee-toast-menu.webp
usco-cafe-quiet-work-corner.webp
usco-cafe-gallery-new-delhi.webp
```

### 18.2 Alt text examples

```text
USCO Cafe exterior at Shop Number 4 in Shahpur Jat
```

```text
USCO Cafe interior with warm natural light
```

```text
Coffee and toast served at USCO Cafe in New Delhi
```

```text
Quiet upstairs seating area inside USCO Cafe
```

### 18.3 Avoid alt text spam

Do not use:

```text
best cafe in delhi best cafe near me coffee shop shahpur jat top cafe
```

Write natural descriptions.

---

## 19. Performance SEO Plan for the Animated Website

The website has a strong visual experience, but performance must not suffer. Cafe users are mostly on mobile, so mobile loading is critical.

### 19.1 Current performance risk

If the website uses frame sequences, videos, heavy images, or scroll animations, these can harm:

- Largest Contentful Paint
- Interaction to Next Paint
- Cumulative Layout Shift
- mobile data usage
- user experience
- Google ranking quality signals

### 19.2 Desktop frame animation rule

If the desktop version uses 120 WebP animation frames:

- Do not load the frames on mobile.
- Do not preload all 120 frames before the first screen appears.
- Lazy-load frames after the first meaningful content is visible.
- Use `requestIdleCallback` or delayed loading after initial render.
- Keep first 3–5 frames lightweight if needed.
- Use responsive detection before loading desktop animation.
- Use proper width/height containers to avoid layout shift.

### 19.3 Mobile video rule

If the mobile version uses a video:

- Use compressed MP4/WebM.
- Add a poster image.
- Do not autoplay large video before critical content.
- Use `preload="metadata"` or `preload="none"` depending on design.
- Keep the video file size low.
- Serve mobile video only to mobile users.

Example:

```html
<video
  playsinline
  muted
  loop
  preload="metadata"
  poster="/images/usco-mobile-hero-poster.webp"
>
  <source src="/videos/usco-mobile-hero.webm" type="video/webm" />
  <source src="/videos/usco-mobile-hero.mp4" type="video/mp4" />
</video>
```

### 19.4 LCP strategy

The first visible hero section should not wait for full animation.

Recommended:

1. Load static hero frame/poster first.
2. Show H1 and intro text immediately.
3. Load animation after page is interactive.
4. Use `next/image` for important images if using Next.js.
5. Add dimensions to images to prevent layout shift.

---

## 20. Internal Linking Plan

Use internal links to signal the most important pages.

### 20.1 Header links

```text
Home
Menu
Gallery
Find Us
```

### 20.2 Footer links

```text
Home
Menu
Gallery
Find Us
Instagram
Google Maps
Write a Review
```

### 20.3 Homepage buttons

Use clear anchor text:

```text
View the USCO Menu
See the Gallery
Find USCO Cafe on Google Maps
Write a Google Review
```

Avoid generic text like:

```text
Click here
Read more
Explore
```

Generic text is less useful for SEO.

---

## 21. Content Blocks to Add on the Homepage

The homepage should remain beautiful, but add real searchable text.

### 21.1 Recommended homepage content structure

```text
H1: USCO Cafe in Shahpur Jat, New Delhi

Intro paragraph:
USCO Cafe is a quiet coffee and toast cafe at Shop Number 4, Shahpur Jat, Siri Fort, New Delhi. Built for slower cups, calm corners, good coffee, simple toast, and easy work moments, USCO gives you a peaceful pause inside one of Delhi’s most creative neighbourhoods.

H2: Coffee + Toast + Work
Short paragraph about the experience.

H2: A Slower Cup in Shahpur Jat
Short paragraph about calm ambience and location.

H2: What We Serve
Coffee, toast, tea, drinks, nibbles. Link to menu.

H2: Find Us
Address, hours, map/directions.

H2: Frequently Asked Questions
Small FAQ section.
```

### 21.2 FAQ section

Add these FAQs near the bottom.

```text
Q: Where is USCO Cafe located?
A: USCO Cafe is located at Shop Number 4, Shahpur Jat, Siri Fort, New Delhi, Delhi 110049, India.

Q: What are USCO Cafe opening hours?
A: USCO Cafe is open daily from 10am to 8pm.

Q: What is USCO Cafe known for?
A: USCO Cafe is known for coffee, toast, quiet corners, calm ambience and relaxed work-friendly cafe moments in Shahpur Jat.

Q: Does USCO Cafe have a menu online?
A: Yes, you can view the USCO Cafe menu on the official website at /menu.

Q: How can I reach USCO Cafe?
A: Use the Find Us page or Google Maps directions to reach USCO Cafe at Shop Number 4, Shahpur Jat, Siri Fort.
```

FAQ schema can be added only if the questions and answers are visible on the page.

---

## 22. Google Search Console Plan

Google Search Console is already verified according to the project information. Now use it systematically.

### 22.1 Immediate Search Console actions

1. Submit sitemap:
   ```text
   https://www.uscocollective.com/sitemap.xml
   ```

2. Inspect homepage:
   ```text
   https://www.uscocollective.com/
   ```

3. Request indexing after deploying metadata and schema.

4. Inspect important pages:
   ```text
   /menu
   /gallery
   /find-us
   ```

5. Check if Google sees:
   - correct title
   - correct canonical URL
   - page is indexable
   - page is mobile usable

### 22.2 Queries to monitor weekly

```text
usco cafe
usco cafe shahpur jat
usco coffee
usco new delhi
usco menu
usco cafe menu
usco location
coffee + quiet
coffee and toast shahpur jat
quiet cafe shahpur jat
```

### 22.3 Watch these reports

- Performance
- Pages
- Sitemaps
- Core Web Vitals
- HTTPS
- Enhancements / structured data
- Manual actions
- Security issues

---

## 23. How to Push Official Website Above Directory Results

The official site is currently below several third-party pages. To improve this, use a brand-entity strategy.

### 23.1 Add “official website” signals

Use this text naturally in the footer or contact page:

```text
This is the official website of USCO CAFE, Shahpur Jat, New Delhi.
```

Do not overdo it. One mention is enough.

### 23.2 Update external profiles

Make sure these link to the official website:

```text
Google Business Profile
Instagram @uscocafe
Zomato listing
District by Zomato listing
Apple Maps
Bing Places
Justdial, if used
Local event pages
Any cafe directory page that allows website links
```

### 23.3 Consistent NAP everywhere

NAP means:

```text
Name
Address
Phone
```

Use the same format:

```text
USCO CAFE
Shop Number 4, Shahpur Jat, Siri Fort, New Delhi, Delhi 110049, India
+91 84482 25163
https://www.uscocollective.com/
```

If any listing says “Panchsheel Park” in a confusing way, update it where possible to mention Shahpur Jat / Siri Fort clearly. Google search currently shows some Zomato-style location wording that may confuse users.

### 23.4 Get local citations

Create or improve listings on:

```text
Google Business Profile
Bing Places
Apple Business Connect
Zomato
Justdial
Tripadvisor, if suitable
Instagram
Facebook
Local Delhi cafe blogs
Local Shahpur Jat guides
Event pages
University/student community pages, if relevant
```

---

## 24. Social Preview / WhatsApp Preview Fix

The website should look good when shared on WhatsApp, Instagram DMs, LinkedIn, or Facebook.

### 24.1 Open Graph image

Create:

```text
public/og-usco-cafe.jpg
```

Recommended size:

```text
1200 x 630 px
```

Image idea:

- exterior or interior of USCO
- warm natural light
- logo visible if possible
- no too-small text
- calm coffee/space mood

### 24.2 Required tags

Add:

```html
<meta property="og:title" content="USCO Cafe Shahpur Jat | Coffee, Toast & Quiet Work Cafe" />
<meta property="og:description" content="Coffee + Toast + Work. A slower cup in Shahpur Jat, New Delhi." />
<meta property="og:image" content="https://www.uscocollective.com/og-usco-cafe.jpg" />
<meta property="og:url" content="https://www.uscocollective.com/" />
<meta property="og:type" content="website" />
```

---

## 25. Local Content Growth Plan

USCO does not need a heavy blog like a news site. But a few evergreen local pages can help the official site become stronger.

### 25.1 Suggested content pages

Create these slowly:

1. **USCO Cafe Menu Guide**
2. **How to Find USCO Cafe in Shahpur Jat**
3. **Coffee + Quiet: The Idea Behind USCO**
4. **Best Time to Visit USCO Cafe**
5. **A Quiet Cafe Corner in Shahpur Jat**
6. **Coffee and Toast Pairings at USCO**
7. **USCO Gallery: Inside Our Shahpur Jat Space**

### 25.2 Best first content page

Create this first:

```text
/how-to-find-usco-cafe-shahpur-jat
```

Title:

```text
How to Find USCO Cafe in Shahpur Jat, New Delhi
```

This page can rank for location-based queries and help people actually reach the cafe.

---

## 26. Technical SEO QA Checklist

After deployment, check every item.

### 26.1 Metadata

- [ ] Homepage has correct `<title>`.
- [ ] Homepage has correct meta description.
- [ ] Every page has unique title.
- [ ] Every page has unique description.
- [ ] Open Graph tags exist.
- [ ] Twitter card tags exist.
- [ ] Canonical tags exist.
- [ ] No duplicate metadata.

### 26.2 Content

- [ ] Homepage has one H1.
- [ ] H1 includes USCO Cafe + Shahpur Jat.
- [ ] Hero section has crawlable text.
- [ ] Navigation links are separate and readable.
- [ ] NAP is visible.
- [ ] Opening hours are visible.
- [ ] Menu page has text items, not only images.
- [ ] Find Us page has full address and map.
- [ ] FAQ section is visible.

### 26.3 Technical

- [ ] Sitemap opens at `/sitemap.xml`.
- [ ] Robots opens at `/robots.txt`.
- [ ] Google can crawl the site.
- [ ] `www` and non-`www` are handled.
- [ ] Vercel preview URL is not competing.
- [ ] HTTPS works.
- [ ] No 404 errors in navigation.
- [ ] No broken images.
- [ ] Mobile layout works.
- [ ] Lighthouse/PageSpeed tested.

### 26.4 Schema

- [ ] CafeOrCoffeeShop schema added.
- [ ] Address correct.
- [ ] Phone correct.
- [ ] Hours correct.
- [ ] Menu URL correct.
- [ ] Instagram URL correct.
- [ ] Image URL correct.
- [ ] No fake rating schema.
- [ ] Tested in Rich Results Test.
- [ ] Tested in Schema.org validator.

### 26.5 Google

- [ ] Sitemap submitted in Search Console.
- [ ] Homepage requested for indexing.
- [ ] Menu page requested for indexing.
- [ ] Gallery page requested for indexing.
- [ ] Find Us page requested for indexing.
- [ ] Google Business Profile website URL updated.
- [ ] Google Business Profile menu URL updated.
- [ ] Google Business Profile description updated.
- [ ] Photos uploaded.
- [ ] Review link tested.

---

## 27. Vercel Deployment Checklist

### 27.1 Before deploy

- [ ] Build passes locally.
- [ ] Metadata visible in page source.
- [ ] JSON-LD visible in page source.
- [ ] No console errors.
- [ ] All internal links work.
- [ ] Images are optimized.
- [ ] `og-usco-cafe.jpg` exists in public folder.
- [ ] `sitemap.ts` works.
- [ ] `robots.ts` works.

### 27.2 After deploy

Check these URLs:

```text
https://www.uscocollective.com/
https://www.uscocollective.com/menu
https://www.uscocollective.com/gallery
https://www.uscocollective.com/find-us
https://www.uscocollective.com/sitemap.xml
https://www.uscocollective.com/robots.txt
```

Then test:

```text
view-source:https://www.uscocollective.com/
```

Confirm the title, description, canonical, OG tags, and JSON-LD are visible.

---

## 28. Codex Implementation Prompt

Use this prompt for Codex or another coding agent.

```text
You are working on a Node.js/Vercel cafe website for USCO Cafe at https://www.uscocollective.com. Implement a complete technical SEO upgrade without changing the visual design unnecessarily.

Business details:
- Official name: USCO CAFE / USCO Cafe
- Address: Shop Number 4, Shahpur Jat, Siri Fort, New Delhi, Delhi 110049, India
- Hours: Daily 10am–8pm
- Phone: +91 84482 25163 (verify before publishing)
- Instagram: https://www.instagram.com/uscocafe/
- Brand phrases: Coffee + Quiet, Coffee + Toast + Work, A slower cup in Shahpur Jat
- Main pages: Home, Menu, Gallery, Find Us
- Canonical domain: https://www.uscocollective.com/

Tasks:
1. Add proper page-specific metadata for Home, Menu, Gallery, and Find Us.
2. Add canonical URLs for all pages.
3. Add Open Graph and Twitter card tags.
4. Add a 1200x630 OG image reference at /og-usco-cafe.jpg.
5. Add LocalBusiness/CafeOrCoffeeShop JSON-LD schema on the homepage.
6. Add sitemap.xml generation.
7. Add robots.txt generation.
8. Ensure the homepage has exactly one crawlable H1: “USCO Cafe in Shahpur Jat, New Delhi”.
9. Add a crawlable intro paragraph near the top explaining the cafe clearly.
10. Fix navigation so Home, Menu, Gallery, and Find Us are separate crawlable anchor links.
11. Add visible NAP details in the footer or Find Us section.
12. Ensure desktop animation frames do not load on mobile.
13. Ensure mobile video/animation does not block LCP.
14. Add meaningful alt text to all important images.
15. Make sure the Vercel preview domain does not compete with the custom domain.
16. Do not add fake review/rating schema.
17. Do not keyword stuff. Keep copy premium, calm, human, and aligned with the USCO brand.
```

---

## 29. Suggested Final Website Copy

### 29.1 Homepage hero

```text
USCO Cafe in Shahpur Jat, New Delhi

Coffee + Toast + Work. A slower cup in Shahpur Jat.

USCO Cafe is a quiet coffee and toast cafe at Shop Number 4, Shahpur Jat, Siri Fort, New Delhi. Built for slower cups, calm corners, good coffee, simple toast, and easy work moments, USCO gives you a peaceful pause inside one of Delhi’s most creative neighbourhoods.
```

### 29.2 Menu section

```text
What We Serve

Simple things, done slowly — coffee, toast, drinks, tea and small cafe bites made for quiet breaks, work pauses and easy conversations.
```

Button:

```text
View the USCO Menu
```

### 29.3 Gallery section

```text
Inside USCO

Warm light, quiet corners and a compact cafe space made for slower visits. Explore moments from USCO Cafe in Shahpur Jat.
```

Button:

```text
View Gallery
```

### 29.4 Find Us section

```text
Find USCO Cafe

We are located at Shop Number 4, Shahpur Jat, Siri Fort, New Delhi. Come by for coffee, toast and a quiet corner between 10am and 8pm.
```

Button:

```text
Get Directions
```

### 29.5 Review section

```text
Loved your visit?

Your words help more people discover our quiet corner in Shahpur Jat. If USCO’s coffee, toast, calm space or service made your day better, share your experience on Google.
```

Button:

```text
Write a Google Review
```

---

## 30. Final Priority Roadmap

### Day 1: Critical search appearance fix

- [ ] Add homepage title and meta description.
- [ ] Add homepage H1.
- [ ] Add intro paragraph.
- [ ] Add LocalBusiness schema.
- [ ] Add sitemap.xml.
- [ ] Add robots.txt.
- [ ] Add canonical URLs.
- [ ] Submit sitemap in Search Console.
- [ ] Request homepage indexing.

### Week 1: Local SEO foundation

- [ ] Optimize Google Business Profile description.
- [ ] Add menu URL to GBP.
- [ ] Add direct review link to website.
- [ ] Improve menu page text.
- [ ] Improve find-us page.
- [ ] Add image alt text.
- [ ] Fix social preview image.
- [ ] Make sure Instagram links to the website.
- [ ] Update Zomato/other listings with website where possible.

### Month 1: Authority and ranking growth

- [ ] Build consistent citations.
- [ ] Add 2–3 local content pages.
- [ ] Upload fresh GBP photos weekly.
- [ ] Reply to reviews.
- [ ] Track Search Console branded queries.
- [ ] Improve PageSpeed/Core Web Vitals.
- [ ] Get local/event/community links.

---

## 31. Expected Result Timeline

### After 1–3 days

Google may recrawl some pages if indexing is requested. The website code will be technically ready, but search snippets may not change immediately.

### After 1–2 weeks

The snippet and title may start improving. Search Console will begin showing better query data.

### After 2–6 weeks

The official website has a better chance of moving above some directory pages for branded searches, especially if Google Business Profile, Instagram, and citations link correctly.

### After 2–3 months

The website can gain more stable branded visibility and may start appearing for local long-tail searches like “quiet cafe Shahpur Jat” or “coffee in Shahpur Jat,” depending on competition, citations, reviews, and content.

---

## 32. Important Disclaimer

SEO cannot honestly guarantee a permanent #1 ranking. Google rankings depend on search location, personalization, device, query intent, competition, business prominence, reviews, backlinks, and Google’s own systems.

However, for a branded cafe search, a properly optimized official website with strong local entity signals should have a very strong chance of improving visibility, snippet quality, and trust.

The goal is to make the official website the cleanest, most complete, and most trustworthy source about USCO CAFE.

---

## 33. Official Reference Links

Use these for implementation and validation:

```text
Google Search Central - Meta descriptions and snippets
https://developers.google.com/search/docs/appearance/snippet

Google Search Central - Title links
https://developers.google.com/search/docs/appearance/title-link

Google Search Central - Local Business structured data
https://developers.google.com/search/docs/appearance/structured-data/local-business

Google Search Central - Structured data intro
https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data

Google Business Profile - Improve local ranking
https://support.google.com/business/answer/7091

Google Search Central - Sitemaps
https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview

Google Search Central - Robots.txt
https://developers.google.com/search/docs/crawling-indexing/robots/intro

Google Search Central - Image SEO
https://developers.google.com/search/docs/appearance/google-images

Next.js Metadata and OG Images
https://nextjs.org/docs/app/getting-started/metadata-and-og-images

Next.js sitemap.xml file convention
https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap

Next.js robots.txt file convention
https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots

Vercel custom domains
https://vercel.com/docs/domains

Vercel domain redirects
https://vercel.com/docs/domains/working-with-domains/deploying-and-redirecting

Schema.org CafeOrCoffeeShop
https://schema.org/CafeOrCoffeeShop

Schema.org LocalBusiness
https://schema.org/LocalBusiness
```

---

## 34. Final Notes for the Team

USCO already has strong raw signals: Google reviews, Instagram presence, directory mentions, and a distinctive brand identity. The missing piece is not “more keywords.” The missing piece is clean technical SEO and stronger official-site clarity.

The official website should not feel like a generic SEO page. It should still feel like USCO: slow, calm, clean, quiet, minimal and warm. But underneath that design, the code must be precise:

- clear title
- clear meta description
- one H1
- crawlable intro
- valid schema
- sitemap
- robots
- canonical domain
- structured pages
- local NAP consistency
- fast mobile experience

Once these are implemented, the website will be much better prepared to compete with Instagram, Zomato, goSTOPS, Goto Where, and other pages for USCO’s own branded search results.
