"use client";

import Link from "next/link";
import Element from "@/modules/components/web/element/element";
import { DiscordIcon, GithubIcon, IoeriTextIcon, LineMenuBarIcon } from "@/modules";
import { useHoveredElement } from "@/library/hooks/use-hovered-element";
import { useNavContext } from "../hooks/use-nav";
import { appRoutes } from "@/library/routes";
import { NavLinkItem } from "./nav-link";
import { twMerge } from "tailwind-merge";

import style from "./aside.module.css";
import globalStyle from "../styles/styles";

export function Headnav() {
  const { minQuery, handleOpen, isHome, open } = useNavContext();

  const { hovered, onMouseEnter, onMouseLeave } = useHoveredElement();

  return (
    <header
      id="header-nav"
      className={twMerge(
        "h-[--navbar] flex items-center justify-between py-4 md:px-5 xl:px-6 border-0 border-b-[0.04rem] border-b-muted/75 sticky top-0 inset-x-0 z-[--z,88] w-full backdrop-blur bg-background/95 supports-[backdrop-filter]:bg-background/60",
        isHome && open && "[--z:0]",
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

        <div className={globalStyle({ toggle: "group" }, "ml-auto [&_svg]:size-5")}>
          <NavLinkItem
            icon={GithubIcon}
            target="_blank"
            aria-label="github repository"
            href="https://github.com/ilkhoeri/ioeri"
            className={globalStyle({ toggle: "item", size: "icon" })}
          />
          <NavLinkItem
            icon={DiscordIcon}
            target="_blank"
            aria-label="discord community"
            href="https://discord.gg/Xct5BBPDZ9"
            className={globalStyle({ toggle: "item", size: "icon" })}
          />
        </div>

        <ButtonAside
          open={open}
          query={minQuery}
          onClick={handleOpen}
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