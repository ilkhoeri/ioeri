"use client";

import * as React from "react";
import { AlignValues, SideValues } from "@/modules";
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
export const SetProps = {
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
SetProps.Wrapper.displayName = "Wrapper";
SetProps.Wrapp.displayName = "Wrapp";
SetProps.Button.displayName = "Button";
SetProps.Range.displayName = "Range";
SetProps.Radio.displayName = "Radio";
SetProps.Text.displayName = "Text";
SetProps.Nameprops.displayName = "Nameprops";

export function SetPropsText(X: InferTypes<typeof useSetProps>) {
  const { str, setStr } = X;
  return (
    <SetProps.Text id="text" name="text" title="input text" value={str} onChange={(e) => setStr(e.target.value)} />
  );
}

export function SetPropsRange(X: { setNumb: (e: number) => void } & PolymorphicWithoutRef<"input">) {
  const { title, value, setNumb, ...props } = X;
  return (
    <SetProps.Wrapp>
      <label htmlFor={title} className={classes({ as: "button", size: "36" })}>
        {title}=&#123;{value}&#125;
      </label>
      <SetProps.Range
        name={title}
        id={title}
        value={value}
        onChange={(e) => setNumb(Number(e.target.value))}
        className="w-40"
        {...props}
      />
    </SetProps.Wrapp>
  );
}

export function SetPropsRadio(X: { label: string; values: string[] } & InferTypes<typeof useSetProps>) {
  const { str, setStr, label, values } = X;
  return values.map((i) => (
    <SetProps.Wrapp key={i}>
      <SetProps.Radio id={i} name={i} value={i} checked={str === i} onChange={(e) => setStr(e.target.value)} />
      <label htmlFor={i}>
        {label}=&quot;{i}&quot;
      </label>
    </SetProps.Wrapp>
  ));
}

export function SetPropsSelect(X: { label?: string; values: string[]; str: string; setStr: (e: string) => void }) {
  const { str, setStr, values, label = "select" } = X;
  return (
    <SetProps.Wrapp>
      <select
        id={label}
        title={label}
        aria-label={label}
        className={twMerge(classes({ as: "button", size: "36" }))}
        value={str}
        onChange={(e) => setStr(e.target.value)}
      >
        {values.map((i) => (
          <option key={i} value={i} className="cursor-pointer h-4">
            {i}
          </option>
        ))}
      </select>
    </SetProps.Wrapp>
  );
}

export function SetPropsSvg(X: InferTypes<typeof useSetProps>) {
  const { numb, setNumb, str, setStr } = X;
  return (
    <SetProps.Wrapper>
      <SetProps.Wrapp>
        <input
          id="color"
          title="color"
          name="color"
          type="color"
          className="size-9 min-w-9"
          value={str}
          onChange={(e) => setStr(e.target.value)}
        />

        <label htmlFor="setSize" className={classes({ as: "button", size: "26" })}>
          size=&#123;{numb}&#125;
        </label>

        <input
          type="range"
          name="setSize"
          id="setSize"
          aria-label="setSize"
          min="0"
          max="100"
          value={numb}
          onChange={(e) => setNumb(Number(e.target.value))}
          className="w-40"
        />
      </SetProps.Wrapp>
    </SetProps.Wrapper>
  );
}

export function SetPropsCollapsible(X: InferTypes<typeof useSetProps>) {
  const { side, align, numb, setNumb, bool, setBool, style, setAlign, setSide, setStyle } = X;
  return (
    <SetProps.Wrapper>
      <SetProps.Wrapp>
        <label htmlFor="setSideOffset" className={classes({ as: "button", size: "36" })}>
          sideOffset=&#123;{numb}&#125;
        </label>

        <input
          type="range"
          name="setSideOffset"
          id="setSideOffset"
          aria-label="setSideOffset"
          min="0"
          max="100"
          value={numb}
          onChange={(e) => setNumb(Number(e.target.value))}
          className="w-40"
        />
      </SetProps.Wrapp>

      <SetProps.Wrapp>
        <SetProps.Button onClick={() => setSide(getNextValue(side, sideValues))}>
          <SetProps.Nameprops>side:</SetProps.Nameprops> <span>&quot;{side}&quot;</span>
        </SetProps.Button>

        <SetProps.Button onClick={() => setAlign(getNextValue(align, alignValues))}>
          <SetProps.Nameprops>align=</SetProps.Nameprops> <span>&quot;{align}&quot;</span>
        </SetProps.Button>
      </SetProps.Wrapp>

      <SetProps.Button onClick={() => setStyle(getNextValue(style, styleValues))}>
        <SetProps.Nameprops>classes</SetProps.Nameprops>
        <span>(&#123;&nbsp;content:&quot;{style}&quot;&nbsp;&#125;)</span>
      </SetProps.Button>

      <SetProps.Button onClick={() => setBool(!bool)}>
        <SetProps.Nameprops>clickOutsideToClose=</SetProps.Nameprops>
        &#123;<span className="italic">{bool ? "true" : "false"}</span>&#125;
      </SetProps.Button>
    </SetProps.Wrapper>
  );
}

export function useSetProps({
  Numb = 0,
  Str = "",
  Bool = false,
}: { Numb?: number; Str?: string; Bool?: boolean } = {}) {
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
    side,
    setSide,
    align,
    setAlign,
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
