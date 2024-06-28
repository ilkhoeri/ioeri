"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { useHotkeys } from "@/modules";

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
        className="hidden sr-only sm:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 gap-4 mt-5 sm:gap-6 transition-transform absolute transition-all translate-y-0 peer peer-focus-visible:-translate-y-full transition-colors focus-visible:border-b-color peer-focus-visible:text-[100%] text-[100%] pb-4 pb-3 placeholder:min-h-8"
      />
    </ruby>
  );
}
