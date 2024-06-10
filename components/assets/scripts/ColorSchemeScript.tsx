import React from "react";

export interface ColorSchemeScriptProps extends React.ComponentPropsWithoutRef<"script"> {
  forceColorScheme?: "light" | "dark";
  defaultColorScheme?: "light" | "dark" | "auto";
  localStorageKey?: string;
}

const getScript = ({
  defaultColorScheme,
  localStorageKey,
  forceColorScheme,
}: Pick<ColorSchemeScriptProps, "defaultColorScheme" | "localStorageKey" | "forceColorScheme">) =>
  forceColorScheme
    ? `document.documentElement.setAttribute("data-color-scheme", '${forceColorScheme}');`
    : `try {
  var colorScheme = window.localStorage.getItem("${localStorageKey}") || "${defaultColorScheme}";
  var computedColorScheme = colorScheme !== "auto" ? colorScheme : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  document.documentElement.setAttribute("data-color-scheme", computedColorScheme);
} catch (e) {}
`;

export function ColorSchemeScript({
  defaultColorScheme = "auto",
  localStorageKey = "color-scheme",
  forceColorScheme,
  ...others
}: ColorSchemeScriptProps) {
  return (
    <script
      {...others}
      data-theme-script
      dangerouslySetInnerHTML={{
        __html: getScript({ defaultColorScheme, localStorageKey, forceColorScheme }),
      }}
    />
  );
}
