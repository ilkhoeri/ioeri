import React from "react";
import { Sheets, SheetsContent, SheetsTrigger } from "@/modules/components/web";
import { SetProps, SetPropsBoolean, SetPropsRange, SetPropsSideAlign, useSetProps } from "../../__set_props";

export function Demo() {
  const { boo: clickOutsideToClose, numb: offset, align, side, ...props } = useSetProps({ Numb: 0 });
  return (
    <div>
      <Sheets
        side={side}
        align={align}
        sideOffset={offset}
        clickOutsideToClose={clickOutsideToClose}
        variant="dropdown"
      >
        <SheetsTrigger id="dropdown">
          <span
            data-labelopen="Dropdown"
            data-labelclosed="Dropdown"
            className="group-data-[state=closed]:before:content-[attr(data-labelopen)] group-data-[state=open]:before:content-[attr(data-labelclosed)]"
          />
        </SheetsTrigger>

        <SheetsContent className="h-44 w-36">
          <div className="overflow-y-auto p-2 flex flex-col gap-0.5 size-full text-xs">
            {[...Array(15)].map((_, index) => (
              <p key={index} className="rounded-sm border p-1">Lorem ipsum...</p>
            ))}
          </div>
        </SheetsContent>
      </Sheets>
      <SetProps.Wrapper>
        <SetProps.LabelOnly htmlFor="dropdown" className="relative leading-none top-auto left-auto">Dropdown</SetProps.LabelOnly>
        <SetPropsRange label="sideOffset" value={offset} setNumb={props.setNumb} />
        <SetPropsSideAlign side={side} align={align} setSide={props.setSide} setAlign={props.setAlign} />
        <SetPropsBoolean label="clickOutsideToClose" boo={clickOutsideToClose} setBoo={props.setBoo} />
      </SetProps.Wrapper>
    </div>
  );
}
