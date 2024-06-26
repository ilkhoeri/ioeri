"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import f from "@/library/styles/ioeri.module.css";
import MarkBoolean from "@/library/components/mark-boolean";

interface FootLinkProps {
  items: {
    slug: string;
    title: string;
    isNew?: boolean;
  }[];
  includePath?: boolean;
}

function FootLink({ items, includePath = true }: FootLinkProps) {
  const pathname = usePathname();

  // Helper function to split pathname into segments
  const getPathSegments = (path: string) => path.split("/").filter(Boolean);

  return items.map((i) => {
    const pathSegments = getPathSegments(pathname);
    const isActive = includePath ? pathSegments.includes(i.slug) : pathname === `/${i.slug}`;

    return (
      <li key={i.slug} className={f.li}>
        <Link href={`/${i.slug}`} className={isActive ? f.a_active : f.a}>
          {i.title}
        </Link>
      </li>
    );
  });
}

function FootLinkMark({ items, includePath = true }: FootLinkProps) {
  const pathname = usePathname();

  const getPathSegments = (path: string) => path.split("/").filter(Boolean);

  return items
    .slice()
    .sort((a, b) => a.title.localeCompare(b.title))
    .map((i) => {
      const pathSegments = getPathSegments(pathname);
      const isActive = includePath ? pathSegments.includes(i.slug) : pathname === `/${i.slug}`;

      return (
        <li key={i.slug} className={f.li}>
          <Link href={`/page/${i.slug}`} className={isActive ? f.a_active : f.a}>
            {i.title}
          </Link>

          {i.isNew && <MarkBoolean mark={true} childTrue="NEW" />}
        </li>
      );
    });
}

export { FootLink, FootLinkMark };
