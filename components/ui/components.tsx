"use client";

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
          !unstyled && "w-full max-w-full overflow-x-hidden relative flex flex-col max-md:pl-6 pr-6 md:pr-9 xl:pr-12",
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

interface TitleProps
  extends React.ComponentPropsWithoutRef<"h1">,
    React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
  title: string | undefined;
  scrollUpto?: number;
  type?: "masive" | "tick";
}
export const Title = React.forwardRef<React.ElementRef<"h1">, TitleProps>(
  ({ title, scrollUpto = 200, type = "masive", className, style, ...props }, ref) => {
    const [opacity, setOpacity] = React.useState(1);

    React.useEffect(() => {
      const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const newOpacity = 1 - scrollPosition / scrollUpto;
        setOpacity(Math.max(0.1, newOpacity));
      };
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, [scrollUpto]);

    return (
      <h1
        ref={ref}
        className={twMerge(
          type === "masive" && "overflow-hidden sticky top-0 -z-9 md:-mt-8 [font-size:clamp(42px,2px+10dvw,80px)]",
          type === "tick" && "mb-3 text-h4 font-bold leading-none font-kanit",
          className,
        )}
        style={{ opacity, ...style }}
        {...props}
      >
        <span
          className={twMerge(
            "select-none font-extrabold font-kanit text-muted-foreground w-0 max-w-0 [transition:all_250ms_ease]",
          )}
        >
          {title}
        </span>
      </h1>
    );
  },
);
Title.displayName = "Title";

/**
export const X = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(({ ...props }, ref) => (
  <div ref={ref} {...props} />
));
X.displayName = "X";
 */
