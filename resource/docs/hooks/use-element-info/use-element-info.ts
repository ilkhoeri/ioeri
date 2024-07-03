import { useCallback, useEffect, useRef, useState } from "react";

export type RectInfo = "x" | "y" | "width" | "height" | "top" | "right" | "bottom" | "left" | "scrollX" | "scrollY";
export type RectElement = Record<RectInfo, number>;
export type InitialInfo = { initial?: Partial<RectElement> };

export function useElementInfo<T extends HTMLElement | null>({ initial }: InitialInfo = {}) {
  const [rect, setRect] = useState<RectElement>({ ...(initial || {}) } as RectElement);
  const [hovered, setHovered] = useState<DOMRect | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollBody, setScrollBody] = useState(0);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const ref = useRef<T | null>(null);

  const updateRectElement = useCallback(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
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
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(ref.current?.scrollTop || 0);
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

    updateRectElement();
    handleResize();

    window.addEventListener("scroll", handleScrollBody);
    window.addEventListener("resize", handleResize);
    ref.current?.addEventListener("scroll", handleScroll);

    const resizeObserver = new ResizeObserver(updateRectElement);
    if (ref.current) {
      resizeObserver.observe(ref.current);
    }

    return () => {
      window.removeEventListener("scroll", handleScrollBody);
      window.removeEventListener("resize", handleResize);
      ref.current?.removeEventListener("scroll", handleScroll);
      if (ref.current) {
        resizeObserver.unobserve(ref.current);
      }
    };
  }, [updateRectElement]);

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
