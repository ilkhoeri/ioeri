import { cnx } from "@/modules/ondevelopment/utils/cnx";

import s from "./loader.module.css";

type SpinnerTrees = "spinner" | "bar";

type SpinnerProps = {
  size?: string | number;
  classNames?: Partial<Record<SpinnerTrees, string>>;
};

const variables = ({ size }: SpinnerProps): { [key: string]: string } => {
  const vars: { [key: string]: string } = {};
  size && (vars["--spinner-size"] = String(typeof size === "number" ? `${size}px` : size));
  return vars;
};

export const Spinner: React.FC<SpinnerProps> = ({ size = "20px", classNames }) => {
  const root = { className: cnx(s.spinner, classNames?.spinner), style: variables({ size }) };
  const bar = { className: cnx(s.bar, classNames?.bar) };

  return (
    <div {...root}>
      {[...Array(12)].map((_, index) => (
        <div key={index} {...bar} />
      ))}
    </div>
  );
};
