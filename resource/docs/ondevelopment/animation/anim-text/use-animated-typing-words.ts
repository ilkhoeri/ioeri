import React from "react";

import type { CSSProperties } from "@/resource/docs/types/shared";
import type { DispatchType } from "@/resource/docs/types/dispatch";

export type AnimatedTypingWordsType = {
  el?: React.ElementType;
  ref?: React.Ref<HTMLElement>;
  style?: CSSProperties;
  placeholders: string[];
  duration?: {
    /** @default 1000 */
    break?: number;
    /** @default 200 */
    typing?: number;
  };
} & DispatchType &
  Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>, "style" | "children"> & {
    style?: CSSProperties;
  };

export function useAnimatedTypingWords({ duration, placeholders }: AnimatedTypingWordsType) {
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
        getRandomDelayBetween(duration?.typing || 200, duration?.typing || 200),
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
      }, duration?.break || 1000);
    };

    if (elementRef.current) {
      animatePlaceholder(elementRef.current, placeholders[0], onAnimationEnd);
    }
  }, [duration, placeholders]);

  return { elementRef };
}
