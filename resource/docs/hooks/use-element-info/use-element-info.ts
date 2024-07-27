import { useCallback, useLayoutEffect, useRef, useState } from "react";

export type RectInfo = "x" | "y" | "width" | "height" | "top" | "right" | "bottom" | "left" | "scrollX" | "scrollY";
export type RectElement = Record<RectInfo, number>;
export type InitialInfo = { initial?: Partial<RectElement> };

function round(num: number) {
  return Math.round(num * 100) / 100;
}

export function useElementInfo<T extends HTMLElement | null>(element?: T | null, { initial }: InitialInfo = {}) {
  const [rect, setRect] = useState<RectElement>({ ...(initial || {}) } as RectElement);
  const [hovered, setHovered] = useState<DOMRect | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollBody, setScrollBody] = useState(0);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [attributes, setAttributes] = useState<{ [key: string]: string }>({});
  const [elementName, setElementName] = useState<string>("");

  const ref = useRef<T | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const mutationObserverRef = useRef<MutationObserver | null>(null);

  const el = element !== undefined ? element : ref.current;

  const updateRectElement = useCallback(() => {
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
  }, [el]);

  useLayoutEffect(() => {
    const handleScroll = () => {
      const el = element !== undefined ? element : ref.current;
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
      const el = element !== undefined ? element : ref.current;
      if (el) {
        setElementName(el.tagName.toLowerCase());
        const attrs: { [key: string]: string } = {};
        for (const attr of el.attributes) {
          attrs[attr.name] = attr.value;
        }
        setAttributes(attrs);

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
    const el = element !== undefined ? element : ref.current;
    el?.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScrollBody);
      window.removeEventListener("resize", handleResize);
      if (el) {
        el.removeEventListener("scroll", handleScroll);
        disconnectObservers();
      }
    };
  }, [element, updateRectElement]);

  const onMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    setHovered(event.currentTarget.getBoundingClientRect());
  };

  const onMouseLeave = () => setHovered(null);

  return {
    ref,
    rect,
    windowSize,
    scrollBody,
    scrollPosition,
    attributes,
    elementName,
    onMouseEnter,
    onMouseLeave,
    hovered,
  };
}
