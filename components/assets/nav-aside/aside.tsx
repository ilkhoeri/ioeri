"use client";

import React from "react";
import { fitures } from "@/routes";
import { NavLinkItem } from "../connections/nav-link";

import type { SingleRoute, NestedRoute } from "@/routes";
import { twMerge } from "tailwind-merge";
import { useNavContext } from "@/hooks/use-nav";
import { ButtonAside, LinkHome } from "../nav-head/headnav";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/modules";

import style from "./aside.module.css";

export function NavAside({
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
        className={twMerge(
          "m-0 h-dvh max-h-dvh bg-background overflow-hidden [transition:all_0.5s_ease] w-0 focus-visible:outline-0 top-0 bottom-0 md:sticky md:top-[calc(var(--navbar)*1)] md:pr-6 pb-4 md:pl-4 md:left-0 md:w-[--aside] md:min-w-[--aside] md:max-w-[--aside] max-md:fixed max-md:z-[111] max-md:left-0 max-md:border-0 max-md:border-r-[0.04rem] max-md:border-r-muted/75",
          "max-md:data-[state=open]:w-[--aside] max-md:data-[state=open]:min-w-[--aside] max-md:data-[state=open]:max-w-[--aside] data-[state=open]:pl-6 data-[state=open]:pr-3 max-md:data-[state=closed]:pl-0 max-md:data-[state=closed]:pr-0 max-md:data-[state=closed]:opacity-0",
          classNames?.aside,
        )}
      >
        {maxQuery && (
          <section className="flex flex-row items-center justify-between h-[--navbar] mb-4 md:hidden md:sr-only">
            <LinkHome />
            <ButtonAside query={minQuery} open={open} onClick={handleClose} className="mr-1.5" />
          </section>
        )}

        <nav className="p-4 pb-24 pr-0 relative flex items-start justify-start flex-col flex-nowrap gap-4 size-full max-md:pt-0 max-md:pr-0.5 overflow-y-auto overflow-x-hidden webkit-scrollbar">
          {fitures.map((i, index) => (
            <Collapsible key={index} defaultOpen className="h-auto w-full flex flex-col gap-1">
              <CollapsibleTrigger className="font-semibold text-color focus-visible:ring-inset focus-visible:ring-offset-[-2px]">
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
              <Collapsible key={index} defaultOpen className="h-auto w-full flex flex-col gap-1">
                <CollapsibleTrigger className="font-semibold text-color focus-visible:ring-inset focus-visible:ring-offset-[-2px]">
                  <span className="truncate">{i.title}</span>
                </CollapsibleTrigger>

                <CollapsibleContent className="flex z-1">
                  {i.data.map((i, index) => (
                    <Collapsible
                      key={index}
                      defaultOpen
                      className="ml-2 h-auto w-[calc(100%-0.5rem)] flex flex-col gap-1"
                    >
                      <CollapsibleTrigger
                        withArrow={false}
                        className="font-semibold text-color focus-visible:ring-inset focus-visible:ring-offset-[-2px]"
                      >
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
                <CollapsibleTrigger className="font-semibold text-color focus-visible:ring-inset focus-visible:ring-offset-[-2px]">
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
  return (
    <span
      onClick={() => setOpen(false)}
      className={twMerge(
        "md:hidden md:sr-only fixed max-md:z-[95] w-full h-full min-w-full min-h-full inset-y-0 inset-x-0 backdrop-blur-[0.5px] bg-background/15 supports-[backdrop-filter]:bg-background/15",
        className,
      )}
    />
  );
}

function Icon() {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 256 256"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      className="size-5"
    >
      <path d="M218.68,125.46a12,12,0,1,0-21.37-10.92,75.15,75.15,0,0,1-27.66,29.64l-13.5-30.39A44,44,0,0,0,140,37.68V24a12,12,0,0,0-24,0V37.68a44,44,0,0,0-16.15,76.11L53,219.12A12,12,0,0,0,59.13,235,11.86,11.86,0,0,0,64,236a12,12,0,0,0,11-7.13l23.67-53.26A99.52,99.52,0,0,0,128,180a102.81,102.81,0,0,0,29.39-4.32L181,228.87A12,12,0,0,0,192,236a11.85,11.85,0,0,0,4.86-1A12,12,0,0,0,203,219.12l-23.51-52.9A99.39,99.39,0,0,0,218.68,125.46ZM128,60a20,20,0,1,1-20,20A20,20,0,0,1,128,60Zm0,96a75.8,75.8,0,0,1-19.52-2.53l13.3-29.92a43.21,43.21,0,0,0,12.44,0l13.33,30A79.11,79.11,0,0,1,128,156Z" />
    </svg>
  );
}
