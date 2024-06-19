import { IconType } from "@/modules/icons/utils";
import { AppsIcon, AreaCodeIcon, DesktopCodeIcon, MobileCodeIcon } from "@/modules";

export type TitleRoute = { title: string; icon?: IconType };
export type InnerRoutes = { title: string; href: string };
export type SingleRoute = TitleRoute & { data: InnerRoutes[] };
export type NestedRoute = TitleRoute & { data: SingleRoute[] };

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