import { CSSProperties, StyleProp, Theme } from "../factory-types";

interface ResolveStyleInput {
  style: StyleProp | undefined;
  theme: Theme;
}

export function resolveStyle({ style, theme }: ResolveStyleInput): CSSProperties {
  if (Array.isArray(style)) {
    return [...style].reduce<Record<string, any>>(
      (acc, item) => ({ ...acc, ...resolveStyle({ style: item, theme }) }),
      {},
    );
  }

  if (typeof style === "function") {
    return style(theme);
  }

  if (style == null) {
    return {};
  }

  return style;
}
