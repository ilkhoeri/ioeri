import { cnx } from "@/resource/docs/ondevelopment/utils/cnx";

import s from "./loader.module.css";

type SpinnerTrees = "root" | "bar";

type SpinnerProps = {
  size?: string | number;
  style?: React.CSSProperties & { [key: string]: any };
  color?: React.CSSProperties["color"] | "currentColor" | (string & {});
  classNames?: Partial<Record<SpinnerTrees, string>>;
};

const variables = ({ size, color }: SpinnerProps): { [key: string]: string } => {
  const vars: { [key: string]: string } = {};
  vars["--spinner-size"] = String(typeof size === "number" ? `${size}px` : size);
  vars["--spinner-color-set"] = String(color);
  return vars;
};

export const Spinner: React.FC<SpinnerProps> = ({ size = "20px", color = "hsl(var(--color))", style, classNames }) => {
  const root = {
    className: cnx(s.spinner, classNames?.root),
    style: { ...variables({ size, color }), ...style },
    "data-loader": "spinner",
  };
  const bar = { className: cnx(s.bar, classNames?.bar) };

  return (
    <div {...root}>
      {[...Array(12)].map((_, index) => (
        <div key={index} {...bar} />
      ))}
    </div>
  );
};
