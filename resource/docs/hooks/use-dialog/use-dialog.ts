import { useEffect, useState } from "react";
import { OriginState, createRefs, useClickOutside, type OriginType } from "@/resource/docs/hooks";
import { InitialInfo, RectElement } from "../use-element-info/use-element-info";

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

export type VALDIALOG = {
  defaultOpen?: boolean;
  open?: boolean;
  setOpen?: (value: boolean) => void;
  clickOutsideToClose?: boolean;
};

export type DIRDIALOG = {
  align?: `${AlignValues}`;
  side?: `${SideValues}`;
  sideOffset?: number;
  info?: Partial<RectElement>;
};

export interface UseDialogType<T> extends VALDIALOG, DIRDIALOG {
  ref?: React.MutableRefObject<T | null>;
}

export function useDialog<T extends HTMLElement = any>(Dialog: UseDialogType<T> = {}) {
  const {
    ref,
    side = "bottom",
    align = "center",
    sideOffset = 0,
    defaultOpen,
    open: externalOpen,
    setOpen: externalSetOpen,
    clickOutsideToClose = false,
  } = Dialog;

  const [openState, setOpenState] = useState(defaultOpen);
  const open = externalOpen !== undefined ? externalOpen : openState;
  const setOpen = externalSetOpen !== undefined ? externalSetOpen : setOpenState;

  const [render, setRender] = useState(open);
  const [initialOpen, setInitialOpen] = useState(false);

  const refs = createRefs<T, OriginState>(Object.values(OriginState), ref);

  const triggerInfo = useRectInfo<T>(refs?.trigger?.current);
  const contentInfo = useRectInfo<T>(refs?.content?.current);

  useEffect(() => {
    if (open !== defaultOpen) {
      setInitialOpen(true);
    }
  }, [open, defaultOpen]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    if (open) {
      setRender(true);
    } else {
      timeoutId = setTimeout(() => {
        setRender(false);
      }, 100);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [open, setRender]);

  useClickOutside(() => clickOutsideToClose && setOpen(false), [refs.trigger, refs.content]);

  const dataState = open ? (initialOpen ? "open" : "opened") : "closed";

  const attrData = (as: OriginType): { [key: string]: string } => ({
    "data-state": dataState,
    "data-side": side,
    "data-align": align,
    "data-origin": as,
  });

  const styles = (as: OriginType): { [key: string]: string } => {
    const vars: { [key: string]: string } = {};
    const setVars = (as: OriginType, info?: RectElement) => {
      if (info) {
        vars[`--${as}-h`] = `${info.height}px`;
        vars[`--${as}-w`] = `${info.width}px`;
        vars[`--${as}-x`] = `${info.x}px`;
        vars[`--${as}-y`] = `${info.y}px`;
      }
    };
    switch (as) {
      case "root":
        vars["--offset"] = `${sideOffset}px`;
        setVars("trigger", triggerInfo);
        setVars("content", contentInfo);
        break;
      case "trigger":
        setVars(as, triggerInfo);
        break;
      case "content":
        setVars(as, contentInfo);
        break;
    }
    return vars;
  };

  return { refs, styles, triggerInfo, attrData, render, side, align, open, setOpen };
}
export function useRectInfo<T extends HTMLElement | null>(
  element: T | null,
  { initial: setInitial }: InitialInfo = {},
) {
  const defaultInitial: { [key: string]: 0 } = {};
  const initial = setInitial !== undefined ? setInitial : defaultInitial;
  const [rectInfo, setRectInfo] = useState<RectElement>(initial as RectElement);

  useEffect(() => {
    const updateRectElement = () => {
      if (element) {
        const rect = element?.getBoundingClientRect();
        setRectInfo({
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

    updateRectElement();

    window.addEventListener("resize", updateRectElement);
    window.addEventListener("scroll", updateRectElement);

    return () => {
      window.removeEventListener("resize", updateRectElement);
      window.removeEventListener("scroll", updateRectElement);
    };
  }, [element, setRectInfo]);

  return rectInfo;
}
