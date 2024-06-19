import * as React from "react";

interface CSSProperties extends React.CSSProperties {
  [key: string]: any;
}

export interface IconTree {
  tag: string;
  child: IconTree[];
  attr: { [key: string]: string };
}

export interface ColorProps {
  color?: Colors;
}

export interface DetailedSvg extends React.SVGAttributes<SVGElement>, SizesProps {
  color?: Colors;
  style?: CSSProperties;
  children?: React.ReactNode;
  ref?: React.Ref<SVGSVGElement>;
  currentFill?: "fill" | "stroke" | "fill-stroke";
}

export interface SizesProps {
  size?: ArmSize;
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
export interface SvgProps extends Omit<DetailedSvg, "children" | "eb"> {}
export type ArmSize = `${InitialSize}` | (string & {}) | number | undefined;
export type Colors = React.CSSProperties["color"] | "currentColor" | (string & {});
export declare function SvgIcon(data: IconTree): (props: DetailedSvg) => React.JSX.Element;
export declare function SvgBase(props: DetailedSvg & { attr?: Record<string, string> }): JSX.Element;

export const getSv = (size: ArmSize): string => {
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

export function getSize({ size = "16px", height, width, h, w, ratio }: SizesProps) {
  const val_sz = getSv(size);
  const inSz = Object.values(`${InitialSize}`);
  const hand_sz = (sz: ArmSize) => (inSz.includes(sz as string) ? val_sz : sz);
  const ratioSize = (sz: string | number, rt: number | undefined) =>
    typeof sz === "number" ? sz * (rt || 1) : `${Number(sz.replace(/[^\d.-]/g, "")) * (rt || 1)}px`;
  const sizer = (rt: number | undefined) =>
    inSz.includes(size as string) ? ratioSize(val_sz, rt) : ratioSize(size, rt);
  const hand_h = height || h || hand_sz(sizer(ratio?.h));
  const hand_w = width || w || hand_sz(sizer(ratio?.w));

  return { hand_sz, hand_h, hand_w };
}

export function getSvg(InSvg: DetailedSvg) {
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
  } = InSvg;

  const sz = getSize({ size, h, w, height, width, ratio });

  const attr = {
    viewBox,
    xmlns,
    "aria-hidden": ariaHidden,
    height: sz.hand_h,
    width: sz.hand_w,
    ...props,
  };

  let rest = { fill, stroke, strokeWidth, strokeLinecap, strokeLinejoin, ...attr };

  if (currentFill === "stroke") {
    rest = {
      fill: fill || "none",
      stroke: stroke || "currentColor",
      strokeWidth: strokeWidth || "2",
      strokeLinecap: strokeLinecap || "round",
      strokeLinejoin: strokeLinejoin || "round",
      ...attr,
    };
  }
  if (currentFill === "fill") {
    rest = {
      fill: fill || "currentColor",
      stroke: stroke || "none",
      strokeWidth: strokeWidth || "0",
      strokeLinecap: strokeLinecap || undefined,
      strokeLinejoin: strokeLinejoin || undefined,
      ...attr,
    };
  }
  if (currentFill === "fill-stroke") {
    rest = {
      fill: fill || "currentColor",
      stroke: stroke || "currentColor",
      strokeWidth: strokeWidth || "2",
      strokeLinecap: strokeLinecap || "round",
      strokeLinejoin: strokeLinejoin || "round",
      ...attr,
    };
  }

  return { rest, ...sz };
}

export const Svg = ({ ref, ...props }: DetailedSvg) => {
  const { rest } = getSvg({ ...props });
  return <svg ref={ref} {...rest} />;
};
Svg.displayName = "Svg";

export default Svg;
