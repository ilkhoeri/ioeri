"use client";

import React, { Fragment } from "react";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../../components/breadcrumb";
import { displayName } from "../../utils";

export interface BreadcrumbDropdownProps {
  paths: string[];
}

export function NavigationBreadcrumb() {
  const pathname = usePathname();
  // Memecah pathname menjadi bagian-bagian yang dipisahkan oleh '/'
  // const path = pathname.split("/").filter((part) => part !== ""); // Filter untuk menghapus bagian yang kosong
  const paths = pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb className="mb-8">
      <BreadcrumbList className="flex-nowrap">
        {paths.map((path, index) => {
          const active = index === paths.length - 1;
          const href = active ? "" : `/${paths.slice(0, index + 1).join("/")}`;
          return (
            <Fragment key={path}>
              <BreadcrumbItem>
                <BreadcrumbLink href={href} active={active} aria-disabled="true">
                  {displayName(path)}
                </BreadcrumbLink>
              </BreadcrumbItem>

              {index < paths.length - 1 && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
