"use client";

import React from "react";
import Link from "next/link";
import { displayName } from "@/library/utils";
import { cvx } from "@/resource/docs/utility";
import { sanitizedToParams } from "@/resource/docs";
import { Title } from "@/library/components/components";
import { FilterDocs } from "@/library/components/input";
import { Container } from "@/library/components/components";

import type { SingleRoute, NestedRoute } from "@/library/routes";

import globalStyle from "@/library/styles/styles";

const classes = cvx({
  variants: {
    as: {
      wrapper: "w-full min-w-full grid sm:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 gap-4 mt-5 sm:gap-6",
    },
  },
});

function renderSingleRoute(routes: SingleRoute[], value: string) {
  return (
    <div className={classes({ as: "wrapper" })}>
      {routes.map((route) => {
        const filtered = route.data.filter((item) => item.title.toLowerCase().includes(value.toLowerCase()));
        return filtered.map((item, index) => (
          <Link key={index} href={item.href} title={item.title} className={globalStyle({ cards: "box" })}>
            <span className="font-medium">{displayName(item.title)}</span>
          </Link>
        ));
      })}
    </div>
  );
}

function renderNestedRoute(routes: NestedRoute[], value: string) {
  return routes.map((route) =>
    route.data.map((subRoute, index) => {
      const filtered = subRoute.data.filter((item) => item.title.toLowerCase().includes(value.toLowerCase()));
      if (!filtered.length) return null;
      return (
        <div key={index} className="w-full min-w-full mt-12 first-of-type:mt-0">
          <Title el="h4" id={sanitizedToParams(subRoute.title)} size="h4" variant="section">
            {subRoute.title}
          </Title>

          <div className={classes({ as: "wrapper" })}>
            {filtered.map((item, index) => (
              <Link key={index} href={item.href} title={item.title} className={globalStyle({ cards: "box" })}>
                <span className="font-medium">{displayName(item.title)}</span>
              </Link>
            ))}
          </div>
        </div>
      );
    }),
  );
}

export default function RestDocsPage({ routes, id }: { id: string; routes: (SingleRoute | NestedRoute)[] | null }) {
  const [value, setValue] = React.useState<string>("");

  if (!routes) return null;

  const isSingleRoute = (route: SingleRoute | NestedRoute): route is SingleRoute => {
    return (route as SingleRoute).data[0].href !== undefined;
  };

  return (
    <Container el="div" className="relative flex flex-col items-center justify-start">
      <FilterDocs id={id} value={value} onChange={(e) => setValue(e.target.value)} />

      {isSingleRoute(routes[0])
        ? renderSingleRoute(routes as SingleRoute[], value)
        : renderNestedRoute(routes as NestedRoute[], value)}
    </Container>
  );
}
