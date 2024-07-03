import * as React from "react";
import { twMerge } from "tailwind-merge";

const PrimitiveSlot = React.forwardRef(
  <T extends React.ElementType>(
    { children, ...props }: { children: React.ReactElement } & Omit<React.ComponentProps<T>, "ref">,
    ref: React.Ref<any>,
  ) => {
    const child = React.Children.only(children);

    return React.cloneElement(child, {
      ref,
      ...props,
      style: { ...props.style, ...child.props.style },
      className: twMerge(child.props.className, props.className),
    });
  },
);
PrimitiveSlot.displayName = "PrimitiveSlot";

export interface CSSProperties extends React.CSSProperties {
  [key: string]: any;
}

export type PolymorphicSlotRef<T extends React.ElementType> = React.ComponentPropsWithRef<T>["ref"];

export type PolymorphicSlotWithoutRef<T extends React.ElementType, Exclude extends string = never> = Omit<
  React.ComponentProps<T>,
  "ref" | "style" | Exclude
> & {
  el?: T;
  style?: CSSProperties;
};

export type ElementType<T extends React.ElementType> = PolymorphicSlotWithoutRef<T> & { asChild?: boolean };

const Slot = <T extends React.ElementType = "div">(
  { asChild = false, el, ...props }: ElementType<T>,
  ref: PolymorphicSlotRef<T>,
) => {
  const Component = asChild ? PrimitiveSlot : ((el || "div") as React.ElementType);

  return <Component ref={ref} {...props} />;
};

export default React.forwardRef(Slot) as <T extends React.ElementType = "div">(
  props: ElementType<T> & { ref?: PolymorphicSlotRef<T> },
) => React.ReactElement | null;
