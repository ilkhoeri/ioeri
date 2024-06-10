import nextPWA from "next-pwa";

/** @type {import('next-pwa').PWAConfig} */
const withPWA = nextPWA({
  dest: "public",
  buildExcludes: ["app-build-manifest.json"],
});

/** @type {import('next').NextConfig} */
const Config = {
  images: {
    formats: ["image/avif", "image/webp"],
    domains: [
      "img.clerk.com",
      "res.cloudinary.com",
      "avatars.githubusercontent.com",
      "raw.githubusercontent.com",
      "lh3.googleusercontent.com",
      "cdn-icons-png.flaticon.com",
      "images.unsplash.com",
    ],
    deviceSizes: [375, 640, 768, 1024, 1536, 1920],
    minimumCacheTTL: 60 * 60 * 24,
  },
  reactStrictMode: true,
};

const nextConfig = withPWA(Config);

export default nextConfig;
