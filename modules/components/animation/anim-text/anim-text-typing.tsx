"use client";
import * as React from "react";

import {
  useAnimatedTypingWords,
  type AnimatedTypingWordsType,
} from "../../../hooks/use-animated/use-animated-typing-words";

import type { AnimTextAllTypes } from "./types-anim-text";

type ComponentType = React.ComponentType<React.HTMLAttributes<HTMLElement>>;

export const AnimTextTyping = ({ anim, suppressHydrationWarning = true, ...props }: AnimTextAllTypes) => {
  const { el = "div", duration, placeholders, ...others } = props as AnimatedTypingWordsType;
  const { elementRef } = useAnimatedTypingWords({ duration, placeholders });

  let Root: ComponentType = el as ComponentType;
  const root = { ref: elementRef, suppressHydrationWarning, "data-anim": "text-" + anim, ...others };

  return <Root {...root} />;
};

AnimTextTyping.displayName = "ioeri/AnimTextTyping";
