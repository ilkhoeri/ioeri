import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { twMerge } from "tailwind-merge";

type ElementType<T> = {
  el?: React.ElementType;
  unstyled?: boolean;
} & React.DetailedHTMLProps<React.HTMLAttributes<T>, T>;

type ContainerProps = {
  asChild?: boolean;
} & ElementType<HTMLElement>;

type ComponentType<T> = React.ComponentType<React.HTMLAttributes<T>>;

export const Main = React.forwardRef<HTMLElement, ElementType<HTMLElement>>(
  ({ className, el = "main", unstyled = false, ...props }, ref) => {
    let Component: ComponentType<HTMLElement> = el as ComponentType<HTMLElement>;

    return (
      <Component
        ref={ref}
        className={twMerge(
          !unstyled && "w-full relative flex flex-col md:flex-row mx-auto max-w-screen-3xl min-h-dvh pb-14",
          className,
        )}
        {...props}
      />
    );
  },
);
Main.displayName = "Main";

export const Article = React.forwardRef<HTMLElement, ElementType<HTMLElement>>(
  ({ className, el = "article", unstyled = false, ...props }, ref) => {
    let Component: ComponentType<HTMLElement> = el as ComponentType<HTMLElement>;

    return (
      <Component
        ref={ref}
        className={twMerge(
          !unstyled && "w-full max-w-full relative flex flex-col max-md:pl-6 pr-6 md:pr-9 xl:pr-12",
          className,
        )}
        {...props}
      />
    );
  },
);
Article.displayName = "Article";

export const Container = React.forwardRef<HTMLElement, ContainerProps>(
  ({ className, el = "div", unstyled = false, asChild = false, ...props }, ref) => {
    let DispatchComponent: ComponentType<HTMLElement> = el as ComponentType<HTMLElement>;
    const Component = asChild ? Slot : DispatchComponent;

    return (
      <Component
        ref={ref}
        className={twMerge(!unstyled && "relative mx-auto max-w-screen-3xl w-full", className)}
        {...props}
      />
    );
  },
);
Container.displayName = "Container";
