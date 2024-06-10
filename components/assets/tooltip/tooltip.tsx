"use client";

import * as React from "react";

import { TooltipArrow, TooltipContent, TooltipRoot, TooltipTrigger } from "./tooltip-core";
import { useTooltip } from "./utils-tooltip";
import { twMerge } from "tailwind-merge";

import type { TooltipProps, HTMLAttributes } from "./types-tooltip";

const Tooltip = React.forwardRef<HTMLElement, HTMLAttributes & TooltipProps>(
  (
    {
      el,
      open,
      setOpen,
      tooltip,
      children,
      className,
      classNames,
      style,
      styles,
      unstyled,
      withArrow,
      sideOffset = 11,
      asChild = true,
      trigger = "hover",
      align = "center",
      side = "top",
      ...props
    },
    ref,
  ) => {
    const { isOpen, onClick, onMouseEnter, onMouseLeave } = useTooltip({ trigger, open, setOpen });

    const attrRoot = {
      ref,
      el,
      unstyled,
      onClick,
      onMouseEnter,
      onMouseLeave,
      className: twMerge(className, classNames?.root),
      style: { ...style, ...styles?.root },
      ...props,
    };

    const attrTrigger = {
      asChild,
      "data-trigger": trigger,
      "data-side": side,
      "data-align": align,
      unstyled,
      className: twMerge(classNames?.trigger),
      style: { ...styles?.trigger },
      // onKeyDown,
    };

    const attrContent = {
      align,
      sideOffset,
      open: open || isOpen,
      side,
      unstyled,
      className: twMerge(classNames?.content),
      style: { ...styles?.content },
      onMouseEnter,
      onMouseLeave,
    };

    const attrArrow = {
      withArrow,
      side,
      align,
      unstyled,
      className: twMerge(classNames?.arrow),
      style: { ...styles?.arrow },
    };

    return (
      <TooltipRoot {...attrRoot}>
        <TooltipTrigger {...attrTrigger}>{children}</TooltipTrigger>
        <TooltipContent {...attrContent}>
          {tooltip}
          <TooltipArrow {...attrArrow} />
        </TooltipContent>
      </TooltipRoot>
    );
  },
);
Tooltip.displayName = "Tooltip";

export default Tooltip;
