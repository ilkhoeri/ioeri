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
          !unstyled && "w-full relative flex flex-col md:flex-row mx-auto max-w-screen-3xl min-h-screen pb-14",
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
          !unstyled && "w-full max-w-full overflow-x-hidden relative flex flex-col max-md:px-6 pt-9",
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
    let Dispatch: ComponentType<HTMLElement> = el as ComponentType<HTMLElement>;
    const Component = asChild ? Slot : Dispatch;

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

interface HeadingElement extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
  el?: React.ElementType;
  type?: "masive" | "drive" | "tick";
}
export const Title = React.forwardRef<HTMLHeadingElement, HeadingElement>(
  ({ el = "h1", children, title, type = "masive", className, ...props }, ref) => {
    let Component: ComponentType<HTMLElement> = el as ComponentType<HTMLElement>;

    return (
      <Component
        ref={ref}
        className={twMerge(
          type === "masive" && "overflow-hidden [font-size:clamp(42px,2px+10dvw,80px)]",
          type === "drive" &&
            "font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0",
          type === "tick" && "mb-3 size-h4 font-bold leading-none font-kanit",
          className,
        )}
        {...props}
      >
        {children || title}
      </Component>
    );
  },
);
Title.displayName = "Title";

export const Paragraph = React.forwardRef<HTMLElement, ElementType<HTMLElement>>(
  ({ className, el = "p", unstyled = false, ...props }, ref) => {
    let Component: ComponentType<HTMLElement> = el as ComponentType<HTMLElement>;

    return (
      <Component
        ref={ref}
        className={twMerge(
          !unstyled && "size-paragraph text-muted-foreground white-space-pre-wrap [&:not(:first-child)]:mt-3",
          className,
        )}
        {...props}
      />
    );
  },
);
Paragraph.displayName = "Paragraph";

/**
export const X = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(({ ...props }, ref) => (
  <div ref={ref} {...props} />
));
X.displayName = "X";
 */
