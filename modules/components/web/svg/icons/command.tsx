import { Svg, type SvgProps } from "../svg";

export const CommandIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg {...props}>
      <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
    </Svg>
  );
};
