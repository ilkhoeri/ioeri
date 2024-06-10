import { Svg, SvgProps } from "./utils";

export const XIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg {...props}>
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </Svg>
  );
};
