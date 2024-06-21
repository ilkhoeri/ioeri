"use client";

import * as React from "react";

import { Anchor } from "./anchor";
import { UnstyledButton } from "./button";

import { twMerge } from "tailwind-merge";
import { useClipboard, useScroll } from "@/modules/hooks";
import { ClipboardCheckIcon, ClipboardIcon, ChevronDownSquareIcon, GithubIcon } from "@/modules/icons";

export const GetCodeToggle = React.forwardRef<
  React.ElementRef<typeof Anchor>,
  Omit<React.ComponentPropsWithoutRef<typeof Anchor>, "href"> & {
    linkCode?: string & NonNullable<unknown>;
    href?: string & NonNullable<unknown>;
  }
>(({ className, href, linkCode, ...props }, ref) => {
  if (!linkCode) {
    return null;
  }
  return (
    <Anchor
      ref={ref}
      {...props}
      href={href || `https://github.com/ilkhoeri/modules/blob/main${linkCode}`}
      tabIndex={-1}
      className={twMerge(
        "centered p-1 rounded-md border bg-background-box absolute top-4 right-14 left-auto [&_svg]:sizer [--sz:20px] transition-colors text-muted-foreground hover:text-color",
        className,
      )}
    >
      <GithubIcon />
    </Anchor>
  );
});
GetCodeToggle.displayName = "GetCodeToggle";

export const CopyToggle = React.forwardRef<
  React.ElementRef<typeof UnstyledButton>,
  React.ComponentPropsWithoutRef<typeof UnstyledButton> & { text: string | null | undefined }
>(({ text, className, ...props }, ref) => {
  const clipboard = useClipboard({ timeout: 1500 });
  return (
    <UnstyledButton
      ref={ref}
      {...props}
      tabIndex={-1}
      onClick={() => clipboard.copy(text)}
      disabled={!text}
      className={twMerge(
        "centered p-1 rounded-md border absolute top-4 right-4 [&_svg]:sizer [--sz:20px] transition-colors text-muted-foreground hover:text-color",
        clipboard.copied ? "bg-background" : "bg-background-box",
        className,
      )}
    >
      {clipboard.copied ? <ClipboardCheckIcon /> : <ClipboardIcon />}
    </UnstyledButton>
  );
});
CopyToggle.displayName = "CopyToggle";

export const ScrollToggle = React.forwardRef<
  React.ElementRef<typeof UnstyledButton>,
  React.ComponentPropsWithoutRef<typeof UnstyledButton>
>(({ className, ...props }, ref) => {
  const { bottom, scrollWindow, mounted } = useScroll();
  // const [hovered, setHovered] = React.useState(false);
  // const visible = hovered || isScroll;

  if (!mounted) {
    return null;
  }

  const label = bottom ? "Scroll to Top" : "Scroll to Bottom";
  return (
    <UnstyledButton
      ref={ref}
      {...props}
      tabIndex={-1}
      aria-label={label}
      title={label}
      onClick={scrollWindow}
      // onMouseEnter={() => setHovered(true)}
      // onMouseLeave={() => setHovered(false)}
      className={twMerge(
        "size-8 p-0.5 fixed bottom-4 right-4 mr-[var(--scrollbar-space)] z-[99] flex items-center justify-center cursor-pointer select-none outline-0 disabled:pointer-events-none disabled:opacity-50 text-muted-foreground/90 backdrop-blur supports-[backdrop-filter]:bg-background/40 bg-background/40 border border-muted-foreground/40 rounded-xl capitalize transition-none duration-0 [&_svg]:size-full",
        "after:content-[''] after:absolute after:h-8 after:w-12 after:left-0",
        className,
      )}
      // style={{
      //   width: visible ? "32px" : "8px",
      //   transform: visible ? "translateX(0)" : "translateX(12px)",
      //   transition: "transform 0.3s, width 0.3s",
      // }}
    >
      <ChevronDownSquareIcon style={{ rotate: bottom ? "180deg" : "0deg", transition: "rotate 0.3s" }} />
    </UnstyledButton>
  );
});
ScrollToggle.displayName = "ScrollToggle";
