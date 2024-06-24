import { useRef, useEffect, useState } from "react";

import "./kit-scrollbar.css";

export type UseKitScrollbarType = {
  overflow?: "y" | "x";
};

export function useKitScrollbar({ overflow = "y" }: UseKitScrollbarType = {}) {
  const scrollContentRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLElement>(null);
  const [thumbSize, setThumbSize] = useState<number>(0);
  const [thumbPosition, setThumbPosition] = useState<number>(0);

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
      }
    };

    const scrollContent = scrollContentRef.current;
    if (scrollContent) {
      scrollContent.classList.add("scroll-content");
      scrollContent.addEventListener("scroll", handleScroll);
      handleScroll(); // Initialize thumb size and position
    }

    return () => {
      if (scrollContent) {
        scrollContent.classList.remove("scroll-content");
        scrollContent.removeEventListener("scroll", handleScroll);
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

    thumbElement.classList.add("thumb");
    thumbElement.setAttribute("data-overflow", overflow);
    thumbElement.style.setProperty(Y ? "top" : "left", `${thumbPosition}px`);
    thumbElement.style.setProperty(Y ? "height" : "width", `${thumbSize}px`);
    thumbElement.addEventListener("mousedown", handleThumbMouseDown);

    return () => {
      thumbElement.classList.remove("thumb");
      thumbElement.removeAttribute("data-overflow");
      thumbElement.style.removeProperty(Y ? "top" : "left");
      thumbElement.style.removeProperty(Y ? "height" : "width");
      thumbElement.removeEventListener("mousedown", handleThumbMouseDown);
    };
  }, [thumbSize, thumbPosition, overflow]);

  return { scrollContentRef, thumbRef, thumbSize, thumbPosition, overflow };
}
