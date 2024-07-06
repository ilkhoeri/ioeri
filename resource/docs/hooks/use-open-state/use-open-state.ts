import { RefObject, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  useHasScrollbar,
  useWidthScrollbar,
  useHotkeys,
  createRefs,
  useClickOutside,
  RectElement,
  useElementInfo,
  useHover,
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
  setOpen?: (value: boolean) => void;
  durationClose?: number;
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
};

export function useOpenState<T extends HTMLElement = any>(OpenState: UseOpenStateType<T> = {}) {
  const {
    ref,
    defaultOpen = false,
    open: externalOpen,
    setOpen: externalSetOpen,
    hotKeys = "",
    trigger = "click",
    durationClose = 100,
    clickOutsideToClose = false,
    modal: widthHasScrollbar = false,
    side = "bottom",
    align = "center",
    sideOffset = 0,
    base = false,
    touch = false,
  } = OpenState;

  const [openState, setOpenState] = useState(defaultOpen);
  const open = externalOpen !== undefined ? externalOpen : openState;
  const setOpen = externalSetOpen !== undefined ? externalSetOpen : setOpenState;
  const [initialOpen, setInitialOpen] = useState(false);
  const [render, setRender] = useState(open);
  const [hasScrollbar, scrollbarWidth] = useHasScrollbar();

  const refs = createRefs<T, `${DataOrigin}`>(Object.values(DataOrigin), ref);

  const bounding = {
    trigger: useElementInfo<T>(refs?.trigger?.current),
    content: useElementInfo<T>(refs?.content?.current),
  };

  useEffect(() => {
    if (open !== defaultOpen) {
      setInitialOpen(true);
    }
  }, [open, defaultOpen]);

  useEffect(() => {
    const historyPopState = () => {
      if (open) {
        setOpen(false);
      }
    };
    window.addEventListener("popstate", historyPopState);
    return () => {
      window.removeEventListener("popstate", historyPopState);
    };
  }, [open, setOpen]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    if (open) {
      setRender(true);
    } else {
      timeoutId = setTimeout(() => {
        setRender(false);
      }, durationClose - 15);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [open, durationClose, setRender, clickOutsideToClose]);

  useHover(
    trigger === "hover" ? refs?.trigger?.current : null,
    trigger === "hover" ? { open, setOpen, touch } : { open: undefined, setOpen: undefined, touch: undefined },
  );

  useHotkeys([[hotKeys, () => setOpen(!open)]]);

  useWidthScrollbar({ open: render, widthHasScrollbar, hasScrollbar, scrollbarWidth, durationClose });

  useClickOutside(() => clickOutsideToClose && setOpen(false), [refs.trigger, refs.content]);

  const handleOpen = () => {
    if (trigger === "click") {
      if (!open) {
        window.history.pushState({ open: true }, "");
      }
      setOpen(!open);
    }
  };
  const handleClose = () => {
    setTimeout(() => {
      setOpen(false);
    }, durationClose);
  };
  const onHandle = () => {
    if (!open) {
      window.history.pushState({ open: true }, "");
      setOpen(true);
    } else if (open) {
      window.history.back();
      setOpen(false);
    }
  };
  const onStartEnter = () => {
    if (trigger === "hover") {
      setOpen(true);
    }
  };
  const onEndLeave = () => {
    if (trigger === "hover") {
      setOpen(false);
    }
  };
  const onKeyDown = () => {
    (e: React.KeyboardEvent<HTMLElement>) => e.key === "Enter" && handleOpen();
  };

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
    render,
    open,
    setOpen,
    Portal,
    onHandle,
    handleOpen,
    handleClose,
    onStartEnter,
    onEndLeave,
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
