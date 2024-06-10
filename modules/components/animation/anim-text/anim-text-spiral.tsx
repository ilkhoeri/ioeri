"use client";
import * as React from "react";
import { useTextSpiral } from "./utils-anim-text";

import type { AttributesElement, ComponentType } from "../../../types/shared";
import type { AnimTextAllTypes, AnimTextSpiralType } from "./types-anim-text";

import { cnx } from "@/modules";
import "./spiral.css";

const Spiral = React.forwardRef<HTMLElement, AttributesElement>(({ el = "div", ...rest }, ref) => {
  let Child: ComponentType = el as ComponentType;
  return <Child ref={ref} {...rest} />;
});
Spiral.displayName = "Spiral";

export const AnimTextSpiral = ({ anim, ...props }: AnimTextAllTypes) => {
  const { el, placeholders, duration, className, classNames, style, styles, ...others } = props as AnimTextSpiralType;
  const { refWrap1, refWrap2 } = useTextSpiral({ el, placeholders, duration });

  const root = { el: el?.root, "data-anim": "text-" + anim, className: cnx(className, classNames?.root), ...others };
  const nth1 = { ref: refWrap1, el: el?.wrap, className: classNames?.wrap, style: styles?.wrap };
  const nth2 = { ref: refWrap2, el: el?.wrap, className: classNames?.wrap, style: styles?.wrap };

  return (
    <Spiral {...root}>
      <Spiral {...nth1} />
      <Spiral {...nth2} />
    </Spiral>
  );
};

AnimTextSpiral.displayName = "ioeri/AnimTextSpiral";
