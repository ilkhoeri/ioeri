"use client";
import * as React from "react";
import { useClickOutside } from "../../hooks/use-click-outside/use-click-outside";

import type {
  DestructureCollapsibleType,
  StylesCollapsibleVarsType,
  UseCollapsibleProps,
  UseCollapsibleType,
} from "./types";

export function useCollapsible({
  trigger,
  open: externalOpen,
  setOpen: externalSetOpen,
  side = "bottom",
  align = "center",
  sideOffset = 0,
}: UseCollapsibleType = {}) {
  const [internalOpen, internalSetOpen] = React.useState(false);
  const open = externalOpen !== undefined ? externalOpen : internalOpen;
  const setOpen = externalSetOpen !== undefined ? externalSetOpen : internalSetOpen;
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

  const refClickOutside = useClickOutside(() => {
    if (trigger === "click") {
      setOpen(false);
    }
  });

  const onClick = () => {
    if (trigger === "click") {
      setOpen(true);
    }
  };
  const onMouseEnter = () => {
    if (trigger === "hover") {
      setOpen(true);
    }
  };
  const onMouseLeave = () => {
    if (trigger === "hover") {
      setOpen(false);
    }
  };
  const onKeyDown = () => {
    (e: React.KeyboardEvent<HTMLElement>) => e.key === "Enter" && onClick();
  };

  const attr = (as: string) => ({
    "data-state": open ? "open" : "closed",
    "data-side": side,
    "data-align": align,
    "data-collapse": as,
  });

  return {
    attr,
    refClickOutside,
    open,
    setOpen,
    shouldRender,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onKeyDown,
    side,
    align,
    sideOffset,
  };
}

export const stylesCollapsibleVars = (
  order: StylesCollapsibleVarsType,
  { align, side, sideOffset = 0 }: DestructureCollapsibleType,
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
          // vars.bottom = sider;
          start && (vars.left = "0px");
          end && (vars.right = "0px");
          break;
        case "right":
          // vars.left = sider;
          start && (vars.top = "0px");
          end && (vars.bottom = "0px");
          // inX("-0.5rem");
          // outX("-1rem");
          break;
        case "bottom":
          // vars.top = sider;
          start && (vars.left = "0px");
          end && (vars.right = "0px");
          break;
        case "left":
          // vars.right = sider;
          start && (vars.top = "0px");
          end && (vars.bottom = "0px");
          // inX("0.5rem");
          // outX("1rem");
          break;
      }
      break;
  }

  return vars;
};
