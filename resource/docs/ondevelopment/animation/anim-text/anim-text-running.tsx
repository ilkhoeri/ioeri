"use client";
import * as React from "react";

import { cnx } from "@/modules/utility";
import { useAnimatedRunningWords, type AnimatedRunningWordsType } from "./use-animated-running-words";

import type { AnimTextAllTypes } from "./types-anim-text";
import type { CSSProperties } from "../../../types/shared";

type AttributesElement = {
  el?: React.ElementType;
  ref?: React.Ref<HTMLElement>;
  style?: CSSProperties;
};

type ComponentType = React.ComponentType<React.HTMLAttributes<HTMLElement>>;

const TextRunningWrap = React.forwardRef<HTMLElement, AttributesElement>(({ el = "div", ...rest }, ref) => {
  let Wrap: ComponentType = el as ComponentType;

  const wrap = {
    ref,
    ...rest,
  };
  return <Wrap {...wrap} />;
});
TextRunningWrap.displayName = "TextRunningWrap";

const TextRunningInner = React.forwardRef<HTMLElement, AttributesElement>(({ el = "div", style, ...rest }, ref) => {
  let Inner: ComponentType = el as ComponentType;

  const inner = {
    ref,
    style: { whiteSpace: "nowrap", ...style },
    ...rest,
  };
  return <Inner {...inner} />;
});
TextRunningInner.displayName = "TextRunningInner";

const AnimTextRunning: React.FC<AnimTextAllTypes> = ({ anim, suppressHydrationWarning = true, ...props }) => {
  const { placeholders, el, className, classNames, style, styles, children, speed, direction, ...rest } =
    props as AnimatedRunningWordsType;
  const { wrapRef, innerRef } = useAnimatedRunningWords({ speed, direction });

  const wrap = {
    ref: wrapRef,
    suppressHydrationWarning,
    el: el?.wrap,
    "data-anim": "text-" + anim,
    className: cnx(className, classNames?.wrap),
    style: { ...style, ...styles?.wrap },
    ...rest,
  };
  const inner = {
    ref: innerRef,
    suppressHydrationWarning,
    el: el?.inner,
    className: classNames?.inner,
    style: styles?.inner,
  };

  const isPlaceholders = Array.isArray(placeholders) ? placeholders.join(" ") : placeholders;
  return (
    <TextRunningWrap {...wrap}>
      <TextRunningInner {...inner}>{children || isPlaceholders}</TextRunningInner>
    </TextRunningWrap>
  );
};
AnimTextRunning.displayName = "ioeri/Running";

export { TextRunningWrap, TextRunningInner, AnimTextRunning };
