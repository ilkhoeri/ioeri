import { Svg, SvgProps } from "./utils";

export const EmptyBoxIcon = ({
  strokeWidth = 1,
  color = "currentColor",
  viewBox = "0 0 64 41",
  width = 64,
  height = 41,
  ...props
}: SvgProps) => {
  const rest = { strokeWidth, viewBox, width, height, ...props };
  return (
    <Svg {...rest}>
      <path
        d="m42,.5h-20c-1.2,0-2.3.5-3,1.4l-10,11.4v9.2h46v-9.2L45,1.9c-.8-.9-1.9-1.4-3-1.4Z"
        fill="none"
        stroke={color}
      />
      <path
        d="m41.6,16.5c0-1.6,1-2.9,2.2-2.9h11.2v18.1c0,2.1-1.3,3.9-3,3.9H12c-1.6,0-3-1.7-3-3.9V13.6h11.2c1.2,0,2.2,1.3,2.2,2.9h0c0,1.6,1,2.9,2.2,2.9h14.8c1.2,0,2.2-1.3,2.2-2.9h0Z"
        fill="none"
        stroke={color}
      />
      <path
        d="m55,28.64v-15.04h-11.2c-1.2,0-2.2,1.3-2.2,2.9s-1,2.9-2.2,2.9h-14.8c-1.2,0-2.2-1.3-2.2-2.9s-1-2.9-2.2-2.9h-11.2v15.04c-5.57,1.26-9,2.97-9,4.86,0,3.87,14.33,7,32,7s32-3.13,32-7c0-1.89-3.43-3.6-9-4.86Z"
        fill={color}
        fillOpacity={0.25}
        strokeWidth={0}
      />
    </Svg>
  );
};
