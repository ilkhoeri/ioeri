import React from "react";

import type { CSSProperties } from "@/modules/types/shared";
import type { DispatchType } from "@/modules/types/dispatch";

export type AnimatedTypingWordsType = {
  el?: React.ElementType;
  ref?: React.Ref<HTMLElement>;
  style?: CSSProperties;
  /**
   *```js
   * // sample
   * placeholders={['one', 'two', 'three', 'four', 'five']}
   *```
   */
  placeholders: string[];
  duration?: {
    /** @default ``` 1000 ``` */
    after?: number;
    /** @default ``` 200 ``` */
    max?: number;
    /** @default ``` 200 ``` */
    min?: number;
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
