import { RefObject, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  useFixed,
  useHotkeys,
  createRefs,
  useClickOutside,
  RectElement,
  useElementInfo,
  useHover,
  useTrigger,
} from "@/modules/hooks";

export enum DataOrigin {
  Root = "root",
  Trigger = "trigger",
  Content = "content",
  Overlay = "overlay",
}
export enum DataAlign {
  start = "start",
  center = "center",
  end = "end",
}
export enum DataSide {
  top = "top",
  right = "right",
  bottom = "bottom",
  left = "left",
}
export enum DataState {
  open = "open",
  opened = "opened",
  closed = "closed",
}
export enum DataTrigger {
  hover = "hover",
  click = "click",
}

export type UseOpenStateType<T> = {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (value: boolean) => void;
  delay?: number;
  modal?: boolean;
  clickOutsideToClose?: boolean;
  trigger?: `${DataTrigger}`;
  ref?: RefObject<T>;
  info?: Partial<RectElement>;
  align?: `${DataAlign}`;
  side?: `${DataSide}`;
  sideOffset?: number;
  hotKeys?: "/" | "M" | "ctrl+J" | "ctrl+K" | "alt+mod+shift+X" | (string & {});
  base?: boolean;
  touch?: boolean;
  popstate?: boolean;
};

export function useOpenState<T extends HTMLElement = any>(OpenState: UseOpenStateType<T> = {}) {
  const {
    ref,
    sideOffset = 0,
    delay,
    open: openChange,
    onOpenChange,
    hotKeys = "",
    trigger = "click",
    align = "center",
    side = "bottom",
    base = false,
    touch = false,
    popstate = false,
    defaultOpen = false,
    clickOutsideToClose = false,
    modal = false,
  } = OpenState;

  const refs = createRefs<T, `${DataOrigin}`>(Object.values(DataOrigin), ref);

  const {
    open,
    toggle,
    render,
    setOpen,
    initialOpen,
    ref: handleRef,
  } = useTrigger<T>(trigger === "click" ? [refs?.trigger?.current] : undefined, {
    delay,
    popstate,
    defaultOpen,
    open: trigger === "click" ? openChange : undefined,
    setOpen: trigger === "click" ? onOpenChange : undefined,
  });

  useHover<T>(
    trigger === "hover" ? [refs?.trigger?.current, refs?.content?.current] : undefined,
    trigger === "hover" ? { open, setOpen, touch } : { open: undefined, setOpen: undefined, touch: undefined },
  );

  const bounding = {
    trigger: useElementInfo<T>(refs?.trigger?.current),
    content: useElementInfo<T>(refs?.content?.current),
  };

  useHotkeys([[hotKeys, () => setOpen(!open)]]);

  useFixed(render, { modal, delay });

  useClickOutside(() => clickOutsideToClose && setOpen(false), [refs.trigger, refs.content]);

  const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLElement>) => e.key === "Enter" && toggle(), [toggle]);

  const state = open ? (initialOpen ? "open" : "opened") : "closed";

  const styleAt = (as: `${DataOrigin}`, { style }: { style?: React.CSSProperties & { [key: string]: any } } = {}) => ({
    ...getAttributes(as, state, align, side, base),
    style: {
      ...style,
      ...styles(as, sideOffset, bounding.trigger.rect, bounding.content.rect),
    },
  });

  return {
    refs,
    handleRef,
    render,
    open,
    setOpen,
    Portal,
    toggle,
    onKeyDown,
    state,
    bounding,
    styleAt,
    styles,
    side,
    align,
  };
}

function Portal({
  portal = true,
  children,
  container,
  key,
}: {
  portal?: boolean;
  children: React.ReactNode;
  container: Element | DocumentFragment | null;
  key?: null | string;
}) {
  if (typeof document === "undefined") return null;
  return portal ? createPortal(children, container || document.body, key) : children;
}

const getAttributes = (
  origin: `${DataOrigin}`,
  state: `${DataState}`,
  align?: `${DataAlign}`,
  side?: `${DataSide}`,
  base: boolean = false,
): { [key: string]: string } => {
  const attrs: { [key: string]: string } = {
    "data-origin": origin,
    "data-state": state,
  };
  if (!base) {
    if (align) attrs["data-align"] = align;
    if (side) attrs["data-side"] = side;
  }
  return attrs;
};

const setVars = (as: `${DataOrigin}`, vars: { [key: string]: string }, info?: RectElement) => {
  if (info) {
    const properties = ["height", "width", "x", "y", "right", "bottom"] as const;
    properties.forEach((key) => {
      if (info[key] !== undefined) {
        vars[`--${as}-${key[0]}`] = `${info[key]}px`;
      }
    });
  }
};

const styles = (
  as: `${DataOrigin}`,
  sideOffset: number,
  triggerRect: RectElement,
  contentRect: RectElement,
): { [key: string]: string } => {
  const vars: { [key: string]: string } = {};
  switch (as) {
    case "root":
      vars["--offset"] = `${sideOffset}px`;
      setVars("trigger", vars, triggerRect);
      setVars("content", vars, contentRect);
      break;
    case "trigger":
      setVars(as, vars, triggerRect);
      break;
    case "content":
      vars["--offset"] = `${sideOffset}px`;
      setVars("trigger", vars, triggerRect);
      setVars("content", vars, contentRect);
      break;
  }
  return vars;
};
