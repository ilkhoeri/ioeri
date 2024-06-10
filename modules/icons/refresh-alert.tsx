import { Svg, SvgProps } from "./utils";

export const RefreshAlertIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg {...props}>
      <g data-g="exclamation-mark">
        <path d="M12 9l0 3" />
        <path d="M12 15l.01 0" />
      </g>
      <g data-g="circular-arrow">
        <path d="m4,11c.6-4.4,4.7-7.5,9.1-6.9,2.8.4,5.3,2.3,6.4,4.9m.5-4v4h-4" />
        <path d="m20,13c-.6,4.4-4.7,7.5-9.1,6.9-2.8-.4-5.3-2.3-6.4-4.9m-.5,4v-4h4" />
      </g>
    </Svg>
  );
};
