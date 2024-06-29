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

      <span
        aria-label="helper-css"
        className="hidden sr-only h-[15rem] w-52 w-64 h-80 max-h-full p-4 hover:bg-muted-foreground peer-hover:bg-muted-foreground data-[scroll=active]:bg-color right-1 left-1 right-4 left-4 min-w-20 md:flex-row md:flex-col top-4 min-w-26 p-2 [&_span]:font-mono [&_span]:text-nowrap min-w-36 last-of-type:border-b-0"
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
