import { Svg, type SvgProps } from "../components/web/svg/svg";

export const SlashIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg {...props}>
      <path d="M17 4l-9 17" />
    </Svg>
  );
};
