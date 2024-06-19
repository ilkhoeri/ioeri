import * as React from "react";

interface CSSProperties extends React.CSSProperties {
  [key: string]: any;
}

export interface IconTree {
  tag: string;
  child: IconTree[];
  attr: { [key: string]: string };
}

export interface DetailedSvg extends React.SVGAttributes<SVGElement>, SizesProps {
  color?: Colors;
  style?: CSSProperties;
  ref?: React.Ref<SVGSVGElement>;
  currentFill?: "fill" | "stroke" | "fill-stroke";
}

export interface SizesProps {
  size?: Sizes;
  h?: string | number;
  w?: string | number;
  width?: string | number;
  height?: string | number;
  ratio?: { h?: number; w?: number };
}

export enum InitialSize {
  xxs = "xxs",
  xxxs = "xxxs",
  xs = "xs",
  base = "base",
  sm = "sm",
  md = "md",
  lg = "lg",
  xl = "xl",
  xxl = "xxl",
  xxxl = "xxxl",
}

export type IconType = (props: DetailedSvg) => JSX.Element;
export interface SvgProps extends Omit<DetailedSvg, "children"> {}
export type Sizes = `${InitialSize}` | (string & {}) | number | undefined;
export type Colors = React.CSSProperties["color"] | "currentColor" | (string & {});
export declare function SvgIcon(data: IconTree): (props: DetailedSvg) => React.JSX.Element;
export declare function SvgBase(props: DetailedSvg & { attr?: Record<string, string> }): JSX.Element;

export const getInitialSizes = (size: Sizes): string => {
  const sizeMap: Record<InitialSize, string> = {
    xs: "10px",
    xxs: "12px",
    xxxs: "14px",
    base: "16px",
    sm: "18px",
    md: "20px",
    lg: "32px",
    xl: "48px",
    xxl: "86px",
    xxxl: "112px",
  };
  return sizeMap[size as InitialSize];
};

export function getSizes(Size: SizesProps) {
  const { size = "16px", height, width, h: setH, w: setW, ratio } = Size;
  const val_sz = getInitialSizes(size);
  const inSz = Object.values(InitialSize) as string[];
  const initialSize = (sz: string) => inSz.includes(sz);
  const parseSize = (sz: string | number) => (typeof sz === "number" ? sz : parseFloat(sz.replace(/[^\d.-]/g, "")));
  const applyRatio = (sz: string | number, rt: number | undefined = 1) =>
    parseSize(sz) * rt + (typeof sz === "number" ? "" : "px");

  const sz = (sz: Sizes) => (initialSize(sz as string) ? val_sz : sz);
  const sizer = (rt: number | undefined) =>
    initialSize(size as string) ? applyRatio(val_sz, rt) : applyRatio(size, rt);

  const h = height || setH || sz(sizer(ratio?.h));
  const w = width || setW || sz(sizer(ratio?.w));

  return { sz, h, w };
}

export function getSvg(Svg: DetailedSvg) {
  const {
    viewBox = "0 0 24 24",
    xmlns = "http://www.w3.org/2000/svg",
    "aria-hidden": ariaHidden = "true",
    w,
    h,
    fill,
    size,
    width,
    height,
    stroke,
    strokeWidth,
    strokeLinecap,
    strokeLinejoin,
    currentFill = "stroke",
    ratio,
    ...props
  } = Svg;

  const sz = getSizes({ size, h, w, height, width, ratio });

  const attr = {
    viewBox,
    xmlns,
    "aria-hidden": ariaHidden,
    height: sz.h,
    width: sz.w,
    ...props,
  };

  const baseRest = {
    fill,
    stroke,
    strokeWidth,
    strokeLinecap,
    strokeLinejoin,
    ...attr,
  };

  switch (currentFill) {
    case "stroke":
      baseRest.fill = fill || "none";
      baseRest.stroke = stroke || "currentColor";
      baseRest.strokeWidth = strokeWidth || "2";
      baseRest.strokeLinecap = strokeLinecap || "round";
      baseRest.strokeLinejoin = strokeLinejoin || "round";
      break;
    case "fill":
      baseRest.fill = fill || "currentColor";
      baseRest.stroke = stroke || "none";
      baseRest.strokeWidth = strokeWidth || "0";
      baseRest.strokeLinecap = undefined;
      baseRest.strokeLinejoin = undefined;
      break;
    case "fill-stroke":
      baseRest.fill = fill || "currentColor";
      baseRest.stroke = stroke || "currentColor";
      baseRest.strokeWidth = strokeWidth || "2";
      baseRest.strokeLinecap = strokeLinecap || "round";
      baseRest.strokeLinejoin = strokeLinejoin || "round";
      break;
    default:
      break;
  }

  return { rest: baseRest, ...sz };
}

export const Svg = ({ ref, ...props }: DetailedSvg) => {
  const { rest } = getSvg({ ...props });
  return <svg ref={ref} {...rest} />;
};
Svg.displayName = "Svg";

export default Svg;
