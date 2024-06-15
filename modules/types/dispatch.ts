import type { AnchorTargets } from "./anchor";

export type DispatchType = AnchorTargets & {
  // anchor
  rel?: string;
  href?: string;
  // button
  type?: "button" | "submit" | "reset";
  // img
  src?: string;
  alt?: string;
  loading?: "eager" | "lazy";
  sizes?: string;
  width?: string | number;
  height?: string | number;
  // ref
  // ref?: React.Ref<HTMLElement>;
};
