import { Svg, SvgProps } from "./utils";

export const SearchIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg {...props}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </Svg>
  );
};
