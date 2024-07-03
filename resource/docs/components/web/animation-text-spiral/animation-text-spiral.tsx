import "./animation-text-spiral.css";

import * as React from "react";
import { cnx } from "@/resource/docs/utility";

type NestedRecord<U extends [string, unknown], T extends string> = {
  [K in U as K[0]]?: Partial<Record<T, K[1]>>;
};
type CSSProperties = React.CSSProperties & { [key: string]: any };
type T = "root" | "wrapper" | "inner";
type U = ["el", React.ElementType] | ["styles", CSSProperties] | ["classNames", string];

export type AnimatedSpiralWordsType = {
  placeholders: string | string[];
  duration?: number;
  style?: CSSProperties;
  el?: Partial<Record<T, React.ElementType>>;
} & NestedRecord<U, T> &
  Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>, "children"> & {
    style?: CSSProperties;
  };

export function useAnimatedSpiralWords({ el, placeholders, duration = 4000 }: AnimatedSpiralWordsType) {
  const words = Array.isArray(placeholders) ? placeholders.join(" ") : placeholders || "";

  const refFirst = React.useRef<HTMLElement>(null);
  const refLast = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const firstRef = refFirst.current;
    const lastRef = refLast.current;
    if (!firstRef || !lastRef) return;

    const elements = words.split("").map((char, i) => {
      function createElement(offset: number) {
        const inner = document.createElement((el?.inner as string) || "span");
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
  }, [el?.inner, duration, words]);

  return { refFirst, refLast };
}

export const AnimationTextSpiral = React.forwardRef<HTMLElement, AnimatedSpiralWordsType>((_props, ref) => {
  const {
    el = { root: "article", wrapper: "section", inner: "span" },
    placeholders,
    duration,
    className,
    classNames,
    style,
    styles,
    suppressHydrationWarning = true,
    ...others
  } = _props;

  const { refFirst, refLast } = useAnimatedSpiralWords({ el, placeholders, duration });

  const Root: React.ElementType = el.root as React.ElementType;
  const Wrapper: React.ElementType = el.wrapper as React.ElementType;

  return (
    <Root
      ref={ref}
      suppressHydrationWarning={suppressHydrationWarning}
      data-anim="text-spiral"
      className={cnx(className, classNames?.root)}
      style={{ ...style, ...styles?.root }}
      {...others}
    >
      <Wrapper
        ref={refFirst}
        suppressHydrationWarning={suppressHydrationWarning}
        className={classNames?.wrapper}
        style={styles?.wrapper}
      />
      <Wrapper
        ref={refLast}
        suppressHydrationWarning={suppressHydrationWarning}
        className={classNames?.wrapper}
        style={styles?.wrapper}
      />
    </Root>
  );
});
AnimationTextSpiral.displayName = "AnimationTextSpiral";
