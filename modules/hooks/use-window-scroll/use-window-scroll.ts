"use client";
import { useEffect, useState } from "react";
import { useWindowEvent } from "../use-window-event/use-window-event";

interface ScrollPosition {
  x: number;
  y: number;
}

function getScrollPosition(): ScrollPosition {
  return typeof window !== "undefined" ? { x: window.pageXOffset, y: window.pageYOffset } : { x: 0, y: 0 };
}

function scrollTo({ x, y }: Partial<ScrollPosition>) {
  if (typeof window !== "undefined") {
    const scrollOptions: ScrollToOptions = { behavior: "smooth" };

    if (typeof x === "number") {
      scrollOptions.left = x;
    }

    if (typeof y === "number") {
      scrollOptions.top = y;
    }

    window.scrollTo(scrollOptions);
  }
}

export function useWindowScroll() {
  const [position, setPosition] = useState<ScrollPosition>({ x: 0, y: 0 });

  useWindowEvent("scroll", () => setPosition(getScrollPosition()));
  useWindowEvent("resize", () => setPosition(getScrollPosition()));
  useEffect(() => {
    setPosition(getScrollPosition());
  }, []);
  return [position, scrollTo] as const;
}

function checkIfBottom(): boolean {
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const scrollTop = window.scrollY;
  const tolerance = 5; // small tolerance

  return scrollTop + windowHeight + tolerance >= documentHeight;
}

export function useScroll() {
  const [bottom, setBottom] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState<ScrollPosition>({ x: 0, y: 0 });
  const [isScroll, setIsScroll] = useState(false);

  let scrollTimeout: NodeJS.Timeout | null = null;

  const handleScroll = () => {
    const pos = getScrollPosition();
    setPosition(pos);
    setBottom(checkIfBottom());
    setIsScroll(true);

    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }

    scrollTimeout = setTimeout(() => {
      setIsScroll(false);
    }, 1500); // Duration to detect when scrolling stops
  };

  useWindowEvent("scroll", handleScroll);
  useWindowEvent("resize", handleScroll);

  // Sets the scroll position and bottom state when the component is first loaded
  useEffect(() => {
    handleScroll();
    setMounted(true);
  }, []);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollWindow = bottom ? scrollToTop : scrollToBottom;

  return { position, scrollTo, bottom, mounted, isScroll, scrollWindow };
}
