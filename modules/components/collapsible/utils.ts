"use client";
import * as React from "react";

import type { CollapsibleTrees, DestructureCollapsibleType, ElementInfo, UseCollapsibleType } from "./types";

export function useCollapsible({
  side = "bottom",
  align = "center",
  defaultOpen = false,
  open: externalOpen,
  setOpen: externalSetOpen,
  clickOutsideToClose = false,
}: UseCollapsibleType = {}) {
  const [internalOpen, internalSetOpen] = React.useState(defaultOpen);
  const open = externalOpen !== undefined ? externalOpen : internalOpen;
  const setOpen = externalSetOpen !== undefined ? externalSetOpen : internalSetOpen;
  const [shouldRender, setShouldRender] = React.useState(open);

  const triggerRef = React.useRef<HTMLElement | null>(null);

  const defaultValueInfo = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    scrollX: 0,
    scrollY: 0,
  };

  const [triggerInfo, setTriggerInfo] = React.useState<ElementInfo>(defaultValueInfo);

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
  }, [open, setOpen, clickOutsideToClose]);

  React.useEffect(() => {
    const updateTriggerInfo = () => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        setTriggerInfo({
          scrollX: window.scrollX,
          scrollY: window.scrollY,
          x: rect.left + window.scrollX,
          y: rect.top + window.scrollY,
          width: rect.width,
          height: rect.height,
          top: rect.top,
          bottom: rect.bottom,
          right: rect.right,
          left: rect.left,
        });
      }
    };
    updateTriggerInfo();

    window.addEventListener("resize", updateTriggerInfo);
    window.addEventListener("scroll", updateTriggerInfo);

    return () => {
      window.removeEventListener("resize", updateTriggerInfo);
      window.removeEventListener("scroll", updateTriggerInfo);
    };
  }, []);

  React.useEffect(() => {
    const root = document.querySelector("[data-collapse=root]") as HTMLElement;
    const trigger = document.querySelector("[data-collapse=trigger]") as HTMLElement;
    const content = document.querySelector("[data-collapse=content]") as HTMLElement;
    const clickOutsideHandler = (event: MouseEvent) => {
      if (
        open &&
        clickOutsideToClose &&
        !root?.contains(event.target as Node) &&
        !trigger?.contains(event.target as Node) &&
        !content?.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open && clickOutsideToClose) {
      document.addEventListener("click", clickOutsideHandler);
    }

    return () => {
      document.removeEventListener("click", clickOutsideHandler);
    };
  }, [open, clickOutsideToClose, setOpen]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") setOpen(!open);
  };

  const attr = (as: string) => ({
    "data-state": open ? "open" : "closed",
    "data-side": side,
    "data-align": align,
    "data-collapse": as,
  });

  return {
    triggerRef,
    triggerInfo,
    attr,
    shouldRender,
    onKeyDown,
    side,
    align,
    open,
    setOpen,
    clickOutsideToClose,
    defaultOpen,
  };
}

export const stylesCollapsibleVars = (
  order: CollapsibleTrees,
  { align, side, sideOffset = 0, triggerInfo }: DestructureCollapsibleType,
): { [key: string]: string } => {
  const vars: { [key: string]: string } = {};

  const setTriggerVars = (info?: ElementInfo) => {
    if (info) {
      vars["--trigger-h"] = `${info.height}px`;
      vars["--trigger-w"] = `${info.width}px`;
      vars["--trigger-x"] = `${info.x}px`;
      vars["--trigger-y"] = `${info.y}px`;
    }
  };

  // const sider = "calc(100% + var(--side-offset))";
  const start = align === "start";
  const end = align === "end";
  // const inX = (i: string) => (vars["--tw-enter-translate-x"] = String(i));
  // const outX = (o: string) => (vars["--tw-exit-translate-x"] = String(o));

  switch (order) {
    case "root":
      vars["--offset"] = String(`${sideOffset}px`);
      setTriggerVars(triggerInfo);
      break;

    case "trigger":
      setTriggerVars(triggerInfo);
      break;

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
