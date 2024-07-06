"use client";
import React from "react";

import { mergeRefs, useScrollArea, type UseScrollAreaType } from "@/resource/docs";
import { twMerge } from "tailwind-merge";

type ScrollAreaOrigin = "content" | "thumb";
export type ScrollAreaType = UseScrollAreaType & {
  el?: React.ElementType;
  style?: React.CSSProperties & { [key: string]: any };
  classNames?: Partial<Record<ScrollAreaOrigin, string>>;
  styles?: Partial<Record<ScrollAreaOrigin, React.CSSProperties & { [key: string]: any }>>;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const ScrollArea = React.forwardRef<React.ElementRef<"div">, ScrollAreaType>(
  ({ el = "div", overflow = "y", className, classNames, style, styles, ...props }, ref) => {
    const { scrollContentRef, thumbRef } = useScrollArea({ overflow });

    type ComponentType = React.ComponentType<React.HTMLAttributes<HTMLElement>>;
    let Component: ComponentType = el as ComponentType;
    const Span = "span" as React.ElementType;

    return (
      <>
        <Component
          ref={mergeRefs(scrollContentRef, ref)}
          data-overflow={overflow}
          data-state="acroll-area"
          className={twMerge(
            "scroll-area-content peer",
            overflow === "y" && "overflow-y-auto overflow-x-hidden",
            overflow === "x" && "overflow-y-hidden overflow-x-auto",
            className,
            classNames?.content,
          )}
          style={{ ...style, ...styles?.content }}
          {...props}
        />

        <Span
          ref={thumbRef}
          data-overflow={overflow}
          data-state="thumb"
          aria-label="thumb"
          className={twMerge(
            "thumb rounded-full hover:bg-muted peer-hover:bg-muted peer-hover:data-[scroll=active]:bg-muted-foreground data-[scroll=active]:bg-muted-foreground",
            overflow === "y" && "right-8 min-w-1.5 w-1.5",
            overflow === "x" && "bottom-8 min-h-1.5 h-1.5",
            classNames?.thumb,
          )}
          style={styles?.thumb}
        />
      </>
    );
  },
);
ScrollArea.displayName = "ScrollArea";
