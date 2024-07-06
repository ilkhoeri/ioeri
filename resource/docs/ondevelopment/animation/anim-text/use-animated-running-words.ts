import React from "react";

import type { CSSProperties, NestedRecord } from "@/modules/types/shared";
import type { DispatchType } from "@/modules/types/dispatch";

type Trees = "wrap" | "inner";
type U = ["el", React.ElementType] | ["styles", CSSProperties] | ["classNames", string];

export type AnimatedRunningWordsType = {
  /**
   *```js
   * // sample
   * placeholders={['One Two Three Four Five',]}
   * // *ReactNode
   *```
   */
  placeholders?: string | string[];
  /** @default ``` "left-to-right" ``` */
  direction?: "right-to-left" | "left-to-right" | "top-to-bottom" | "bottom-to-top";
  /** @default ``` 25 ``` */
  speed?: number;
} & NestedRecord<U, Trees> &
  DispatchType &
  Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>, "style"> & {
    style?: CSSProperties;
  };

export function useAnimatedRunningWords({ speed = 25, direction = "left-to-right" }: AnimatedRunningWordsType) {
  const wrapRef = React.useRef<HTMLElement>(null);
  const innerRef = React.useRef<HTMLElement>(null);
  const animationFrameId = React.useRef<number | null>(null);
  const currentPosition = React.useRef<number>(0);
  const lastTimeRef = React.useRef<number>(0);

  React.useEffect(() => {
    const container = wrapRef.current;
    const inner = innerRef.current;

    if (!container || !inner) return;

    const containerWidth = container.offsetWidth;
    const contentWidth = inner.offsetWidth;

    if (containerWidth >= contentWidth) return;

    let isDragging = false;
    let initialX = 0;
    let deltaX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      isDragging = true;
      initialX = e.touches[0].clientX;
      deltaX = 0;
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      const currentX = e.touches[0].clientX;
      deltaX = currentX - initialX;
      const newPosition = currentPosition.current + deltaX;
      inner.style.transform = `translateX(${newPosition}px)`;
    };

    const handleTouchEnd = () => {
      isDragging = false;
      currentPosition.current += deltaX;
      requestAnimationFrame(animate);
    };

    inner.addEventListener("touchstart", handleTouchStart);
    inner.addEventListener("touchmove", handleTouchMove);
    inner.addEventListener("touchend", handleTouchEnd);

    const animate = (timestamp: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = timestamp;
      }

      const elapsed = timestamp - lastTimeRef.current;

      if (elapsed >= speed) {
        lastTimeRef.current = timestamp - (elapsed % speed);

        if (!isDragging) {
          if (direction === "right-to-left" || direction === "bottom-to-top") {
            currentPosition.current -= Math.floor(elapsed / speed);
            if (currentPosition.current <= -contentWidth) {
              currentPosition.current = containerWidth;
            }
          } else if (direction === "left-to-right" || direction === "top-to-bottom") {
            currentPosition.current += Math.floor(elapsed / speed);
            if (currentPosition.current >= containerWidth) {
              currentPosition.current = -contentWidth;
            }
          }

          if (direction === "top-to-bottom" || direction === "bottom-to-top") {
            inner.style.transform = `translateY(${currentPosition.current}px)`;
          } else {
            inner.style.transform = `translateX(${currentPosition.current}px)`;
          }
        }
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      inner.remove();
      inner.removeEventListener("touchstart", handleTouchStart);
      inner.removeEventListener("touchmove", handleTouchMove);
      inner.removeEventListener("touchend", handleTouchEnd);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [speed, direction]);

  return { wrapRef, innerRef };
}
