"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import f from "@/styles/ioeri.module.css";
import MarkBoolean from "@/components/ui/mark-boolean";

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

  return items.map((i) => (
    <li key={i.slug} className={f.li}>
      <Link
        href={`/${i.slug}`}
        className={(includePath ? pathname.includes(i.slug) : pathname === i.slug) ? f.a_active : f.a}
      >
        {i.title}
      </Link>
    </li>
  ));
}

function FootLinkMark({ items, includePath = true }: FootLinkProps) {
  const pathname = usePathname();

  return items
    .slice()
    .sort((a, b) => a.title.localeCompare(b.title))
    .map((i) => (
      <li key={i.slug} className={f.li}>
        <Link
          href={`/page/${i.slug}`}
          className={(includePath ? pathname.includes(i.slug) : pathname === i.slug) ? f.a_active : f.a}
        >
          {i.title}
        </Link>

        {i.isNew && <MarkBoolean mark={true} childTrue="NEW" />}
      </li>
    ));
}

export { FootLink, FootLinkMark };
