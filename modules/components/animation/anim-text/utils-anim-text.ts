import * as React from "react";
import { AnimTextRunningType, AnimTextSpiralType, AnimTextTypingType } from "./types-anim-text";

export function useTextTyping({ duration, placeholders }: AnimTextTypingType) {
  const elementRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const getRandomDelayBetween = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

    const setTextContent = (element: HTMLElement, text: string) => {
      const el = element as HTMLElement & { textContent?: string };
      el.textContent = text;
    };

    const animTextTyping = (
      currentText: string[],
      remainingText: string[],
      element: HTMLElement,
      onAnimationEnd: (placeholder: string, element: HTMLElement) => void,
    ) => {
      if (!remainingText.length) {
        typeof onAnimationEnd === "function" && onAnimationEnd(currentText.join(""), element);
        return;
      }

      currentText.push(remainingText.shift() ?? "");

      setTimeout(
        () => {
          setTextContent(element, currentText.join(""));
          animTextTyping(currentText, remainingText, element, onAnimationEnd);
        },
        getRandomDelayBetween(duration?.min || 200, duration?.max || 200),
      );
    };

    const animatePlaceholder = (
      element: HTMLElement,
      placeholder: string,
      onAnimationEnd: (placeholder: string, element: HTMLElement) => void,
    ) => {
      animTextTyping([], placeholder.split(""), element, onAnimationEnd);
    };

    const onAnimationEnd = (placeholder: string, element: HTMLElement) => {
      setTimeout(() => {
        let newPlaceholder = placeholders[Math.floor(Math.random() * placeholders.length)];

        do {
          newPlaceholder = placeholders[Math.floor(Math.random() * placeholders.length)];
        } while (placeholder === newPlaceholder);

        animatePlaceholder(element, newPlaceholder, onAnimationEnd);
      }, duration?.after || 1000);
    };

    if (elementRef.current) {
      animatePlaceholder(elementRef.current, placeholders[0], onAnimationEnd);
    }
  }, [duration, placeholders]);

  return { elementRef };
}

export function useTextRunning({ speed = 25, direction = "left-to-right" }: AnimTextRunningType) {
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
      inner.remove()
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

export function useTextSpiral({ el, placeholders, duration = 4000 }: AnimTextSpiralType) {
  const isPlaceholders = Array.isArray(placeholders) ? placeholders.join(" ") : placeholders;
  const words = isPlaceholders || "";

  const refWrap1 = React.useRef<HTMLElement>(null);
  const refWrap2 = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const characters = words.split("").forEach((char, i) => {
      function createElement(offset: number) {
        const inner = document.createElement((el?.inner as string) || "div");
        inner.innerText = char;
        inner.style.animationDelay = `-${i * (duration / 16) - offset}ms`;

        return inner;
      }

      refWrap1.current?.appendChild(createElement(0));
      refWrap2.current?.appendChild(createElement(-1 * (duration / 2)));
    });

    return characters;
  }, [el, duration, words]);

  return { refWrap1, refWrap2 };
}
