import { Svg, type SvgProps } from "../svg";

export const MapIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg {...props}>
      <path d="M3 7l6 -3l6 3l6 -3v13l-6 3l-6 -3l-6 3v-13" />
      <path d="M9 4v13" />
      <path d="M15 7v13" />
    </Svg>
  );
};
