"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { fitures, routes } from "@/routes";
import { NavLinkItem } from "../connections/nav-link";

import { twMerge } from "tailwind-merge";
import { useNavContext } from "@/hooks/use-nav";
import { ButtonAside, LinkHome } from "../nav-head/headnav";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/modules";

import style from "./aside.module.css";

export function NavAside({ classNames }: { classNames?: { aside?: string; overlay?: string } }) {
  const pathname = usePathname();

  const { minQuery, maxQuery, open, setOpen, handleClose } = useNavContext();

  if (pathname === "/" && minQuery) {
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
      <Overlay minQuery={minQuery} open={open} setOpen={setOpen} className={classNames?.overlay} />

      <aside
        data-state={maxQuery ? (open ? "open" : "closed") : undefined}
        className={twMerge(style.aside, classNames?.aside)}
      >
        {maxQuery && (
          <section className="flex flex-row items-center justify-between h-[--navbar] mb-4 md:hidden md:sr-only">
            <LinkHome />
            <ButtonAside query={minQuery} open={open} onClick={handleClose} className="mr-1.5" />
          </section>
        )}

        <nav>
          {routes.map((i, index) => (
            <Collapsible key={index} defaultOpen className="h-full w-full flex flex-col gap-1">
              <CollapsibleTrigger className={[style.clb, "text-sm font-medium select-none z-9"].join(" ")}>
                <i.icon />
                <span className="truncate">{i.title}</span>
              </CollapsibleTrigger>

              <CollapsibleContent className="flex z-1">
                {i.data.map((i, index) => (
                  <div key={index} className="h-full w-full flex flex-col">
                    <h6 className="flex flex-row items-center gap-2 h-8 px-2 py-1 text-sm font-medium">
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
  return <span onClick={() => setOpen(false)} className={twMerge(style.overlay, className)} />;
}
