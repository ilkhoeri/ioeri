import { RefObject, useEffect, useState } from "react";
import { useHasScrollbar, useWidthScrollbar, useHotkeys, createRefs } from "@/resource/docs/hooks";
import { useClickOutside } from "../use-click-outside/use-click-outside";
import { InitialInfo, RectElement, useElementInfo } from "../use-element-info/use-element-info";

export enum OriginState {
  Root = "root",
  Trigger = "trigger",
  Content = "content",
  Overlay = "overlay",
}
export enum AlignValues {
  start = "start",
  center = "center",
  end = "end",
}
export enum SideValues {
  top = "top",
  right = "right",
  bottom = "bottom",
  left = "left",
}
export enum TriggerValues {
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
  trigger?: `${TriggerValues}`;
  ref?: RefObject<T>;
  // ref?: React.MutableRefObject<T | null>;
  info?: Partial<RectElement>;
  align?: `${AlignValues}`;
  side?: `${SideValues}`;
  sideOffset?: number;
  hotKeys?: "/" | "M" | "ctrl+J" | "ctrl+K" | "alt+mod+shift+X" | (string & {});
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
  } = OpenState;

  const [openState, setOpenState] = useState(defaultOpen);
  const open = externalOpen !== undefined ? externalOpen : openState;
  const setOpen = externalSetOpen !== undefined ? externalSetOpen : setOpenState;

  const [render, setRender] = useState(open);
  const [initialOpen, setInitialOpen] = useState(false);
  const [hasScrollbar, scrollbarWidth] = useHasScrollbar();

  const refs = createRefs<T, `${OriginState}`>(Object.values(OriginState), ref);

  const bounding = {
    trigger: useElementInfo<T>(refs?.trigger?.current),
    content: useElementInfo<T>(refs?.content?.current),
  };

  useHotkeys([[hotKeys, () => setOpen(!open)]]);

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

  const handleBack = () => {
    if (open) {
      window.history.back();
      setOpen(false);
    }
  };
  const onHandle = () => {
    if (!open) {
      window.history.pushState({ open: true }, "");
      setOpen(true);
    } else if (open) {
      handleBack();
    }
  };

  const handleClose = () => {
    setTimeout(() => {
      setOpen(false);
    }, durationClose);
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
    (e: React.KeyboardEvent<HTMLElement>) => e.key === "Enter" && handleOpen();
  };

  const dataState = open ? (initialOpen ? "open" : "opened") : "closed";

  const styles = (as: `${OriginState}`): { [key: string]: string } => {
    const vars: { [key: string]: string } = {};
    const setVars = (as: `${OriginState}`, info?: RectElement) => {
      if (info) {
        vars[`--${as}-h`] = `${info.height}px`;
        vars[`--${as}-w`] = `${info.width}px`;
        vars[`--${as}-x`] = `${info.x}px`;
        vars[`--${as}-y`] = `${info.y}px`;
        vars[`--${as}-r`] = `${info.right}px`;
        vars[`--${as}-b`] = `${info.bottom}px`;
      }
    };
    switch (as) {
      case "root":
        vars["--offset"] = `${sideOffset}px`;
        setVars("trigger", bounding.trigger.rect);
        setVars("content", bounding.content.rect);
        break;
      case "trigger":
        setVars(as, bounding.trigger.rect);
        break;
      case "content":
        vars["--offset"] = `${sideOffset}px`;
        setVars("trigger", bounding.trigger.rect);
        setVars("content", bounding.content.rect);
        break;
    }
    return vars;
  };

  const attrData = (as: `${OriginState}`): { [key: string]: string } => ({
    "data-state": dataState,
    "data-side": side,
    "data-align": align,
    "data-origin": as,
  });

  const styleAt = (as: `${OriginState}`) => ({ ...attrData(as), style: { ...styles(as) } });

  return {
    refs,
    render,
    open,
    setOpen,
    onHandle,
    handleBack,
    handleOpen,
    handleClose,
    onMouseEnter,
    onMouseLeave,
    onKeyDown,
    dataState,
    bounding,
    styleAt,
    attrData,
    styles,
    side,
    align,
  };
}
