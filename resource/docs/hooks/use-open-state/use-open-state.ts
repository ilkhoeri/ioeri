import { createPortal } from "react-dom";
import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { useHotkeys, createRefs, useClickOutside, RectElement, useMeasureScrollbar } from "@/modules/hooks";

export enum DataOrigin {
  Root = "root",
  Trigger = "trigger",
  Content = "content",
  Overlay = "overlay",
}
export enum DataAlign {
  start = "start",
  center = "center",
  end = "end",
}
export enum DataSide {
  top = "top",
  right = "right",
  bottom = "bottom",
  left = "left",
}
export enum DataState {
  open = "open",
  opened = "opened",
  closed = "closed",
}
export enum DataTrigger {
  hover = "hover",
  click = "click",
}

export type UseOpenStateType<T> = {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (value: boolean) => void;
  delay?: number;
  modal?: boolean;
  clickOutsideToClose?: boolean;
  trigger?: `${DataTrigger}`;
  ref?: RefObject<T>;
  info?: Partial<RectElement>;
  align?: `${DataAlign}`;
  side?: `${DataSide}`;
  sideOffset?: number;
  hotKeys?: "/" | "M" | "ctrl+J" | "ctrl+K" | "alt+mod+shift+X" | (string & {});
  base?: boolean;
  touch?: boolean;
  popstate?: boolean;
};

export function useOpenState<T extends HTMLElement = any>(OpenState: UseOpenStateType<T> = {}) {
  const {
    ref,
    delay = 115,
    hotKeys = "",
    side = "bottom",
    align = "center",
    trigger = "click",
    onOpenChange,
    sideOffset = 0,
    open: openChange,
    base = false,
    touch = false,
    popstate = false,
    defaultOpen = false,
    clickOutsideToClose = false,
    modal = false,
  } = OpenState;

  const refs = createRefs<T, `${DataOrigin}`>(Object.values(DataOrigin), ref);

  const [isOpen, setIsOpen] = useState(defaultOpen);
  const open = openChange !== undefined ? openChange : isOpen;
  const setOpen = onOpenChange !== undefined ? onOpenChange : setIsOpen;
  const [render, setRender] = useState(open);
  const [initialOpen, setInitialOpen] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useHotkeys([[hotKeys, () => setOpen(!open)]]);

  useMeasureScrollbar(!open ? render : open, { modal });

  useClickOutside(() => clickOutsideToClose && setOpen(false), [refs.trigger, refs.content]);

  const bounding = {
    trigger: useRect<T>(refs?.trigger?.current),
    content: useRect<T>(refs?.content?.current),
  };

  const updatedSide = useUpdateSide(align, side, bounding.trigger.rect, bounding.content.rect);

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

  useEffect(() => {
    if (open !== defaultOpen) {
      setInitialOpen(true);
    }
  }, [open, defaultOpen]);

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
  }, [open, delay]);

  useEffect(() => {
    const handleTouchStart = () => {
      setIsTouchDevice(true);
    };

    const handleMouseMove = () => {
      setIsTouchDevice(false);
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const elements =
      trigger === "hover" ? [refs.trigger.current, refs.content.current] : [refs.trigger.current, refs.overlay.current];

    const onMouseEnter = () => {
      if (!isTouchDevice) setOpen(true);
    };
    const onMouseLeave = () => {
      if (!isTouchDevice) setOpen(false);
    };
    const onMouseMove = () => {
      if (isTouchDevice) setIsTouchDevice(false);
    };
    const onTouchStart = () => {
      if (touch) {
        setIsTouchDevice(true);
        setOpen(true);
      }
    };
    const onTouchEnd = () => {
      if (touch) setOpen(false);
    };

    const attachListeners = (el: T | null) => {
      if (el) {
        if (trigger === "click") {
          el.addEventListener("click", toggle);
        }
        if (trigger === "hover") {
          el.addEventListener("mouseenter", onMouseEnter);
          el.addEventListener("mouseleave", onMouseLeave);
          el.addEventListener("mousemove", onMouseMove);

          if (touch) {
            el.addEventListener("touchstart", onTouchStart);
            el.addEventListener("touchend", onTouchEnd);
          }
        }
      }
    };
    const detachListeners = (el: T | null) => {
      if (el) {
        if (trigger === "click") {
          el.removeEventListener("click", toggle);
        }
        if (trigger === "hover") {
          el.removeEventListener("mouseenter", onMouseEnter);
          el.removeEventListener("mouseleave", onMouseLeave);
          el.removeEventListener("mousemove", onMouseMove);

          if (touch) {
            el.removeEventListener("touchstart", onTouchStart);
            el.removeEventListener("touchend", onTouchEnd);
          }
        }
      }
    };

    elements.forEach((el) => {
      attachListeners(el);
    });
    return () => {
      elements.forEach((el) => {
        detachListeners(el);
      });
    };
  }, [trigger, toggle, refs.trigger, refs.overlay, refs.content, setOpen, isTouchDevice, touch]);

  const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLElement>) => e.key === "Enter" && toggle(), [toggle]);

  const dataState = open ? (initialOpen ? "open" : "opened") : "closed";

  const dataSide = trigger === "hover" ? updatedSide : side;

  const styleAt = (as: `${DataOrigin}`, { style }: { style?: React.CSSProperties & { [key: string]: any } } = {}) => ({
    ...getAttributes(as, dataState, align, dataSide, base),
    style: {
      ...style,
      ...styles(as, trigger, sideOffset, align, dataSide, bounding.trigger.rect, bounding.content.rect),
    },
  });

  return {
    refs,
    render,
    open,
    setOpen,
    Portal,
    toggle,
    onKeyDown,
    bounding,
    styleAt,
    styles,
    align,
    state: dataState,
    side: dataSide,
  };
}

function Portal({
  render,
  portal = true,
  children,
  container,
  key,
}: {
  render: boolean;
  portal?: boolean;
  children: React.ReactNode;
  container?: Element | DocumentFragment | null;
  key?: null | string;
}) {
  if (typeof document === "undefined" || !render) return null;
  return portal ? createPortal(children, container || document.body, key) : children;
}

function useRect<T extends HTMLElement | null>(el: T | null) {
  const [rect, setRect] = useState<RectElement>({ ...{} } as RectElement);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollBody, setScrollBody] = useState(0);

  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const mutationObserverRef = useRef<MutationObserver | null>(null);

  function round(num: number) {
    return Math.round(num * 100) / 100;
  }

  useEffect(() => {
    const updateRectElement = () => {
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.width !== 0 && rect.height !== 0) {
          requestAnimationFrame(() =>
            setRect({
              scrollX: round(window.scrollX),
              scrollY: round(window.scrollY),
              x: round(rect.left + window.scrollX),
              y: round(rect.top + window.scrollY),
              width: round(rect.width),
              height: round(rect.height),
              top: round(rect.top),
              bottom: round(rect.bottom),
              right: round(rect.right),
              left: round(rect.left),
            }),
          );
        }
      }
    };

    const handleScroll = () => {
      setScrollPosition(el?.scrollTop || 0);
      updateRectElement();
    };

    const handleScrollBody = () => {
      setScrollBody(document.documentElement.scrollTop);
      updateRectElement();
    };

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      updateRectElement();
    };

    const observeElement = () => {
      if (el) {
        if (!resizeObserverRef.current) {
          resizeObserverRef.current = new ResizeObserver(updateRectElement);
        }
        if (!mutationObserverRef.current) {
          mutationObserverRef.current = new MutationObserver(() => {
            updateRectElement();
          });
        }

        resizeObserverRef.current.observe(el);
        mutationObserverRef.current.observe(el, { attributes: true, childList: true, subtree: true });
      }
    };

    const disconnectObservers = () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
        resizeObserverRef.current = null;
      }
      if (mutationObserverRef.current) {
        mutationObserverRef.current.disconnect();
        mutationObserverRef.current = null;
      }
    };

    updateRectElement();
    handleResize();
    observeElement();

    window.addEventListener("scroll", handleScrollBody);
    window.addEventListener("resize", handleResize);
    el?.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScrollBody);
      window.removeEventListener("resize", handleResize);
      if (el) {
        el.removeEventListener("scroll", handleScroll);
        disconnectObservers();
      }
    };
  }, [el]);

  return { rect, windowSize, scrollBody, scrollPosition };
}

type defineProps = [align: `${DataAlign}`, side: `${DataSide}`, triggerRect: RectElement, contentRect: RectElement];

function useUpdateSide(...[align, side, triggerRect, contentRect]: defineProps) {
  const [updatedSide, setUpdatedSide] = useState(side);

  const checkOutOfViewport = (rect: Record<string, number>): boolean => {
    return rect.top < 0 || rect.left < 0 || rect.bottom > window.innerHeight || rect.right > window.innerWidth;
  };

  const updateSide = useCallback(() => {
    if (triggerRect && contentRect) {
      const [top, left] = getInset(align, side, triggerRect, contentRect);

      const rect = {
        top,
        left,
        bottom: top + contentRect.height,
        right: left + contentRect.width,
        width: contentRect.width,
        height: contentRect.height,
      };

      if (checkOutOfViewport(rect)) {
        switch (side) {
          case DataSide.top:
            setUpdatedSide(DataSide.bottom);
            break;
          case DataSide.right:
            setUpdatedSide(DataSide.left);
            break;
          case DataSide.bottom:
            setUpdatedSide(DataSide.top);
            break;
          case DataSide.left:
            setUpdatedSide(DataSide.right);
            break;
        }
      } else {
        setUpdatedSide(side);
      }
    }
  }, [align, side, triggerRect, contentRect]);

  useEffect(() => {
    updateSide();
    window.addEventListener("scroll", updateSide);
    window.addEventListener("resize", updateSide);

    return () => {
      window.removeEventListener("scroll", updateSide);
      window.removeEventListener("resize", updateSide);
    };
  }, [side, align, updateSide]);

  return updatedSide;
}

const getAttributes = (
  origin: `${DataOrigin}`,
  state: `${DataState}`,
  align?: `${DataAlign}`,
  side?: `${DataSide}`,
  base: boolean = false,
): { [key: string]: string } => {
  const attrs: { [key: string]: string } = {
    "data-origin": origin,
    "data-state": state,
  };
  if (!base) {
    if (align) attrs["data-align"] = align;
    if (side) attrs["data-side"] = side;
  }
  return attrs;
};

function getInset(align: `${DataAlign}`, side: `${DataSide}`, triggerRect: RectElement, contentRect: RectElement) {
  let top = 0;
  let left = 0;

  const calcAlign = (triggerStart: number, triggerSize: number, contentSize: number): number => {
    switch (align) {
      case DataAlign.start:
        return triggerStart;
      case DataAlign.center:
        return triggerStart + (triggerSize - contentSize) / 2;
      case DataAlign.end:
        return triggerStart + triggerSize - contentSize;
      default:
        return triggerStart;
    }
  };

  switch (side) {
    case DataSide.top:
      top = triggerRect.top - contentRect.height;
      left = calcAlign(triggerRect.left, triggerRect.width, contentRect.width);
      break;
    case DataSide.right:
      top = calcAlign(triggerRect.top, triggerRect.height, contentRect.height);
      left = triggerRect.right;
      break;
    case DataSide.bottom:
      top = triggerRect.bottom;
      left = calcAlign(triggerRect.left, triggerRect.width, contentRect.width);
      break;
    case DataSide.left:
      top = calcAlign(triggerRect.top, triggerRect.height, contentRect.height);
      left = triggerRect.left - contentRect.width;
      break;
  }

  return [top, left] as const;
}

const styles = (
  as: `${DataOrigin}`,
  trigger: `${DataTrigger}`,
  sideOffset: number,
  align: `${DataAlign}`,
  side: `${DataSide}`,
  triggerRect: RectElement,
  contentRect: RectElement,
): { [key: string]: string } => {
  const vars: { [key: string]: string } = {};

  const [top, left] = getInset(align, side, triggerRect, contentRect);

  const setVars = (as: `${DataOrigin}`, info?: RectElement) => {
    if (info) {
      const properties = ["height", "width", "x", "y", "right", "bottom"] as const;
      properties.forEach((key) => {
        if (info[key] !== undefined) {
          vars[`--${as}-${key[0]}`] = `${info[key]}px`;
        }
      });
    }
  };

  switch (trigger) {
    case "click":
      switch (as) {
        case "root":
          vars["--offset"] = `${sideOffset}px`;
          setVars("trigger", triggerRect);
          setVars("content", contentRect);
          break;
        case "trigger":
          setVars(as, triggerRect);
          break;
        case "content":
          vars["--offset"] = `${sideOffset}px`;
          setVars("trigger", triggerRect);
          setVars("content", contentRect);
          break;
      }
      break;

    case "hover":
      switch (as) {
        case "root":
          vars["--offset"] = `${sideOffset}px`;
          setVars("trigger", triggerRect);
          setVars("content", contentRect);
          break;
        case "trigger":
          setVars(as, triggerRect);
          break;
        case "content":
          vars["--top"] = `${top + triggerRect.scrollY}px`;
          vars["--left"] = `${left + triggerRect.scrollX}px`;
          vars["--offset"] = `${sideOffset}px`;
          setVars("trigger", triggerRect);
          setVars("content", contentRect);
          break;
      }
      break;

    default:
      break;
  }

  return vars;
};
