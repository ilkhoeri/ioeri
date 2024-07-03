"use client";
import { useState } from "react";
import { useMove } from "@/modules/hooks";

export function Demo() {
  const [value, setValue] = useState({ x: 0, y: 0 });
  const { ref, active } = useMove<HTMLDivElement>(setValue);

  return (
    <div ref={ref} className="w-80 h-80 bg-background relative border rounded-lg flex items-center justify-center">
      <div
        data-state={active ? "active" : undefined}
        className="size-2"
        style={{
          position: "absolute",
          left: `calc(${value.x * 100}% - 4px)`,
          top: `calc(${value.y * 100}% - 4px)`,
          backgroundColor: active ? "hsl(var(--destructive))" : "hsl(var(--constructive))",
        }}
      />

      {active && <i>:active</i>}

      <div className="absolute px-2 -bottom-8 h-6 rounded-sm border text-xs text-background bg-color flex items-center justify-center">
        x:{value.x} y:{value.y}
      </div>
    </div>
  );
}
