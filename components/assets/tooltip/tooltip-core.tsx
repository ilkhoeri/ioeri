"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
// import * as Portal from "@radix-ui/react-portal";

import type {
  ComponentType,
  HTMLAttributes,
  TooltipContentType,
  TooltipRootType,
  TooltipSharedType,
  TooltipTriggerType,
} from "./types-tooltip";
import { stylesTooltipVars, useTooltipContent } from "./utils-tooltip";

import { twMerge } from "tailwind-merge";

const TooltipRoot = React.forwardRef<HTMLElement, HTMLAttributes & TooltipRootType>(
  ({ className, el = "div", unstyled, ...props }, ref) => {
    let Root: ComponentType = el as ComponentType;
    const attrRoot = {
      ref,
      className: twMerge(!unstyled?.root && "relative flex items-center justify-center", className),
      ...props,
    };
    return <Root {...attrRoot} />;
  },
);
TooltipRoot.displayName = "TooltipTrigger";

const TooltipTrigger = React.forwardRef<HTMLElement, HTMLAttributes & TooltipTriggerType>(
  ({ className, asChild = true, unstyled, ...props }, ref) => {
    const As = asChild ? Slot : "div";
    return (
      <As
        ref={ref as React.RefObject<HTMLDivElement>}
        className={twMerge(!unstyled?.trigger && "[--ring-focus:#0000] relative", className)}
        {...props}
      />
    );
  },
);
TooltipTrigger.displayName = "TooltipTrigger";

const TooltipContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & TooltipContentType>(
  ({ className, open, side, align, sideOffset, unstyled, style, ...props }, ref) => {
    const { shouldRender } = useTooltipContent({ open });

    if (!shouldRender) {
      return null;
    }

    const top = side === "top";
    const right = side === "right";
    const bottom = side === "bottom";
    const left = side === "left";

    const attrContent = {
      ref,
      style: { ...stylesTooltipVars("content", { align, side, sideOffset }), ...style },
      "data-side": side,
      "data-state": open ? "open" : "closed",
      ...props,
    };

    /**
  return (
    <Portal.Root asChild>
      <div {...attrContent} />
    </Portal.Root>
  );
   */
    return (
      <div
        {...attrContent}
        className={twMerge(
          !unstyled?.content && [
            "absolute min-w-max z-[999] text-[13px] rounded-md border bg-background text-popover-foreground shadow-md outline-none animate-in focus-visible:ring-0 flex items-center justify-center py-1 px-2 w-max max-w-max data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=open]:fade-out data-[state=closed]:zoom-out-75 data-[state=closed]:[--tw-exit-opacity:0] [--ring-focus:#0000]",
            top && "data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:slide-out-to-bottom-4",
            right && "data-[side=right]:slide-in-from-left-2 data-[state=closed]:slide-out-to-left-4",
            bottom && "data-[side=bottom]:slide-in-from-top-2 data-[state=closed]:slide-out-to-top-4",
            left && "data-[side=left]:slide-in-from-right-2 data-[state=closed]:slide-out-to-right-4",
          ],
          className,
        )}
      />
    );
  },
);
TooltipContent.displayName = "TooltipContent";

const TooltipArrow: React.FC<TooltipSharedType & React.SVGProps<SVGSVGElement>> = ({
  align,
  side,
  withArrow,
  className,
  unstyled,
  sideOffset,
  style,
  ...props
}) => {
  const attrArrow = {
    style: { ...stylesTooltipVars("arrow", { align, side, sideOffset }), ...style },
    "data-side": side,
    fill: "none",
    viewBox: "0 0 14 6",
    xmlns: "http://www.w3.org/2000/svg",
    className: twMerge(!unstyled?.arrow && "absolute w-6 text-inherit", className),
    ...props,
  };
  const arrowPath = {
    fill: "currentColor",
    d: "M13.8284 0H0.17157C0.702003 0 1.21071 0.210714 1.58578 0.585787L5.58578 4.58579C6.36683 5.36684 7.63316 5.36683 8.41421 4.58579L12.4142 0.585786C12.7893 0.210714 13.298 0 13.8284 0Z",
  };

  if (!withArrow) {
    return null;
  }

  return (
    <svg {...attrArrow}>
      <path {...arrowPath} />
    </svg>
  );
};
TooltipArrow.displayName = "TooltipArrow";

export { TooltipRoot, TooltipTrigger, TooltipContent, TooltipArrow };
