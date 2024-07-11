import { DependencyList, useCallback, useEffect, useRef, useState } from "react";
import { useMeasureScrollbar } from "../use-measure-scrollbar/use-measure-scrollbar";

interface UseTrigger {
  popstate?: boolean;
  modal?: boolean;
  open?: boolean;
  setOpen?: (v: boolean) => void;
  defaultOpen?: boolean;
  delay?: number;
}

export function useTrigger<T extends HTMLElement | null>(handle: UseTrigger = {}) {
  const { modal, popstate = false, open: exOpen, setOpen: exSetOpen, defaultOpen = false, delay = 115 } = handle;
  const [inOpen, inSetOpen] = useState(defaultOpen);
  const open = exOpen !== undefined ? exOpen : inOpen;
  const setOpen = exSetOpen !== undefined ? exSetOpen : inSetOpen;
  const [initialOpen, setInitialOpen] = useState(false);
  const ref = useRef<T>(null);

  const render = useRender(open, { delay, modal });

  useEffect(() => {
    if (open !== defaultOpen) {
      setInitialOpen(true);
    }
  }, [open, defaultOpen]);

  const toggle = useCallback(() => {
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
  }, [popstate, open, setOpen]);

  usePopState(popstate, { open, setOpen });

  useEffect(() => {
    const current = ref.current;

    const attachListeners = (el: T | null) => {
      if (el) {
        el.addEventListener("click", toggle);
      }
    };
    const detachListeners = (el: T | null) => {
      if (el) {
        el.removeEventListener("click", toggle);
      }
    };

    attachListeners(current);
    return () => {
      detachListeners(current);
    };
  }, [ref, toggle]);

  return { ref, open, setOpen, initialOpen, render, toggle };
}

export function useRender(open: boolean, { delay = 125, modal = false } = {}, depend?: DependencyList) {
  const [render, setRender] = useState(open);
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    if (open) {
      setRender(true);
    } else {
      timeoutId = setTimeout(() => {
        setRender(false);
      }, delay);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [open, delay, depend]);

  useMeasureScrollbar(!open ? render : open, { modal, has: true });

  return render;
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
