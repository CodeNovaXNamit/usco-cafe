import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/certificates/", "/cert/"],
    },
    sitemap: "https://www.uscocollective.com/sitemap.xml",
    host: "https://www.uscocollective.com",
  };
}

