import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

interface CSSProperties extends React.CSSProperties {
  [key: string]: any;
}

export type PolymorphicRef<T extends React.ElementType> = React.ComponentPropsWithRef<T>["ref"];

export type PolymorphicWithoutRef<T extends React.ElementType, Exclude extends string = never> = Omit<
  React.ComponentProps<T>,
  "ref" | "style" | Exclude
> & {
  el?: T;
  style?: CSSProperties;
};

export type ElementType<T extends React.ElementType> = PolymorphicWithoutRef<T> & { asChild?: boolean };

const Element = <T extends React.ElementType = "div">(
  { asChild = false, el, ...props }: ElementType<T>,
  ref: PolymorphicRef<T>,
) => {
  const Component = asChild ? Slot : ((el || "div") as React.ElementType);

  return <Component ref={ref} {...props} />;
};

export default React.forwardRef(Element) as <T extends React.ElementType = "div">(
  props: ElementType<T> & { ref?: PolymorphicRef<T> },
) => React.ReactElement | null;
