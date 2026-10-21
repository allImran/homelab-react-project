import type { NextConfig } from "next";
import { DEFAULT_FEED_SOURCE_ID } from "./src/config/feeds";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  serverExternalPackages: ["better-sqlite3"],
  async redirects() {
    return [{ source: "/feeds", destination: `/feeds/${DEFAULT_FEED_SOURCE_ID}`, permanent: false }];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
