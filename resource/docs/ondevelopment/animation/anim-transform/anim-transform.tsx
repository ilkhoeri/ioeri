"use client";

import * as React from "react";

import { observeIntersection, styletransformVars } from "./utils-anim-transform";
import type { TransformProps } from "./types-anim-transform";

type ComponentType = React.ComponentType<React.HTMLAttributes<HTMLElement>>;

export const Transform: React.FC<TransformProps> = (props) => {
  const { style, el = "div", hold, opacity, withoutOpacity, transform, transition, ...others } = props;
  const ref = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const cleanup = observeIntersection(ref, { hold, opacity, withoutOpacity, transform });
    return cleanup;
  }, [hold, opacity, transform, withoutOpacity]);

  const attrTransform = {
    ref: ref,
    "data-anim": "transform",
    style: {
      ...styletransformVars(props as TransformProps),
      ...style,
    },
    ...others,
  };

  let Root: ComponentType = el as ComponentType;

  return <Root {...attrTransform} />;
};

Transform.displayName = "ioeri/Transform";
