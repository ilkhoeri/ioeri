import { RefObject, useEffect, useState } from "react";
import { useHasScrollbar, useWidthScrollbar, useHotkeys, createRefs } from "@/resource/docs/hooks";

export enum OriginState {
  Root = "root",
  Trigger = "trigger",
  Content = "content",
  Overlay = "overlay",
}
export type TriggerType = "hover" | "click";
export type OriginType = `${OriginState}`;

export type UseOpenStateType<T> = {
  defaultOpen?: boolean;
  open?: boolean;
  setOpen?: (value: boolean) => void;
  durationClose?: number;
  widthHasScrollbar?: boolean;
  clickOutsideToClose?: boolean;
  hotKeys?: "/" | "M" | "ctrl+J" | "ctrl+K" | "alt+mod+shift+X" | (string & {});
  trigger?: TriggerType;
  ref?: RefObject<T>;
};

export function useOpenState<T>(OpenState: UseOpenStateType<T> = {}) {
  const {
    ref,
    defaultOpen = false,
    open: externalOpen,
    setOpen: externalSetOpen,
    hotKeys = "",
    trigger = "click",
    durationClose = 100,
    widthHasScrollbar = false,
    clickOutsideToClose = false,
  } = OpenState;

  const [openState, setOpenState] = useState(defaultOpen);
  const open = externalOpen !== undefined ? externalOpen : openState;
  const setOpen = externalSetOpen !== undefined ? externalSetOpen : setOpenState;

  const [render, setRender] = useState(open);
  const [initialOpen, setInitialOpen] = useState(false);
  const [hasScrollbar, scrollbarWidth] = useHasScrollbar();

  const refs = createRefs<T, OriginState>(Object.values(OriginState), ref);

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

  useEffect(() => {
    const root = refs?.root?.current as HTMLElement;
    const trigger = refs?.trigger?.current as HTMLElement;
    const content = refs?.content?.current as HTMLElement;
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
  }, [open, clickOutsideToClose, setOpen, refs.content, refs.root, refs.trigger]);

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

  useWidthScrollbar({ open, widthHasScrollbar, hasScrollbar, scrollbarWidth, durationClose });

  const dataState = open ? (initialOpen ? "open" : "opened") : "closed";

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
  };
}
