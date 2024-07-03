"use client";
import { AnimationTextSpiral } from "@/modules/components/web";
import { SetProps, SetPropsText, useSetProps } from "../../__set_props";

export function Demo() {
  const { str: placeholders, ...props } = useSetProps({ Str: "Input Your Words" });
  return (
    <div>
      <div className="size-full relative flex items-center text-xl">
        <AnimationTextSpiral placeholders={placeholders} />
      </div>
      <SetProps.Wrapper>
        <SetProps.Wrapp>
          <SetPropsText str={placeholders} {...props} />
        </SetProps.Wrapp>
      </SetProps.Wrapper>
    </div>
  );
}
