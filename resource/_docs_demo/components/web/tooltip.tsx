import { Tooltip } from "@/modules/components/web";
import { SetProps, SetPropsBoolean, SetPropsSideAlign, useSetProps } from "../../__set_props";

export function Demo() {
  const { numb: offset, side, align, boo: withArrow, ...props } = useSetProps({ Numb: 6, Side: "top" });

  const content = [...Array(4)].map((_, index) => <span key={index}>Lorem ipsum...</span>);

  function MarkHover({ label }: { label: string }) {
    return (
      <Tooltip
        asChild
        touch
        content={`What's ${label}?`}
        side={side}
        align={align}
        sideOffset={offset}
        withArrow={withArrow}
        contentProps={{ className: "bg-color text-background font-medium" }}
      >
        <mark>{label}</mark>
      </Tooltip>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <Tooltip
        touch
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

      <p className="w-80 text-justify">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. <MarkHover label="Blanditiis" /> dolor placeat odit{" "}
        <MarkHover label="reprehenderit" /> expedita nisi ab natus inventore consectetur a?{" "}
        <MarkHover label="Quibusdam" /> harum sapiente voluptas nam quaerat odit, atque, iusto repellendus expedita,
        nostrum aperiam magni perspiciatis!
      </p>
      <SetProps.Wrapper>
        <SetPropsSideAlign numb={offset} side={side} align={align} {...props} />
        <SetPropsBoolean label="withArrow" boo={withArrow} setBoo={props.setBoo} />
      </SetProps.Wrapper>
    </div>
  );
}
