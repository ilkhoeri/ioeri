import { IconType } from "@/modules/icons/utils";
import { AppsIcon, AreaCodeIcon, DesktopCodeIcon, MobileCodeIcon } from "@/modules";

export type TitleRoute = { title: string; icon?: IconType };
export type InnerRoutes = { title: string; href: string };
export type SingleRoute = TitleRoute & { data: InnerRoutes[] };
export type NestedRoute = TitleRoute & {
  data: SingleRoute[];
};

export const services: SingleRoute[] = [
  {
    title: "Products",
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

export const fitures: SingleRoute[] = [
  {
    title: "Playground",
    icon: AreaCodeIcon,
    data: [
      {
        title: "Markdown Editor",
        href: "/playground/markdown-editor",
      },
      {
        title: "Polymorphic",
        href: "/playground/polymorphic",
      },
    ],
  },
];

export const routes: NestedRoute[] = [
  {
    title: "Web app",
    icon: DesktopCodeIcon,
    data: [
      {
        title: "Hooks",
        icon: AppsIcon,
        data: [
          {
            title: "useClipboard",
            href: "/web/hooks/use-clipboard",
          },
          {
            title: "useOpenState",
            href: "/web/hooks/use-open-state",
          },
          {
            title: "useOption",
            href: "/web/hooks/use-option",
          },
        ],
      },
    ],
  },
  {
    title: "Native app",
    icon: MobileCodeIcon,
    data: [
      {
        title: "Hooks",
        icon: AppsIcon,
        data: [
          {
            title: "Open State",
            href: "/mobile/hooks",
          },
        ],
      },
    ],
  },
];
