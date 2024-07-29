import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cvx, type VariantsType } from "@/modules/utility/cvx/cvx";

import { twMerge } from "tailwind-merge";
import { Spinner } from "../assets/anim-loader";

const buttonVariants = cvx({
  assign:
    "text-[14px] leading-tight font-medium rounded-md focus-visible:ring-offset-2 disabled:pointer-events-none disabled:gap-2",
  variants: {
    variant: {
      default: "text-color",
      destructive: "text-white font-bold action_destructive",
      outline: "border bg-background hover:bg-muted",
      ghost: "hover:bg-muted hover:text-muted-foreground",
      link: "text-muted-foreground underline-offset-4 hover:underline",
    },
    size: {
      default: "h-8 px-4 py-2",
      sm: "h-8 px-3",
      lg: "h-10 px-8",
      icon: "sizer [--sz:--sz-4]",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export type MouseEventButtonType = React.MouseEvent<HTMLButtonElement, MouseEvent>;
export type ButtonVariantsType = "destructive" | "constructive" | "conservative";
export interface UnstyledProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "style"> {
  asChild?: boolean;
  loading?: boolean;
  style?: React.CSSProperties & { [key: string]: any };
}
export interface ButtonProps extends UnstyledProps, VariantsType<typeof buttonVariants> {
  unstyled?: boolean;
}

const UnstyledButton = React.forwardRef<HTMLButtonElement, UnstyledProps>(
  ({ asChild = false, type = "button", children, loading, disabled, ...props }, ref) => {
    const Btn = asChild ? Slot : "button";
    const rest = {
      ref,
      type,
      disabled: loading || disabled,
      ...props,
    };
    return (
      <Btn {...rest}>
        {loading && <Spinner />}
        {children}
      </Btn>
    );
  },
);
UnstyledButton.displayName = "UnstyledButton";

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ unstyled, className, variant, size, ...props }, ref) => {
    const rest = {
      ref,
      className: twMerge(!unstyled && buttonVariants({ variant, size }), className),
      ...props,
    };
    return <UnstyledButton {...rest} />;
  },
);
Button.displayName = "Button";

export { UnstyledButton, Button, buttonVariants };
