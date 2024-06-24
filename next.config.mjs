// import process from "node:process";
// Object.assign(process.env, { NEXT_TELEMETRY_DISABLED: "1" });

/**
 * @typedef {import('next').NextConfig} NextConfig
 * @typedef {Array<((config: NextConfig) => NextConfig)>} NextConfigPlugins
 */
import nextPWA from "next-pwa";
import remarkGfm from "remark-gfm";
import createMDX from "@next/mdx";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import moonlightTheme from "./lib/moonlight-ii.json" with { type: "json" };

/** @type {import('rehype-pretty-code').Options} */
const options = {
  keepBackground: false,
  theme: moonlightTheme,
  defaultLang: {
    block: "plaintext",
    inline: "plaintext",
  },
  tokensMap: {
    fn: "entity.name.function",
  },
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    // as desired
    remarkPlugins: [remarkGfm],
    rehypePlugins: [[rehypePrettyCode, options], rehypeSlug],
    // rehypePlugins: [[rehypePrettyCode, options]],
  },
});

/** @type {import('next-pwa').PWAConfig} */
const withPWA = nextPWA({
  dest: "public",
  buildExcludes: ["app-build-manifest.json"],
});

/** @type {import('next').NextConfig} */
const Config = withMDX({
  images: {
    formats: ["image/avif", "image/webp"],
    domains: [
      "res.cloudinary.com",
      "img.clerk.com",
      "lh3.googleusercontent.com",
      "cdn-icons-png.flaticon.com",
      "images.unsplash.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        // port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/**",
      },
    ],
    deviceSizes: [375, 640, 768, 1024, 1536, 1920],
    minimumCacheTTL: 60 * 60 * 24,
  },
  async redirects() {
    return [
      {
        source: "/native/:slug",
        destination: "/mobile/:slug",
        permanent: true,
      },
    ];
  },
  reactStrictMode: true,
  poweredByHeader: false,
  // cleanDistDir: true,
  // output: "export", // must be exported function "generateStaticParams()", which is required with "output: export" config
  // env: {
  //   NEXT_TELEMETRY_DISABLED: "1",
  // },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx", "css", "scss", "json"],
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
