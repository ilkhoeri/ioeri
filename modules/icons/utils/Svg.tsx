import * as React from "react";
import { useSVG, _SVGType } from "./index";

export const Svg = ({ ref, ...props }: _SVGType) => {
  const { rest } = useSVG({ ...props });

  return <svg ref={ref} {...rest} />;
};
Svg.displayName = "Svg";
