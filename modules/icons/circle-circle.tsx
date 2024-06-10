import { Svg, SvgProps } from "./utils";

export const CircleCircleIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg {...props}>
      <path d="M9.5 9.5m-6.5 0a6.5 6.5 0 1 0 13 0a6.5 6.5 0 1 0 -13 0" />
      <path d="M 15.5 15.5 m -6.5 0 a 6.5 6.5 0 1 0 13 0 a 6.5 6.5 0 1 0 -13 0" />
    </Svg>
  );
};
