import { createPortal } from "react-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { useHotkeys, useClickOutside, RectElement, useMeasureScrollbar, createRefs } from "@/modules/hooks";

export enum DataOrigin {
  Trigger = "trigger",
  Content = "content",
  Overlay = "overlay",
  Root = "root",
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

interface StateSharedOptions {
  align?: `${DataAlign}`;
  side?: `${DataSide}`;
  sideOffset?: number;
  base?: boolean;
  open?: boolean;
  onOpenChange?: (value: boolean) => void;
  delay?: { open?: number; closed?: number };
}
export interface HoverStateOptions extends StateSharedOptions {
  touch?: boolean;
}
export interface ClickStateOptions extends StateSharedOptions {
  modal?: boolean;
  popstate?: boolean;
  defaultOpen?: boolean;
  clickOutsideToClose?: boolean;
  hotKeys?: "/" | "M" | "ctrl+J" | "ctrl+K" | "alt+mod+shift+X" | (string & {});
}

export interface OpenStateOptions extends HoverStateOptions, ClickStateOptions {
  trigger?: `${DataTrigger}`;
}

export function useOpenState<T extends HTMLElement = any>(options: OpenStateOptions = {}) {
  const {
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
    delay = { open: 0, closed: 115 },
    modal = false,
  } = options;

  const refs = createRefs<T, `${DataOrigin}`>(Object.values(DataOrigin));

  const [isOpen, setIsOpen] = useState(defaultOpen);
  const open = openChange !== undefined ? openChange : isOpen;
  const setOpen = onOpenChange !== undefined ? onOpenChange : setIsOpen;
  const [render, setRender] = useState(open);
  const [initialOpen, setInitialOpen] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [prepare, setPrepare] = useState(false);
  const [updatedSide, setUpdatedSide] = useState(side);

  useHotkeys([[hotKeys, () => setOpen(!open)]]);

  useMeasureScrollbar(!open ? render : open, { modal });

  useClickOutside(() => clickOutsideToClose && setOpen(false), [refs.trigger, refs.content]);

  const bounding = {
    trigger: useRect<T>(refs?.trigger?.current),
    content: useRect<T>(refs?.content?.current),
  };

  const toggle = useCallback(() => {
    if (trigger === "hover") {
      setOpen(!open);
    }
    if (trigger === "click") {
      if (!popstate) {
        setOpen(!open);
      } else {
        if (!open) {
          window.history.pushState({ open: true }, "");
          setOpen(true);
        } else {
          window.history.back();
          setOpen(false);
        }
      }
    }
  }, [trigger, popstate, open, setOpen]);

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
    if (popstate) {
      window.addEventListener("popstate", historyPopState);

      return () => {
        window.removeEventListener("popstate", historyPopState);
      };
    }
  }, [popstate, open, setOpen]);

  useEffect(() => {
    const handleTouchStart = () => {
      setIsTouchDevice(true);
    };

    const handleMouseMove = () => {
      setIsTouchDevice(false);
    };

    if (trigger === "hover") {
      window.addEventListener("touchstart", handleTouchStart);
      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("touchstart", handleTouchStart);
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, [trigger]);

  useEffect(() => {
    const onPrepare = () => {
      setPrepare(true);
      setTimeout(() => {
        setPrepare(false);
      }, 50);
    };

    const onMouseEnter = () => {
      if (!isTouchDevice) {
        setOpen(true);
        onPrepare();
      }
    };
    const onMouseLeave = () => {
      if (!isTouchDevice) {
        setTimeout(() => {
          setOpen(false);
        }, 0);
      }
    };
    const onMouseMove = () => {
      if (isTouchDevice) {
        setIsTouchDevice(false);
      }
    };
    const onTouchStart = () => {
      if (touch) {
        setIsTouchDevice(true);
        setOpen(true);
        onPrepare();
      }
    };
    const onTouchEnd = () => {
      if (touch) {
        setTimeout(() => {
          setOpen(false);
        }, 0);
      }
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

    attachListeners(refs.trigger.current);
    return () => {
      detachListeners(refs.trigger.current);
    };
  }, [trigger, toggle, refs.trigger, setOpen, isTouchDevice, touch]);

  const updateSide = useCallback(() => {
    const triggerRect = bounding.trigger.rect;
    const contentRect = bounding.content.rect;
    if (triggerRect && contentRect) {
      const [top, left] = getInset(align, side, triggerRect, contentRect);

      const checkOutOfViewport = (rect: Record<string, number>): boolean => {
        return rect.top < 0 || rect.left < 0 || rect.bottom > window.innerHeight || rect.right > window.innerWidth;
      };

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
  }, [align, side, bounding.trigger.rect, bounding.content.rect]);

  useEffect(() => {
    updateSide();
    window.addEventListener("scroll", updateSide);
    window.addEventListener("resize", updateSide);

    return () => {
      window.removeEventListener("scroll", updateSide);
      window.removeEventListener("resize", updateSide);
    };
  }, [side, align, updateSide]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    if (open) {
      setRender(true);
    } else {
      timeoutId = setTimeout(() => {
        setRender(false);
      }, 120);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [trigger, open]);

  const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLElement>) => e.key === "Enter" && toggle(), [toggle]);

  const dataState = open ? (initialOpen ? "open" : "opened") : "closed";

  const dataSide = trigger === "hover" ? updatedSide : side;

  const styleAt = (as: `${DataOrigin}`, { style }: { style?: React.CSSProperties & { [key: string]: any } } = {}) => ({
    ...getAttributes(as, dataState, align, dataSide, base),
    style: {
      ...style,
      ...styles(as, trigger, sideOffset, prepare, align, dataSide, bounding.trigger.rect, bounding.content.rect),
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
  prepare: boolean,
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
          prepare && (vars.opacity = "0");
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
