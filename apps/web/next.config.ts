import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
   experimental: {
    turbo: {
      rules: {
        // Configure which files should be treated as assets
        '*.mp4': ['asset'],
      },
    },
  },
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080',
        pathname: '/**',
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: '/**'
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: '/**'
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: '/**'
      },
      {
        protocol: "https",
        hostname: "palash.club",
        pathname: '/**'
      },

    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
   eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
