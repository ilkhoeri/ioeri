import { useEffect, useState } from "react";
import { useClickOutside } from "../use-click-outside/use-click-outside";
import { useHasScrollbar, useWidthScrollbar } from "../use-has-scrollbar/use-has-scrollbar";
import { useHotkeys } from "../use-hotkeys/use-hotkeys";

export type OpenStateTriggerType = "hover" | "click";

export type UseOpenStateType = {
  defaultOpen?: boolean;
  open?: boolean;
  setOpen?: (value: boolean) => void;
  durationClose?: number;
  widthHasScrollbar?: boolean;
  hotKeys?: "/" | "M" | "ctrl+J" | "ctrl+K" | "alt+mod+shift+X" | (string & {});
  trigger?: OpenStateTriggerType;
};

export function useOpenState(OpenState: UseOpenStateType = {}) {
  const {
    defaultOpen = false,
    open: externalOpen,
    setOpen: externalSetOpen,
    hotKeys = "",
    trigger = "click",
    durationClose = 100,
    widthHasScrollbar = false,
  } = OpenState;

  const [openState, setOpenState] = useState(defaultOpen);
  const open = externalOpen !== undefined ? externalOpen : openState;
  const setOpen = externalSetOpen !== undefined ? externalSetOpen : setOpenState;

  const [render, setRender] = useState(open);
  const [initialOpen, setInitialOpen] = useState(false);
  const [hasScrollbar, scrollbarWidth] = useHasScrollbar();

  const ref = useClickOutside(() => setOpen(false));
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
  }, [open, durationClose, setRender]);

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
    ref,
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
