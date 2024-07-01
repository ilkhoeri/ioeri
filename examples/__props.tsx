"use client";

import * as React from "react";
import { AlignValues, SideValues, getRandomColor } from "@/modules";
import { PolymorphicWithoutRef } from "@/modules/components/web";
import { InferTypes, cvx } from "@/modules/utility";

import { twMerge } from "tailwind-merge";
import globalStyle from "@/library/styles/styles";

export const classes = cvx({
  variants: {
    as: {
      wrapper: "absolute top-4 left-4 flex flex-col items-start gap-4 [&_span]:font-mono [&_span]:text-nowrap",
      wrapp: "flex flex-row items-center gap-4 w-full",
      button: "justify-start w-max rounded-md border px-2 py-1 text-sm bg-background cursor-pointer",
      nameprops: "text-muted-foreground",
    },
    size: {
      "26": "min-w-26",
      "36": "min-w-36",
    },
  },
});

// prettier-ignore
export const Props = {
  Wrapper: React.forwardRef<HTMLUListElement, PolymorphicWithoutRef<"ul">>((props, ref) => (
    <ul ref={ref} role="list" className={twMerge(classes({ as: "wrapper" }), props.className)} {...props} />
  )),
  Wrapp: React.forwardRef<HTMLLIElement, PolymorphicWithoutRef<"li">>((props, ref) => (
    <li ref={ref} role="listitem" className={twMerge(classes({ as: "wrapp" }), props.className)} {...props} />
  )),
  Button: React.forwardRef<HTMLButtonElement, PolymorphicWithoutRef<"button">>((props, ref) => (
    <button ref={ref} type="button" role="button" className={twMerge(classes({ as: "button", size: "26" }), props.className)} {...props} />
  )),
  Range: React.forwardRef<HTMLInputElement, PolymorphicWithoutRef<"input">>((props, ref) => (
    <input ref={ref} type="range" aria-label="range" className={props.className} {...props} />
  )),
  Radio: React.forwardRef<HTMLInputElement, PolymorphicWithoutRef<"input">>((props, ref) => (
    <input ref={ref} type="radio" aria-label="radio" className={props.className} {...props} />
  )),
  Text: React.forwardRef<HTMLInputElement, PolymorphicWithoutRef<"input">>((props, ref) => (
    <input ref={ref} type="text" aria-label="input text" className={globalStyle({ input: "text" }, props.className)} {...props} />
  )),
  Nameprops: React.forwardRef<HTMLSpanElement, PolymorphicWithoutRef<"span">>((props, ref) => (
    <span ref={ref} className={twMerge(classes({ as: "nameprops" }), props.className)} {...props} />
  )),
};
Props.Wrapper.displayName = "Wrapper";
Props.Wrapp.displayName = "Wrapp";
Props.Button.displayName = "Button";
Props.Range.displayName = "Range";
Props.Radio.displayName = "Radio";
Props.Text.displayName = "Text";
Props.Nameprops.displayName = "Nameprops";

export function PropsText(X: InferTypes<typeof useProps>) {
  const { str, setStr } = X;
  return <Props.Text id="text" name="text" title="input text" value={str} onChange={(e) => setStr(e.target.value)} />;
}

export function PropsRadio(X: { label: string; values: string[] } & InferTypes<typeof useProps>) {
  const { str, setStr, label, values } = X;
  return values.map((i) => (
    <Props.Wrapp key={i}>
      <Props.Radio id={i} name={i} value={i} checked={str === i} onChange={(e) => setStr(e.target.value)} />
      <label htmlFor={i}>
        {label}=&quot;{i}&quot;
      </label>
    </Props.Wrapp>
  ));
}

export function PropsSelect(X: InferTypes<typeof useProps>) {
  const { str, setStr, numb, setNumb } = X;
  return (
    <Props.Wrapper>
      <Props.Wrapp>
        <label htmlFor="lifespan" className={classes({ as: "button", size: "36" })}>
          lifespan=&#123;{numb}&#125;
        </label>
        <input
          type="range"
          name="lifespan"
          id="lifespan"
          aria-label="lifespan"
          min="5000"
          max="10000"
          value={numb}
          onChange={(e) => setNumb(Number(e.target.value))}
          className="w-40"
        />
      </Props.Wrapp>

      <Props.Wrapp>
        <select
          id="position"
          title="position"
          aria-label="set position"
          className={twMerge(classes({ as: "button", size: "36" }))}
          value={str}
          onChange={(e) => setStr(e.target.value)}
        >
          <option value="absolute" className="cursor-pointer h-4">
            Box: absolute
          </option>
          <option value="fixed" className="cursor-pointer h-4">
            Screen: fixed
          </option>
        </select>
      </Props.Wrapp>
    </Props.Wrapper>
  );
}

export function PropsSvg(X: InferTypes<typeof useProps>) {
  const { size, setSize, color, setColor } = X;
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
  const { side, align, offset, bool, setBool, style, setAlign, setSide, setOffset, setStyle } = X;
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

      <Props.Button onClick={() => setBool(!bool)}>
        <Props.Nameprops>clickOutsideToClose=</Props.Nameprops>
        &#123;<span className="italic">{bool ? "true" : "false"}</span>&#125;
      </Props.Button>
    </Props.Wrapper>
  );
}

export function useProps({ Numb = 0, Str = "", Bool = false }: { Numb?: number; Str?: string; Bool?: boolean } = {}) {
  const [offset, setOffset] = React.useState<number>(16);
  const [size, setSize] = React.useState<number>(16);
  const [color, setColor] = React.useState<string>(getRandomColor());
  const [side, setSide] = React.useState<`${SideValues}`>("bottom");
  const [align, setAlign] = React.useState<`${AlignValues}`>("center");
  const [style, setStyle] = React.useState<"default" | "dropdown">("dropdown");
  // ...fixshared
  const [numb, setNumb] = React.useState<number>(Numb);
  const [str, setStr] = React.useState<string>(Str);
  const [bool, setBool] = React.useState<boolean>(Bool);

  return {
    numb,
    setNumb,
    str,
    setStr,
    bool,
    setBool,
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
    style,
    setStyle,
  };
}

type PositionValue = React.CSSProperties["position"] | (string & NonNullable<unknown>);
const pointValues: ("x" | "y")[] = ["x", "y"];
const styleValues: ("default" | "dropdown")[] = ["default", "dropdown"];
const sideValues: `${SideValues}`[] = Object.values(SideValues);
const alignValues: `${AlignValues}`[] = Object.values(AlignValues);

function getNextValue<T>(currentValue: T, values: T[]): T {
  const currentIndex = values.indexOf(currentValue);
  const nextIndex = (currentIndex + 1) % values.length;
  return values[nextIndex];
}
