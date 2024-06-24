import React from "react";

import { mergeRefs, useKitScrollbar, type UseKitScrollbarType } from "@/modules";
import { twMerge } from "tailwind-merge";

type ScrollbarTrees = "content" | "thumb";
export type ScrollbarType = UseKitScrollbarType & {
  el?: React.ElementType;
  style?: React.CSSProperties & { [key: string]: any };
  classNames?: Partial<Record<ScrollbarTrees, string>>;
  styles?: Partial<Record<ScrollbarTrees, React.CSSProperties & { [key: string]: any }>>;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const Scrollbar = React.forwardRef<React.ElementRef<"div">, ScrollbarType>(
  ({ el = "div", overflow = "y", className, classNames, style, styles, ...props }, ref) => {
    const { scrollContentRef, thumbRef } = useKitScrollbar({ overflow });

    type ComponentType = React.ComponentType<React.HTMLAttributes<HTMLElement>>;
    let Component: ComponentType = el as ComponentType;

    return (
      <>
        <Component
          ref={mergeRefs(scrollContentRef, ref)}
          className={twMerge(
            overflow === "y" && "overflow-y-auto overflow-x-hidden",
            overflow === "x" && "overflow-y-hidden overflow-x-auto",
            className,
            classNames?.content,
          )}
          style={{ ...style, ...styles?.content }}
          {...props}
        />

        <span
          ref={thumbRef}
          aria-label="thumb"
          className={twMerge(
            "rounded-full",
            overflow === "y" && "right-8 w-1.5",
            overflow === "x" && "bottom-8 h-1.5",
            classNames?.thumb,
          )}
          style={styles?.thumb}
        />
      </>
    );
  },
);
Scrollbar.displayName = "Scrollbar";
