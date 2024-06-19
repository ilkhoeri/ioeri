import * as React from "react";

type Props = {
  text: string;
  highlight: string;
  el?: React.ElementType;
  style?: React.CSSProperties & {
    [key: string]: any;
  };
} & Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>, "children">;

type ComponentType = React.ComponentType<React.HTMLAttributes<HTMLParagraphElement>>;

export const HighlightText = React.forwardRef<HTMLParagraphElement, Props>(
  ({ el = "p", text, highlight, ...props }, ref) => {
    let P: ComponentType = el as ComponentType;

    const lowerTitle = text.toLowerCase();
    const lowerQuery = highlight.toLowerCase();
    const startIndex = lowerTitle.indexOf(lowerQuery);
    const endIndex = startIndex + lowerQuery.length;
    const before = text.slice(0, startIndex);
    const match = text.slice(startIndex, endIndex);
    const after = text.slice(endIndex);

    return (
      <P ref={ref} {...props}>
        {before}
        <mark>{match}</mark>
        {after}
      </P>
    );
  },
);
HighlightText.displayName = "HighlightText";
