"use client";

import { useState } from "react";
import { AlignValuesType, SideValuesType } from "@/modules";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/modules/components";

function CollapsibleExample() {
  const [side, setSide] = useState<SideValuesType>("bottom");
  const [align, setAlign] = useState<AlignValuesType>("center");

  return (
    <div>
      <button type="button" onClick={() => setSide("left")}>
        Side
      </button>
      <button type="button">Align</button>
      <Collapsible defaultOpen align={align} side={side}>
        <CollapsibleTrigger className="font-semibold text-color focus-visible:ring-inset focus-visible:ring-offset-[-2px]">
          <span className="truncate">Open</span>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <h6>Title</h6>
          <div>Contents</div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

export default CollapsibleExample;
