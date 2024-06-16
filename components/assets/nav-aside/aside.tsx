"use client";

import React from "react";
import { fitures, routes } from "@/routes";
import { NavLinkItem } from "../connections/nav-link";

import { twMerge } from "tailwind-merge";
import { useNavContext } from "@/hooks/use-nav";
import { ButtonAside, LinkHome } from "../nav-head/headnav";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/modules";

import style from "./aside.module.css";

export function NavAside({ classNames }: { classNames?: { aside?: string; overlay?: string } }) {
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
          "m-0 bg-background overflow-hidden [transition:all_0.5s_ease] h-full w-0 focus-visible:outline-0 top-0 bottom-0 md:sticky md:top-[calc(var(--navbar)*1)] md:pr-6 md:pb-8 md:pl-4 md:left-0 md:w-[--aside] md:min-w-[--aside] md:max-w-[--aside] max-md:fixed max-md:z-[111] max-md:left-0 max-md:border-0 max-md:border-r-[0.04rem] max-md:border-r-muted/75",
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

        <nav className="p-4 pr-0 relative flex items-start flex-col flex-nowrap gap-4 h-max w-full max-md:pt-0 max-md:pr-0.5 max-md:pb-[5rem] max-md:overflow-y-auto md:overflow-y-hidden overflow-x-hidden webkit-scrollbar">
          {routes.map((i, index) => (
            <Collapsible key={index} defaultOpen className="h-full w-full flex flex-col gap-1">
              <CollapsibleTrigger className={[style.clb, "text-sm font-medium select-none z-9"].join(" ")}>
                <i.icon />
                <span className="truncate">{i.title}</span>
              </CollapsibleTrigger>

              <CollapsibleContent className="flex z-1">
                {i.data.map((i, index) => (
                  <div key={index} className="h-full w-full flex flex-col">
                    <h6 className="flex flex-row items-center gap-2 h-8 pr-2 py-1 text-sm font-medium">
                      <span className="truncate">{i.title}</span>
                    </h6>
                    {i.data.map((i, index) => (
                      <NavLinkItem key={index} href={i.href} title={i.title} className={style.link} {...attr} />
                    ))}
                  </div>
                ))}
              </CollapsibleContent>
            </Collapsible>
          ))}

          {fitures.map((i, index) => (
            <Collapsible key={index} defaultOpen className="h-full w-full flex flex-col gap-1">
              <CollapsibleTrigger className={[style.clb, "text-sm font-medium select-none z-9"].join(" ")}>
                <i.icon />
                <span className="truncate">{i.title}</span>
              </CollapsibleTrigger>

              <CollapsibleContent className="flex h-full w-full flex-col z-1">
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
