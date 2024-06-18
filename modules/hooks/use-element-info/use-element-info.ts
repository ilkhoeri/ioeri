import { useEffect, useRef, useState } from "react";

export type RectInfo = "x" | "y" | "width" | "height" | "top" | "right" | "bottom" | "left" | "scrollX" | "scrollY";
export type RectElement = Record<RectInfo, number>;
export type InitialInfo = { initial?: Partial<RectElement> };

export function useElementInfo<T extends HTMLElement | null>({ initial }: InitialInfo = {}) {
  const [hoveredElement, setHoveredElement] = useState<DOMRect | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollBody, setScrollBody] = useState(0);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const elementRef = useRef<T | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (elementRef.current) {
        setScrollPosition(elementRef.current.scrollTop);
      }
    };

    const handleScrollBody = () => {
      setScrollBody(document.documentElement.scrollTop);
    };

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    const current = elementRef.current;

    window.addEventListener("scroll", handleScrollBody);
    window.addEventListener("resize", handleResize);
    if (current) {
      current.addEventListener("scroll", handleScroll);
    }

    handleResize();

    return () => {
      window.removeEventListener("scroll", handleScrollBody);
      window.removeEventListener("resize", handleResize);
      if (current) {
        current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const rectElement = useRectInfo<T>(elementRef?.current, { initial });

  const onMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setHoveredElement(rect);
  };

  const onMouseLeave = () => {
    setHoveredElement(null);
  };

  return {
    ref: elementRef,
    rectElement,
    windowSize,
    scrollBody,
    scrollPosition,
    onMouseEnter,
    onMouseLeave,
    hovered: hoveredElement,
  };
}

export function useRectInfo<T extends HTMLElement | null>(
  element: T | null,
  { initial: setInitial }: InitialInfo = {},
) {
  const defaultInitial: { [key: string]: 0 } = {};
  const initial = setInitial !== undefined ? setInitial : defaultInitial;
  const [rectInfo, setRectInfo] = useState<RectElement>(initial as RectElement);

  useEffect(() => {
    const updateRectElement = () => {
      if (element) {
        const rect = element?.getBoundingClientRect();
        setRectInfo({
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
    };

    updateRectElement();

    window.addEventListener("resize", updateRectElement);
    window.addEventListener("scroll", updateRectElement);

    return () => {
      window.removeEventListener("resize", updateRectElement);
      window.removeEventListener("scroll", updateRectElement);
    };
  }, [element, setRectInfo]);

  return rectInfo;
}
