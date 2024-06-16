"use client";

import { useEffect, useState } from "react";
import { useClickOutside } from "../use-click-outside/use-click-outside";
import { useHasScrollbar } from "../use-has-scrollbar/use-has-scrollbar";
import { useHotkeys } from "../use-hotkeys/use-hotkeys";
import { applyStateEffect, removeBodyProperty, setBodyProperty } from "../../function/attribute-property";

export type OpenStateTriggerType = "hover" | "click";

export type UseOpenStateType = {
  open?: boolean;
  setOpen?: (value: boolean) => void;
  /** @default 100 */
  durationClose?: number;
  /** menambah margin-right pada body ketika device desktop
   * @default false
   */
  widthHasScrollbar?: boolean;
  /**
   * ```js
  // ctrl + J and ⌘ + J to toggle color scheme
  // ctrl + K and ⌘ + K to search
    "/" | "M" | "ctrl+J" | "ctrl+K" | "alt+mod+shift+X"
    ```
  */
  hotKeys?: "/" | "M" | "ctrl+J" | "ctrl+K" | "alt+mod+shift+X" | (string & {});
  trigger?: OpenStateTriggerType;
};

/**
 * ```js
 * // usage
  const { handleOpen, handleClose } = useOpenState();
 * // or
  const [open, setOpen] = useState(false);
  const { handleOpen, handleClose } = useOpenState({ open, setOpen });
  
  onClick={handleOpen}
  onClick={handleClose}
 * ```
 * @returns ref, open, setOpen, handleOpen, handleClose
 */
export function useOpenState({
  open: externalOpen,
  setOpen: externalSetOpen,
  hotKeys = "",
  trigger = "click",
  durationClose = 100,
  widthHasScrollbar = false,
}: UseOpenStateType = {}) {
  const [openState, setOpenState] = useState(false);
  const open = externalOpen !== undefined ? externalOpen : openState;
  const setOpen = externalSetOpen !== undefined ? externalSetOpen : setOpenState;
  const [render, setRender] = useState(open);
  const [hasScrollbar, scrollbarWidth] = useHasScrollbar();

  const ref = useClickOutside(() => setOpen(false));
  useHotkeys([[hotKeys, () => setOpen(!open)]]);

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
  const onClick = () => {
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

  useEffectWidthScrollbar({ open, widthHasScrollbar, hasScrollbar, scrollbarWidth, durationClose });

  return {
    /**
   * ```js
   * // usage
    function Demo() {
      const {open, ref, handleOpen} = useOpenState();

      return (
        <>
          <button onClick={handleOpen}>Open dropdown</button>

          {open && (
            <Paper ref={ref} shadow="sm">
              <span>Click outside to close</span>
            </Paper>
          )}
        </>
      );
    }
  * ```
  * @returns setOpen(false)
  */
    ref,
    /** // sample
  ```js
    if (!render) {
      return null;
    }
  ```
  */
    render,
    /** @return boolean */
    open,
    /** ```js
     * <button
     *   type="button"
     *   onClick={() => {
     *     if (!open) {
           window.history.pushState({ open: true }, "");
           }
           setOpen(!open);
     *   }}
     * >
     * Open
     * </button>
     * ``` */
    setOpen,
    /**
     * ```js
    const handleOpen = () => {
      if (trigger === "click") {
        if (!open) {
          window.history.pushState({ open: true }, "");
        }
        setOpen(!open);
      }
    };
     * ```
     */
    handleOpen,
    handleClose,
    /**
     * *Sedikit berbeda dengan handleOpen*
     */
    onClick,
    handleBack,
    onMouseEnter,
    onMouseLeave,
    onKeyDown,
  };
}

export function useEffectWidthScrollbar({
  open,
  widthHasScrollbar,
  hasScrollbar,
  scrollbarWidth,
  durationClose,
}: {
  open: boolean;
  widthHasScrollbar: boolean;
  hasScrollbar: boolean;
  scrollbarWidth: number;
  durationClose: number;
}) {
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    if (open) {
      if (widthHasScrollbar !== false && hasScrollbar) {
        setBodyProperty(scrollbarWidth);
        applyStateEffect(true);
      }
    } else {
      if (widthHasScrollbar !== false && hasScrollbar) {
        removeBodyProperty();
        applyStateEffect(false);
      }
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (widthHasScrollbar !== false && hasScrollbar) {
        removeBodyProperty();
        applyStateEffect(false);
      }
    };
  }, [open, durationClose, widthHasScrollbar, hasScrollbar, scrollbarWidth]);
}
