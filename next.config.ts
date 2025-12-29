import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Disable trailing slash to match Firebase hosting defaults
  trailingSlash: false,
};

export default nextConfig;
