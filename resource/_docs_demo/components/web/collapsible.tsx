"use client";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/modules/components/web";
import { cvx } from "@/resource/docs/utility";
import { SetPropsCollapsible, useSetProps } from "../../__set_props";

export function Demo() {
  const { bool: clickOutsideToClose, numb: offset, side, align, ...props } = useSetProps({ Numb: 16 });
  return (
    <div>
      <Collapsible align={align} side={side} sideOffset={offset} clickOutsideToClose={clickOutsideToClose}>
        <CollapsibleTrigger className={classes({ trigger: props.style })}>
          <span className="sr-only">Trigger</span>
        </CollapsibleTrigger>

        <CollapsibleContent className={classes({ content: props.style })}>
          {[...Array(30)].map((_, index) => (
            <p key={index} className={classes({ child: props.style })}>
              Lorem ipsum...
            </p>
          ))}
        </CollapsibleContent>
      </Collapsible>
      <SetPropsCollapsible numb={offset} side={side} align={align} bool={clickOutsideToClose} {...props} />
    </div>
  );
}

const classes = cvx({
  variants: {
    trigger: {
      default:
        "relative before:content-['Open'] data-[state=open]:before:content-['Close'] before:size-max font-semibold px-2 py-1 rounded-none data-[side=top]:w-80 data-[side=bottom]:w-80 data-[side=left]:w-max data-[side=right]:w-max group-data-[side=top]:border-t group-data-[side=bottom]:border-b group-data-[side=left]:border-l group-data-[side=right]:border-r",
      dropdown:
        "relative before:content-['Open'] data-[state=open]:before:content-['Close'] rounded-md font-semibold text-span bg-color text-background hover:bg-color/90 h-9 px-2.5",
    },
    content: {
      default:
        "gap-2 data-[side=top]:flex-col-reverse data-[side=bottom]:flex-col data-[side=left]:flex-row-reverse data-[side=right]:flex-row data-[side=top]:overflow-y-auto data-[side=bottom]:overflow-y-auto data-[side=left]:overflow-x-auto data-[side=right]:overflow-x-auto data-[side=top]:h-64 data-[side=top]:w-80 data-[side=bottom]:h-64 data-[side=bottom]:w-80 data-[side=left]:w-64 data-[side=left]:h-[--trigger-h] data-[side=right]:w-64 data-[side=right]:h-[--trigger-h] other-collapsible-content-class",
      dropdown: "overflow-y-auto bg-background rounded-md border p-2 h-80 w-64 other-collapsible-content-class",
    },
    child: {
      default:
        "text-sm p-2 group-data-[side=top]:border-t group-data-[side=bottom]:border-b group-data-[side=left]:border-l group-data-[side=right]:border-r last-of-type:border-b-0 min-w-max",
      dropdown: "text-sm pt-3 pb-1.5 border-b last-of-type:border-b-0 min-w-full",
    },
  },
});
