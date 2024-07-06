import { useState, useEffect, useRef, useCallback } from "react";

export function useHover<T extends HTMLElement | null>(
  element?: T | null,
  { open, setOpen }: { open?: boolean; setOpen?: (v: boolean) => void } = {},
) {
  const [opened, setOpened] = useState(false);
  const hovered = open !== undefined ? open : opened;
  const setHovered = setOpen !== undefined ? setOpen : setOpened;
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const ref = useRef<T>(null);

  const onStartEnter = useCallback(() => {
    if (!isTouchDevice) setHovered(true);
  }, [isTouchDevice, setHovered]);

  const onEndLeave = useCallback(() => {
    if (!isTouchDevice) setHovered(false);
  }, [isTouchDevice, setHovered]);

  const onTouchStart = useCallback(() => {
    setIsTouchDevice(true);
    setHovered(true);
  }, [setHovered]);

  const onTouchEnd = useCallback(() => setHovered(false), [setHovered]);

  const onMouseMove = useCallback(() => {
    if (isTouchDevice) {
      setIsTouchDevice(false);
    }
  }, [isTouchDevice]);

  useEffect(() => {
    const handleTouchStart = () => {
      setIsTouchDevice(true);
      window.removeEventListener("touchstart", handleTouchStart);
    };

    const handleMouseMove = () => {
      setIsTouchDevice(false);
      window.removeEventListener("mousemove", handleMouseMove);
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const el = element !== undefined ? element : ref.current;

    if (el) {
      el.addEventListener("mouseenter", onStartEnter);
      el.addEventListener("mouseleave", onEndLeave);
      el.addEventListener("touchstart", onTouchStart);
      el.addEventListener("touchend", onTouchEnd);
      el.addEventListener("mousemove", onMouseMove);

      return () => {
        el.removeEventListener("mouseenter", onStartEnter);
        el.removeEventListener("mouseleave", onEndLeave);
        el.removeEventListener("touchstart", onTouchStart);
        el.removeEventListener("touchend", onTouchEnd);
        el.removeEventListener("mousemove", onMouseMove);
      };
    }
  }, [element, onStartEnter, onEndLeave, onTouchStart, onTouchEnd, onMouseMove]);

  return { ref, hovered, setHovered };
}
