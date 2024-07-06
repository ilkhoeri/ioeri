"use client";

import * as React from "react";

import { Anchor } from "./anchor";
import { UnstyledButton } from "./button";

import { twMerge } from "tailwind-merge";
import { useClipboard, useScroll } from "@/resource/docs/hooks";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/modules/components/web";
import { ChevronDownSquareIcon, GithubIcon, CheckIcon, CopyIcon } from "@/resource/docs/icons";
import { tocopy } from "../utils";
import globalStyle from "../styles/styles";

export const GetCodeToggle = React.forwardRef<
  React.ElementRef<typeof Anchor>,
  Omit<React.ComponentPropsWithoutRef<typeof Anchor>, "href"> & {
    repo?: string & NonNullable<unknown>;
    href?: string & NonNullable<unknown>;
  }
>(({ className, href, repo, ...props }, ref) => {
  if (!repo) {
    return null;
  }
  return (
    <Tooltip side="left" sideOffset={6}>
      <TooltipTrigger asChild>
        <Anchor
          ref={ref}
          {...props}
          href={href || `https://github.com/ilkhoeri/ioeri/blob/main/resource/docs/${repo}`}
          tabIndex={-1}
          title="Get Code"
          className={globalStyle({ toggle: "item", size: "icon-xs" }, className)}
        >
          <GithubIcon className="size-5" />
        </Anchor>
      </TooltipTrigger>

      <TooltipContent className="flex flex-col">
        <span>Repository</span>
      </TooltipContent>
    </Tooltip>
  );
});
GetCodeToggle.displayName = "GetCodeToggle";

export const CopyToggle = React.forwardRef<
  React.ElementRef<typeof UnstyledButton>,
  React.ComponentPropsWithoutRef<typeof UnstyledButton> & { text: string | null | undefined }
>(({ text, className, ...props }, ref) => {
  const clipboard = useClipboard({ timeout: 1000 });
  return (
    <Tooltip side="left" sideOffset={6}>
      <TooltipTrigger asChild>
        <UnstyledButton
          ref={ref}
          {...props}
          tabIndex={-1}
          onClick={() => {
            if (text) {
              clipboard.copy(tocopy(text));
            }
          }}
          disabled={!text}
          className={globalStyle(
            { toggle: "item", size: "icon-xs" },
            clipboard.copied ? "bg-muted" : "bg-background",
            className,
          )}
        >
          {clipboard.copied ? (
            <CheckIcon className="size-5 animate-fade-in fade-in-0 zoom-in-0 [animation-duration:150ms]" />
          ) : (
            <CopyIcon className="size-5" />
          )}
        </UnstyledButton>
      </TooltipTrigger>

      <TooltipContent className="flex flex-col">
        <span>Copy</span>
      </TooltipContent>
    </Tooltip>
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
        "size-8 p-0.5 fixed bottom-4 right-4 mr-[--scrollbar-space,var(--has-scrollbar)] z-[99] flex items-center justify-center cursor-pointer select-none outline-0 disabled:pointer-events-none disabled:opacity-50 text-muted-foreground/90 backdrop-blur supports-[backdrop-filter]:bg-background/40 bg-background/40 border border-muted-foreground/40 rounded-xl capitalize transition-none duration-0 [&_svg]:size-full",
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
