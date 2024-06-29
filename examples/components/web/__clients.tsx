"use client";

import { useState } from "react";
import { AlignValues, SideValues } from "@/modules";
import { InferTypes } from "@/modules/utility";

export function SetAttrCollapsible(X: InferTypes<typeof useSetAttrCollapsible>) {
  const { side, align, offset, setAlign, setSide, setOffset, clickOutside, setClickOutside } = X;
  return (
    <div className="absolute top-4 left-4 flex flex-col items-start gap-4 [&_span]:font-mono [&_span]:text-nowrap">
      <div className="flex flex-row items-center gap-4 w-full">
        <label
          htmlFor="setSideOffset"
          className="justify-start min-w-36 w-max rounded-md border px-2 py-1 text-sm z-9 bg-background"
        >
          sideOffset=&#123;{offset}&#125;
        </label>

        <input
          type="range"
          name="setSideOffset"
          id="setSideOffset"
          aria-label="setSideOffset"
          min="0"
          max="100"
          value={offset}
          onChange={(e) => setOffset(Number(e.target.value))}
          className="w-40"
        />
      </div>

      <div className="flex flex-row items-center gap-4 w-full">
        <button
          type="button"
          onClick={() => setSide(getNextValue(side, sideValues))}
          className="justify-start min-w-26 w-max rounded-md border px-2 py-1 text-sm bg-background"
        >
          <span className="text-muted-foreground">side:</span> <span>&quot;{side}&quot;</span>
        </button>

        <button
          type="button"
          onClick={() => setAlign(getNextValue(align, alignValues))}
          className="justify-start min-w-26 w-max rounded-md border px-2 py-1 text-sm z-9 bg-background"
        >
          <span className="text-muted-foreground">align=</span> <span>&quot;{align}&quot;</span>
        </button>
      </div>

      <button
        type="button"
        onClick={() => setClickOutside(!clickOutside)}
        className="justify-start min-w-26 w-max rounded-md border px-2 py-1 text-sm z-9 bg-background"
      >
        <span className="text-muted-foreground">clickOutsideToClose=</span>
        &#123;<span className="italic">{clickOutside ? "true" : "false"}</span>&#125;
      </button>
    </div>
  );
}

export function useSetAttrCollapsible() {
  const [side, setSide] = useState<`${SideValues}`>("bottom");
  const [align, setAlign] = useState<`${AlignValues}`>("center");
  const [offset, setOffset] = useState<number>(16);
  const [clickOutside, setClickOutside] = useState<boolean>(false);

  return { side, setSide, align, setAlign, offset, setOffset, clickOutside, setClickOutside };
}

const sideValues: `${SideValues}`[] = Object.values(SideValues);
const alignValues: `${AlignValues}`[] = Object.values(AlignValues);

function getNextValue<T>(currentValue: T, values: T[]): T {
  const currentIndex = values.indexOf(currentValue);
  const nextIndex = (currentIndex + 1) % values.length;
  return values[nextIndex];
}
