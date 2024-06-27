import { Svg, type SvgProps } from "../svg";

export const ChevronCircleLeftIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg {...props}>
      <path d="M13 15l-3 -3l3 -3" />
      <path d="M21 12a9 9 0 1 0 -18 0a9 9 0 0 0 18 0z" />
    </Svg>
  );
};
