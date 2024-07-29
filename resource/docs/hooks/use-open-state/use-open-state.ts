import { createPortal } from "react-dom";
import { useHotkeys, useMeasureScrollbar } from "@/modules/hooks";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

export enum DataOrigin {
  Trigger = "trigger",
  Content = "content",
  Overlay = "overlay",
  Root = "root",
  Item = "item",
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
export enum DataOrientation {
  vertical = "vertical",
  horizontal = "horizontal",
}
type Observes = "side" | "align" | "touch" | "offset" | "sideswipe" | "orientation" | "triggerRect" | "contentRect" | "multipleOpen" | "availableSize";
interface ObserveOptions {
  observe?: Partial<Record<Observes, boolean>>;
}
interface StateSharedOptions {
  align?: `${DataAlign}`;
  side?: `${DataSide}`;
  sideOffset?: number;
  open?: boolean;
  onOpenChange?: (value: boolean) => void;
  delay?: { open?: number; closed?: number };
}
export interface HoverOpenOptions extends StateSharedOptions {}
export interface ClickOpenOptions extends StateSharedOptions {
  modal?: boolean;
  popstate?: boolean;
  defaultOpen?: boolean;
  clickOutsideToClose?: boolean;
  hotKeys?: "/" | "M" | "ctrl+J" | "ctrl+K" | "alt+mod+shift+X" | (string & {});
}

export interface OpenStateOptions extends HoverOpenOptions, ClickOpenOptions, ObserveOptions {
  orientation?: `${DataOrientation}`;
  trigger?: `${DataTrigger}`;
  openId?: string | null;
  setOpenId?: React.Dispatch<React.SetStateAction<string | null>>;
}

const DEFAULTEVENTS = ["mousedown", "touchstart"];

// prettier-ignore
export function useOpenState<T extends HTMLElement = any>(options: OpenStateOptions = {}) {
  const { hotKeys = "", side = "bottom", align = "center", trigger = "click", onOpenChange, sideOffset = 0, open: openChange, popstate = false, defaultOpen = false, clickOutsideToClose = false, orientation = "vertical", modal = false, observe = { multipleOpen: true }, delay = { open: 0, closed: 0 }, openId, setOpenId } = options;

  const refs = {
    trigger: useRef<HTMLButtonElement>(null),
    content: useRef<HTMLDivElement>(null),
    overlay: useRef<HTMLDivElement>(null),
    root: useRef<HTMLDivElement>(null),
    item: useRef<HTMLDivElement>(null),
  };

  const [isOpen, setIsOpen] = useState(defaultOpen);

  const open = openChange !== undefined ? openChange : isOpen;
  const setOpen = onOpenChange !== undefined ? onOpenChange : setIsOpen;

  const [render, setRender] = useState(open);
  const [initialOpen, setInitialOpen] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [updatedSide, setUpdatedSide] = useState(side);

  useHotkeys([[hotKeys, () => trigger === "click" && setOpen(!open)]]);

  useMeasureScrollbar(!open ? render : open, { modal });

  const bounding = {
    trigger: useElementDimensions<HTMLButtonElement>(refs?.trigger?.current),
    content: useElementDimensions<HTMLDivElement>(refs?.content?.current, orientation, render),
  };

  const toggle = useCallback(() => {
    const id = refs.trigger.current?.id;
    if (!observe.multipleOpen && id) {
      setOpenId?.(openId === id ? null : id);
    } else {
      if (!open) {
        if (trigger === "click" && popstate) {
          window.history.pushState({ open: true }, "");
        }
        setOpen(true);
      } else {
        if (trigger === "click" && popstate) {
          window.history.back();
        }
        setOpen(false);
      }
    }
  }, [trigger, popstate, open, setOpen, observe.multipleOpen, openId, setOpenId, refs.trigger]);

  useLayoutEffect(() => {
    if (open !== defaultOpen) {
      setInitialOpen(true);
    }
  }, [open, defaultOpen]);

  useEffect(() => {
    const id = refs.trigger.current?.id;
    if (!observe.multipleOpen && id) {
      if (openId === id) setOpen(true);
      if (openId !== id) setOpen(false);
    }
  }, [observe.multipleOpen, openId, setOpen, refs.trigger]);

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
    const onMouseEnter = () => {
      if (!isTouchDevice) {
        setOpen(true);
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
      if (!isTouchDevice) {
        setIsTouchDevice(true);
      }
      setOpen(true);
    };
    const onTouchEnd = () => {
      setOpen(false);
    };

    const windowTouchStart = () => {
      if (!isTouchDevice) {
        setIsTouchDevice(true);
      }
    };

    const attachListeners = (el: HTMLButtonElement | null) => {
      if (el) {
        if (trigger === "click") {
          el.addEventListener("click", toggle);
        }
        if (trigger === "hover") {
          if (observe?.touch) {
            el.addEventListener("touchstart", onTouchStart);
            el.addEventListener("touchend", onTouchEnd);
          }

          window.addEventListener("touchstart", windowTouchStart);
          window.addEventListener("mousemove", onMouseMove);

          el.addEventListener("mouseenter", onMouseEnter);
          el.addEventListener("mouseleave", onMouseLeave);
          el.addEventListener("mousemove", onMouseMove);
        }
      }
    };
    const detachListeners = (el: HTMLButtonElement | null) => {
      if (el) {
        if (trigger === "click") {
          el.removeEventListener("click", toggle);
        }
        if (trigger === "hover") {
          if (observe?.touch) {
            el.removeEventListener("touchstart", onTouchStart);
            el.removeEventListener("touchend", onTouchEnd);
          }

          window.removeEventListener("touchstart", windowTouchStart);
          window.removeEventListener("mousemove", onMouseMove);

          el.removeEventListener("mouseenter", onMouseEnter);
          el.removeEventListener("mouseleave", onMouseLeave);
          el.removeEventListener("mousemove", onMouseMove);
        }
      }
    };

    attachListeners(refs.trigger.current);
    return () => {
      detachListeners(refs.trigger.current);
    };
  }, [trigger, toggle, refs.trigger, open, setOpen, isTouchDevice, setIsTouchDevice, observe?.touch]);

  useEffect(() => {
    const everyRefs = [refs.trigger, refs.content];
    const handler = () => trigger === "click" && clickOutsideToClose && setOpen(false);
    const events = DEFAULTEVENTS;
    const listener = (event: MouseEvent | TouchEvent) => {
      const { target } = event;
      const shouldIgnore =
        target instanceof HTMLElement &&
        (target.hasAttribute("data-ignore-clickoutside") ||
          (!document.body.contains(target) && target.tagName !== "HTML"));
      const shouldTrigger = everyRefs.every((ref) => ref.current && !ref.current.contains(target as Node));

      if (!shouldIgnore && shouldTrigger) {
        handler();
      }
    };
    // @ts-ignore
    events.forEach((event) => document.addEventListener(event, listener));
    return () => {
      // @ts-ignore
      events.forEach((event) => document.removeEventListener(event, listener));
    };
  }, [clickOutsideToClose, setOpen, trigger, refs.content, refs.trigger]);

  const updateSide = useCallback(() => {
    const triggerRect = bounding.trigger.rect;
    const contentRect = bounding.content.rect;
    if (triggerRect && contentRect) {
      const [top, left] = getInset(align, side, sideOffset, triggerRect, contentRect);

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
  }, [align, side, sideOffset, bounding.trigger.rect, bounding.content.rect]);

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
      }, 150);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [trigger, open]);

  const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLElement>) => e.key === "Enter" && toggle(), [toggle]);

  const dataState = open ? (initialOpen ? "open" : "opened") : "closed";
  const sideswipe = trigger === "hover" || observe?.sideswipe;
  const dataSide = sideswipe ? updatedSide : side;

  const styleAt = (as: `${DataOrigin}`, { style }: { style?: React.CSSProperties & { [key: string]: any } } = {}) => ({
    ...getAttributes(as, dataState, align, dataSide, orientation, {
      observe,
    }),
    style: {
      ...style,
      ...styles(as, sideOffset, align, dataSide, bounding.trigger.rect, bounding.content.rect, bounding.content.size, {
        observe,
      }),
    },
  });

  return { refs, render, open, setOpen, Portal, toggle, onKeyDown, bounding, styleAt, align, dataState, side: dataSide };
}

function Portal(_props: {
  render: boolean;
  portal?: boolean;
  children: React.ReactNode;
  container?: Element | DocumentFragment | null;
  key?: null | string;
}) {
  const { render, portal = true, children, container, key } = _props;
  if (typeof document === "undefined" || !render) return null;
  return portal ? createPortal(children, container || document.body, key) : children;
}

export type RectInfo = "x" | "y" | "width" | "height" | "top" | "right" | "bottom" | "left" | "scrollX" | "scrollY";
export type RectElement = Record<RectInfo, number>;

function useElementDimensions<T extends HTMLElement | null>(
  el: T | null,
  orientation: `${DataOrientation}` = "vertical",
  availableSize: boolean = false,
) {
  const [rect, setRect] = useState<RectElement>({ ...{} } as RectElement);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollBody, setScrollBody] = useState(0);
  const [size, setSize] = useState<{ h: number | "auto"; w: number | "auto" }>({ h: 0, w: 0 });

  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const mutationObserverRef = useRef<MutationObserver | null>(null);

  function round(num: number) {
    return Math.round(num * 100) / 100;
  }

  useLayoutEffect(() => {
    if (!el) return;

    if (availableSize) {
      setSize({ h: round(el.scrollHeight), w: round(el.scrollWidth) });
    }
  }, [el, availableSize, orientation, rect.height, rect.width]);

  useEffect(() => {
    if (!el) return;

    const observer = new ResizeObserver(() => {
      if (availableSize) {
        setSize({ h: round(el.scrollHeight), w: round(el.scrollWidth) });
      }
    });
    observer.observe(el);
    Array.from(el.children).forEach((child) => observer.observe(child as HTMLElement));
    return () => {
      observer.disconnect();
    };
  }, [el, availableSize]);

  useLayoutEffect(() => {
    const updateRectElement = () => {
      if (el) {
        requestAnimationFrame(() => {
          const rect = el.getBoundingClientRect();
          if (rect.width !== 0 && rect.height !== 0) {
            setRect({
              top: round(rect.top),
              left: round(rect.left),
              right: round(rect.right),
              bottom: round(rect.bottom),
              width: round(rect.width),
              height: round(rect.height),
              scrollY: round(window.scrollY),
              scrollX: round(window.scrollX),
              y: round(rect.top + window.scrollY),
              x: round(rect.left + window.scrollX),
            });
          }
        });
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

  return { rect, size, windowSize, scrollBody, scrollPosition };
}

const getAttributes = (
  origin: `${DataOrigin}`, dataState: `${DataState}`, dataAlign?: `${DataAlign}`, side?: `${DataSide}`, orientation?: `${DataOrientation}`,
  { observe }: ObserveOptions = {},
): { [key: string]: string | undefined } => {
  const attrs: { [key: string]: string } = {
    "data-origin": origin,
    "data-state": dataState,
  };
  if (observe?.align && dataAlign) {
    attrs["data-align"] = dataAlign;
  }
  if (observe?.side && side) {
    attrs["data-side"] = side;
  }
  if (observe?.orientation && orientation) {
    attrs["data-orientation"] = orientation;
  }
  return attrs;
};

function getInset( align: `${DataAlign}`, side: `${DataSide}`, sideOffset: number, triggerRect: RectElement, contentRect: RectElement ) {
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
      top = triggerRect.top - contentRect.height - sideOffset;
      left = calcAlign(triggerRect.left, triggerRect.width, contentRect.width);
      break;
    case DataSide.right:
      top = calcAlign(triggerRect.top, triggerRect.height, contentRect.height);
      left = triggerRect.right + sideOffset;
      break;
    case DataSide.bottom:
      top = triggerRect.bottom + sideOffset;
      left = calcAlign(triggerRect.left, triggerRect.width, contentRect.width);
      break;
    case DataSide.left:
      top = calcAlign(triggerRect.top, triggerRect.height, contentRect.height);
      left = triggerRect.left - contentRect.width - sideOffset;
      break;
  }

  return [top, left] as const;
}

const styles = (
  as: `${DataOrigin}`, sideOffset: number, align: `${DataAlign}`, side: `${DataSide}`, triggerRect: RectElement, contentRect: RectElement, available: { h: number | "auto"; w: number | "auto" },
  { observe }: ObserveOptions = {},
): { [key: string]: string } => {
  const vars: { [key: string]: string } = {};
  const [top, left] = getInset(align, side, sideOffset, triggerRect, contentRect);
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

  switch (as) {
    case "trigger":
      if (observe?.triggerRect) {
        setVars(as, triggerRect);
      }
      break;
    case "content":
      if (observe?.sideswipe) {
        vars["--top"] = `${top + triggerRect.scrollY}px`;
        vars["--left"] = `${left + triggerRect.scrollX}px`;
      }
      if (observe?.offset) {
        vars["--offset"] = `${sideOffset}px`;
      }
      if (observe?.availableSize) {
        vars["--measure-available-h"] = `${available.h}px`;
        vars["--measure-available-w"] = `${available.w}px`;
      }
      if (observe?.contentRect) {
        setVars("content", contentRect);
      }

      break;
  }

  return vars;
};
