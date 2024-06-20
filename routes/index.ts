import { IconType } from "@/modules/icons/utils";
import { AreaCodeIcon, ExpoIcon, ReactIcon, NextjsIcon } from "@/modules";

export type InnerRoutes = { title: string; href: string };
export type SingleRoute = { title: string; data: InnerRoutes[] };
export type NestedRoute = { title: string; data: SingleRoute[] };
export type Frameworks = { title: string; href: string; cmd: string; icon: IconType };

export const frameworks: Frameworks[] = [
  {
    title: "React",
    href: "https://react.dev/learn/installation",
    cmd: "create-react-app@latest",
    icon: ReactIcon,
  },
  {
    title: "Next.js",
    href: "https://nextjs.org/",
    cmd: "create-next-app@latest",
    icon: NextjsIcon,
  },
  {
    title: "Expo",
    href: "https://docs.expo.dev/",
    cmd: "create-expo-app@latest",
    icon: ExpoIcon,
  },
];

export const services: SingleRoute[] = [
  {
    title: "Examples",
    data: [],
  },
  {
    title: "Generators",
    data: [],
  },
  {
    title: "Documentation",
    data: [],
  },
];

export const fitures = [
  {
    title: "Playground",
    icon: AreaCodeIcon,
    data: [
      {
        title: "Markdown Text",
        href: "/playground/markdown-text",
      },
      {
        title: "Polymorphic Slot",
        href: "/playground/polymorphic-slot",
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
