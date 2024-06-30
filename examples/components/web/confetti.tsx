"use client";

import { useState } from "react";
import { Confetti } from "@/modules/components/web";
import { PropsSelect, useProps } from "../../__props";
import globalStyle from "@/library/styles/styles";

export function Example() {
  const [start, setStart] = useState(false);
  const { numb: lifespan, str: position, ...props } = useProps({ Numb: 5000, Str: "absolute" });

  return (
    <div>
      <button
        type="button"
        disabled={start}
        onClick={() => {
          if (!start) setStart(true);
          setTimeout(() => {
            setStart(false);
          }, lifespan + 100);
        }}
        className={globalStyle({ button: "default", size: "sm" })}
      >
        Confetti
      </button>

      {start && <Confetti lifespan={lifespan} className={position} />}
      <PropsSelect str={position} numb={lifespan} {...props} />
    </div>
  );
}
