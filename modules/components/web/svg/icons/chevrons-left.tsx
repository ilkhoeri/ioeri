import { Svg, type SvgProps } from "../svg";

export const ChevronsLeftIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg {...props}>
      <path d="m11 17-5-5 5-5" />
      <path d="m18 17-5-5 5-5" />
    </Svg>
  );
};
