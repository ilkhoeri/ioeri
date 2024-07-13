"use client";
import * as React from "react";
import { cnx } from "@/modules/utility";
import { mergeRefs } from "@/modules/hooks";

type Origin = "wrap" | "inner";
type CSSProperties = React.CSSProperties & { [key: string]: any };
type U = ["el", React.ElementType] | ["styles", CSSProperties] | ["classNames", string];
type NestedRecord<U extends [string, unknown], T extends string> = { [K in U as K[0]]?: Partial<Record<T, K[1]>> };

type UseRunningArea = {
  /** @default ``` "right-to-left" ``` */
  direction?: "right-to-left" | "left-to-right" | "top-to-bottom" | "bottom-to-top";
  /** @default ``` 25 ``` */
  duration?: number;
};
export type RunningAreaType = UseRunningArea &
  NestedRecord<U, Origin> &
  Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>, "style"> & {
    style?: CSSProperties;
  };

export function useRunningArea({ duration = 25, direction }: UseRunningArea) {
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

    const handleStart = (clientX: number) => {
      isDragging = true;
      initialX = clientX;
      deltaX = 0;
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };

    const handleMove = (clientX: number) => {
      if (!isDragging) return;
      deltaX = clientX - initialX;
      const newPosition = currentPosition.current + deltaX;
      inner.style.transform = `translateX(${newPosition}px)`;
    };

    const handleEnd = () => {
      isDragging = false;
      currentPosition.current += deltaX;
      requestAnimationFrame(animate);
    };

    const handleTouchStart = (e: TouchEvent) => handleStart(e.touches[0].clientX);
    const handleTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);
    const handleTouchEnd = () => handleEnd();

    const handleMouseDown = (e: MouseEvent) => handleStart(e.clientX);
    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX);
    const handleMouseUp = () => handleEnd();

    inner.addEventListener("touchstart", handleTouchStart);
    inner.addEventListener("touchmove", handleTouchMove);
    inner.addEventListener("touchend", handleTouchEnd);
    inner.addEventListener("mousedown", handleMouseDown);
    inner.addEventListener("mousemove", handleMouseMove);
    inner.addEventListener("mouseup", handleMouseUp);

    const animate = (timestamp: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = timestamp;
      }

      const elapsed = timestamp - lastTimeRef.current;

      if (elapsed >= duration) {
        lastTimeRef.current = timestamp - (elapsed % duration);

        if (!isDragging) {
          if (direction === "right-to-left" || direction === "bottom-to-top") {
            currentPosition.current -= Math.floor(elapsed / duration);
            if (currentPosition.current <= -contentWidth) {
              currentPosition.current = containerWidth;
            }
          } else if (direction === "left-to-right" || direction === "top-to-bottom") {
            currentPosition.current += Math.floor(elapsed / duration);
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
      inner.removeEventListener("touchstart", handleTouchStart);
      inner.removeEventListener("touchmove", handleTouchMove);
      inner.removeEventListener("touchend", handleTouchEnd);
      inner.removeEventListener("mousedown", handleMouseDown);
      inner.removeEventListener("mousemove", handleMouseMove);
      inner.removeEventListener("mouseup", handleMouseUp);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [duration, direction]);

  return { wrapRef, innerRef };
}

export const RunningArea = React.forwardRef<HTMLElement, RunningAreaType>((_props, ref) => {
  const {
    el = { wrap: "div", inner: "div" },
    children,
    className,
    classNames,
    style,
    styles,
    direction = "right-to-left",
    duration = 25,
    ...rest
  } = _props;
  const { wrapRef, innerRef } = useRunningArea({ direction, duration });

  const Wrap = el.wrap as React.ElementType;
  const Inner = el.inner as React.ElementType;

  return (
    <Wrap
      ref={mergeRefs(wrapRef, ref)}
      data-anim="RunningArea"
      data-direction={direction}
      className={cnx(className, classNames?.wrap)}
      style={{ ...style, ...styles?.wrap }}
      {...rest}
    >
      <Inner ref={innerRef} className={classNames?.inner} style={styles?.inner}>
        {children}
      </Inner>
    </Wrap>
  );
});
RunningArea.displayName = "RunningArea";
