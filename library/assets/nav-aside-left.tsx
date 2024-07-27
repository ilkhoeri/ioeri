"use client";

import React from "react";
import { useNavContext } from "@/library/hooks/use-nav";
import { NavLinkItem } from "./nav-link";

import { twMerge } from "tailwind-merge";
import { ButtonAside, LinkHome } from "./nav-head";
import { Sheets, SheetsContent, SheetsTrigger, ScrollArea } from "@/modules/components/web";

import type { SingleRoute, NestedRoute, InnerRoutes } from "@/library/routes";

import style from "./aside.module.css";
import Styles from "./aside-styles";

export function AsideLeft({
  classNames,
  routes,
}: {
  classNames?: { aside?: string; overlay?: string };
  routes: (SingleRoute | NestedRoute)[] | null;
}) {
  const { homeQuery, minQuery, maxQuery, open, setOpen, toggle } = useNavContext();

  if (homeQuery) {
    return null;
  }

  function Item({ routes }: { routes: InnerRoutes[] }) {
    return routes.map((route, index) => (
      <NavLinkItem
        key={index}
        href={route.href}
        title={route.title}
        className={style.link}
        onClick={() => {
          if (maxQuery) {
            setTimeout(() => {
              setOpen(false);
            }, 500);
          }
        }}
      />
    ));
  }

  return (
    <>
      <aside
        data-dom="aside-nav"
        data-state={maxQuery ? (open ? "open" : "closed") : undefined}
        className={twMerge(Styles({ style: "aside", aside: "left" }), classNames?.aside)}
      >
        {maxQuery && (
          <hgroup className={Styles({ style: "hgroup" })}>
            <LinkHome />
            <ButtonAside hidden={minQuery} open={open} onClick={toggle} className="mr-1.5" />
          </hgroup>
        )}

        <ScrollArea
          el="nav"
          classNames={{
            content: twMerge(Styles({ style: "nav" }), "size-full pl-4 pr-1.5"),
            thumb: "max-md:hidden max-md:sr-only",
          }}
        >
          <NavLinkItem
            href="/docs"
            title="Getting Started"
            className="w-full flex flex-nowrap flex-row items-center justify-between text-sm select-none z-9 rounded-sm py-1 font-medium focus-visible:ring-inset focus-visible:ring-offset-[-2px] text-muted-foreground data-[path=active]:text-constructive"
            onClick={() => {
              if (maxQuery) {
                setTimeout(() => {
                  setOpen(false);
                }, 500);
              }
            }}
          />

          {routes &&
            routes.map((route, index) => {
              if ((route as NestedRoute).data[0].data) {
                const nestedRoute = route as NestedRoute; // Handle NestedRoute
                return (
                  <div key={index} className={style.collapse}>
                    <button type="button" className={Styles({ style: "trigger" })}>
                      <span className="truncate">{nestedRoute.title}</span>
                    </button>
                    <div data-origin="content" className="w-full z-1">
                      {nestedRoute.data.map((singleRoute, singleIndex) => (
                        <Sheets key={singleIndex} defaultOpen align="start">
                          <SheetsTrigger unstyled className={Styles({ style: "trigger" })}>
                            <span className="truncate">{singleRoute.title}</span>
                          </SheetsTrigger>
                          <SheetsContent data-inner-collapse="">
                            <Item routes={singleRoute.data} />
                          </SheetsContent>
                        </Sheets>
                      ))}
                    </div>
                  </div>
                );
              } else {
                const singleRoute = route as SingleRoute; // Handle SingleRoute
                return (
                  <Sheets key={index} defaultOpen align="start" className={style.collapse}>
                    <SheetsTrigger unstyled className={Styles({ style: "trigger" })}>
                      <span className="truncate">{singleRoute.title}</span>
                    </SheetsTrigger>
                    <SheetsContent data-inner-collapse="">
                      <Item routes={singleRoute.data} />
                    </SheetsContent>
                  </Sheets>
                );
              }
            })}
        </ScrollArea>
      </aside>

      <Overlay minQuery={minQuery} open={open} setOpen={setOpen} className={classNames?.overlay} />
    </>
  );
}

function Overlay({
  minQuery,
  open,
  setOpen,
  className,
}: {
  minQuery?: boolean;
  open?: boolean;
  setOpen: (value: boolean) => void;
  className?: string;
}) {
  if (minQuery || !open) {
    return null;
  }
  return <span onClick={() => setOpen(false)} className={twMerge(Styles({ style: "overlay" }), className)} />;
}
