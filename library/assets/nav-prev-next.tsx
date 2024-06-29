"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ChevronLeftIcon, ChevronRightIcon } from "@/modules";
import { InnerRoutes, SingleRoute } from "@/library/routes";
import { cnx } from "@/modules/ondevelopment/utils/cnx";
import { displayName } from "../utils";

export function NavBottom({ routes }: { routes: SingleRoute[] | null }) {
  const pathname = usePathname();
  // const paths = pathname.split("/").filter(Boolean);

  let currentRoutes: InnerRoutes[] = [];

  if (routes) {
    if ((routes as SingleRoute[]).every((route) => "href" in route.data[0])) {
      currentRoutes = (routes as SingleRoute[]).flatMap((section) =>
        section.data.map((route) => ({
          title: route.title,
          href: route.href,
          // href: `/${section.title.toLowerCase()}/${route.href.split("/").slice(2).join("/")}`,
        })),
      );
    }
  }

  const currentIndex = currentRoutes.findIndex((route) => route.href === pathname);
  const previousRoute = currentRoutes[currentIndex - 1] || null;
  const nextRoute = currentRoutes[currentIndex + 1] || null;

  const classLink = cnx(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 py-2 max-md:max-w-[144px] hover:bg-muted transition-colors",
  );

  return (
    <nav className="flex flex-row items-center justify-between pt-12">
      {previousRoute && (
        <Link className={cnx(classLink, "pr-4 pl-3")} href={previousRoute ? previousRoute.href : ""}>
          <ChevronLeftIcon className="size-4" />
          <span className="truncate">{previousRoute ? displayName(previousRoute.title) : "Previous"}</span>
        </Link>
      )}

      {nextRoute && (
        <Link className={cnx(classLink, "pl-4 pr-3 ml-auto")} href={nextRoute ? nextRoute.href : ""}>
          <span className="truncate">{nextRoute ? displayName(nextRoute.title) : "Next"}</span>
          <ChevronRightIcon className="size-4" />
        </Link>
      )}
    </nav>
  );
}
