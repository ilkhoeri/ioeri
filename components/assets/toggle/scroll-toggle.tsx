"use client";

import React from "react";
import { twMerge } from "tailwind-merge";
import { ChevronDownSquareIcon, useScroll } from "@/modules";
import { UnstyledButton } from "@/components/ui/button";

interface ScrollToggleProps
  extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}

export function ScrollToggle({ className, ...rest }: ScrollToggleProps) {
  const { bottom, scrollWindow, mounted } = useScroll();
  // const [hovered, setHovered] = React.useState(false);
  // const visible = hovered || isScroll;

  if (!mounted) {
    return null;
  }

  const label = bottom ? "Scroll to Top" : "Scroll to Bottom";
  return (
    <UnstyledButton
      aria-label={label}
      tabIndex={-1}
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
      {...rest}
    >
      <ChevronDownSquareIcon style={{ rotate: bottom ? "180deg" : "0deg", transition: "rotate 0.3s" }} />
    </UnstyledButton>
  );
}
