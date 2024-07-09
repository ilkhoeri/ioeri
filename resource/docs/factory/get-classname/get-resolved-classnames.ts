import { resolveClassNames, ResolveClassNamesInput } from "./resolve-classnames";

interface GetResolvedClassNamesOptions extends ResolveClassNamesInput {
  selector: string;
}

export function getResolvedClassNames({ selector, stylesCtx, theme, classNames, props }: GetResolvedClassNamesOptions) {
  return resolveClassNames({ theme, classNames, props, stylesCtx })[selector];
}
