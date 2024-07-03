import { useRef, useEffect, useState } from "react";

import "./use-scroll-area.css";

export type UseScrollAreaType = {
  overflow?: "y" | "x";
};

export function useScrollArea({ overflow = "y" }: UseScrollAreaType = {}) {
  const scrollContentRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLElement>(null);
  const [thumbSize, setThumbSize] = useState<number>(0);
  const [thumbPosition, setThumbPosition] = useState<number>(0);
  const [scrollable, setScrollable] = useState<boolean>(false);

  useEffect(() => {
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

    const resizeObserver = new ResizeObserver(() => {
      handleScroll();
    });

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

  useEffect(() => {
    const Y = overflow === "y";
    const body = document.body;
    const thumbElement = thumbRef.current;
    if (!thumbElement) return;

    const handleThumbMouseDown = (e: MouseEvent) => {
      const startPos = Y ? e.clientY : e.clientX;
      const startThumbPosition = thumbPosition;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        if (scrollContentRef.current && thumbRef.current) {
          body.setAttribute("data-scroll", "active");
          thumbElement.setAttribute("data-scroll", "active");
          const delta = Y ? moveEvent.clientY - startPos : moveEvent.clientX - startPos;
          const newThumbPosition = startThumbPosition + delta;
          const maxThumbPosition = Y
            ? scrollContentRef.current.clientHeight - thumbSize
            : scrollContentRef.current.clientWidth - thumbSize;
          const boundedThumbPosition = Math.max(0, Math.min(newThumbPosition, maxThumbPosition));

          const scrollFraction =
            boundedThumbPosition / (Y ? scrollContentRef.current.clientHeight : scrollContentRef.current.clientWidth);
          if (Y) {
            scrollContentRef.current.scrollTop = scrollFraction * scrollContentRef.current.scrollHeight;
          } else {
            scrollContentRef.current.scrollLeft = scrollFraction * scrollContentRef.current.scrollWidth;
          }

          setThumbPosition(boundedThumbPosition);
        }
      };

      const handleMouseUp = () => {
        body.removeAttribute("data-scroll");
        thumbElement.removeAttribute("data-scroll");
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    if (scrollable) {
      thumbElement.classList.add("thumb");
      thumbElement.setAttribute("data-overflow", overflow);
      thumbElement.style.setProperty(Y ? "top" : "left", `${thumbPosition}px`);
      thumbElement.style.setProperty(Y ? "height" : "width", `${thumbSize}px`);
      thumbElement.addEventListener("mousedown", handleThumbMouseDown);
    }

    return () => {
      if (scrollable) {
        thumbElement.classList.remove("thumb");
        thumbElement.removeAttribute("data-overflow");
        thumbElement.style.removeProperty(Y ? "top" : "left");
        thumbElement.style.removeProperty(Y ? "height" : "width");
        thumbElement.removeEventListener("mousedown", handleThumbMouseDown);
      }
    };
  }, [thumbSize, thumbPosition, overflow, scrollable]);

  return { scrollContentRef, thumbRef, thumbSize, thumbPosition, scrollable, overflow };
}
