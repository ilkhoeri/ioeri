"use client";
import { useHover } from "@/modules/hooks";
import { SetProps, SetPropsBoolean, useSetProps } from "../__set_props";
import globalStyle from "@/library/styles/styles";

export function Demo() {
  const { boo: touch, ...props } = useSetProps();
  const { ref, hovered } = useHover<HTMLButtonElement>(undefined, { touch });

  return (
    <div className="flex items-center justify-center">
      <button
        ref={ref}
        type="button"
        role="button"
        className={globalStyle({ button: "default", size: "sm" }, "min-w-24")}
      >
        {hovered ? "Yey..." : "Hover me"}
      </button>

      {hovered && (
        <div
          role="tooltip"
          className="absolute bg-background top-[calc(50%+20px)] border p-4 rounded-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-100 data-[state=open]:zoom-in-100"
        >
          {touch ? "You can also use touch" : "onTouch can't be used"}
        </div>
      )}
      <SetProps.Wrapper>
        <SetPropsBoolean label="touch" boo={touch} setBoo={props.setBoo} />
      </SetProps.Wrapper>
    </div>
  );
}
