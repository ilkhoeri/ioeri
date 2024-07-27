import { Svg, type SvgProps } from "../components/web/svg/svg";

export const ChevronIcon = ({
  chevron,
  ...props
}: SvgProps & { chevron: "up" | "right" | "down" | "left" | "up-down" | "left-right" }) => {
  let d: string | undefined;
  let dd: string | undefined;
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
    case "up-down":
      d = "m7 9 5-5 5 5";
      dd = "m7 15 5 5 5-5";
      break;
    case "left-right":
      d = "m9 7-5 5 5 5";
      dd = "m15 7 5 5-5 5";
      break;
    default:
      break;
  }
  return (
    <Svg {...props}>
      <path d={d} />
      {dd && <path d={dd} />}
    </Svg>
  );
};
