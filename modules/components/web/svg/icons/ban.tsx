import { Svg, type SvgProps } from "../svg";

export const BanIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="m4.9 4.9 14.2 14.2" />
    </Svg>
  );
};
