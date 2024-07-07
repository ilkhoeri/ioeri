import { useState, useEffect, useRef, useCallback } from "react";

export function useHover<T extends HTMLElement | null>(
  elements?: Array<T | null>,
  { touch = false, open, setOpen }: { touch?: boolean; open?: boolean; setOpen?: (v: boolean) => void } = {},
) {
  const [opened, setOpened] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const hovered = open !== undefined ? open : opened;
  const setHovered = setOpen !== undefined ? setOpen : setOpened;
  const ref = useRef<T>(null);

  const onMouseEnter = useCallback(() => {
    if (!isTouchDevice) setHovered(true);
  }, [isTouchDevice, setHovered]);

  const onMouseLeave = useCallback(() => {
    if (!isTouchDevice) setHovered(false);
  }, [isTouchDevice, setHovered]);

  const onMouseMove = useCallback(() => {
    if (isTouchDevice) setIsTouchDevice(false);
  }, [isTouchDevice]);

  const onTouchStart = useCallback(() => {
    if (touch) {
      setIsTouchDevice(true);
      setHovered(true);
    }
  }, [setHovered, touch]);

  const onTouchEnd = useCallback(() => {
    if (touch) setHovered(false);
  }, [setHovered, touch]);

  useEffect(() => {
    const handleTouchStart = () => {
      setIsTouchDevice(true);
    };

    const handleMouseMove = () => {
      setIsTouchDevice(false);
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const current = ref.current;

    const attachListeners = (el: T | null) => {
      if (el) {
        el.addEventListener("mouseenter", onMouseEnter);
        el.addEventListener("mouseleave", onMouseLeave);
        el.addEventListener("mousemove", onMouseMove);

        if (touch) {
          el.addEventListener("touchstart", onTouchStart);
          el.addEventListener("touchend", onTouchEnd);
        }
      }
    };

    const detachListeners = (el: T | null) => {
      if (el) {
        el.removeEventListener("mouseenter", onMouseEnter);
        el.removeEventListener("mouseleave", onMouseLeave);
        el.removeEventListener("mousemove", onMouseMove);

        if (touch) {
          el.removeEventListener("touchstart", onTouchStart);
          el.removeEventListener("touchend", onTouchEnd);
        }
      }
    };

    if (elements) {
      elements.forEach((el) => {
        attachListeners(el);
      });
    }
    if (current) {
      attachListeners(current);
    }
    return () => {
      if (elements) {
        elements.forEach((el) => {
          detachListeners(el);
        });
      }
      if (current) {
        detachListeners(current);
      }
    };
  }, [elements, onMouseEnter, onMouseLeave, onMouseMove, onTouchStart, onTouchEnd, touch]);

  return { ref, hovered, setHovered };
}
