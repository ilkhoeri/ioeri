"use client";

import { AnimationTextSpiral } from "@/modules/components/web";
import { PropsStr, useProps } from "@/examples/__props";

export function Example() {
  const { str: placeholders, ...props } = useProps({ Str: "Input Your Words" });
  return (
    <div>
      <div className="size-full relative flex items-center text-xl">
        <AnimationTextSpiral placeholders={placeholders} />
      </div>
      <PropsStr str={placeholders} {...props} />
    </div>
  );
}
