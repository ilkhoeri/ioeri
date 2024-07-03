import { Svg, type SvgProps } from "../components/web/svg/svg";

export const CheckIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg {...props}>
      <path d="M5 12l5 5l10 -10" />
    </Svg>
  );
};
