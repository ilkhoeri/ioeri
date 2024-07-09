"use client";

import Link from "next/link";
import Element from "@/library/components/element";
import { DiscordIcon, GithubIcon, IoeriTextIcon, LineMenuBarIcon } from "@/modules/icons";
import { useHoveredElement } from "@/library/hooks/use-hovered-element";
import { useNavContext } from "../hooks/use-nav";
import { CommandDialog, CommandDialogType } from "./command-dialog";
import { appRoutes } from "@/library/routes";
import { NavLinkItem } from "./nav-link";
import { twMerge } from "tailwind-merge";

import style from "./aside.module.css";
import globalStyle from "../styles/styles";

export function Headnav({ routes }: CommandDialogType) {
  const { minQuery, toggle, pathname, open } = useNavContext();

  const { hovered, onMouseEnter, onMouseLeave } = useHoveredElement();

  return (
    <header
      data-dom="header-nav"
      className={twMerge(
        "h-[--navbar] flex items-center justify-between py-4 md:px-5 xl:px-6 border-0 border-b-[0.04rem] border-b-muted/75 sticky top-0 inset-x-0 z-[--z,88] w-full backdrop-blur bg-background/95 supports-[backdrop-filter]:bg-background/60",
        pathname === "/" && open && "[--z:0]",
      )}
    >
      <Element className="w-full relative flex items-center mx-auto max-w-screen-3xl px-4 3xl:px-20">
        <LinkHome
          open={open}
          className="[transition:all_0.5s_ease] max-md:data-[state=open]:translate-x-[-32px] max-md:data-[state=open]:opacity-0"
        />

        <div className="relative h-full hidden md:flex items-center justify-between font-medium text-sm ml-10 overflow-hidden rounded-sm mr-auto">
          {appRoutes["services"].map((i, index) => (
            <Link
              key={index}
              href={i.href}
              role="button"
              className="cursor-pointer select-none py-1 px-2 h-6 rounded-sm centered text-muted-foreground hover:text-color transition-colors"
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            >
              <span>{i.title}</span>
            </Link>
          ))}

          {hovered && (
            <Element
              el="span"
              className="absolute -z-1 bg-muted rounded-sm animate-fade-in fade-in-0 zoom-in-90 [animation-duration:90ms]"
              style={{
                transition: "background-color 180ms, transform 180ms, width 90ms",
                height: `${hovered.height}px`,
                width: `${hovered.width}px`,
                transform: `translateX(calc(${hovered.x}px - var(--tolerance)))`,
                "--tolerance": "151.5px",
                // transform: `translateY(${hovered?.y - ((minQuery ? 72 : 64) - scrollPosition - (scrollBody >= 1930 ? scrollBody - 1930 : 0))}px)`,
              }}
            />
          )}
        </div>

        <div className={globalStyle({ toggle: "group" }, "ml-auto [&_svg]:size-5 [&>:nth-child(1)]:mr-2")}>
          <CommandDialog routes={routes} />

          <NavLinkItem
            icon={GithubIcon}
            target="_blank"
            aria-label="github repository"
            href="https://github.com/ilkhoeri/ioeri"
            className={globalStyle({ toggle: "item", size: "icon-xs" })}
          />
          <NavLinkItem
            icon={DiscordIcon}
            target="_blank"
            aria-label="discord community"
            href="https://discord.gg/Xct5BBPDZ9"
            className={globalStyle({ toggle: "item", size: "icon-xs" })}
          />
        </div>

        <ButtonAside
          open={open}
          onClick={toggle}
          hidden={minQuery || pathname.split("/").filter(Boolean).includes("examples")}
          className="max-md:ml-6 max-md:data-[state=open]:translate-x-[212px] max-md:data-[state=open]:opacity-0"
        />
      </Element>
    </header>
  );
}

export function LinkHome({ open, className }: { open?: boolean; className?: string }) {
  return (
    <Link
      href="/"
      aria-label="ioeri"
      data-state={open ? "open" : "closed"}
      className={twMerge("rounded-lg py-1 px-2", className)}
    >
      <IoeriTextIcon size={14} />
    </Link>
  );
}

export function ButtonAside({
  hidden,
  open,
  onClick,
  className,
}: {
  hidden: boolean | undefined;
  open?: boolean;
  onClick: () => void;
  className?: string;
}) {
  if (hidden) {
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
