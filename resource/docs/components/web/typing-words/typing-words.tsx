"use client";
import { mergeRefs } from "@/modules/hooks";
import * as React from "react";

interface UseTypingWords {
  placeholders: string[];
  duration?: {
    break?: number;
    typing?: number;
  };
}
export type TypingWordsType = UseTypingWords & {
  el?: React.ElementType;
} & Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>, "style" | "children"> & {
    style?: React.CSSProperties & { [key: string]: any };
  };

export function useTypingWords({ duration, placeholders }: UseTypingWords) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!ref.current) return;

    let animationId: NodeJS.Timeout | null = null;
    const getRandomDelayBetween = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);
    const setTextContent = (element: HTMLElement, text: string) => {
      element.textContent = text;
    };

    const animateTextTyping = (
      currentText: string[],
      remainingText: string[],
      element: HTMLElement,
      onAnimationEnd: () => void,
    ) => {
      if (!remainingText.length) {
        onAnimationEnd();
        return;
      }
      currentText.push(remainingText.shift() ?? "");
      animationId = setTimeout(
        () => {
          setTextContent(element, currentText.join(""));
          animateTextTyping(currentText, remainingText, element, onAnimationEnd);
        },
        getRandomDelayBetween(duration?.typing || 200, duration?.typing || 200),
      );
    };

    const animatePlaceholder = (element: HTMLElement, placeholder: string, onAnimationEnd: () => void) => {
      animateTextTyping([], placeholder.split(""), element, onAnimationEnd);
    };
    const startAnimation = (index: number) => {
      const element = ref.current;
      if (!element) return;
      const nextIndex = (index + 1) % placeholders.length;
      animatePlaceholder(element, placeholders[index], () => {
        animationId = setTimeout(() => startAnimation(nextIndex), duration?.break || 1000);
      });
    };

    startAnimation(0);
    return () => {
      if (animationId) {
        clearTimeout(animationId);
      }
    };
  }, [duration, placeholders]);

  return ref;
}

export const TypingWords = React.forwardRef<HTMLElement, TypingWordsType>((_props, ref) => {
  const { el = "div", placeholders, duration, suppressHydrationWarning = true, ...props } = _props;
  const typingRef = useTypingWords({ placeholders, duration });
  const Root = el as React.ElementType;
  const root = { ref: mergeRefs(typingRef, ref), suppressHydrationWarning, "data-anim": "TypingWords", ...props };
  return <Root {...root} />;
});
TypingWords.displayName = "TypingWords";
