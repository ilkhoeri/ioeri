"use client";
import { forwardRef } from "react";
import { mergeRefs } from "@/resource/docs/hooks";
import { useConfetti, UseConfettiProps } from "./use-confetti";

export const Confetti = forwardRef<
  HTMLCanvasElement,
  React.ComponentPropsWithoutRef<"canvas"> & {
    style?: React.CSSProperties & {
      [key: string]: any;
    };
  } & UseConfettiProps
>(({ lifeTime, lifespan, style, ...props }, ref) => {
  const { rendering, canvasRef, width, height, styles } = useConfetti({ lifeTime, lifespan });
  if (rendering) return null;
  const rest = { ref: mergeRefs(canvasRef, ref), width, height, style: { ...styles(), ...style }, ...props };
  return <canvas {...rest} />;
});
Confetti.displayName = "Confetti";
