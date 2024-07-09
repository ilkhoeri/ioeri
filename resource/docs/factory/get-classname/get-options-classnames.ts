import { GetStylesApiOptions } from "../factory-types";
import { resolveClassNames, ResolveClassNamesInput } from "./resolve-classnames";

interface GetOptionsClassNamesInput extends Omit<ResolveClassNamesInput, "classNames"> {
  selector: string;
  options: GetStylesApiOptions | undefined;
}

export function getOptionsClassNames({ selector, stylesCtx, options, props, theme }: GetOptionsClassNamesInput) {
  return resolveClassNames({
    theme,
    classNames: options?.classNames,
    props: options?.props || props,
    stylesCtx,
  })[selector];
}
