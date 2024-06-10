"use client";
import * as React from "react";

import { useTextRunning } from "./utils-anim-text";
import type { AnimTextAllTypes, AnimTextRunningType } from "./types-anim-text";
import type { AttributesElement, ComponentType } from "../../../types/shared";

import { cnx } from "@/modules";

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

const AnimTextRunning: React.FC<AnimTextAllTypes> = ({ anim, ...props }) => {
  const { placeholders, el, className, classNames, style, styles, children, speed, direction, ...rest } =
    props as AnimTextRunningType;
  const { wrapRef, innerRef } = useTextRunning({ speed, direction });

  const wrap = {
    ref: wrapRef,
    el: el?.wrap,
    "data-anim": "text-" + anim,
    className: cnx(className, classNames?.wrap),
    style: { ...style, ...styles?.wrap },
    ...rest,
  };
  const inner = {
    ref: innerRef,
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
