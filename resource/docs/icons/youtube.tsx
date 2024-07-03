import { Svg, type SvgProps } from "../components/web/svg/svg";

export const YoutubeIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg {...props}>
      <path d="M2 8a4 4 0 0 1 4 -4h12a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-12a4 4 0 0 1 -4 -4v-8z" />
      <path d="M10 9l5 3l-5 3z" />
    </Svg>
  );
};
