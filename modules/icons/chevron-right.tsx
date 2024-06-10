import { Svg, SvgProps } from "./utils";

export const ChevronRightIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg {...props}>
      <path d="m9 18 6-6-6-6" />
    </Svg>
  );
};
