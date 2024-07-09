import { CSSProperties, GetStylesApiOptions, StyleProp, Theme } from "../factory-types";
import { getThemeStyles } from "./get-theme-styles";
import { resolveStyle } from "./resolve-style";
import { resolveStyles } from "./resolve-styles";

export type _Styles =
  | undefined
  | Partial<Record<string, CSSProperties>>
  | ((
      theme: Theme,
      props: Record<string, any>,
      ctx: Record<string, any> | undefined,
    ) => Partial<Record<string, CSSProperties>>);

export interface GetStyleInput {
  theme: Theme;
  themeName: string[];
  selector: string;
  rootSelector: string;
  options: GetStylesApiOptions | undefined;
  props: Record<string, any>;
  stylesCtx: Record<string, any> | undefined;
  styles: _Styles;
  style: StyleProp | undefined;
}

export function getStyle({
  theme,
  themeName,
  selector,
  options,
  props,
  stylesCtx,
  rootSelector,
  styles,
  style,
}: GetStyleInput): CSSProperties {
  return {
    ...resolveStyles({ theme, styles, props, stylesCtx })[selector],
    ...resolveStyles({ theme, styles: options?.styles, props: options?.props || props, stylesCtx })[selector],
    ...(rootSelector === selector ? resolveStyle({ style, theme }) : null),
    ...getThemeStyles({ theme, themeName, props, stylesCtx, selector }),
    ...resolveStyle({ style: options?.style, theme }),
  };
}
