import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

interface CSSProperties extends React.CSSProperties {
  [key: string]: any;
}

export type ElementProps = {
  /** @default <div> */
  el?: React.ElementType;
  /** @default false */
  asChild?: boolean;
  style?: CSSProperties;
  ref?: React.Ref<HTMLElement>;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
// React.HTMLAttributes<HTMLElement>

export const Element = React.forwardRef<HTMLElement, ElementProps>(({ el = "div", asChild = false, ...props }, ref) => {
  let X: React.ComponentType<React.HTMLAttributes<HTMLElement>> = el as React.ComponentType<
    React.HTMLAttributes<HTMLElement>
  >;
  const XX = asChild ? Slot : X;

  return <XX ref={ref} {...props} />;
});
Element.displayName = "Element";

export default Element;
