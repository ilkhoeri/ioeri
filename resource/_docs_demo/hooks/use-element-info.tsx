"use client";
import { useElementInfo } from "@/modules/hooks";

export function Demo() {
  const { ref, windowSize, rect } = useElementInfo<HTMLTextAreaElement>();
  return (
    <div className="p-4">
      <textarea
        ref={ref}
        id="box"
        readOnly
        placeholder="resize box"
        className="min-w-28 min-h-9 placeholder:text-center placeholder:uppercase place-content-center border rounded-lg resize focus-visible:ring-0 focus-visible:outline-0"
      />
        {/* prettier-ignore */}
      <label htmlFor="box" className="absolute left-4 top-4 text-xs flex flex-col gap-2">
        <span>window width: {windowSize.width}px</span> {/* prettier-ignore */}
        <span>window height: {windowSize.height}px</span> {/* prettier-ignore */}
        <span>width: {rect.width}px</span>
        <span>height: {rect.height}px</span>
        <span>top: {rect.top}px</span> {/* prettier-ignore */}
        <span>bottom: {rect.bottom}px</span> {/* prettier-ignore */}
        <span>scrollY: {rect.scrollY}px</span> {/* prettier-ignore */}
        <span>scrollX: {rect.scrollX}px</span> {/* prettier-ignore */}
        <span>y: {rect.y}px</span> {/* prettier-ignore */}
        <span>x: {rect.x}px</span> {/* prettier-ignore */}
      </label> {/* prettier-ignore */}
    </div>
  );
}
