"use client";
import * as React from "react";

import type { TooltipContentType, StylesTooltipVarsType, UseTooltipType } from "./types-tooltip";

export function useTooltip({ trigger, open, setOpen }: UseTooltipType) {
  const [isOpen, setIsOpen] = React.useState(false);

  const onClick = () => {
    if (trigger === "click") {
      if (setOpen) {
        return setOpen(!open);
      } else {
        setIsOpen(open ? !open : !isOpen);
      }
    }
  };
  const onMouseEnter = () => {
    if (trigger === "hover") {
      if (setOpen) {
        return setOpen(true);
      } else {
        setIsOpen(true);
      }
    }
  };
  const onMouseLeave = () => {
    if (trigger === "hover") {
      if (setOpen) {
        return setOpen(false);
      } else {
        setIsOpen(false);
      }
    }
  };
  const onKeyDown = () => {
    (e: React.KeyboardEvent<HTMLElement>) => e.key === "Enter" && onClick();
  };

  return { isOpen, onClick, onMouseEnter, onMouseLeave, onKeyDown };
}

export function useTooltipContent({ open }: { open?: boolean }) {
  const [shouldRender, setShouldRender] = React.useState(open);

  React.useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    if (open) {
      setShouldRender(true);
    } else {
      timeoutId = setTimeout(() => {
        setShouldRender(false);
      }, 125);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [open]);

  return { shouldRender };
}

export const stylesTooltipVars = (
  order: StylesTooltipVarsType,
  { align, side, sideOffset = 0 }: TooltipContentType,
): { [key: string]: string } => {
  const vars: { [key: string]: string } = {};

  vars["--side-offset"] = String(`${sideOffset}px`);
  const sider = "calc(100% + var(--side-offset))";
  const start = align === "start";
  const end = align === "end";
  // const inX = (i: string) => (vars["--tw-enter-translate-x"] = String(i));
  // const outX = (o: string) => (vars["--tw-exit-translate-x"] = String(o));

  switch (order) {
    case "content":
      switch (side) {
        case "top":
          vars.bottom = sider;
          start && (vars.left = "0px");
          end && (vars.right = "0px");
          break;
        case "right":
          vars.left = sider;
          start && (vars.top = "0px");
          end && (vars.bottom = "0px");
          // inX("-0.5rem");
          // outX("-1rem");
          break;
        case "bottom":
          vars.top = sider;
          start && (vars.left = "0px");
          end && (vars.right = "0px");
          break;
        case "left":
          vars.right = sider;
          start && (vars.top = "0px");
          end && (vars.bottom = "0px");
          // inX("0.5rem");
          // outX("1rem");
          break;
      }
      break;

    case "arrow":
      switch (side) {
        case "top":
          vars.top = "100%";
          start && (vars.left = "0px");
          end && (vars.right = "0px");
          break;
        case "right":
          vars.left = "-1.1rem";
          vars.rotate = "90deg";
          start && (vars.top = "8px");
          end && (vars.bottom = "8px");
          break;
        case "bottom":
          vars.bottom = "100%";
          vars.rotate = "180deg";
          start && (vars.left = "0px");
          end && (vars.right = "0px");
          break;
        case "left":
          vars.right = "-1.1rem";
          vars.rotate = "-90deg";
          start && (vars.top = "8px");
          end && (vars.bottom = "8px");
          break;
      }
      break;
  }

  return vars;
};
