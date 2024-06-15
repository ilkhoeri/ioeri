"use client";

import Link from "next/link";
import Element from "@/components/ui/element";
import { IoeriLogoTextIcon, LineMenuBarIcon } from "@/modules";
import { useHoveredElement } from "@/hooks/use-hovered-element";
import { useNavContext } from "../../../hooks/use-nav";
import { twMerge } from "tailwind-merge";

import style from "../nav-aside/aside.module.css";

export function Headnav() {
  const { minQuery, handleOpen, open } = useNavContext();

  const { hovered, onMouseEnter, onMouseLeave } = useHoveredElement();

  return (
    <header
      id="header-nav"
      className="h-[--navbar] flex items-center justify-between py-4 md:px-5 xl:px-6 border-0 border-b-[0.04rem] border-b-muted/75 sticky top-0 inset-x-0 z-[88] w-full backdrop-blur bg-background/95 supports-[backdrop-filter]:bg-background/60"
    >
      <Element className="w-full relative flex items-center mx-auto max-w-screen-3xl px-4 3xl:px-20">
        <ButtonAside
          query={minQuery}
          open={open}
          onClick={handleOpen}
          className="max-md:data-[state=open]:translate-x-[212px] max-md:data-[state=open]:opacity-0"
        />
        <LinkHome
          open={open}
          className="max-md:ml-4 [transition:all_0.5s_ease] max-md:data-[state=open]:translate-x-[-32px] max-md:data-[state=open]:opacity-0"
        />

        <div className="relative h-full hidden md:flex items-center justify-between text-muted-foreground font-medium text-sm ml-10 overflow-hidden rounded-sm mr-auto">
          <div
            role="button"
            className="cursor-pointer select-none py-1 px-2 h-6 rounded-sm centered"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            Products
          </div>
          <div
            role="button"
            className="cursor-pointer select-none py-1 px-2 h-6 rounded-sm centered"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            Contacts
          </div>
          <div
            role="button"
            className="cursor-pointer select-none py-1 px-2 h-6 rounded-sm centered"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            Generators
          </div>
          <div
            role="button"
            className="cursor-pointer select-none py-1 px-2 h-6 rounded-sm centered"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            Docs
          </div>

          {hovered && (
            <Element
              el="span"
              className="absolute -z-1 transition-transform bg-muted rounded-sm"
              style={{
                transition: "transform 180ms, width 90ms",
                height: `${hovered.height}px`,
                width: `${hovered.width}px`,
                transform: `translateX(${hovered.x - 193.5}px)`,
                // transform: `translateY(${hovered?.y - ((minQuery ? 72 : 64) - scrollPosition - (scrollBody >= 1930 ? scrollBody - 1930 : 0))}px)`,
              }}
            />
          )}
        </div>
        <div />
      </Element>
    </header>
  );
}

export function LinkHome({ open, className }: { open?: boolean; className?: string }) {
  return (
    <Link
      href={"/"}
      aria-label="ioeri"
      data-state={open ? "open" : "closed"}
      className={twMerge("rounded-lg py-1 px-2", className)}
    >
      <IoeriLogoTextIcon size={20} />
    </Link>
  );
}

export function ButtonAside({
  query,
  open,
  onClick,
  className,
}: {
  query: boolean | undefined;
  open?: boolean;
  onClick: () => void;
  className?: string;
}) {
  if (query) {
    return null;
  }
  return (
    <button
      type="button"
      onClick={onClick}
      data-state={open ? "open" : "closed"}
      aria-label={[open ? "Close" : "Open", "Menu"].join(" ")}
      className={twMerge(style.aside_toggle, className)}
    >
      <LineMenuBarIcon data-state={open ? "open" : "closed"} />
    </button>
  );
}
