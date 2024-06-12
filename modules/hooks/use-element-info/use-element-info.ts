"use client";

import { useEffect, useRef, useState } from "react";

type Info = "x" | "y" | "width" | "height" | "top" | "right" | "bottom" | "left" | "scrollX" | "scrollY";
type ElementInfo = Record<Info, number>;
type InitialInfo = {
  initial?: Partial<Record<Info, number>>;
};

export function useElementInfo({ initial }: InitialInfo = {}) {
  const [elementInfo, setElementInfo] = useState<ElementInfo>({
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
    const updateElementInfo = () => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        setElementInfo({
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
    // Initial update
    updateElementInfo();

    // Update on window resize or scroll
    window.addEventListener("resize", updateElementInfo);
    window.addEventListener("scroll", updateElementInfo);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("resize", updateElementInfo);
      window.removeEventListener("scroll", updateElementInfo);
    };
  }, []);

  return { ref: elementRef, info: elementInfo };
}
