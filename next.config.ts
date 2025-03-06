// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // If using Next.js >=13.4, you might need appDir enabled (optional)
  // experimental: {
  //   appDir: true,
  // },
};
module.exports = {
  images: {
    domains: ["yourdomain.com"],
  },
};

export default nextConfig;
