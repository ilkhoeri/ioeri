import { Svg, type SvgProps } from "../components/web/svg/svg";

export const BlockWordIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg {...props}>
      <path d="M22 13V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8" />
      <path d="m4 15 4-8 4 8" />
      <path d="M5 13h6" />
      <circle cx="16.5" cy="12" r="3" />
      <path d="M20 9v6" />
      <line x1="17" x2="22" y1="17" y2="22" />
      <line x1="17" x2="22" y1="22" y2="17" />
    </Svg>
  );
};
