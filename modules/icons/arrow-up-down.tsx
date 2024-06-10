import { Svg, SvgProps } from "./utils";

export const ArrowUpDownIcon = ({
  stroke = "currentColor",
  fill = "none",
  strokeWidth = "1.25",
  ...props
}: SvgProps) => {
  const rest = { stroke, fill, strokeWidth, ...props };
  return (
    <Svg {...rest}>
      <path d="M12 6l5 4h-10z" />
      <path d="M12 18l-5 -4h10z" />
    </Svg>
  );
};
