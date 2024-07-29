"use client";

import * as React from "react";
import { DataAlign, DataSide } from "@/modules/index";
import { PolymorphicWithoutRef } from "@/library/components/element";
import { InferTypes, VariantsType, cvx } from "@/modules/utility";

import { twMerge } from "tailwind-merge";
import globalStyle from "@/library/styles/styles";
import { nextValue } from "@/library/utils";

export const styles = cvx({
  variants: {
    as: {
      wrapper:
        "absolute top-4 left-4 flex flex-col items-start gap-x-4 gap-y-2 [&_span]:font-mono [&_span]:text-nowrap",
      wrapp: "flex flex-row items-center gap-4 w-full",
      button: "justify-start w-max rounded-md border px-2 py-1 text-sm bg-background cursor-pointer",
      nameprops: "text-muted-foreground italic",
      labelOnly:
        "absolute top-4 left-4 text-h1 font-extrabold opacity-20 hover:opacity-100 z-9 cursor-pointer select-none",
      comment: "text-[#858AA6] italic font-mono text-sm mt-4",
      code: "codebox w-max",
    },
    size: {
      "26": "min-w-26",
      "36": "min-w-36",
    },
  },
});

function classes(
  as: VariantsType<typeof styles>["as"],
  { size, className }: { size?: VariantsType<typeof styles>["size"]; className?: string },
) {
  return {
    className: twMerge(styles({ as, size }), className),
  };
}

// prettier-ignore
export const SetProps = {
  Wrapper: React.forwardRef<HTMLUListElement, PolymorphicWithoutRef<"ul">>(({ className, ...props }, ref) => (
    <ul ref={ref} role="list" {...classes("wrapper", { className })} {...props} />
  )),
  Wrapp: React.forwardRef<HTMLLIElement, PolymorphicWithoutRef<"li">>(({ className, ...props }, ref) => (
    <li ref={ref} role="listitem" {...classes("wrapp", { className })} {...props} />
  )),
  Button: React.forwardRef<HTMLButtonElement, PolymorphicWithoutRef<"button">>(({ className, ...props }, ref) => (
    <button ref={ref} type="button" role="button" {...classes("button", { className, size: "26" })} {...props} />
  )),
  LabelOnly: React.forwardRef<HTMLLabelElement, PolymorphicWithoutRef<"label">>(({ className, ...props }, ref) => (
    <label ref={ref} aria-label="label" {...classes("labelOnly", { className })} {...props} />
  )),
  Label: React.forwardRef<HTMLLabelElement, PolymorphicWithoutRef<"label">>(({ className, ...props }, ref) => (
    <label ref={ref} aria-label="label" className={className} {...props} />
  )),
  Range: React.forwardRef<HTMLInputElement, PolymorphicWithoutRef<"input">>(({ className, ...props }, ref) => (
    <input ref={ref} type="range" aria-label="range" className={className} {...props} />
  )),
  Radio: React.forwardRef<HTMLInputElement, PolymorphicWithoutRef<"input">>(({ className, ...props }, ref) => (
    <input ref={ref} type="radio" aria-label="radio" className={className} {...props} />
  )),
  Text: React.forwardRef<HTMLInputElement, PolymorphicWithoutRef<"input">>(({ className, ...props }, ref) => (
    <input
      ref={ref}
      type="text"
      aria-label="input text"
      className={globalStyle({ input: "text" }, className)}
      {...props}
    />
  )),
  Nameprops: React.forwardRef<HTMLSpanElement, PolymorphicWithoutRef<"span">>(({ className, ...props }, ref) => (
    <span ref={ref} {...classes("nameprops", { className })} {...props} />
  )),
  Comment: React.forwardRef<HTMLSpanElement, PolymorphicWithoutRef<"span">>(({ className, ...props }, ref) => (
    <span ref={ref} {...classes("comment", { className })} {...props} >{props.children || props.title}</span>
  )),
  Code: React.forwardRef<HTMLElement, PolymorphicWithoutRef<"code">>(({ style, ...props }, ref) => (
    <code ref={ref} {...{style: { borderRadius: "calc(var(--radius) - 4px)", borderWidth: "1px", backgroundColor: "hsl(var(--code))", padding: "0.07521875em .25em", fontFamily: "var(--ff-roboto-mono)", lineHeight: "1.5", fontSize: "0.75rem", minWidth: "max-content", ...style }, ...props}} >{props.children || props.title}</code>
  )),
};
SetProps.Wrapper.displayName = "Wrapper";
SetProps.Wrapp.displayName = "Wrapp";
SetProps.Button.displayName = "Button";
SetProps.LabelOnly.displayName = "LabelOnly";
SetProps.Label.displayName = "Label";
SetProps.Range.displayName = "Range";
SetProps.Radio.displayName = "Radio";
SetProps.Text.displayName = "Text";
SetProps.Nameprops.displayName = "Nameprops";
SetProps.Comment.displayName = "Comment";
SetProps.Code.displayName = "Code";

export function SetPropsBoolean(X: { label: string; boo: boolean; setBoo: (v: boolean) => void }) {
  const { label, boo, setBoo } = X;
  return (
    <SetProps.Wrapp>
      <SetProps.Button onClick={() => setBoo(!boo)}>
        <SetProps.Nameprops>{label}=</SetProps.Nameprops>
        &#123;<span className="italic">{boo ? "true" : "false"}</span>&#125;
      </SetProps.Button>
    </SetProps.Wrapp>
  );
}

export function SetPropsText(X: { str: string; setStr: (v: string) => void }) {
  const { str, setStr } = X;
  return (
    <SetProps.Wrapp>
      <SetProps.Text id="text" name="text" title="input text" value={str} onChange={(e) => setStr(e.target.value)} />
    </SetProps.Wrapp>
  );
}

/**

      <SetProps.Wrapp>
        <label htmlFor="sideOffset" {...classes("button", { size: "36" })}>
          <SetProps.Nameprops>sideOffset=</SetProps.Nameprops>
          <span>&#123;{numb}&#125;</span>
        </label>

        <input
          type="range"
          name="sideOffset"
          id="sideOffset"
          aria-label="sideOffset"
          min="0"
          max="100"
          value={numb}
          onChange={(e) => setNumb(Number(e.target.value))}
          className="w-40"
        />
      </SetProps.Wrapp>
 */

export function SetPropsRange(
  X: { setNumb: (e: number) => void } & PolymorphicWithoutRef<"input"> & { label: string },
) {
  const { label, value, setNumb, ...props } = X;
  return (
    <SetProps.Wrapp>
      <label htmlFor={label} {...classes("button", { size: "36" })}>
        <SetProps.Nameprops>{label}=</SetProps.Nameprops>
        <span>&#123;{value}&#125;</span>
      </label>
      <SetProps.Range
        name={label}
        id={label}
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
        {...classes("button", { size: "36" })}
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

        <label htmlFor="setSize" {...classes("button", { size: "26" })}>
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

export function SetPropsSideAlign(X: {
  setAlign?: (v: `${DataAlign}`) => void;
  setSide?: (v: `${DataSide}`) => void;
  align?: `${DataAlign}`;
  side?: `${DataSide}`;
}) {
  const { side, align, setAlign, setSide } = X;
  if (!side && !align) return null;
  return (
    <SetProps.Wrapp>
      {setSide && side && (
        <SetProps.Button onClick={() => setSide(nextValue(side, dataSide))}>
          <SetProps.Nameprops>side=</SetProps.Nameprops>
          <span>&quot;{side}&quot;</span>
        </SetProps.Button>
      )}

      {setAlign && align && (
        <SetProps.Button onClick={() => setAlign(nextValue(align, dataAlign))}>
          <SetProps.Nameprops>align=</SetProps.Nameprops>
          <span>&quot;{align}&quot;</span>
        </SetProps.Button>
      )}
    </SetProps.Wrapp>
  );
}

export function useSetProps<T extends any>({
  Numb = 0,
  Str = "",
  Boo = false,
  Align = "center",
  Side = "bottom",
  Any,
}: {
  Numb?: number;
  Str?: string;
  Boo?: boolean;
  Align?: `${DataAlign}`;
  Side?: `${DataSide}`;
  Any?: any | any[] | { [key: string]: any } | { [key: string]: any }[];
} = {}) {
  const [align, setAlign] = React.useState<`${DataAlign}`>(Align);
  const [side, setSide] = React.useState<`${DataSide}`>(Side);
  const [numb, setNumb] = React.useState<number>(Numb);
  const [str, setStr] = React.useState<string>(Str);
  const [boo, setBoo] = React.useState<boolean>(Boo);
  const [any, setAny] = React.useState<T>(Any);

  return {
    numb,
    setNumb,
    str,
    setStr,
    boo,
    setBoo,
    side,
    setSide,
    align,
    setAlign,
  };
}

type PositionValue = React.CSSProperties["position"] | (string & NonNullable<unknown>);
const pointValues: ("x" | "y")[] = ["x", "y"];
const styleValues: ("default" | "dropdown")[] = ["default", "dropdown"];
const dataSide: `${DataSide}`[] = Object.values(DataSide);
const dataAlign: `${DataAlign}`[] = Object.values(DataAlign);
