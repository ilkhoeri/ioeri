"use client";

import { SetAttrCollapsible, useSetAttrCollapsible } from "./__clients";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/modules/components/web";

export function Example() {
  const set = useSetAttrCollapsible();

  return (
    <>
      <Collapsible align={set.align} side={set.side} sideOffset={set.offset} clickOutsideToClose={set.clickOutside}>
        <CollapsibleTrigger className="font-semibold w-max px-2 py-1 border rounded-sm hover:bg-muted">
          <span className="truncate">Open</span>
        </CollapsibleTrigger>

        <CollapsibleContent className="overflow-y-auto bg-background rounded-md border p-2 h-80 w-64 collapsible-content-class">
          {[...Array(30)].map((_, index) => (
            <p key={index} className="text-sm pt-3 pb-1.5 border-b last-of-type:border-b-0 gap-2 flex items-center">
              Lorem ipsum...
            </p>
          ))}
        </CollapsibleContent>
      </Collapsible>

      <SetAttrCollapsible {...set} />
    </>
  );
}
