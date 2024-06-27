"use client";
import * as React from "react";

import { cnx } from "@/modules/utility/cnx/cnx";
import { useAnimatedSpiralWords, type AnimatedSpiralWordsType } from "./use-animated-spiral-words";

import type { CSSProperties } from "../../../types/shared";
import type { AnimTextAllTypes } from "./types-anim-text";

type AttributesElement = {
  el?: React.ElementType;
  ref?: React.Ref<HTMLElement>;
  style?: CSSProperties;
};

type ComponentType = React.ComponentType<React.HTMLAttributes<HTMLElement>>;

const Spiral = React.forwardRef<HTMLElement, AttributesElement>(({ el = "div", ...rest }, ref) => {
  let Child: ComponentType = el as ComponentType;
  return <Child ref={ref} {...rest} />;
});
Spiral.displayName = "Spiral";

export const AnimTextSpiral = ({ anim, suppressHydrationWarning = true, ...props }: AnimTextAllTypes) => {
  const { el, placeholders, duration, className, classNames, style, styles, ...others } =
    props as AnimatedSpiralWordsType;
  const { refWrap1, refWrap2 } = useAnimatedSpiralWords({ el, placeholders, duration });

  const root = {
    el: el?.root,
    suppressHydrationWarning,
    "data-anim": "text-" + anim,
    className: cnx(className, classNames?.root),
    ...others,
  };
  const nth1 = {
    ref: refWrap1,
    suppressHydrationWarning,
    el: el?.wrap,
    className: classNames?.wrap,
    style: styles?.wrap,
  };
  const nth2 = {
    ref: refWrap2,
    suppressHydrationWarning,
    el: el?.wrap,
    className: classNames?.wrap,
    style: styles?.wrap,
  };

  return (
    <Spiral {...root}>
      <Spiral {...nth1} />
      <Spiral {...nth2} />
    </Spiral>
  );
};

AnimTextSpiral.displayName = "ioeri/AnimTextSpiral";
