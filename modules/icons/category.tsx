import { Svg, SvgProps } from "./utils";

export const CategoryIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg {...props}>
      <path d="M14 4h6v6h-6z" />
      <path d="M4 14h6v6h-6z" />
      <path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
      <path d="M7 7m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
    </Svg>
  );
};
