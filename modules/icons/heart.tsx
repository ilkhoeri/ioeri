import { Svg, SvgProps } from "./utils";

export const HeartIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m19.5,12.6l-7.5,7.9-7.5-7.9c-2-2-2-5.4,0-7.5,1.9-2.1,5.1-2.1,7.1-.1.2.2.4.4.5.6,1.7-2.3,4.8-2.8,7-1.1,2.2,1.8,2.6,5.1,1,7.4-.1.2-.3.4-.5.6"
      />
    </Svg>
  );
};
