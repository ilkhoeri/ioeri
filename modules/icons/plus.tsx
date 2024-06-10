import { Svg, SvgProps } from "./utils";

export const PlusIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg {...props}>
      <path d="M12 5l0 14" />
      <path d="M5 12l14 0" />
    </Svg>
  );
};
