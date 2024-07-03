import { Svg, type SvgProps } from "../components/web/svg/svg";

export const TerminalIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg {...props}>
      <path d="M5 7l5 5l-5 5" />
      <path d="M12 19l7 0" />
    </Svg>
  );
};
