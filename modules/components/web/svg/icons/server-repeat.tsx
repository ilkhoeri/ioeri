import { Svg, type SvgProps } from "../svg";

export const ServerRepeatIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg {...props}>
      <g data-d="server">
        <path d="M3 4m0 3a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v2a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3z" />
        <path d="M12 20h-6a3 3 0 0 1 -3 -3v-2a3 3 0 0 1 3 -3h10.5" />
        <path d="M7 8v.01" />
        <path d="M7 16v.01" />
      </g>
      <g data-d="repeat">
        <path d="M20 14l2 2h-3" />
        <path d="M20 18l2 -2" />
        <path d="M19 16a3 3 0 1 0 2 5.236" />
      </g>
    </Svg>
  );
};
