import { AppsIcon, AreaCodeIcon, DesktopCodeIcon, MobileCodeIcon } from "@/modules";
import { IconType } from "@/modules/icons/utils";

export type TitleRoute = { title: string; description: string; icon: IconType };
export type InnerRoutes = { title: string; description: string; href: string };
export type SingleRoute = TitleRoute & { data: InnerRoutes[] };
export type NestedRoute = TitleRoute & {
  data: SingleRoute[];
};

export const fitures: SingleRoute[] = [
  {
    title: "Playground",
    description: "",
    icon: AreaCodeIcon,
    data: [
      {
        title: "Markdown Editor",
        href: "/playground/markdown-editor",
        description: "",
      },
      {
        title: "Polymorphic",
        href: "/playground/polymorphic",
        description: "",
      },
    ],
  },
];

const Components = [
  {
    title: "Collapsible",
    description: "",
    href: "/web/components",
  },
];

const Hooks = [
  {
    title: "Open State",
    description: "",
    href: "/web/hooks",
  },
];

const NativeComponents = [
  {
    title: "A",
    description: "",
    href: "/mobile/components",
  },
];

const NativeHooks = [
  {
    title: "A",
    description: "",
    href: "/mobile/hooks/a",
  },
];

export const routes: NestedRoute[] = [
  {
    title: "Web app",
    description: "",
    icon: DesktopCodeIcon,
    data: [
      {
        title: "Components",
        description: "",
        icon: AppsIcon,
        data: Components,
      },
      {
        title: "Hooks",
        description: "",
        icon: AppsIcon,
        data: Hooks,
      },
    ],
  },
  {
    title: "Native app",
    description: "",
    icon: MobileCodeIcon,
    data: [
      {
        title: "Components",
        description: "",
        icon: AppsIcon,
        data: NativeComponents,
      },
      {
        title: "Hooks",
        description: "",
        icon: AppsIcon,
        data: NativeHooks,
      },
    ],
  },
];
