import * as React from "react";
export * from "./Svg";

import type { CSSProperties } from "../../utils/record-types";
import type { NamedColor } from "../../types/shared";

export interface IconTree {
  tag: string;
  attr: {
    [key: string]: string;
  };
  child: IconTree[];
}
export declare function GenIcon(data: IconTree): (props: _SVGType) => React.JSX.Element;
export interface _SVGType extends React.SVGAttributes<SVGElement>, SizesProps {
  children?: React.ReactNode;
  color?: ArmColor;
  ref?: React.Ref<SVGSVGElement>;
  style?: CSSProperties;
  currentFill?: "fill" | "stroke" | "fill-stroke";
}
export type IconType = (props: _SVGType) => JSX.Element;
export declare function IconBase(
  props: _SVGType & {
    attr?: Record<string, string>;
  },
): JSX.Element;

export interface SvgProps extends Omit<_SVGType, "children" | "eb"> {}

export type InitialSize = "xxs" | "xxxs" | "xs" | "base" | "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl";
export type ArmSize = InitialSize | (string & {}) | number | undefined;
export interface SizesProps {
  size?: ArmSize;
  h?: string | number;
  w?: string | number;
  height?: string | number;
  width?: string | number;
  ratio?: { h?: number; w?: number };
}
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
export function useSize({ size = "16px", height, width, h, w, ratio }: SizesProps) {
  const val_sz = getSv(size);
  const inSz = ["xs", "xxs", "xxxs", "sm", "base", "md", "lg", "xl", "xxl", "xxxl"];

  const hand_sz = (sz: ArmSize) => (inSz.includes(sz as string) ? val_sz : sz);

  const ratioSize = (sz: string | number, rt: number | undefined) =>
    typeof sz === "number" ? sz * (rt || 1) : `${Number(sz.replace(/[^\d.-]/g, "")) * (rt || 1)}px`;

  const sizer = (rt: number | undefined) =>
    inSz.includes(size as string) ? ratioSize(val_sz, rt) : ratioSize(size, rt);

  const hand_h = height || h || hand_sz(sizer(ratio?.h));
  const hand_w = width || w || hand_sz(sizer(ratio?.w));

  return { hand_sz, hand_h, hand_w };
}

export function useSVG({
  viewBox = "0 0 24 24",
  xmlns = "http://www.w3.org/2000/svg",
  "aria-hidden": ariaHidden = "true",
  fill,
  size,
  w,
  width,
  height,
  h,
  stroke,
  strokeWidth,
  strokeLinecap,
  strokeLinejoin,
  currentFill = "stroke",
  ratio,
  ...props
}: _SVGType) {
  const sz = useSize({ size, h, w, height, width, ratio });

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

export type ArmColor = NamedColor | "currentColor" | (string & {});
export interface ColorProps {
  color?: ArmColor;
}

export type Commons = "inherit" | "initial" | "revert" | "unset";
