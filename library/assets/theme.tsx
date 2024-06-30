"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { MonitorSmartphoneIcon, MoonStarIcon, SunIcon } from "@/modules";

import { twMerge } from "tailwind-merge";
import { UnstyledButton } from "../components/button";
import { useHotkeys } from "@/modules";

export function ThemeToggle({
  classNames,
  unstyled,
}: {
  classNames?: { wrapper?: string; buttons?: string };
  unstyled?: { wrapper?: boolean; buttons?: boolean };
}) {
  const { theme, setTheme } = useTheme();

  useHotkeys([["mod+J", () => setTheme(theme === "dark" ? "light" : "dark")]]);

  return (
    <section
      className={twMerge(!unstyled?.wrapper && "relative flex items-center flex-flow-row gap-4", classNames?.wrapper)}
    >
      <code className="tracking-wide select-none">⌘+J</code>
      {theming.map((t, index) => (
        <UnstyledButton
          suppressHydrationWarning
          role="button"
          key={index}
          onClick={() => {
            setTheme(t.name);
          }}
          aria-label={t.name}
          className={twMerge(
            !unstyled?.buttons &&
              "relative text-[13px] flex items-center justify-center cursor-pointer select-none p-1 outline-0 transition-colors focus:text-neutral-900 disabled:pointer-events-none disabled:opacity-50 dark:focus:text-neutral-50 border border-neutral-200 dark:border-neutral-700 h-[var(--ttg-sz,30px)] w-[var(--ttg-sz,30px)] rounded-lg capitalize focus:bg-[#e4e4e4] dark:focus:bg-[#373737]",
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
    <ruby aria-label="THEMING_SHORTCUT (⌘/ctrl + J)" className="sr-only" tabIndex={-1} hidden aria-hidden>
      <rp className="sr-only" tabIndex={-1} hidden aria-hidden>
        THEMING_SHORTCUT (⌘/ctrl + J)
      </rp>

      <rt
        aria-label="helper-css"
        className="hidden sr-only h-[15rem] tex-xs size-9 w-8 min-w-8 min-w-9 h-9 min-h-9 w-52 w-64 h-80 max-h-full p-4 hover:bg-muted-foreground peer-hover:bg-muted-foreground data-[scroll=active]:bg-color right-1 left-1 right-4 left-4 min-w-20 md:flex-row md:flex-col top-4 min-w-26 p-2 [&_span]:font-mono [&_span]:text-nowrap min-w-36 min-w-max last-of-type:border-b-0 w-1/2 rounded-none w-80 gap-2 data-[side=top]:flex-col-reverse data-[side=bottom]:flex-col data-[side=left]:flex-row-reverse data-[side=right]:flex-row data-[side=top]:overflow-y-auto data-[side=bottom]:overflow-y-auto data-[side=left]:overflow-x-auto data-[side=right]:overflow-x-auto min-w-full text-sm group-data-[side=top]:border-t group-data-[side=bottom]:border-b group-data-[side=left]:border-l group-data-[side=right]:border-r data-[side=top]:w-80 data-[side=bottom]:w-80 data-[side=left]:w-14 data-[side=right]:w-14 data-[side=left]:w-max data-[side=right]:w-max last-of-type:border-b-0 min-w-max data-[side=top]:h-64 data-[side=top]:w-80 data-[side=bottom]:h-64 data-[side=bottom]:w-80 data-[side=left]:w-64 data-[side=left]:h-[--trigger-h] data-[side=right]:w-64 data-[side=right]:h-[--trigger-h] h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bottom-[calc(50%+48px)] data-[overflow=x]:h-max data-[overflow=x]:w-80 data-[overflow=y]:h-80 data-[overflow=y]:w-64 data-[overflow=y]:flex-col data-[overflow=x]:flex-row data-[overflow=x]:bottom-1 data-[overflow=y]:right-1 "
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
    name: "dark",
    icon: MoonStarIcon,
  },
  {
    name: "system",
    icon: MonitorSmartphoneIcon,
  },
];
