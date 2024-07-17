"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { MonitorSmartphoneIcon, MoonStarIcon, SunIcon } from "@/modules/icons";

import { twMerge } from "tailwind-merge";
import { UnstyledButton } from "../components/button";
import { useHotkeys } from "@/modules/hooks";

export function ThemeToggle({
  classNames,
  unstyled,
}: {
  classNames?: { wrapper?: string; buttons?: string };
  unstyled?: { wrapper?: boolean; buttons?: boolean };
}) {
  const { theme, setTheme } = useTheme();
  const [key, setKey] = React.useState<string | null>(null);

  React.useEffect(() => {
    const theme = localStorage.getItem("theme");
    setKey(theme || "system");
  }, [key]);

  const themed = theme === "dark" ? "light" : "dark";
  useHotkeys([
    [
      "mod+J",
      () => {
        setTheme(themed);
        setKey(themed);
      },
    ],
  ]);

  return (
    <section
      className={twMerge(!unstyled?.wrapper && "relative flex items-center flex-flow-row gap-4", classNames?.wrapper)}
    >
      <code className="sr-only hidden tracking-wide select-none">⌘+J</code>
      {theming.map((t, index) => (
        <UnstyledButton
          key={index}
          suppressHydrationWarning
          role="button"
          data-state={key === t.name ? "active" : ""}
          onClick={() => {
            setTheme(t.name);
            setKey(t.name);
          }}
          aria-label={t.name}
          className={twMerge(
            !unstyled?.buttons &&
              "relative text-[13px] flex items-center justify-center cursor-pointer select-none p-1 outline-0 transition-colors focus:text-neutral-900 disabled:pointer-events-none disabled:opacity-50 dark:focus:text-neutral-50 border border-neutral-200 dark:border-neutral-700 h-[var(--ttg-sz,30px)] w-[var(--ttg-sz,30px)] rounded-lg capitalize focus:bg-[#e4e4e4] dark:focus:bg-[#373737] data-[state=active]:bg-muted data-[state=active]:text-color",
            classNames?.buttons,
          )}
        >
          <t.icon />
        </UnstyledButton>
      ))}
    </section>
  );
}

export function ThemeStateHidden() {
  const { theme, setTheme } = useTheme();

  useHotkeys([["mod+J", () => setTheme(theme === "dark" ? "light" : "dark")]]);

  return (
    <ruby aria-label="THEMING_SHORTCUT (⌘/ctrl + J)" className="hidden sr-only" tabIndex={-1} hidden aria-hidden>
      <rp className="sr-only" tabIndex={-1} hidden aria-hidden>
        THEMING_SHORTCUT (⌘/ctrl + J)
      </rp>
    </ruby>
  );
}

export function StateHidden() {
  return (
    <ruby hidden className="hidden sr-only" data-state="helper-css">
      <rt
        hidden
        aria-label="helper-css"
        className="hidden sr-only before:content-['Open'] data-[state=open]:before:content-['Close'] before:size-max h-[15rem] -bottom-8 size-2 h-4 h-6 tex-xs size-9 w-8 min-w-8 min-w-9 h-9 min-h-9 w-52 w-64 h-64 w-80 h-80 max-h-full p-4 hover:bg-muted-foreground peer-hover:bg-muted peer-hover:data-[scroll=active]:bg-muted-foreground data-[scroll=active]:bg-muted-foreground peer-hover:bg-muted peer-hover:bg-muted-foreground data-[scroll=active]:bg-color right-1 left-1 right-4 left-4 min-w-20 md:flex-row md:flex-col top-4 min-w-26 p-2 [&_span]:font-mono [&_span]:text-nowrap min-w-36 min-w-max last-of-type:border-b-0 w-1/2 rounded-none w-80 gap-2 data-[side=top]:flex-col-reverse data-[side=bottom]:flex-col data-[side=left]:flex-row-reverse data-[side=right]:flex-row data-[side=top]:overflow-y-auto data-[side=bottom]:overflow-y-auto data-[side=left]:overflow-x-auto data-[side=right]:overflow-x-auto min-w-full text-sm group-data-[side=top]:border-t group-data-[side=bottom]:border-b group-data-[side=left]:border-l group-data-[side=right]:border-r data-[side=top]:w-80 data-[side=bottom]:w-80 data-[side=left]:w-14 data-[side=right]:w-14 data-[side=left]:w-max data-[side=right]:w-max last-of-type:border-b-0 min-w-max data-[side=top]:h-64 data-[side=top]:w-80 data-[side=bottom]:h-64 data-[side=bottom]:w-80 data-[side=left]:w-64 data-[side=left]:h-[--trigger-h] data-[side=right]:w-64 data-[side=right]:h-[--trigger-h] h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bottom-[calc(50%+20px)] top-[calc(50%+20px)] data-[overflow=x]:h-max data-[overflow=x]:w-80 data-[overflow=y]:h-80 data-[overflow=y]:w-64 data-[overflow=y]:flex-col data-[overflow=x]:flex-row data-[overflow=x]:bottom-1 data-[overflow=y]:right-1 inset-0 min-h-full min-w-full rounded-[inherit] resize place-content-center min-w-2 min-h-2 min-w-28 min-h-9 placeholder:text-center border-constructive text-constructive occure_load placeholder:uppercase cursor-zoom-in p-4 gap-x-2 gap-y-2 bg-black bg-white min-h-1.5 h-1.5 min-w-1.5 w-1.5 right-8 rotate-0 rotate-45 -rotate-45 rotate-90 -rotate-90 rotate-180 -rotate-180 w-[350px] h-[400px] min-w-[350px] min-h-[400px] h-[350px] w-[400px] md:hidden md:sr-only md:!hidden md:!sr-only autofill:bg-background placeholder-shown:bg-background space-x-2 text-h1 font-bold font-extrabold"
      />

      <rt
        hidden
        className="top-[--top] left-[--left] data-[side=top]:flex-col-reverse data-[side=right]:flex-row data-[side=bottom]:flex-col data-[side=left]:flex-row-reverse data-[align=start]:items-start data-[align=center]:items-center data-[align=end]:items-end relative flex flex-col z-50 min-w-[8rem] transition-opacity [transition-duration:200ms] overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-100 data-[state=open]:zoom-in-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:data-[side=bottom]:slide-out-to-top-2 data-[state=closed]:data-[side=left]:slide-out-to-right-2 data-[state=closed]:data-[side=right]:slide-out-to-left-2 data-[state=closed]:data-[side=top]:slide-out-to-bottom-2 fixed inset-0 z-50 bg-black/50  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[60%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[60%] sm:rounded-lg z-[100] z-[111] duration-300 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-75 data-[side=top]:slide-in-from-bottom-2 data-[side=top]:data-[state=closed]:slide-out-to-bottom-4 data-[side=right]:slide-in-from-left-2 data-[side=right]:data-[state=closed]:slide-out-to-left-4 data-[side=bottom]:slide-in-from-top-2 data-[side=bottom]:data-[state=closed]:slide-out-to-top-4 data-[side=left]:slide-in-from-right-2 data-[side=left]:data-[state=closed]:slide-out-to-right-4 font-roboto-mono font-medium -mt-1 -mt-2 -mt-3 -mr-4 md:w-[426px] md:h-[316px] [&_svg]:hidden left-1 right-1 [&_[data-arrow=border]]:text-border w-[23px] h-[9px] absolute text-background [&_[data-arrow=border]]:text-border data-[align=center]:data-[side=top]:inset-x-auto data-[align=center]:data-[side=bottom]:inset-x-auto data-[align=center]:data-[side=right]:inset-y-auto data-[align=center]:data-[side=left]:inset-y-auto data-[align=start]:data-[side=top]:left-2 data-[align=start]:data-[side=bottom]:left-2 data-[align=start]:data-[side=right]:top-4 data-[align=start]:data-[side=left]:top-4 data-[align=end]:data-[side=top]:right-2 data-[align=end]:data-[side=bottom]:right-2 data-[align=end]:data-[side=right]:bottom-4 data-[align=end]:data-[side=left]:bottom-4 data-[side=top]:rotate-0 data-[side=top]:top-[calc(var(--content-h)-2px)] data-[side=right]:rotate-90 data-[side=right]:right-[calc(var(--content-w)-9px)] data-[side=bottom]:rotate-180 data-[side=bottom]:bottom-[calc(var(--content-h)-2px)] data-[side=left]:-rotate-90 data-[side=left]:left-[calc(var(--content-w)-9px)] w-24 min-w-24 max-w-24 z-20 right-10 left-10 left-32 top-10 top-16 max-w-[350px] max-h-[350px] max-w-[400px] max-h-[400px] top-2 left-2 right-2 right-6 animate-pulse [&_*]:font-roboto-mono -top-4 -top-2 -top-3 -mb-4 -mb-8 items-start h-[35rem] bg-muted/50 [&_mark]:rounded-sm"
      />

      <rt
        hidden
        aria-label="helper-css-tooltip"
        className="!top-[--top] !left-[--left] size-9 data-[state=open]:zoom-in-90 data-[state=closed]:zoom-out-90 fixed min-w-max z-[999] text-[13px] rounded-md border bg-background text-popover-foreground shadow-md outline-none focus-visible:ring-0 flex items-center justify-center py-1 px-2 w-max max-w-max data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in data-[state=open]:fade-out data-[state=open]:zoom-in-100 data-[state=closed]:zoom-out-75 data-[side=top]:data-[align=center]:left-[calc(var(--trigger-r)-calc(calc(var(--trigger-w)*0.5)+calc(var(--content-w)*0.5)))] data-[side=bottom]:data-[align=center]:left-[calc(var(--trigger-r)-calc(calc(var(--trigger-w)*0.5)+calc(var(--content-w)*0.5)))] data-[align=center]:top-[--top] data-[side=top]:slide-in-from-bottom-2 data-[side=top]:data-[state=closed]:slide-out-to-bottom-4 data-[side=top]:top-[calc(var(--top)-var(--offset))] data-[side=right]:slide-in-from-left-2 data-[side=right]:data-[state=closed]:slide-out-to-left-4 data-[side=right]:left-[calc(var(--left)+var(--offset))] data-[side=bottom]:slide-in-from-top-2 data-[side=bottom]:data-[state=closed]:slide-out-to-top-4 data-[side=bottom]:top-[calc(var(--top)+var(--offset))] data-[side=left]:slide-in-from-right-2 data-[side=left]:data-[state=closed]:slide-out-to-right-4 data-[side=left]:left-[calc(calc(var(--left)-var(--offset))] top-[calc(var(--top)+var(--offset))] top-[calc(var(--top)-var(--offset))] left-[calc(var(--left)+var(--offset))] left-[calc(var(--left)-var(--offset))] top-[--top] left-[--left] ||| data-[side=top]:data-[align=start]:left-[calc(var(--trigger-r)-var(--trigger-w))] data-[side=bottom]:data-[align=start]:left-[calc(var(--trigger-r)-var(--trigger-w))] data-[side=top]:data-[align=end]:left-[calc(var(--trigger-r)-var(--content-w))] data-[side=bottom]:data-[align=end]:left-[calc(var(--trigger-r)-var(--content-w))] data-[side=right]:data-[align=start]:top-[calc(var(--trigger-b)-var(--trigger-h))] data-[side=left]:data-[align=start]:top-[calc(var(--trigger-b)-var(--trigger-h))] data-[side=right]:data-[align=end]:top-[calc(var(--trigger-b)-var(--content-h))] data-[side=left]:data-[align=end]:top-[calc(var(--trigger-b)-var(--content-h))]  data-[state=open]:slide-in-from-top-[50%] data-[state=closed]:slide-out-to-top-[50%] h-[calc(100%-41px)] !duration-200"
      />
      <rt
        hidden
        aria-label="helper-css-tooltip"
        className="fixed inset-0 z-[100] bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed left-[50%] top-[50%] z-[111] w-80 h-80 translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background shadow-lg duration-300 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 data-[state=open]:slide-in-from-left-1/2 data-[state=closed]:slide-out-to-left-1/2 data-[state=open]:slide-in-from-top-[50%] data-[state=closed]:slide-out-to-top-[50%] data-[state=open]:zoom-in-[0.8] data-[state=closed]:zoom-out-[0.8] data-[state=open]:zoom-in-[0.85] data-[state=closed]:zoom-out-[0.85] rounded-lg overflow-hidden p-0 md:w-[520px] md:h-[360px] [&_[data-command=actions-list]]:pt-0 [&_[data-command=actions-group]:nth-child(1)]:-mt-4 [&_[data-command=action]]:ml-4 first:mt-0 [&:nth-child(1)]:mt-0 last:border-b-0 data-[side=top]:slide-in-from-bottom-[--offset] data-[side=top]:data-[state=closed]:slide-out-to-bottom-[--offset] data-[side=right]:slide-in-from-left-[--offset] data-[side=right]:data-[state=closed]:slide-out-to-left-[--offset] data-[side=bottom]:slide-in-from-top-[--offset] data-[side=bottom]:data-[state=closed]:slide-out-to-top-[--offset] data-[side=left]:slide-in-from-right-[--offset] data-[side=left]:data-[state=closed]:slide-out-to-right-[--offset]"
      />
    </ruby>
  );
}

export const theming = [
  {
    name: "light",
    icon: SunIcon,
  },
  {
    name: "system",
    icon: MonitorSmartphoneIcon,
  },
  {
    name: "dark",
    icon: MoonStarIcon,
  },
];
