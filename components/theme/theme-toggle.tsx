"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { useHotkeys } from "@/hooks/use-hotkeys/use-hotkeys";
import { theming } from "./theme";
import { twMerge } from "tailwind-merge";
import { Tooltip, type TooltipTrees } from "@/components/assets/tooltip";

type TooltipUnstyledType = {
  unstyled?: Partial<Record<TooltipTrees, boolean>>;
};

export function ThemeToggle({
  classNames,
  unstyled,
}: {
  classNames?: { wrapper?: string; buttons?: string };
  unstyled?: { wrapper?: boolean; buttons?: boolean };
} & TooltipUnstyledType) {
  const { theme, setTheme } = useTheme();

  useHotkeys([["mod+J", () => setTheme(theme === "dark" ? "light" : "dark")]]);

  return (
    <section
      className={twMerge(!unstyled?.wrapper && "relative flex items-center flex-flow-row gap-4", classNames?.wrapper)}
    >
      {theming.map((t, index) => (
        <Tooltip
          el={"button"}
          align="end"
          tooltip={<code>{t.name} ⌘+J</code>}
          withArrow
          key={index}
          type="button"
          onClick={() => {
            setTheme(t.name);
            // getValue(t.name as const);
          }}
          aria-label={t.name}
          unstyled={unstyled}
          className={twMerge(
            !unstyled?.buttons &&
              "relative text-[13px] flex items-center justify-center cursor-pointer select-none p-1 outline-0 transition-colors focus:text-neutral-900 disabled:pointer-events-none disabled:opacity-50 dark:focus:text-neutral-50 border border-neutral-200 dark:border-neutral-700 h-[var(--ttg-sz,30px)] w-[var(--ttg-sz,30px)] rounded-lg capitalize focus:bg-[#e4e4e4] dark:focus:bg-[#373737]",
            classNames?.buttons,
          )}
        >
          <t.icon />
        </Tooltip>
      ))}
    </section>
  );
}
