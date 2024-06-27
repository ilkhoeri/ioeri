import { IconType } from "@/modules/icons/utils";
import { AreaCodeIcon, ExpoIcon, ReactIcon, NextjsIcon, GatsbyIcon, RemixIcon, ViteIcon } from "@/modules";

export type InnerRoutes = { title: string; href: string };
export type SingleRoute = { title: string; data: InnerRoutes[] };
export type NestedRoute = { title: string; data: SingleRoute[] };
export type Frameworks = { title: string; href: string; cmd: string; icon: IconType };

export const frameworks = [
  {
    title: "Library",
    description:
      "React has been designed from the start for gradual adoption. You can use as little or as much React as you need. You don’t need to install anything to play with React.",
    data: [
      {
        title: "React",
        href: "https://react.dev/learn/installation",
        cmd: "create-react-app@latest",
        icon: ReactIcon,
      },
    ],
  },
  {
    title: "Native Frameworks",
    description:
      "Framework and platform for mobile application development built on React Native. Expo provides a set of tools and services that simplify the process of creating, building, and distributing React Native applications.",
    data: [
      {
        title: "Expo",
        href: "https://docs.expo.dev/",
        cmd: "create-expo-app@latest",
        icon: ExpoIcon,
      },
    ],
  },
  {
    title: "Web Frameworks",
    description:
      "A React-based framework that provides features for web application development, including server-side rendering (SSR), statistical rendering (SSG), and automatic routing. It is more than just a bundling tool, as it provides the structure and conventions for building complete web applications.",
    data: [
      {
        title: "Next.js",
        href: "https://nextjs.org/",
        cmd: "create-next-app@latest",
        icon: NextjsIcon,
      },
      {
        title: "Gatsby",
        href: "https://www.gatsbyjs.com/docs/glossary/npm/",
        cmd: "gatsby new my-project",
        icon: GatsbyIcon,
      },
      {
        title: "Remix",
        href: "https://remix.run/docs/en/main/other-api/create-remix",
        cmd: "create-remix@latest",
        icon: RemixIcon,
      },
    ],
  },
  {
    title: "Bundler",
    description:
      "A modern bundling tool that supports various frameworks including React, Svelte, and others. It uses ES Modules to provide a very fast development server and relies on Rollup for production bundling.",
    data: [
      {
        title: "Vite",
        href: "https://vitejs.dev/guide/",
        cmd: "create-vite@latest",
        icon: ViteIcon,
      },
    ],
  },
];

export const services = [
  {
    title: "Examples",
    href: "/examples",
  },
  {
    title: "Documentation",
    href: "/docs",
  },
  // {
  //   title: "Generators",
  //   href: "",
  // },
];

export const fitures = [
  {
    title: "Examples",
    data: [
      {
        title: "Markdown Text",
        href: "/examples/playground/markdown-text",
      },
    ],
  },
];
export const nested = [
  {
    title: "Components",
    data: [
      {
        title: "Web",
        data: [
          {
            title: "Collapsible",
            href: "/components/web/collapsible",
          },
          {
            title: "Element",
            href: "/components/web/element",
          },
        ],
      },
      {
        title: "Mobile",
        data: [
          {
            title: "Popover",
            href: "/components/mobile/popover",
          },
          {
            title: "Slider",
            href: "/components/mobile/slider",
          },
        ],
      },
    ],
  },
];
