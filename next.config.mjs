import nextPWA from "next-pwa";

import withMDX from "@next/mdx";

/** @type {import('next-pwa').PWAConfig} */
const withPWA = nextPWA({
  dest: "public",
  buildExcludes: ["app-build-manifest.json"],
});

/** @type {import('next').NextConfig} */
const Config = withMDX({
  images: {
    formats: ["image/avif", "image/webp"],
    domains: ["img.clerk.com", "lh3.googleusercontent.com", "cdn-icons-png.flaticon.com", "images.unsplash.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/bio/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
    deviceSizes: [375, 640, 768, 1024, 1536, 1920],
    minimumCacheTTL: 60 * 60 * 24,
  },
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/native/:slug",
        destination: "/mobile/:slug",
        permanent: true,
      },
    ];
  },
  pageExtensions: ["ts", "tsx", "mdx", "md"],
  experimental: {
    mdxRs: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve = {
        ...config.resolve,
        fallback: {
          ...config.resolve.fallback,
          child_process: false,
          fs: false,
          "builtin-modules": false,
          worker_threads: false,
        },
      };
    }

    return config;
  },
});

const nextConfig = withPWA(Config);

export default nextConfig;
