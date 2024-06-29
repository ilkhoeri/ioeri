import { useEffect, useState } from "react";
import { OriginState, createRefs, useRectInfo, type OriginType } from "@/modules/hooks";
import { RectElement } from "../use-element-info/use-element-info";

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

export type IntrinsicUseDialog = {
  defaultOpen?: boolean;
  open?: boolean;
  setOpen?: (value: boolean) => void;
  clickOutsideToClose?: boolean;
};

export type DestructureUseDialog = {
  align?: `${AlignValues}`;
  side?: `${SideValues}`;
  sideOffset?: number;
  info?: Partial<RectElement>;
};

export interface UseDialogType<T> extends IntrinsicUseDialog, DestructureUseDialog {
  ref?: React.MutableRefObject<T | null>;
}

export interface DialogContextProps<T> extends UseDialogType<T> {
  refs: Partial<Record<OriginType, React.MutableRefObject<T | null>>>;
  render?: boolean;
  setOpen: (value: boolean) => void;
  attrData: (as: OriginType) => { [key: string]: string };
  styles: (as: OriginType) => { [key: string]: string };
}

export function useDialog<T extends HTMLElement>(Dialog: UseDialogType<T> = {}) {
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        clickOutsideToClose &&
        open &&
        refs.root.current &&
        !refs.root.current.contains(event.target as Node) &&
        refs.trigger.current &&
        !refs.trigger.current.contains(event.target as Node) &&
        refs.content.current &&
        !refs.content.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (clickOutsideToClose) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      if (clickOutsideToClose) {
        document.removeEventListener("mousedown", handleClickOutside);
      }
    };
  }, [clickOutsideToClose, open, setOpen, refs.content, refs.trigger]);

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
        vars["--offset"] = String(`${sideOffset}px`);
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
