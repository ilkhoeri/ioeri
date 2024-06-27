import { Svg, type SvgProps } from "../svg";

export const SunIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg {...props} data-initial="icon-theme-sync">
      <path d="M14.828 14.828a4 4 0 1 0 -5.656 -5.656a4 4 0 0 0 5.656 5.656z" />
      <g data-g="high">
        <path d="M4 12h-3" />
        <path d="M12 4v-3" />
        <path d="M20 12h3" />
        <path d="M12 20v3" />
      </g>
      <g data-g="low">
        <path d="M6.343 17.657l-1.414 1.414" />
        <path d="M6.343 6.343l-1.414 -1.414" />
        <path d="M17.657 6.343l1.414 -1.414" />
        <path d="M17.657 17.657l1.414 1.414" />
      </g>
    </Svg>
  );
};
