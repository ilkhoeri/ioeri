import { Svg, type SvgProps } from "../svg";

export const ChevronUpDownSquareRoundIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg {...props}>
      <path d="M8 10l4 -3l4 3" />
      <path d="M16 14l-4 3l-4 -3" />
      <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" data-d="square" />
    </Svg>
  );
};
