"use client";
import * as React from "react";
import { twMerge } from "tailwind-merge";
import { mergeRefs } from "@/modules/hooks";

import "./scroll-area.css";

type ScrollAreaOrigin = "content" | "thumb";
export type UseScrollAreaType = { overflow?: "y" | "x" };
export type ScrollAreaType = UseScrollAreaType & {
  el?: React.ElementType;
  style?: React.CSSProperties & { [key: string]: any };
  classNames?: Partial<Record<ScrollAreaOrigin, string>>;
  styles?: Partial<Record<ScrollAreaOrigin, React.CSSProperties & { [key: string]: any }>>;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export function useScrollArea({ overflow = "y" }: UseScrollAreaType = {}) {
  const scrollContentRef = React.useRef<HTMLDivElement>(null);
  const thumbRef = React.useRef<HTMLElement>(null);
  const [thumbSize, setThumbSize] = React.useState<number>(0);
  const [thumbPosition, setThumbPosition] = React.useState<number>(0);
  const [scrollable, setScrollable] = React.useState<boolean>(false);

  React.useEffect(() => {
    const Y = overflow === "y";

    const handleScroll = () => {
      if (scrollContentRef.current) {
        const scrollContent = scrollContentRef.current;
        const clientSize = Y ? scrollContent.clientHeight : scrollContent.clientWidth;
        const scrollSize = Y ? scrollContent.scrollHeight : scrollContent.scrollWidth;
        const scrollPos = Y ? scrollContent.scrollTop : scrollContent.scrollLeft;
        const thumbSize = (clientSize / scrollSize) * clientSize;
        const thumbPosition = (scrollPos / scrollSize) * clientSize;

        setThumbSize(thumbSize);
        setThumbPosition(thumbPosition);
        setScrollable(scrollSize > clientSize);
      }
    };

    const scrollContent = scrollContentRef.current;
    if (scrollContent) {
      scrollContent.classList.add("scroll-area-content");
      scrollContent.addEventListener("scroll", handleScroll);
      handleScroll();
    }

    const resizeObserver = new ResizeObserver(handleScroll);
    if (scrollContent) {
      resizeObserver.observe(scrollContent);
    }

    return () => {
      if (scrollContent) {
        scrollContent.classList.remove("scroll-area-content");
        scrollContent.removeEventListener("scroll", handleScroll);
        resizeObserver.unobserve(scrollContent);
      }
    };
  }, [overflow]);

  React.useEffect(() => {
    const Y = overflow === "y";
    const body = document.body;
    const thumbElement = thumbRef.current;
    if (!thumbElement) return;

    const handleDragStart = (startPos: number, e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      const startThumbPosition = thumbPosition;

      const handleDragMove = (moveEvent: MouseEvent | TouchEvent) => {
        moveEvent.preventDefault();
        body.setAttribute("data-scroll", "active");
        thumbElement.setAttribute("data-scroll", "active");
        const clientX = "clientX" in moveEvent ? moveEvent.clientX : moveEvent.touches[0].clientX;
        const clientY = "clientY" in moveEvent ? moveEvent.clientY : moveEvent.touches[0].clientY;
        const delta = Y ? clientY - startPos : clientX - startPos;
        const newThumbPosition = startThumbPosition + delta;
        const maxThumbPosition = Y
          ? scrollContentRef.current!.clientHeight - thumbSize
          : scrollContentRef.current!.clientWidth - thumbSize;
        const boundedThumbPosition = Math.max(0, Math.min(newThumbPosition, maxThumbPosition));

        const scrollFraction =
          boundedThumbPosition / (Y ? scrollContentRef.current!.clientHeight : scrollContentRef.current!.clientWidth);
        if (Y) {
          scrollContentRef.current!.scrollTop = scrollFraction * scrollContentRef.current!.scrollHeight;
        } else {
          scrollContentRef.current!.scrollLeft = scrollFraction * scrollContentRef.current!.scrollWidth;
        }

        requestAnimationFrame(() => {
          setThumbPosition(boundedThumbPosition);
        });
      };

      const handleDragEnd = () => {
        body.removeAttribute("data-scroll");
        thumbElement.removeAttribute("data-scroll");
        document.removeEventListener("mousemove", handleDragMove);
        document.removeEventListener("mouseup", handleDragEnd);
        document.removeEventListener("touchmove", handleDragMove);
        document.removeEventListener("touchend", handleDragEnd);
      };

      document.addEventListener("mousemove", handleDragMove);
      document.addEventListener("mouseup", handleDragEnd);
      document.addEventListener("touchmove", handleDragMove, { passive: false });
      document.addEventListener("touchend", handleDragEnd);
    };

    const handleMouseDown = (e: MouseEvent) => {
      handleDragStart(Y ? e.clientY : e.clientX, e);
    };

    const handleTouchStart = (e: TouchEvent) => {
      handleDragStart(Y ? e.touches[0].clientY : e.touches[0].clientX, e);
    };

    if (scrollable) {
      thumbElement.classList.add("thumb");
      thumbElement.setAttribute("data-overflow", overflow);
      thumbElement.style.setProperty(Y ? "top" : "left", `${thumbPosition}px`);
      thumbElement.style.setProperty(Y ? "height" : "width", `${thumbSize}px`);
      thumbElement.addEventListener("mousedown", handleMouseDown);
      thumbElement.addEventListener("touchstart", handleTouchStart);
    }

    return () => {
      if (scrollable) {
        thumbElement.classList.remove("thumb");
        thumbElement.removeAttribute("data-overflow");
        thumbElement.style.removeProperty(Y ? "top" : "left");
        thumbElement.style.removeProperty(Y ? "height" : "width");
        thumbElement.removeEventListener("mousedown", handleMouseDown);
        thumbElement.removeEventListener("touchstart", handleTouchStart);
      }
    };
  }, [thumbSize, thumbPosition, overflow, scrollable]);

  return { scrollContentRef, thumbRef, thumbSize, thumbPosition, scrollable, overflow };
}

export const ScrollArea = React.forwardRef<React.ElementRef<"div">, ScrollAreaType>(
  ({ el = "div", overflow = "y", className, classNames, style, styles, ...props }, ref) => {
    const { scrollContentRef, thumbRef } = useScrollArea({ overflow });

    type ComponentType = React.ComponentType<React.HTMLAttributes<HTMLElement>>;
    let Component: ComponentType = el as ComponentType;
    const Span = "span" as React.ElementType;

    return (
      <>
        <Component
          ref={mergeRefs(scrollContentRef, ref)}
          data-overflow={overflow}
          data-state="acroll-area"
          className={twMerge(
            "scroll-area-content peer",
            overflow === "y" && "overflow-y-auto overflow-x-hidden",
            overflow === "x" && "overflow-y-hidden overflow-x-auto",
            className,
            classNames?.content,
          )}
          style={{ ...style, ...styles?.content }}
          {...props}
        />

        <Span
          ref={thumbRef}
          data-overflow={overflow}
          data-state="thumb"
          aria-label="thumb"
          className={twMerge(
            "thumb rounded-full hover:bg-muted peer-hover:bg-muted peer-hover:data-[scroll=active]:bg-muted-foreground data-[scroll=active]:bg-muted-foreground",
            overflow === "y" && "right-8 min-w-1.5 w-1.5",
            overflow === "x" && "bottom-8 min-h-1.5 h-1.5",
            classNames?.thumb,
          )}
          style={styles?.thumb}
        />
      </>
    );
  },
);
ScrollArea.displayName = "ScrollArea";
