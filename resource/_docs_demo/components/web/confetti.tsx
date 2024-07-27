import { useState } from "react";
import { Confetti } from "@/modules/components/web";
import { SetProps, SetPropsRange, SetPropsSelect, useSetProps } from "../../__set_props";
import globalStyle from "@/library/styles/styles";

export function Demo() {
  const [start, setStart] = useState(false);
  const { numb: lifespan, str: position, ...props } = useSetProps({ Numb: 5000, Str: "absolute" });

  return (
    <div>
      <button
        type="button"
        disabled={start}
        onClick={() => {
          if (!start) setStart(true);
          setTimeout(() => { // prettier-ignore
            setStart(false); // prettier-ignore
          }, lifespan + 100); // prettier-ignore
        }}
        className={globalStyle({ button: "default", size: "sm" })}
      >
        Confetti
      </button>

      {start && <Confetti lifespan={lifespan} className={position} />}
      <SetProps.Wrapper>
        <SetPropsRange label="lifespan" value={lifespan} setNumb={props.setNumb} min="5000" max="15000" />
        <SetPropsSelect values={["absolute", "fixed"]} str={position} setStr={props.setStr} />
      </SetProps.Wrapper>
    </div>
  );
}
