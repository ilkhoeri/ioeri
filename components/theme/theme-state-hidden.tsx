"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { useHotkeys } from "@/hooks/use-hotkeys/use-hotkeys";

export function ThemeStateHidden() {
  const { theme, setTheme } = useTheme();

  useHotkeys([["mod+J", () => setTheme(theme === "dark" ? "light" : "dark")]]);

  return (
    <ruby aria-label="THEMING_SHORTCUT (⌘/ctrl + J)" className="sr-only" tabIndex={-1} hidden aria-hidden>
      <rp className="sr-only" tabIndex={-1} hidden aria-hidden>
        THEMING_SHORTCUT (⌘/ctrl + J)
      </rp>
    </ruby>
  );
}
