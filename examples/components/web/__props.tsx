"use client";

import * as React from "react";
import { AlignValues, SideValues } from "@/modules";
import { InferTypes, cvx } from "@/modules/utility";
import { twMerge } from "tailwind-merge";
import { PolymorphicWithoutRef } from "@/modules/components/web";

const classes = cvx({
  variants: {
    as: {
      wrapper: "absolute top-4 left-4 flex flex-col items-start gap-4 [&_span]:font-mono [&_span]:text-nowrap",
      wrapp: "flex flex-row items-center gap-4 w-full",
      button: "justify-start w-max rounded-md border px-2 py-1 text-sm bg-background",
      nameprops: "text-muted-foreground",
    },
    size: {
      "26": "min-w-26",
      "36": "min-w-36",
    },
  },
});

const Props = {
  Wrapper: React.forwardRef<HTMLDivElement, PolymorphicWithoutRef<"div">>((props, ref) => (
    <div ref={ref} className={twMerge(classes({ as: "wrapper" }), props.className)} {...props} />
  )),
  Wrapp: React.forwardRef<HTMLDivElement, PolymorphicWithoutRef<"div">>((props, ref) => (
    <div ref={ref} className={twMerge(classes({ as: "wrapp" }), props.className)} {...props} />
  )),
  Button: React.forwardRef<HTMLButtonElement, PolymorphicWithoutRef<"button">>((props, ref) => (
    <button
      ref={ref}
      type="button"
      role="button"
      className={twMerge(classes({ as: "button", size: "26" }), props.className)}
      {...props}
    />
  )),
  Nameprops: React.forwardRef<HTMLSpanElement, PolymorphicWithoutRef<"span">>((props, ref) => (
    <span ref={ref} className={twMerge(classes({ as: "nameprops" }), props.className)} {...props} />
  )),
};
Props.Wrapper.displayName = "Wrapper";
Props.Wrapp.displayName = "Wrapp";
Props.Button.displayName = "Button";
Props.Nameprops.displayName = "Nameprops";

export function PropsSvg(X: InferTypes<typeof useProps>) {
  const { size, setSize, color, setColor } = X;
  const style = { style: { backgroundColor: color } };
  return (
    <Props.Wrapper>
      <Props.Wrapp>
        <input
          id="color"
          title="color"
          name="color"
          type="color"
          className="size-9 min-w-9"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />

        <label htmlFor="setSize" className={classes({ as: "button", size: "26" })}>
          size=&#123;{size}&#125;
        </label>

        <input
          type="range"
          name="setSize"
          id="setSize"
          aria-label="setSize"
          min="0"
          max="100"
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          className="w-40"
        />
      </Props.Wrapp>
    </Props.Wrapper>
  );
}

export function PropsCollapsible(X: InferTypes<typeof useProps>) {
  const { side, align, offset, clickOutside, style, setAlign, setSide, setOffset, setClickOutside, setStyle } = X;
  return (
    <Props.Wrapper>
      <Props.Wrapp>
        <label htmlFor="setSideOffset" className={classes({ as: "button", size: "36" })}>
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
      </Props.Wrapp>

      <Props.Wrapp>
        <Props.Button onClick={() => setSide(getNextValue(side, sideValues))}>
          <Props.Nameprops>side:</Props.Nameprops> <span>&quot;{side}&quot;</span>
        </Props.Button>

        <Props.Button onClick={() => setAlign(getNextValue(align, alignValues))}>
          <Props.Nameprops>align=</Props.Nameprops> <span>&quot;{align}&quot;</span>
        </Props.Button>
      </Props.Wrapp>

      <Props.Button onClick={() => setStyle(getNextValue(style, styleValues))}>
        <Props.Nameprops>classes</Props.Nameprops>
        <span>(&#123;&nbsp;content:&quot;{style}&quot;&nbsp;&#125;)</span>
      </Props.Button>

      <Props.Button onClick={() => setClickOutside(!clickOutside)}>
        <Props.Nameprops>clickOutsideToClose=</Props.Nameprops>
        &#123;<span className="italic">{clickOutside ? "true" : "false"}</span>&#125;
      </Props.Button>
    </Props.Wrapper>
  );
}

export function useProps() {
  const [offset, setOffset] = React.useState<number>(16);
  const [size, setSize] = React.useState<number>(16);
  const [color, setColor] = React.useState<string>("hsl(var(--color))");
  const [side, setSide] = React.useState<`${SideValues}`>("bottom");
  const [align, setAlign] = React.useState<`${AlignValues}`>("center");
  const [clickOutside, setClickOutside] = React.useState<boolean>(false);
  const [style, setStyle] = React.useState<"default" | "dropdown">("dropdown");

  return {
    size,
    setSize,
    color,
    setColor,
    side,
    setSide,
    align,
    setAlign,
    offset,
    setOffset,
    clickOutside,
    setClickOutside,
    style,
    setStyle,
  };
}
const styleValues: ("default" | "dropdown")[] = ["default", "dropdown"];
const sideValues: `${SideValues}`[] = Object.values(SideValues);
const alignValues: `${AlignValues}`[] = Object.values(AlignValues);

function getNextValue<T>(currentValue: T, values: T[]): T {
  const currentIndex = values.indexOf(currentValue);
  const nextIndex = (currentIndex + 1) % values.length;
  return values[nextIndex];
}
