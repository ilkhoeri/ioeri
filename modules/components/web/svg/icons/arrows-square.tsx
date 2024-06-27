import { Svg, type SvgProps } from "../svg";

export const ArrowsSquareIcon = ({
  direction = "top",
  withSquare = true,
  ...props
}: SvgProps & { direction: "top" | "right" | "bottom" | "left"; withSquare?: boolean }) => {
  let chevron: string | undefined;
  let line: string | undefined;
  switch (direction) {
    case "top":
      chevron = "M16 12l-4 -4l-4 4";
      line = "M12 16v-8";
      break;
    case "right":
      chevron = "M12 16l4 -4l-4 -4";
      line = "M8 12h8";
      break;
    case "bottom":
      chevron = "M8 12l4 4l4 -4";
      line = "M12 8v8";
      break;
    case "left":
      chevron = "M12 8l-4 4l4 4";
      line = "M16 12h-8";
      break;
    default:
      break;
  }

  return (
    <Svg {...props}>
      <path d={chevron} />
      <path d={line} />
      {withSquare && <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" data-d="square" />}
    </Svg>
  );
};
