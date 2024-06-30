import React from "react";

import type { CSSProperties, NestedRecord } from "@/modules/types/shared";
import type { DispatchType } from "@/modules/types/dispatch";

import "./spiral.css";

type Trees = "root" | "wrap" | "inner";
type U = ["el", React.ElementType] | ["styles", CSSProperties] | ["classNames", string];

export type AnimatedSpiralWordsType = {
  placeholders?: string | string[];
  duration?: number;
  el?: Partial<Record<Trees, React.ElementType>>;
} & NestedRecord<U, Trees> &
  DispatchType &
  Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>, "style" | "children"> & {
    style?: CSSProperties;
  };

export function useAnimatedSpiralWords({ el, placeholders, duration = 4000 }: AnimatedSpiralWordsType) {
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

/**


export function useAnimatedSpiralWords({ el, placeholders, duration = 4000 }: AnimatedSpiralWordsType) {
  const words = Array.isArray(placeholders) ? placeholders.join(" ") : placeholders;

  const refFirst = React.useRef<HTMLElement>(null);
  const refLast = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (!words || !el) return;

    const createElement = (char: string, i: number, offset: number) => {
      const inner = document.createElement((el.last as string) || "div");
      inner.innerText = char;
      inner.style.animationDelay = `-${i * (duration / 16) - offset}ms`;
      return inner;
    };

    const firstElements: HTMLElement[] = [];
    const lastElements: HTMLElement[] = [];

    words.split("").forEach((char, i) => {
      const firstElement = createElement(char, i, 0);
      const lastElement = createElement(char, i, -1 * (duration / 2));

      firstElements.push(firstElement);
      lastElements.push(lastElement);

      refFirst.current?.appendChild(firstElement);
      refLast.current?.appendChild(lastElement);
    });

    return () => {
      firstElements.forEach((el) => refFirst.current?.removeChild(el));
      lastElements.forEach((el) => refLast.current?.removeChild(el));
    };
  }, [el, duration, words]);

  return { refFirst, refLast };
}
 */