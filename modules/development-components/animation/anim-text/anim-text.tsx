"use client";
import * as React from "react";

import { AnimTextTyping } from "./anim-text-typing";
import { AnimTextRunning } from "./anim-text-running";
import { AnimTextSpiral } from "./anim-text-spiral";

import type { AnimTextAllTypes } from "./types-anim-text";
import type { AnimatedTypingWordsType } from "./use-animated-typing-words";
import type { AnimatedRunningWordsType } from "./use-animated-running-words";
import type { AnimatedSpiralWordsType } from "./use-animated-spiral-words";

export const AnimText = (props: AnimTextAllTypes) => {
  const { anim, ...rest } = props;

  if (anim === "typing") {
    const { ...typing } = rest as AnimatedTypingWordsType;
    return <AnimTextTyping anim={anim} {...typing} />;
  }
  if (anim === "running") {
    const { ...running } = rest as AnimatedRunningWordsType;
    return <AnimTextRunning anim={anim} {...running} />;
  }
  if (anim === "spiral") {
    const { ...spiral } = rest as AnimatedSpiralWordsType;
    return <AnimTextSpiral anim={anim} {...spiral} />;
  }

  if (!anim) {
    throw new Error("Prop 'type' is required for AnimText type. You Must Define AnimText type!");
  }

  return anim;
};

AnimText.displayName = "ioeri/AnimText";
