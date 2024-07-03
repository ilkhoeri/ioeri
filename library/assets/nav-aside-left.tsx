"use client";

import React from "react";
import { appRoutes } from "@/library/routes";
import { useNavContext } from "@/library/hooks/use-nav";
import { NavLinkItem } from "./nav-link";

import { twMerge } from "tailwind-merge";
import { ButtonAside, LinkHome } from "./nav-head";
import { Collapsible, CollapsibleContent, CollapsibleTrigger, ScrollArea } from "@/resource/docs/components/web";

import type { SingleRoute, NestedRoute } from "@/library/routes";

import style from "./aside.module.css";
import Styles from "./aside-styles";

export function AsideLeft({
  classNames,
  topRoutes,
  routes,
  nestedRoutes,
}: {
  classNames?: { aside?: string; overlay?: string };
  topRoutes: SingleRoute[] | null;
  routes: SingleRoute[] | null;
  nestedRoutes: NestedRoute[] | null;
}) {
  const { homeQuery, minQuery, maxQuery, open, setOpen, handleClose } = useNavContext();

  if (homeQuery) {
    return null;
  }

  const attr = {
    onClick: () => {
      if (maxQuery) {
        if (open) {
          setTimeout(() => {
            handleClose();
          }, 100);
        }
      }
    },
  };

  return (
    <>
      <aside
        id="aside-nav"
        data-state={maxQuery ? (open ? "open" : "closed") : undefined}
        className={twMerge(Styles({ style: "aside", aside: "left" }), classNames?.aside)}
      >
        {maxQuery && (
          <hgroup className={Styles({ style: "hgroup" })}>
            <LinkHome />
            <ButtonAside hidden={minQuery} open={open} onClick={handleClose} className="mr-1.5" />
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
            {...attr}
          />

          {topRoutes &&
            topRoutes.map((i, index) => (
              <Collapsible key={index} defaultOpen align="start" className="h-auto w-full flex flex-col gap-1">
                <CollapsibleTrigger className={Styles({ style: "trigger" })}>
                  <span className="truncate">{i.title}</span>
                </CollapsibleTrigger>

                <CollapsibleContent className="w-full z-1 px-0.5">
                  {i.data.map((i, index) => (
                    <NavLinkItem key={index} href={i.href} title={i.title} className={style.link} {...attr} />
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ))}

          {nestedRoutes &&
            nestedRoutes.map((i, index) => (
              <Collapsible key={index} defaultOpen align="start" className="h-auto w-full flex flex-col">
                <CollapsibleTrigger className={Styles({ style: "trigger" })}>
                  <span className="truncate">{i.title}</span>
                </CollapsibleTrigger>

                <CollapsibleContent className="w-full z-1">
                  {i.data.map((i, index) => (
                    <Collapsible key={index} defaultOpen align="start">
                      <CollapsibleTrigger className={twMerge(Styles({ style: "trigger" }), "pl-1.5")}>
                        <span className="truncate">{i.title}</span>
                      </CollapsibleTrigger>

                      <CollapsibleContent className="w-full z-1 px-0.5">
                        {i.data.map((i, index) => (
                          <NavLinkItem
                            key={index}
                            href={i.href}
                            title={i.title}
                            className={[style.link, "capitalize"].join(" ")}
                            {...attr}
                          />
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ))}

          {routes &&
            routes.map((i, index) => (
              <Collapsible key={index} defaultOpen align="start" className="h-auto w-full flex flex-col gap-1">
                <CollapsibleTrigger className={Styles({ style: "trigger" })}>
                  <span className="truncate">{i.title}</span>
                </CollapsibleTrigger>

                <CollapsibleContent className="w-full z-1 px-0.5">
                  {i.data.map((i, index) => (
                    <NavLinkItem key={index} href={i.href} title={i.title} className={style.link} {...attr} />
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ))}

          {appRoutes["fitures"].map((i, index) => (
            <Collapsible key={index} defaultOpen align="start" className="h-auto w-full flex flex-col gap-1">
              <CollapsibleTrigger className={Styles({ style: "trigger" })}>
                <span className="truncate">{i.title}</span>
              </CollapsibleTrigger>

              <CollapsibleContent className="w-full z-1 px-0.5">
                {i.data.map((i, index) => (
                  <NavLinkItem key={index} href={i.href} title={i.title} className={style.link} {...attr} />
                ))}
              </CollapsibleContent>
            </Collapsible>
          ))}
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
