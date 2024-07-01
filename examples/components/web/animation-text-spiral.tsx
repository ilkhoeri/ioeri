"use client";

import { AnimationTextSpiral } from "@/modules/components/web";
import { Props, PropsText, useProps } from "@/examples/__props";

export function Example() {
  const { str: placeholders, ...props } = useProps({ Str: "Input Your Words" });
  return (
    <div>
      <div className="size-full relative flex items-center text-xl">
        <AnimationTextSpiral placeholders={placeholders} />
      </div>
      <Props.Wrapper><Props.Wrapp><PropsText str={placeholders} {...props} /></Props.Wrapp></Props.Wrapper>
    </div>
  );
}
