import { Svg, type SvgProps } from "../components/web/svg/svg";

export const ArrowConnectedLeftAndRightIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg {...props}>
      <path d="M11 17h10" />
      <path d="M18 14l3 3l-3 3" />
      <path d="M7 17a2 2 0 1 1 -4 0a2 2 0 0 1 4 0z" />
      <path d="M13 7h-10" />
      <path d="M6 10l-3 -3l3 -3" />
      <path d="M17 7a2 2 0 1 1 4 0a2 2 0 0 1 -4 0z" />
    </Svg>
  );
};
