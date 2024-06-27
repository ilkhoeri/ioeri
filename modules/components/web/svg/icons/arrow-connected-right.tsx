import { Svg, type SvgProps } from "../svg";

export const ArrowConnectedRightIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg {...props}>
      <path d="M11 12h10" />
      <path d="M18 9l3 3l-3 3" />
      <path d="M7 12a2 2 0 1 1 -4 0a2 2 0 0 1 4 0z" />
    </Svg>
  );
};
