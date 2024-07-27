import React from "react";
import { Sheets, SheetsItem, SheetsContent, SheetsTrigger } from "@/modules/components/web";
import { SetProps, SetPropsBoolean, useSetProps } from "../../__set_props";
import { ChevronIcon } from "@/modules/icons";

export function Demo() {
  const { boo: multipleOpen, ...props } = useSetProps();
  const data = [
    {
      title: "Accessibility",
      description: "Accessibility items that can be changed.",
    },
    {
      title: "Terms and Conditions",
      description: "You can find out more here",
    },
    {
      title: "Preferences",
      description: "Change the theme, color, and font style according to your preferences",
    },
    {
      title: "Updates",
      description: "Find the latest news about us here.",
    },
  ];

  return (
    <div className="flex flex-col gap-10">
      <Sheets multipleOpen={multipleOpen} className="w-80">
        {data.map((i, index) => (
          <SheetsItem key={index}>
            <SheetsTrigger id={String(i.title.toLowerCase().replace(/\s/g, "-"))}>
              {i.title}
              <ChevronIcon chevron="down" data-origin="arrow-collapse" />
            </SheetsTrigger>

            <SheetsContent className="text-sm" id={String(index)}>
              <p className="pb-4">{i.description}</p>
            </SheetsContent>
          </SheetsItem>
        ))}
      </Sheets>
      <SetProps.Wrapper>
        <SetPropsBoolean label="multipleOpen" boo={multipleOpen} setBoo={props.setBoo} />
      </SetProps.Wrapper>
    </div>
  );
}
