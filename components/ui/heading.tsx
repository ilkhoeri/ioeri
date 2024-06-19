import * as React from "react";
import { twMerge } from "tailwind-merge";

const headingVariants = ({ size }: { size: HeadingList }): string | undefined => {
  const variants: { [key: string]: string } = {
    h1: "text-h1",
    h2: "text-h2",
    h3: "text-h3",
    h4: "text-h4",
    h5: "text-h5",
    h6: "text-h6",
  };

  return variants[size] || undefined;
};

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
