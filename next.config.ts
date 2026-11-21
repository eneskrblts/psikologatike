import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // İlk çalıştırmada Blobs'a aktarılacak seed verisi serverless pakete dahil edilsin.
  outputFileTracingIncludes: {
    "/**/*": ["./data/**/*"],
  },
  turbopack: {
    root: process.cwd(),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
