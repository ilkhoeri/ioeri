import { Svg, SvgProps } from "./utils";

export const SaveIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg {...props}>
      <path
        data-path="box"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m19,21H5c-1.1,0-2-.9-2-2V5c0-1.1.9-2,2-2h11l5,5v11c0,1.1-.9,2-2,2Z"
      />
      <path data-path="line-top" strokeLinecap="round" strokeLinejoin="round" d="M7 3L7 8L15 8" />
      <path data-path="line-bottom" strokeLinecap="round" strokeLinejoin="round" d="M17 20L17 13L7 13L7 20" />
    </Svg>
  );
};
