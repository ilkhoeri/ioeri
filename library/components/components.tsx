import * as React from "react";
import { cn } from "@/library/utils";
import { twMerge } from "tailwind-merge";
import { createPortal } from "react-dom";
import { cvx, type VariantsType } from "@/modules/utility";

type ElementType<T> = {
  el?: React.ElementType;
  unstyled?: boolean;
} & React.DetailedHTMLProps<React.HTMLAttributes<T>, T>;

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

export const Section = React.forwardRef<HTMLElement, ElementType<HTMLElement>>(
  ({ className, el = "section", unstyled = false, ...props }, ref) => {
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
Section.displayName = "Section";

type ContainerProps = {
  child?: "wrap-only" | "container-only" | "complete";
} & ElementType<HTMLElement>;

export const Container = React.forwardRef<HTMLElement, ContainerProps>(
  ({ className, el = "article", unstyled = false, child = "complete", children, ...props }, ref) => {
    let Component: ComponentType<HTMLElement> = el as ComponentType<HTMLElement>;
    if (child === "wrap-only") {
      return <>{children}</>;
    }
    return (
      <Component ref={ref} className={twMerge(!unstyled && "relative mx-auto w-full", className)} {...props}>
        {child === "container-only" ? children : <>{children}</>}
      </Component>
    );
  },
);
Container.displayName = "Container";

const headings = cvx({
  assign: "scroll-m-20 first:mt-0",
  variants: {
    variant: {
      title: "border-b mt-12 font-bold tracking-normal pb-2",
      segment: "mt-12 font-bold tracking-normal",
      section: "border-0 mt-8 font-semibold tracking-tight pb-0",
      article: "mb-4 font-medium",
    },
    size: { h1: "text-h1", h2: "text-h2", h3: "text-h3", h4: "text-h4", h5: "text-h5", h6: "text-h6" },
  },
  defaultVariants: { variant: "title", size: "h3" },
});
type Headings = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
interface HeadingElement
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>,
    VariantsType<typeof headings> {
  el?: Headings;
  unstyled?: boolean;
}
export const Title = React.forwardRef<HTMLHeadingElement, HeadingElement>(
  ({ el = "h1", children, title, role = "presentation", unstyled, className, variant, size, ...props }, ref) => {
    let Component: React.ElementType = el;
    return (
      <Component ref={ref} role={role} className={cn(!unstyled && headings({ variant, size }), className)} {...props}>
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
      default: "text-color",
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

export function Portal({
  portal = true,
  children,
  container,
  key,
}: {
  portal?: boolean;
  children: React.ReactNode;
  container: Element | DocumentFragment | null;
  key?: null | string;
}) {
  if (typeof document === "undefined") return null;
  return portal ? createPortal(children, container || document.body, key) : children;
}

/**
export const X = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(({ ...props }, ref) => (
  <div ref={ref} {...props} />
));
X.displayName = "X";
 */
