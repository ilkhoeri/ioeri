"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/library/components/components";
import { InputFilter } from "@/library/components/input";
import { displayName } from "@/library/utils";

import type { SingleRoute, NestedRoute } from "@/library/routes";

export function RestDocsPage({ routes, id }: { id: string; routes: SingleRoute[] | null }) {
  const [value, setValue] = React.useState<string>("");

  if (!routes) return null;

  const filtered = routes.map((i) => i.data.filter((i) => i.title.toLowerCase().includes(value.toLowerCase()))).flat();

  return (
    <Container el="div" className="relative flex flex-col items-center justify-start">
      <InputFilter id={id} value={value} onChange={(e) => setValue(e.target.value)} />

      <div className="w-full min-w-full grid sm:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 gap-4 mt-5 sm:gap-6">
        {filtered.map((i, index) => (
          <Link
            key={index}
            href={i.href}
            title={i.title}
            className="flex w-full flex-col items-center rounded-xl border bg-card p-6 text-card-foreground shadow transition-colors hover:bg-muted/50 sm:p-10"
          >
            <span className="font-medium">{displayName(i.title)}</span>
          </Link>
        ))}
      </div>
    </Container>
  );
}