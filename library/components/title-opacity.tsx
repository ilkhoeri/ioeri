"use client";

import * as React from "react";
import { twMerge } from "tailwind-merge";
import { cvx, type VariantsType } from "@/modules/utility";

const variantTitle = cvx({
  variants: {
    type: {
      masive: "overflow-hidden sticky top-0 -z-9 md:-mt-8 [font-size:clamp(42px,2px+10dvw,80px)]",
      drive: "font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0",
      tick: "mb-3 text-h4 font-bold leading-none font-kanit",
    },
  },
});

type ComponentType<T> = React.ComponentType<React.HTMLAttributes<T>>;

interface HeadingElement
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>,
    VariantsType<typeof variantTitle> {
  el?: React.ElementType;
  scrollUpto?: number;
}

export const Title = React.forwardRef<HTMLHeadingElement, HeadingElement>(
  ({ el = "h1", children, title, scrollUpto = 200, type = "masive", className, style, ...props }, ref) => {
    const [opacity, setOpacity] = React.useState(1);

    let Component: ComponentType<HTMLElement> = el as ComponentType<HTMLElement>;

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
      <Component
        ref={ref}
        className={twMerge(variantTitle({ type }), className)}
        style={{ opacity: type === "masive" ? opacity : undefined, ...style }}
        {...props}
      >
        {children ||
          (title && (
            <span
              className={twMerge(
                "select-none font-extrabold font-kanit text-muted-foreground w-0 max-w-0 [transition:all_250ms_ease]",
              )}
            >
              {title}
            </span>
          ))}
      </Component>
    );
  },
);
Title.displayName = "Title";
