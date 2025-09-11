import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.pexels.com', pathname: '/photos/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' }, // if you use Unsplash
      { protocol: 'https', hostname: 'i.imgur.com', pathname: '/**' },        // example
    ],
  },
      unoptimized: true,
};

export default nextConfig;
