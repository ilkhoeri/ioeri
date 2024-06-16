"use client";

import { useEffect, useRef, useState } from "react";
import { useWindowScroll } from "../use-window-scroll/use-window-scroll";

export type UseSlideType = {
  threshold?: number;
  speedThreshold?: number;
};

export type ScrollDirectionType = "up" | "down";

export function useSlide({ threshold = 50, speedThreshold = 5 }: UseSlideType = {}) {
  const [position] = useWindowScroll();
  const [scrollDirection, setScrollDirection] = useState<ScrollDirectionType>("up");
  const [open, setOpen] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);

  const lastScrollTop = useRef<number>(0);
  const lastTimestamp = useRef<number>(Date.now());

  useEffect(() => {
    if (typeof window === "undefined") return;

    lastScrollTop.current = window.scrollY;
    lastTimestamp.current = Date.now();

    const handleScroll = () => {
      const st = window.scrollY;
      const currentTime = Date.now();
      const timeDiff = (currentTime - lastTimestamp.current) / 1000; // waktu dalam detik
      const diff = st - lastScrollTop.current;
      const speed = Math.abs(diff) / timeDiff; // kecepatan scroll

      if (Math.abs(diff) > threshold && speed > speedThreshold) {
        if (diff > 0) {
          setScrollDirection("down");
          setOpen(false);
        } else {
          setScrollDirection("up");
          setOpen(false);
        }
        lastScrollTop.current = st;
        lastTimestamp.current = currentTime;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function onTouchStart(e: React.TouchEvent) {
    setTouchStartY(e.touches[0].clientY);
  }

  function onTouchMove(e: React.TouchEvent) {
    const touchEndY = e.touches[0].clientY;
    const deltaY = touchEndY - touchStartY;

    if (deltaY > threshold) {
      setOpen(false);
    } else if (deltaY < -threshold) {
      setOpen(true);
    }
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(!open);
      }
    }

    function handleBackButton() {
      if (open) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      window.addEventListener("popstate", handleBackButton);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("popstate", handleBackButton);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [open]);

  function handleOpen() {
    if (!open) {
      window.history.pushState({ extendsMenuOpen: true }, "");
    }
    setOpen(!open);
  }

  function handleClose() {
    if (open) {
      setOpen(false);
    }
  }

  const isScrollUp = scrollDirection === "up" || position.y === 0;
  const isScrollDown = scrollDirection === "down";

  const UP = isScrollUp ? 0 : -1;
  const setProps = { style: { transform: `translateY(calc(var(--navbar) * ${UP}))` } };

  return {
    scroll,
    setProps,
    /**
     * ```js
     * setOpen(!open);
     * ```
     */
    handleOpen,
    /**
     * ```js
     * setOpen(false);
     * ```
     */
    handleClose,
    /**
     * ```js
     * // Saat pengguna mulai menyentuh layar, catat posisi sentuhan
     * setTouchStartY(e.touches[0].clientY);
     * ```
     */
    onTouchStart,
    /**
     * ```js
     * // Saat pengguna menggerakkan jari di layar
     * const touchEndY = e.touches[0].clientY;
     * const deltaY = touchEndY - touchStartY;
     * ```
     */
    onTouchMove,
    /**
     * ```ts
     * const scrollUp = scrollDirection === "up";
     * ```
     */
    isScrollUp,
    /**
     * ```ts
     * const scrollDown = scrollDirection === "down";
     * ```
     */
    isScrollDown,
    /**
     * ```js
     * [open, ...] = useState(false)
     * ```
     */
    open,
    setOpen,
    scrollDirection,
    setScrollDirection,
  };
}
