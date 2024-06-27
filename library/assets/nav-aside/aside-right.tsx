"use client";

import React from "react";
import Link from "next/link";
import Element from "@/modules/components/web/element/element";
import { useAppContext } from "@/library/context/app-context";
import { capitalizeWords } from "@/modules";
import { cn } from "@/library/utils";

import Styles from "./aside-styles";

export function AsideRight() {
  const { ids } = useAppContext();
  const idInView = useActiveItem(ids.map((i) => i.id));

  return (
    <aside className={Styles({ style: "aside", aside: "right" })}>
      <nav className={cn(Styles({ style: "nav" }), "fixed pl-3")}>
        <hgroup>
          <h4 role="presentation" className="font-medium text-paragraph mb-2">
            On This Page
          </h4>
        </hgroup>
        <Element el="ul" role="list" className="space-y-2 font-medium text-span">
          {ids &&
            ids.map(({ id, depth }) =>
              id ? (
                <Element
                  el="li"
                  key={id}
                  role="listitem"
                  className={cn("text-muted-foreground hover:text-color transition-colors")}
                  style={{
                    paddingLeft: `${depth * 12}px`,
                    color: idInView === id ? "hsl(var(--constructive))" : "hsl(var(--muted-foreground))",
                  }}
                >
                  <Link href={`#${id}`}>{capitalizeWords(id)}</Link>
                </Element>
              ) : null,
            )}
        </Element>
      </nav>
    </aside>
  );
}

interface Item {
  title: string;
  url: string;
  items?: Item[];
}
interface TableOfContents {
  items?: Item[];
}
interface TocProps {
  toc: TableOfContents;
}

export function useMounted() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}

export function DashboardTableOfContents({ toc }: TocProps) {
  const itemIds = React.useMemo(
    () =>
      toc.items
        ? toc.items
            .flatMap((item) => [item.url, item?.items?.map((item) => item.url)])
            .flat()
            .filter(Boolean)
            .map((id) => id?.split("#")[1])
        : [],
    [toc],
  );
  // @ts-ignore
  const activeHeading = useActiveItem(itemIds);
  const mounted = useMounted();

  if (!toc?.items || !mounted) {
    return null;
  }

  return (
    <div className="space-y-2">
      <p className="font-medium">On This Page</p>
      <Tree tree={toc} activeItem={activeHeading} />
    </div>
  );
}

function useActiveItem(itemIds: string[]) {
  const [activeId, setActiveId] = React.useState<any>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: `0% 0% -80% 0%` },
    );

    itemIds?.forEach((id) => {
      if (id) {
        const element = document.getElementById(id);
        if (element) {
          observer.observe(element);
        }
      }
    });

    return () => {
      itemIds?.forEach((id) => {
        if (id) {
          const element = document.getElementById(id);
          if (element) {
            observer.unobserve(element);
          }
        }
      });
    };
  }, [itemIds]);

  return activeId;
}

interface TreeProps {
  tree: TableOfContents;
  depth?: number;
  activeItem?: string | null;
}

function Tree({ tree, depth = 1, activeItem }: TreeProps) {
  return tree?.items?.length && depth < 3 ? (
    <ul className={cn("m-0 list-none", { "pl-4": depth !== 1 })}>
      {tree.items.map((item, index) => {
        return (
          <li key={index} className={cn("mt-0 pt-2")}>
            <a
              href={item.url}
              className={cn(
                "inline-block no-underline transition-colors hover:text-foreground",
                item.url === `#${activeItem}` ? "font-medium text-foreground" : "text-muted-foreground",
              )}
            >
              {item.title}
            </a>
            {item.items?.length ? <Tree tree={item} depth={depth + 1} activeItem={activeItem} /> : null}
          </li>
        );
      })}
    </ul>
  ) : null;
}
