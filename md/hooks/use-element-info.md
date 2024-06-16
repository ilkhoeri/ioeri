"use client";

import { useEffect, useRef, useState } from "react";

type Info = "x" | "y" | "width" | "height" | "top" | "right" | "bottom" | "left" | "scrollX" | "scrollY";
type RectElement = Record<Info, number>;
type InitialInfo = {
  initial?: Partial<Record<Info, number>>;
};

export function useElementInfo({ initial }: InitialInfo = {}) {
  const [hoveredElement, setHoveredElement] = useState<DOMRect | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollBody, setScrollBody] = useState(0);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [rectElement, setRectElement] = useState<RectElement>({
    x: initial?.x || 0,
    y: initial?.y || 0,
    width: initial?.width || 0,
    height: initial?.height || 0,
    top: initial?.top || 0,
    bottom: initial?.bottom || 0,
    right: initial?.right || 0,
    left: initial?.left || 0,
    scrollX: initial?.scrollX || 0,
    scrollY: initial?.scrollY || 0,
  });

  const elementRef = useRef<HTMLElement | null>(null);

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

  useBoundingElement(elementRef.current, setRectElement);

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

export function useBoundingElement(current: HTMLElement | null, setInfo: (value: RectElement) => void) {
  useEffect(() => {
    const updateRectElement = () => {
      if (current) {
        const rect = current.getBoundingClientRect();
        setInfo({
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
  }, [current, setInfo]);
}
