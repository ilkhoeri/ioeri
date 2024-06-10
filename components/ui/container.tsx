import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { twMerge } from "tailwind-merge";

export type ContainerProps = {
  /** @default <div> */
  el?: React.ElementType;
  /** @default false */
  asChild?: boolean;
  /** @default false */
  unstyled?: boolean;
} & React.HTMLAttributes<HTMLElement>;

const Container = React.forwardRef<HTMLElement, ContainerProps>(
  ({ className, el = "div", unstyled = false, asChild = false, ...props }, ref) => {
    let Ct: React.ComponentType<React.HTMLAttributes<HTMLElement>> = el as React.ComponentType<
      React.HTMLAttributes<HTMLElement>
    >;
    const Ctn = asChild ? Slot : Ct;
    const attr = {
      ref,
      className: twMerge(!unstyled && "relative mx-auto max-w-screen-3xl w-full", className),
      ...props,
    };
    return <Ctn {...attr} />;
  },
);
Container.displayName = "Container";

export default Container;
