import { Svg, type SvgProps } from "../svg";

export const TagIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
    </Svg>
  );
};
