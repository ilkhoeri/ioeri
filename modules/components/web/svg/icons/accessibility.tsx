import { Svg, type SvgProps } from "../svg";

export const AccessibilityIcon = ({
  fill = "currentColor",
  stroke = "none",
  strokeWidth = "0",
  ...props
}: SvgProps) => {
  const rest = { fill, stroke, strokeWidth, ...props };
  return (
    <Svg {...rest}>
      <path
        strokeWidth={0}
        stroke="none"
        fill="currentColor"
        d="m8.7,9c-.4-.2-.9,0-1.1.4s0,.9.4,1.1l.4.2c.6.3,1.2.5,1.9.6v1.8c0,.2,0,.3,0,.4l-1,3c-.1.4,0,.9.5,1.1s.9,0,1.1-.5l.9-2.6c0-.1.2-.2.3-.2s.3,0,.3.2l.9,2.6c.1.4.6.7,1.1.5s.7-.6.5-1.1l-1-3c0-.1,0-.3,0-.4v-1.8c.6-.1,1.3-.3,1.9-.6l.4-.2c.4-.2.6-.7.4-1.1s-.7-.6-1.1-.4l-.4.2c-.9.4-1.9.6-2.9.6s-2-.2-2.9-.6l-.4-.2h0Zm3.3-.3c.8,0,1.4-.6,1.4-1.4s-.6-1.4-1.4-1.4-1.4.6-1.4,1.4.6,1.4,1.4,1.4Z"
      />
      <path
        strokeWidth={0}
        stroke="none"
        fill="currentColor"
        d="m12,22c-5.5,0-10-4.5-10-10S6.5,2,12,2s10,4.5,10,10-4.5,10-10,10Zm0-18c-4.4,0-8,3.6-8,8s3.6,8,8,8,8-3.6,8-8-3.6-8-8-8Z"
      />
    </Svg>
  );
};
