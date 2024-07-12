import { twMerge } from "tailwind-merge";

import classes from "./intro-light.module.css";

const CircleLight: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="75"
      width="75"
      viewBox="0 0 75 75"
      className={twMerge(
        classes.circle,
        "top-[calc(var(--size)_/_2_*_-1)] left-[calc(var(--size)_/_2_*_-1_+_var(--offset,_0px))] [filter:invert(1)] absolute [&_*]:stroke-[var(--line-color)]",
        className,
      )}
    >
      <path
        d="M74 37.5C74 30.281 71.8593 23.2241 67.8486 17.2217C63.838 11.2193 58.1375 6.541 51.4679 3.7784C44.7984 1.0158 37.4595 0.292977 30.3792 1.70134C23.2989 3.1097 16.7952 6.58599 11.6906 11.6906C6.58599 16.7952 3.1097 23.2989 1.70134 30.3792C0.292977 37.4595 1.0158 44.7984 3.7784 51.4679C6.541 58.1375 11.2193 63.838 17.2217 67.8486C23.2241 71.8593 30.281 74 37.5 74"
        stroke="url(#paint0_angular_25_2122)"
        strokeDasharray="2 2"
      />
    </svg>
  );
};

interface LineLightProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: "left" | "right";
  line: "vertical" | "horizontal";
  delay?: number | string;
  offset?: number | string;
  className?: string;
}
const LineLight: React.FC<LineLightProps> = ({ side, line, delay = 0.15, offset, className, style, ...other }) => {
  const variables = (): { [key: string]: string } => {
    const vars: { [key: string]: string } = {};
    vars["--a-delay"] = String(typeof delay === "number" ? delay + "s" : delay);
    offset && (vars["--line-offset"] = String(typeof offset === "number" ? offset + "px" : offset));
    return vars;
  };

  const v = line === "vertical" && "h-0 w-[var(--line-width)]";
  const h = line === "horizontal" && "w-0 h-[var(--line-width)]";
  const l = side === "left" && "left-0";
  const r = side === "right" && "right-0";

  const attr: { [key: string]: any } = {};
  attr["aria-hidden"] = "true";
  attr["data-line"] = line as string;
  attr["data-side"] = side as string;
  attr.style = { ...style, ...variables() };
  attr.className = twMerge(classes.line, "absolute", v, h, l, r, className);

  return <div {...attr} {...other} />;
};

export { CircleLight, LineLight };
