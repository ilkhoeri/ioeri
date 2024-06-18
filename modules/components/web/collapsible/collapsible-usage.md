import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/modules";

function MyComponent() {
  return (
    <Collapsible defaultOpen>
      <CollapsibleTrigger className="font-semibold text-color focus-visible:ring-inset focus-visible:ring-offset-[-2px]">
        <span className="truncate">Open</span>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <h6>Title</h6>
        <div>Contents</div>
      </CollapsibleContent>
    </Collapsible>
  )
}