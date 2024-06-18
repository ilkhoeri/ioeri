import { useOpenState, useRectInfo, type OriginType } from "@/modules/hooks";
import { RectElement } from "../use-element-info/use-element-info";

export type AlignValuesType = "center" | "start" | "end";
export type SideValuesType = "top" | "right" | "bottom" | "left";

export type IntrinsicUseDialog = {
  defaultOpen?: boolean;
  open?: boolean;
  setOpen?: (value: boolean) => void;
  clickOutsideToClose?: boolean;
};

export type DestructureUseDialog = {
  align?: AlignValuesType;
  side?: SideValuesType;
  sideOffset?: number;
  info?: Partial<RectElement>;
};

export interface UseDialogType<T> extends IntrinsicUseDialog, DestructureUseDialog {
  ref?: React.MutableRefObject<T | null>;
}

export interface DialogContextProps<T> extends UseDialogType<T> {
  refs: Partial<Record<OriginType, React.MutableRefObject<T | null>>>;
  render: boolean;
  setOpen: (value: boolean) => void;
  attrData: (as: OriginType) => { [key: string]: string };
  styles: (as: OriginType) => { [key: string]: string };
}

export function useDialog<T extends HTMLElement>(Dialog: UseDialogType<T> = {}) {
  const { side = "bottom", align = "center", open: externalOpen, setOpen: externalSetOpen, sideOffset = 0 } = Dialog;
  const { refs, render, dataState, open, setOpen } = useOpenState<T>({
    open: externalOpen,
    setOpen: externalSetOpen,
    ...Dialog,
  });

  const triggerInfo = useRectInfo<T>(refs?.trigger?.current);
  const contentInfo = useRectInfo<T>(refs?.content?.current);

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
