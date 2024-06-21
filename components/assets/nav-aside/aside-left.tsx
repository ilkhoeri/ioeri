"use client";

import React from "react";
import { fitures } from "@/routes";
import { NavLinkItem } from "../navigation/nav-link";

import { twMerge } from "tailwind-merge";
import { useNavContext } from "@/hooks/use-nav";
import { ButtonAside, LinkHome } from "../nav-head/headnav";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/modules/components";

import type { SingleRoute, NestedRoute } from "@/routes";

import style from "./aside.module.css";
import Styles from "./aside-styles";

type KEYS = { [key: string]: string };
type keys = "trigger" | "default" | "aside" | "nav";
function createVariantClass(keys: { [key: string]: string }) {
  const vars: { [key: string]: string } = {};

  // switch (keys) {
  //   case "trigger":
  //     vars["trigger"] = "font-semibold text-muted-foreground";
  //     break;

  //   case "default":
  //     vars[""] = "";
  //     break;

  //   case "aside":
  //     vars[""] = "";
  //     break;

  //   case "nav":
  //     vars[""] = "";
  //     break;
  // }

  return keys;
}

const classNames = createVariantClass({
  trigger: "font-semibold text-muted-foreground",
});

const y = classNames;

export function AsideLeft({
  classNames,
  routes,
  nestedRoutes,
}: {
  classNames?: { aside?: string; overlay?: string };
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
            <ButtonAside query={minQuery} open={open} onClick={handleClose} className="mr-1.5" />
          </hgroup>
        )}

        <nav className={Styles({ style: "nav" })}>
          <NavLinkItem
            href="/started"
            title="Getting Started"
            className="w-full flex flex-nowrap flex-row items-center justify-between text-sm select-none z-9 rounded-sm py-1 font-semibold focus-visible:ring-inset focus-visible:ring-offset-[-2px] text-muted-foreground data-[path=active]:text-color"
            {...attr}
          />
          {fitures.map((i, index) => (
            <Collapsible key={index} defaultOpen className="h-auto w-full flex flex-col gap-1">
              <CollapsibleTrigger className={Styles({ style: "trigger" })}>
                <span className="truncate">{i.title}</span>
              </CollapsibleTrigger>

              <CollapsibleContent className="flex h-full w-full flex-col z-1">
                {i.data.map((i, index) => (
                  <NavLinkItem key={index} href={i.href} title={i.title} className={style.link} {...attr} />
                ))}
              </CollapsibleContent>
            </Collapsible>
          ))}

          {nestedRoutes &&
            nestedRoutes.map((i, index) => (
              <Collapsible key={index} defaultOpen className="h-auto w-full flex flex-col">
                <CollapsibleTrigger className={Styles({ style: "trigger" })}>
                  <span className="truncate">{i.title}</span>
                </CollapsibleTrigger>

                <CollapsibleContent className="flex z-1">
                  {i.data.map((i, index) => (
                    <Collapsible key={index} defaultOpen>
                      <CollapsibleTrigger className={Styles({ style: "trigger" })}>
                        <span className="truncate">{i.title}</span>
                      </CollapsibleTrigger>

                      <CollapsibleContent className="flex z-1">
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
              <Collapsible key={index} defaultOpen className="h-auto w-full flex flex-col gap-1">
                <CollapsibleTrigger className={Styles({ style: "trigger" })}>
                  <span className="truncate">{i.title}</span>
                </CollapsibleTrigger>

                <CollapsibleContent className="flex z-1">
                  {i.data.map((i, index) => (
                    <NavLinkItem key={index} href={i.href} title={i.title} className={style.link} {...attr} />
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ))}
        </nav>
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
