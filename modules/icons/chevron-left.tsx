import { Svg, SvgProps } from "./utils";

export const ChevronLeftIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg {...props}>
      <path d="m15 18-6-6 6-6" />
    </Svg>
  );
};
