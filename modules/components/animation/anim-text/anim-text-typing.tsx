"use client";
import * as React from "react";
import { useTextTyping } from "./utils-anim-text";

import type { ComponentType } from "../../../types/shared";
import type { AnimTextAllTypes, AnimTextTypingType } from "./types-anim-text";

export const AnimTextTyping = ({ anim, ...props }: AnimTextAllTypes) => {
  const { el = "div", duration, placeholders, ...others } = props as AnimTextTypingType;
  const { elementRef } = useTextTyping({ duration, placeholders });

  let Root: ComponentType = el as ComponentType;
  const root = { ref: elementRef, "data-anim": "text-" + anim, ...others };

  return <Root {...root} />;
};

AnimTextTyping.displayName = "ioeri/AnimTextTyping";
