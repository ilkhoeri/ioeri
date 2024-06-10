import { Svg, SvgProps } from "./utils";

export const PaperPlaneIcon = ({ fill = "currentColor", stroke = "none", strokeWidth = 0, ...props }: SvgProps) => {
  const rest = { fill, stroke, strokeWidth, ...props };
  return (
    <Svg {...rest}>
      <path d="m22.8,18.8L13.6,2.6c-.5-.9-1.7-1.3-2.5-.8-.3.1-.5.4-.8.8L1.2,18.8c-.2.4-.3.9-.1,1.4.1.5.5.9.9,1.1.4.2.9.3,1.5.1l8.5-2.9,8.5,2.9c.2,0,.4.1.7.1.8,0,1.5-.5,1.8-1.3.1-.5.1-1.1-.1-1.5Zm-10.8-8.7c-.7,0-1.2.5-1.2,1.2v5.3l-7.1,2.4L12,4.4l8.2,14.6-7-2.4v-5.3c0-.6-.4-1.2-1.2-1.2Z" />
    </Svg>
  );
};
