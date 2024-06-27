import { Svg, type SvgProps } from "../svg";

export const CodeIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg {...props}>
      <path d="M7 8l-4 4l4 4" />
      <path d="M17 8l4 4l-4 4" />
      <path d="M14 4l-4 16" />
    </Svg>
  );
};
