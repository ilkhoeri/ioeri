import { Svg, type SvgProps } from "../svg";

export const PaperPlaneIcon = ({ ...props }: SvgProps) => {
  // const rest = { fill, stroke, strokeWidth, ...props };
  return (
    <Svg {...props}>
      <path d="m22.3,18.8L13.3,3c-.4-.7-1.3-1-2-.6-.2,0-.4.3-.6.6L1.7,18.8c-.4.7-.1,1.6.6,2,.4.2.8.2,1.2.1l8.5-2.9h0l8.5,2.9c.8.3,1.6-.1,1.9-.9.1-.4.1-.9-.1-1.2h0Zm-1.3.7l-8.2-2.8v-5.4c0-.4-.3-.8-.8-.8s-.8.3-.8.8v5.4l-8.2,2.8h0L12,3.8l9,15.8h0Z" />
    </Svg>
  );
};
