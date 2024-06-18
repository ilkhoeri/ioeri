import { Svg, SvgProps } from "@/modules/components";

export const CheckIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg {...props}>
      <path d="M5 12l5 5l10 -10" />
    </Svg>
  );
};

export const FacebookIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg {...props}>
      <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
    </Svg>
  );
};

export const EditIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg {...props}>
      <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
      <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
      <path d="M16 5l3 3" />
    </Svg>
  );
};

export const AppsIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg {...props}>
      <path d="M4 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
      <path d="M4 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
      <path d="M14 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
      <path d="M14 7l6 0" />
      <path d="M17 4l0 6" />
    </Svg>
  );
};

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
      {withSquare && (
        <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" data-d="square" />
      )}
    </Svg>
  );
};
