import { DependencyList, useCallback, useEffect, useRef, useState } from "react";

interface UseTrigger {
  popstate?: boolean;
  open?: boolean;
  setOpen?: (v: boolean) => void;
  defaultOpen?: boolean;
  delay?: number;
  depend?: DependencyList;
}

export function useTrigger<T extends HTMLElement | null>(elements?: Array<T | null>, handle: UseTrigger = {}) {
  const { popstate = false, open: exOpen, setOpen: exSetOpen, defaultOpen = false, delay = 115, depend } = handle;
  const [inOpen, inSetOpen] = useState(defaultOpen);
  const open = exOpen !== undefined ? exOpen : inOpen;
  const setOpen = exSetOpen !== undefined ? exSetOpen : inSetOpen;
  const [initialOpen, setInitialOpen] = useState(false);

  const render = useRender(open, delay, depend);

  const ref = useRef<T>(null);

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

  const attachListeners = useCallback(
    (el: T | null) => {
      if (el) {
        el.addEventListener("click", toggle);
      }
    },
    [toggle],
  );

  const detachListeners = useCallback(
    (el: T | null) => {
      if (el) {
        el.removeEventListener("click", toggle);
      }
    },
    [toggle],
  );

  useEffect(() => {
    const current = ref.current;

    if (elements) {
      elements.forEach((el) => {
        attachListeners(el);
      });
    }
    if (current) {
      attachListeners(current);
    }

    return () => {
      if (elements) {
        elements.forEach((el) => {
          detachListeners(el);
        });
      }
      if (current) {
        detachListeners(current);
      }
    };
  }, [elements, attachListeners, detachListeners]);

  return { ref, render, open, setOpen, initialOpen, toggle };
}

export function useRender(open: boolean, delay: number = 125, depend?: DependencyList) {
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
  }, [open, setRender, delay, depend]);

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
