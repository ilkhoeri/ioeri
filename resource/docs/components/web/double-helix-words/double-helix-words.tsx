"use client";
import * as React from "react";
import { cnx } from "@/modules/utility";

import "./double-helix-words.css";

type NestedRecord<U extends [string, unknown], T extends string> = {
  [K in U as K[0]]?: Partial<Record<T, K[1]>>;
};
type CSSProperties = React.CSSProperties & { [key: string]: any };
type T = "root" | "backbone" | "bases";
type U = ["el", React.ElementType] | ["styles", CSSProperties] | ["classNames", string];

export type DoubleHelixWordsType = {
  placeholders: string | string[];
  gap?: number;
  distance?: number;
  speed?: number;
  duration?: number;
  style?: CSSProperties;
  el?: Partial<Record<T, React.ElementType>>;
} & NestedRecord<U, T> &
  Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>, "children"> & {
    style?: CSSProperties;
  };

export function useDoubleHelixWords({ el, placeholders, duration = 4000 }: DoubleHelixWordsType) {
  const words = Array.isArray(placeholders) ? placeholders.join(" ") : placeholders || "";

  const refFirst = React.useRef<HTMLElement>(null);
  const refLast = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const firstRef = refFirst.current;
    const lastRef = refLast.current;
    if (!firstRef || !lastRef) return;

    const elements = words.split("").map((char, i) => {
      function createElement(offset: number) {
        const inner = document.createElement((el?.bases as string) || "span");
        inner.innerText = char;
        inner.style.animationDelay = `-${i * (duration / 16) - offset}ms`;
        return inner;
      }

      const firstWrap = createElement(0);
      const lastWrap = createElement(-duration / 2);
      firstRef.appendChild(firstWrap);
      lastRef.appendChild(lastWrap);

      return { firstWrap, lastWrap };
    });

    return () => {
      elements.forEach(({ firstWrap, lastWrap }) => {
        firstRef.removeChild(firstWrap);
        lastRef.removeChild(lastWrap);
      });
    };
  }, [el?.bases, duration, words]);

  return { refFirst, refLast };
}

export const DoubleHelixWords = React.forwardRef<HTMLElement, DoubleHelixWordsType>((_props, ref) => {
  const {
    el = { root: "article", backbone: "section", bases: "span" },
    placeholders,
    duration,
    className,
    classNames,
    style,
    styles,
    gap = 6,
    distance = 100,
    speed = 400,
    suppressHydrationWarning = true,
    ...others
  } = _props;

  const { refFirst, refLast } = useDoubleHelixWords({ el, placeholders, duration });

  const Root: React.ElementType = el.root as React.ElementType;
  const Backbone: React.ElementType = el.backbone as React.ElementType;

  const vars: { [key: string]: string } = {
    "--gap": `${Math.max(0, Math.min(100, gap))}px`,
    "--distance": `${Math.max(0, Math.min(100, distance))}px`,
    "--speed": `${Math.max(200, Math.min(1200, speed)) * 10}ms`,
  };

  return (
    <Root
      ref={ref}
      suppressHydrationWarning={suppressHydrationWarning}
      data-anim="DoubleHelix"
      className={cnx(className, classNames?.root)}
      style={{ ...vars, ...style, ...styles?.root }}
      {...others}
    >
      <Backbone
        ref={refFirst}
        suppressHydrationWarning={suppressHydrationWarning}
        className={classNames?.backbone}
        style={styles?.backbone}
      />
      <Backbone
        ref={refLast}
        suppressHydrationWarning={suppressHydrationWarning}
        className={classNames?.backbone}
        style={styles?.backbone}
      />
    </Root>
  );
});
DoubleHelixWords.displayName = "DoubleHelixWords";
