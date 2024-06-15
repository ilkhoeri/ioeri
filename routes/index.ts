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
  {
    title: "B",
    description: "",
    href: "/web/components/b",
  },
  {
    title: "C",
    description: "",
    href: "/web/components/c",
  },
];

const Hooks = [
  {
    title: "Open State",
    description: "",
    href: "/web/hooks",
  },
  {
    title: "B",
    description: "",
    href: "/web/hooks/b",
  },
  {
    title: "C",
    description: "",
    href: "/web/hooks/c",
  },
];

const NativeComponents = [
  {
    title: "A",
    description: "",
    href: "/mobile/components",
  },
  {
    title: "B",
    description: "",
    href: "/mobile/components/b",
  },
  {
    title: "C",
    description: "",
    href: "/mobile/components/c",
  },
];

const NativeHooks = [
  {
    title: "A",
    description: "",
    href: "/mobile/hooks/a",
  },
  {
    title: "B",
    description: "",
    href: "/mobile/hooks/b",
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
