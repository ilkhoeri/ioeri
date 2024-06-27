import { Svg, type SvgProps } from "../svg";

export const AreaCodeIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg {...props} data-icon="area-code">
      <path d="m18,18c1.66,0,3-1.34,3-3V7c0-1.66-1.34-3-3-3H6c-1.66,0-3,1.34-3,3v8c0,1.66,1.34,3,3,3" />
      <path d="m10.5,16l-2,2,2,2" />
      <path d="m13.5,20l2-2-2-2" />
    </Svg>
  );
};
