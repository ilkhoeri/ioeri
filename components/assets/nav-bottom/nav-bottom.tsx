"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ChevronLeftIcon, ChevronRightIcon } from "@/modules";

export function NavBottom() {
  const pathname = usePathname();
  // Memecah pathname menjadi bagian-bagian yang dipisahkan oleh '/'
  // const path = pathname.split("/").filter((part) => part !== ""); // Filter untuk menghapus bagian yang kosong
  const paths = pathname.split("/").filter(Boolean);

  return (
    <nav className="flex flex-row items-center justify-between pt-12">
      <Link
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 py-2 pr-4 pl-3"
        href=""
      >
        <ChevronLeftIcon className="size-4" />
        Previous
      </Link>

      <Link
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 py-2 pl-4 pr-3"
        href=""
      >
        Next
        <ChevronRightIcon className="size-4" />
      </Link>
    </nav>
  );
}
