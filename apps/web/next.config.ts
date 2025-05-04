import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
      }
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
