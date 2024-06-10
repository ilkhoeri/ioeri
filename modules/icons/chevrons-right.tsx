import { Svg, SvgProps } from "./utils";

export const ChevronsRightIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg {...props}>
      <path d="m6 17 5-5-5-5" />
      <path d="m13 17 5-5-5-5" />
    </Svg>
  );
};
