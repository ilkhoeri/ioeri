import { Svg, SvgProps } from "./utils";

export const ArrowsSquareIcon = ({
  direction,
  withSquare = true,
  ...props
}: SvgProps & { direction: "top" | "right" | "bottom" | "left"; withSquare?: boolean }) => {
  let chevron;
  let line;

  if (direction === "top") {
    chevron = "M16 12l-4 -4l-4 4";
    line = "M12 16v-8";
  }
  if (direction === "right") {
    chevron = "M12 16l4 -4l-4 -4";
    line = "M8 12h8";
  }
  if (direction === "bottom") {
    chevron = "M8 12l4 4l4 -4";
    line = "M12 8v8";
  }
  if (direction === "left") {
    chevron = "M12 8l-4 4l4 4";
    line = "M16 12h-8";
  }
  return (
    <Svg {...props}>
      <path d={chevron} />
      <path d={line} />

      {withSquare && <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" data-d="square" />}
    </Svg>
  );
};
