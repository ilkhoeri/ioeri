import { Svg, type SvgProps } from "../components/web/svg/svg";

export const ChevronIcon = ({ chevron, ...props }: SvgProps & { chevron: "up" | "right" | "down" | "left" }) => {
  let d: string | undefined;
  switch (chevron) {
    case "up":
      d = "M6 15l6 -6l6 6";
      break;
    case "right":
      d = "M9 6l6 6l-6 6";
      break;
    case "down":
      d = "M6 9l6 6l6 -6";
      break;
    case "left":
      d = "M15 6l-6 6l6 6";
      break;
    default:
      break;
  }
  return (
    <Svg {...props}>
      <path d={d} />
    </Svg>
  );
};
