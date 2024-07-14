import { Tooltip } from "@/modules/components/web";
import { SetProps, SetPropsBoolean, SetPropsSideAlign, useSetProps } from "../../__set_props";

export function Demo() {
  const { numb: offset, side, align, boo: withArrow, ...props } = useSetProps({ Numb: 6, Side: "top" });

  const content = [...Array(4)].map((_, index) => <span key={index}>Lorem ipsum...</span>);
  return (
    <div>
      <Tooltip
        side={side}
        align={align}
        content={content}
        sideOffset={offset}
        withArrow={withArrow}
        contentProps={{ className: "flex flex-col" }}
        className="flex items-center justify-center rounded-md bg-color text-background border border-background hover:bg-color/90 disabled:opacity-50 h-9 px-2.5"
      >
        <span>Tooltip</span>
      </Tooltip>
      <SetProps.Wrapper>
        <SetPropsSideAlign numb={offset} side={side} align={align} {...props} />
        <SetPropsBoolean label="withArrow" boo={withArrow} setBoo={props.setBoo} />
      </SetProps.Wrapper>
    </div>
  );
}
