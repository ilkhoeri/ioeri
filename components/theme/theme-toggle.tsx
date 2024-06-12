"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { useHotkeys } from "@/hooks/use-hotkeys/use-hotkeys";
import { theming } from "./theme";
import { twMerge } from "tailwind-merge";
import { UnstyledButton } from "../ui/button";

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
      <code className="tracking-wide">⌘+J</code>
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
            t.name === (theme || "auto") && "bg-muted text-color",
          )}
        >
          <t.icon />
        </UnstyledButton>
      ))}
    </section>
  );
}
