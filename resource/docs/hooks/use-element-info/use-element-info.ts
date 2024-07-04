import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

export type RectInfo = "x" | "y" | "width" | "height" | "top" | "right" | "bottom" | "left" | "scrollX" | "scrollY";
export type RectElement = Record<RectInfo, number>;
export type InitialInfo = { initial?: Partial<RectElement> };
export function useElementInfo<T extends HTMLElement | null>(element?: T | null, { initial }: InitialInfo = {}) {
  const [rect, setRect] = useState<RectElement>({ ...(initial || {}) } as RectElement);
  const [hovered, setHovered] = useState<DOMRect | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollBody, setScrollBody] = useState(0);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const ref = useRef<T | null>(null);
  const observerRef = useRef<MutationObserver | null>(null);

  const el = element !== undefined ? element : ref.current;

  const updateRectElement = useCallback(() => {
    if (el) {
      const rect = el.getBoundingClientRect();
      setRect({
        scrollX: window.scrollX,
        scrollY: window.scrollY,
        x: rect.left + window.scrollX,
        y: rect.top + window.scrollY,
        width: rect.width,
        height: rect.height,
        top: rect.top,
        bottom: rect.bottom,
        right: rect.right,
        left: rect.left,
      });
    }
  }, [el]);

  useEffect(() => {
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
      if (el && !observerRef.current) {
        observerRef.current = new MutationObserver(() => {
          updateRectElement();
        });
        observerRef.current.observe(el, { attributes: true, childList: true, subtree: true });
      }
    };

    const disconnectObserver = () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
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
        disconnectObserver();
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
    onMouseEnter,
    onMouseLeave,
    hovered,
  };
}
