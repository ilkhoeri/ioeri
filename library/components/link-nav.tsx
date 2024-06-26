"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

export type LinkNavClass = { classNames?: Partial<Record<"link" | "linkActive" | "svg", string>> };

type IconType = (props: React.SVGAttributes<SVGElement>) => React.JSX.Element;

interface LinkNavProps extends React.HTMLAttributes<HTMLElement>, LinkNavClass {
  items: {
    href: string;
    title: string;
    icon?: IconType | undefined;
  }[];
  includePath?: boolean;
  children?: React.ReactNode;
}

export const classLinkNav = twMerge(
  "py-1 flex-nowrap flex-row justify-start min-w-max hover:bg-muted focus-visible:ring-offset-0 focus-visible:ring-inset font-sans h-[32px]",
);

export function LinkNav({ className, classNames, items, includePath, children, ...props }: LinkNavProps) {
  const pathname = usePathname();

  return items.map((item, index) => (
    <Link
      key={index}
      href={item.href}
      className={twMerge(
        classLinkNav,
        item.icon && "gap-4",
        (includePath ? pathname.includes(item.href) : pathname === item.href)
          ? twMerge("font-semibold", classNames?.linkActive)
          : "text-muted-foreground hover:underline underline-offset-2",
        className,
        classNames?.link,
      )}
      {...props}
    >
      {item.icon && (
        <item.icon
          className={twMerge("[--is:18px] size-[var(--is)] min-h-[var(--is)] min-w-[var(--is)] ", classNames?.svg)}
        />
      )}
      {item.title}
    </Link>
  ));
}
