"use client";
import * as React from "react";

import { useRunning } from "./utils-running";
import type { RunningType } from "./types-running";
import type { AttributesElement, ComponentType } from "../../../types/shared";

import { cnx } from "@/modules";

const RunningWrap = React.forwardRef<HTMLElement, AttributesElement>(({ el = "div", ...rest }, ref) => {
  let Wrap: ComponentType = el as ComponentType;

  const wrap = {
    ref,
    ...rest,
  };
  return <Wrap {...wrap} />;
});
RunningWrap.displayName = "RunningWrap";

const RunningInner = React.forwardRef<HTMLElement, AttributesElement>(({ el = "div", style, ...rest }, ref) => {
  let Inner: ComponentType = el as ComponentType;

  const inner = {
    ref,
    style: { whiteSpace: "nowrap", ...style },
    ...rest,
  };
  return <Inner {...inner} />;
});
RunningInner.displayName = "RunningInner";

const Running: React.FC<RunningType> = (_props) => {
  const { children, el, className, classNames, style, styles, ...rest } = _props;
  const { wrapRef, innerRef } = useRunning(_props);

  const wrap = {
    ref: wrapRef,
    el: el?.wrap,
    "data-anim": "running",
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

  return (
    <RunningWrap {...wrap}>
      <RunningInner {...inner}>{children}</RunningInner>
    </RunningWrap>
  );
};
Running.displayName = "ioeri/Running";

export { RunningWrap, RunningInner, Running };
