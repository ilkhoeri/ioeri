import { Svg, SvgProps } from "./utils";

export const CheckCircleIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg {...props}>
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M9 12l2 2l4 -4" />
    </Svg>
  );
};
