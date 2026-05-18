import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingExcludes: {
    "/*": [
      "./public/menu-items/**/*",
      "./public/gallery/**/*",
      "./public/media/**/*",
      "./animation/**/*",
    ],
  },
};

export default nextConfig;
