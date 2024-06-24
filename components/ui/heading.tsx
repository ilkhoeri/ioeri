import * as React from "react";
import { twMerge } from "tailwind-merge";
import { cvx, type VariantsType } from "@/modules";

const headingVariants = cvx({
  variants: { size: { h1: "size-h1", h2: "size-h2", h3: "size-h3", h4: "size-h4", h5: "size-h5", h6: "size-h6" } },
});

type HeadingList = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
export interface HeadingProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
  el: HeadingList;
  size?: HeadingList;
  unstyled?: boolean;
}
const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ el, className, unstyled, size, ...props }, ref) => {
    let H: React.ElementType = el;

    const heading = {
      ref,
      "data-heading": el,
      className: twMerge(!unstyled && headingVariants({ size: size ?? el }), className),
      ...props,
    };

    return <H {...heading} />;
  },
);
Heading.displayName = "Heading";

export { Heading };
