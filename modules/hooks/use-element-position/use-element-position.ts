"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export type ElementPosition = {
  top: number;
  left: number;
  bottom: number;
  right: number;
  width: number;
  height: number;
};

export function useElementPosition() {
  const [position, setPosition] = useState<ElementPosition | null>(null);

  const ref = useRef<any>(null); // ref: React.RefObject<HTMLElement>

  const updatePosition = useCallback(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setPosition({
        top: rect.top,
        left: rect.left,
        bottom: rect.bottom,
        right: rect.right,
        width: rect.width,
        height: rect.height,
      });
    }
  }, [ref]);

  useEffect(() => {
    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [updatePosition]);

  return { ref, position };
}
