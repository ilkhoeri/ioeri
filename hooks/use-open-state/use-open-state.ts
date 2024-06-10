"use client";

import { useEffect, useCallback, SetStateAction, Dispatch } from "react";
import { useHotkeys } from "../use-hotkeys/use-hotkeys";

export type UseOPenStateType = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  /** @default 150 */
  durationClose?: number;
  /**
   * ```js
    "/" | "M" | "ctrl+J" | "ctrl+K" | "alt+mod+shift+X"
    ```
  */
  hotKeys?: string | undefined;
};

/**
 * ```js
  const [open, setOpen] = useState(false);
  const { handleOpen, handleClose } = useOpenState({ open, setOpen });
  
  onClick={handleOpen}
  onClick={handleClose}
 * ```
 * @returns open, handleOpen, handleClose
 */
export const useOpenState = ({ open, setOpen, hotKeys = "", durationClose = 150 }: UseOPenStateType) => {
  useHotkeys([[hotKeys, () => hotKeys && setOpen(!open)]]);

  const handleBackButton = useCallback(() => {
    if (open) {
      setOpen(false);
    }
  }, [open, setOpen]);

  useEffect(() => {
    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [handleBackButton]);

  const handleOpen = () => {
    if (!open) {
      // Menambahkan entri ke riwayat
      window.history.pushState({ drawerOpen: true }, "");
    }
    setOpen(!open);
  };

  const handleClose = () => {
    setTimeout(() => {
      setOpen(false);
    }, durationClose);
  };

  return { open, handleOpen, handleClose, hotKeys };
};
