import { Tooltip, TooltipContent, TooltipTrigger } from "@/modules/components/web";
import { SetProps, SetPropsBoolean, SetPropsSideAlign, useSetProps } from "../../__set_props";

export function Demo() {
  const { numb: offset, side, align, boo: withArrow, ...props } = useSetProps({ Numb: 6, Side: "right" });
  return (
    <div>
      <Tooltip align={align} side={side} sideOffset={offset} withArrow={withArrow}>
        <TooltipTrigger className="flex items-center justify-center rounded-md bg-color text-background border border-background hover:bg-color/90 disabled:opacity-50 h-9 px-2.5">
          <span>Tooltip</span>
        </TooltipTrigger>

        <TooltipContent className="flex flex-col">
          <span>Lorem ipsum...</span>
          <span>Lorem ipsum...</span>
          <span>Lorem ipsum...</span>
          <span>Lorem ipsum...</span>
          <span>Lorem ipsum...</span>
        </TooltipContent>
      </Tooltip>
      <SetProps.Wrapper>
        <SetPropsSideAlign numb={offset} side={side} align={align} {...props} />
        <SetPropsBoolean label="withArrow" boo={withArrow} setBoo={props.setBoo} />
      </SetProps.Wrapper>
    </div>
  );
}
