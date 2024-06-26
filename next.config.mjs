// import process from "node:process";
// Object.assign(process.env, { NEXT_TELEMETRY_DISABLED: "1" });
// import moonlightTheme from "./library/utils/moonlight-ii.json" with { type: "json" };
// import rehypeSlug from "rehype-slug";

/**
 * @typedef {import('next').NextConfig} NextConfig
 * @typedef {Array<((config: NextConfig) => NextConfig)>} NextConfigPlugins
 */
import nextPWA from "next-pwa";
import remarkGfm from "remark-gfm";
import createMDX from "@next/mdx";
import rehypePrettyCode from "rehype-pretty-code";

/** @type {import('rehype-pretty-code').Options} */
const options = {
  // theme: moonlightTheme,
  keepBackground: false,
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
    remarkPlugins: [remarkGfm],
    // rehypePlugins: [[rehypePrettyCode, options], rehypeSlug],
    rehypePlugins: [[rehypePrettyCode, options]],
  },
});

/** @type {import('next-pwa').PWAConfig} */
const withPWA = nextPWA({
  dest: "public",
  buildExcludes: ["app-build-manifest.json"],
});

/** @type {import('next').NextConfig} */
const Config = withMDX({
  // cleanDistDir: true,
  // output: "export", // must be exported function "generateStaticParams()", which is required with "output: export" config
  reactStrictMode: true,
  poweredByHeader: false,
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
      {
        source: "/examples",
        destination: "/examples/playground/markdown-text",
        permanent: true,
      },
    ];
  },
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
          fs: false,
          // child_process: false,
          // "builtin-modules": false,
          // worker_threads: false,
        },
      };
    }

    return config;
  },
});

const nextConfig = withPWA(Config);

export default nextConfig;
