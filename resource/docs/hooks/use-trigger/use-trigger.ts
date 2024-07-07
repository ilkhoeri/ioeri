import { useCallback, useEffect, useRef, useState } from "react";

interface UseTrigger {
  popstate?: boolean;
  open?: boolean;
  setOpen?: (v: boolean) => void;
  defaultOpen?: boolean;
  durationClose?: number;
  depend?: any;
}

export function useTrigger<T extends HTMLElement | null>(element?: T | null, handle: UseTrigger = {}) {
  const { popstate, open: exOpen, setOpen: exSetOpen, defaultOpen = false, durationClose = 115, depend } = handle;
  const [inOpen, inSetOpen] = useState(defaultOpen);
  const open = exOpen !== undefined ? exOpen : inOpen;
  const setOpen = exSetOpen !== undefined ? exSetOpen : inSetOpen;
  const [render, setRender] = useState(open);
  const [initialOpen, setInitialOpen] = useState(false);

  const ref = useRef<T>(null);

  useEffect(() => {
    if (open !== defaultOpen) {
      setInitialOpen(true);
    }
  }, [open, defaultOpen]);

  const toggle = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      if (popstate) {
        if (!open) {
          window.history.pushState({ open: true }, "");
          setOpen(true);
        } else {
          window.history.back();
          setOpen(false);
        }
      } else {
        setOpen(!open);
      }
    },
    [popstate, open, setOpen],
  );

  usePopState(popstate, { open, setOpen });

  useEffect(() => {
    const el = element !== undefined ? element : ref.current;

    if (el) {
      el.addEventListener("click", toggle);
      return () => {
        el.removeEventListener("click", toggle);
      };
    }
  }, [element, toggle]);

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
  }, [open, durationClose, setRender, depend]);

  return { ref, render, open, setOpen, initialOpen };
}

function usePopState(popstate?: boolean, { open, setOpen }: { open?: boolean; setOpen?: (v: boolean) => void } = {}) {
  useEffect(() => {
    const historyPopState = () => {
      if (open && setOpen) {
        setOpen(false);
      }
    };
    if (popstate) {
      window.addEventListener("popstate", historyPopState);
    }
    return () => {
      if (popstate) {
        window.removeEventListener("popstate", historyPopState);
      }
    };
  }, [popstate, open, setOpen]);
}
