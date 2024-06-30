"use client";

import { forwardRef, useState } from "react";
import { mergeRefs, useConfetti, UseConfettiProps } from "@/modules/hooks";
import { PropsSelect, useProps } from "../__props";
import globalStyle from "@/library/styles/styles";

export function Example() {
  const [start, setStart] = useState(false);
  const { numb: lifespan, str: position, ...props } = useProps({ Numb: 5000, Str: "absolute" });

  return (
    <div>
      <button
        type="button"
        disabled={start}
        onClick={() => {
          if (!start) setStart(true);
          setTimeout(() => {
            setStart(false);
          }, lifespan + 100);
        }}
        className={globalStyle({ button: "default", size: "sm" })}
      >
        Confetti
      </button>

      {start && <Confetti lifespan={lifespan} className={position} />}
      <PropsSelect str={position} numb={lifespan} {...props} />
    </div>
  );
}

export const Confetti = forwardRef<
  HTMLCanvasElement,
  React.ComponentPropsWithoutRef<"canvas"> & {
    mounted?: boolean;
    style?: React.CSSProperties & {
      [key: string]: any;
    };
  } & UseConfettiProps
>(({ mounted, lifeTime, lifespan, style, ...props }, ref) => {
  const { rendering, canvasRef, width, height, styles } = useConfetti({ lifeTime, lifespan });

  if (rendering) return null;
  const rest = { ref: mergeRefs(canvasRef, ref), width, height, style: { ...styles(), ...style }, ...props };
  return <canvas {...rest} />;
});
Confetti.displayName = "Confetti";
