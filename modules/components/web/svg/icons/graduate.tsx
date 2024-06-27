import { Svg, type SvgProps } from "../svg";

export const GraduatedIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg {...props}>
      <path d="M22 9l-10 -4l-10 4l10 4l10 -4v6" />
      <path d="M6 10.6v5.4a6 3 0 0 0 12 0v-5.4" />
    </Svg>
  );
};
