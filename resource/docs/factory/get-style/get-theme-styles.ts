import { Theme } from "../factory-types";
import { resolveStyles } from "./resolve-styles";

interface GetThemeStylesOptions {
  theme: Theme;
  themeName: string[];
  props: Record<string, any>;
  stylesCtx: Record<string, any> | undefined;
  selector: string;
}

export function getThemeStyles({ theme, themeName, props, stylesCtx, selector }: GetThemeStylesOptions) {
  return themeName
    .map(
      (n) =>
        resolveStyles({
          theme,
          styles: theme?.components[n]?.styles,
          props,
          stylesCtx,
        })[selector],
    )
    .reduce((acc, val) => ({ ...acc, ...val }), {});
}
