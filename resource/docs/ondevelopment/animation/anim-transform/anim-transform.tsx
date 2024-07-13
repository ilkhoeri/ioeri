"use client";
import * as React from "react";
import { mergeRefs } from "@/modules/hooks";
import { observeIntersection, styletransformVars } from "./utils-anim-transform";

import type { TransformProps } from "./types-anim-transform";

export const Transform = React.forwardRef<HTMLElement, TransformProps>((props, ref) => {
  const { style, el = "div", hold, opacity, withoutOpacity, transform, transition, ...others } = props;
  const componentRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const cleanup = observeIntersection(componentRef, { hold, opacity, withoutOpacity, transform });
    return cleanup;
  }, [hold, opacity, transform, withoutOpacity]);

  const Component = el as React.ElementType;

  return (
    <Component
      ref={mergeRefs(componentRef, ref)}
      data-anim="transform"
      style={{
        ...styletransformVars(props as TransformProps),
        ...style,
      }}
      {...others}
    />
  );
});

Transform.displayName = "Transform";
