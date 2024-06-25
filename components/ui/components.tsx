import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { twMerge } from "tailwind-merge";
import { cn } from "@/lib/utils";
import { VariantsType, cvx } from "@/modules";

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

const variantH = cvx({
  assign: "scroll-m-20 first:mt-0",
  variants: {
    variant: {
      title: "border-b mt-12 font-bold tracking-normal pb-2",
      section: "border-0 mt-8 font-semibold tracking-tight pb-0",
      article: "mb-4 font-medium",
    },
    size: { h1: "text-h1", h2: "text-h2", h3: "text-h3", h4: "text-h4", h5: "text-h5", h6: "text-h6" },
  },
  defaultVariants: { variant: "title", size: "h3" },
});
type HeadingList = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
interface HeadingElement
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>,
    VariantsType<typeof variantH> {
  el?: HeadingList;
  unstyled?: boolean;
}
export const Title = React.forwardRef<HTMLHeadingElement, HeadingElement>(
  ({ el = "h1", children, title, unstyled, className, variant, size, ...props }, ref) => {
    let Component: React.ElementType = el;
    return (
      <Component ref={ref} className={cn(!unstyled && variantH({ variant, size }), className)} {...props}>
        {children || title}
      </Component>
    );
  },
);
Title.displayName = "Title";

const variantP = cvx({
  assign: "text-paragraph white-space-pre-wrap [&:not(:first-child)]:mt-3",
  variants: {
    color: {
      color: "text-color",
      muted: "text-muted-foreground",
    },
  },
  defaultVariants: { color: "muted" },
});
export const Paragraph = React.forwardRef<HTMLElement, ElementType<HTMLElement> & VariantsType<typeof variantP>>(
  ({ className, el = "p", unstyled = false, color, ...props }, ref) => {
    let Component: ComponentType<HTMLElement> = el as ComponentType<HTMLElement>;

    return <Component ref={ref} className={twMerge(!unstyled && variantP({ color }), className)} {...props} />;
  },
);
Paragraph.displayName = "Paragraph";

/**
export const X = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(({ ...props }, ref) => (
  <div ref={ref} {...props} />
));
X.displayName = "X";
 */
