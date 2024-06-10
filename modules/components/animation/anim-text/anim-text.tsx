"use client";
import * as React from "react";

import { AnimTextTyping } from "./anim-text-typing";
import { AnimTextRunning } from "./anim-text-running";
import { AnimTextSpiral } from "./anim-text-spiral";

import type { AnimTextAllTypes, AnimTextRunningType, AnimTextSpiralType, AnimTextTypingType } from "./types-anim-text";

export const AnimText = (props: AnimTextAllTypes) => {
  const { anim, ...rest } = props;

  if (anim === "typing") {
    const { ...typing } = rest as AnimTextTypingType;
    return <AnimTextTyping anim={anim} {...typing} />;
  }
  if (anim === "running") {
    const { ...running } = rest as AnimTextRunningType;
    return <AnimTextRunning anim={anim} {...running} />;
  }
  if (anim === "spiral") {
    const { ...spiral } = rest as AnimTextSpiralType;
    return <AnimTextSpiral anim={anim} {...spiral} />;
  }

  if (!anim) {
    throw new Error("Prop 'type' is required for AnimText type. You Must Define AnimText type!");
  }

  return anim;
};

AnimText.displayName = "ioeri/AnimText";
