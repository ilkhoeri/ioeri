"use client";

import Link from "next/link";
import Image from "next/image";
import MarkBoolean from "@/library/components/mark-boolean";
import { usePathname } from "next/navigation";
import { PLACEHOLDER_IMAGESRC } from "@/modules";
import { twMerge } from "tailwind-merge";

import type { RecordClasses } from "@/modules";
import type { AnchorProps } from "@/library/components/anchor";
import type { IconType } from "@/modules/components/web/svg/svg";

type NavLinkTrees = "link" | "active" | "svg" | "img" | "mark";
export type NavLinkClass = RecordClasses<NavLinkTrees>;

export interface NavLinkItemProps {
  href: string;
  title?: string;
  icon?: IconType | undefined;
  image?: string | undefined;
  isNew?: boolean | undefined;
}
export interface NavLinkProps extends Omit<AnchorProps, "href">, NavLinkClass {
  items: NavLinkItemProps[];
  includePath?: boolean;
  children?: React.ReactNode;
}

// Helper function to split pathname into segments
export const getPathSegments = (path: string) => path.split("/").filter(Boolean);

export function NavLink({ items, ...props }: NavLinkProps) {
  return items.map((item, index) => (
    <NavLinkItem key={index} href={item.href} title={item.title} icon={item.icon} {...props} />
  ));
}

export function NavLinkItem({
  href,
  title,
  icon: Icon,
  image,
  isNew,
  scroll = false,
  className,
  classNames,
  includePath,
  children,
  ...props
}: NavLinkItemProps & AnchorProps & NavLinkClass & { includePath?: boolean; children?: React.ReactNode }) {
  const pathname = usePathname();

  const pathSegments = getPathSegments(pathname);
  const pathActive = includePath ? pathSegments.includes(href) : pathname === href;

  return (
    <>
      <Link
        href={href}
        scroll={scroll}
        data-path={pathActive ? "active" : ""}
        className={twMerge(className, classNames?.link, pathActive && classNames?.active)}
        {...props}
      >
        {image && (
          <Image
            alt="berdikarier.com"
            draggable="false"
            src={image || PLACEHOLDER_IMAGESRC}
            height={20}
            width={20}
            loading="lazy"
            className={classNames?.img}
            onContextMenu={(e) => e.preventDefault()}
          />
        )}
        {Icon && <Icon className={classNames?.svg} />}
        {title}
      </Link>

      {isNew && <MarkBoolean mark={true} childTrue="NEW" className={classNames?.mark} />}
    </>
  );
}
