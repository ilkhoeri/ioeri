import * as React from "react";
import type { CSSProperties } from "../utils/record-types";

type Props = {
  text: string;
  highlight: string;
  /** @default <p> */
  el?: React.ElementType;
  style?: CSSProperties;
} & Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>, "children">;
// React.HTMLAttributes<HTMLElement>

type ComponentType = React.ComponentType<React.HTMLAttributes<HTMLParagraphElement>>;

export const HighlightText = React.forwardRef<HTMLParagraphElement, Props>(
  ({ el = "p", text, highlight, ...props }, ref) => {
    let P: ComponentType = el as ComponentType;
    const rest = { ref, ...props };

    const lowerTitle = text.toLowerCase();
    const lowerQuery = highlight.toLowerCase();
    const startIndex = lowerTitle.indexOf(lowerQuery);
    const endIndex = startIndex + lowerQuery.length;
    const before = text.slice(0, startIndex);
    const match = text.slice(startIndex, endIndex);
    const after = text.slice(endIndex);
    return (
      <P {...rest}>
        {before}
        <mark>{match}</mark>
        {after}
      </P>
    );
  },
);
HighlightText.displayName = "HighlightText";
