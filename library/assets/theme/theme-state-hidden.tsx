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
        className="hidden sr-only grid sm:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 gap-4 mt-5 sm:gap-6"
      />
    </ruby>
  );
}
