import { cnx, Variant } from "@/modules/utility";
import { GetStylesApiOptions, Theme } from "../factory-types";

import { getRootClassName } from "./get-root-classname";
import { getSelectorClassName } from "./get-selector-classname";
import { getVariantClassName } from "./get-variant-classname";
import { getGlobalClassNames } from "./get-global-classnames";
import { getResolvedClassNames } from "./get-resolved-classnames";
import { getOptionsClassNames } from "./get-options-classnames";
import { twMerge } from "tailwind-merge";

type __ClassNames =
  | undefined
  | Partial<Record<string, string>>
  | ((
      theme: Theme,
      props: Record<string, any>,
      ctx: Record<string, any> | undefined,
    ) => Partial<Record<string, string>>);

export type _ClassNames = __ClassNames | __ClassNames[];

export interface GetClassNameOptions {
  /** Theme object, resolved by hook */
  theme: Theme;
  /** Options for specified selector, may include `classNames` or `className` */
  options: GetStylesApiOptions | undefined;
  /** Prefix for all class names, resolved by hook */
  classNamesPrefix?: string;
  /** `classNames` specified in the hook, only resolved `classNames[selector]` is added to the list */
  classNames: _ClassNames;
  /** Classes object, usually imported from `*.module.css` */
  classes: (variant?: Variant<{ selector: { [key: string]: string } }>) => string;
  // classes: Record<string, string>;
  /** Determines whether classes from `classes` should be added to the list */
  unstyled: boolean | undefined;
  /** If set, removes all classes */
  headless?: boolean;
  /** `className` specified in the hook, added to the list if `selector` is `rootSelector` */
  className: string | undefined;
  /** Class part specified in `getStyles` */
  selector: string;
  /** `rootSelector` specified in the hook, determines whether `className` should be added to the list */
  rootSelector: string;
  /** Component props, used as context for `classNames` and `options.classNames` */
  props: Record<string, any>;
  /** Component styles context, used as context for `classNames` and `options.classNames` */
  stylesCtx?: Record<string, any> | undefined;
}

export function getClassName({
  theme,
  options,
  classNames,
  classes,
  unstyled,
  headless,
  stylesCtx,
  className,
  selector,
  rootSelector,
  props,
  // classNamesPrefix,
}: GetClassNameOptions) {
  return twMerge(
    cnx(
      getSelectorClassName({ selector, classes, unstyled: unstyled || headless }),
      getVariantClassName({ options, selector, classes, unstyled }),
      getGlobalClassNames({ theme, options, unstyled: unstyled || headless }),
      getResolvedClassNames({ selector, stylesCtx, theme, classNames, props }),
      getOptionsClassNames({ selector, stylesCtx, options, props, theme }),
      getRootClassName({ rootSelector, selector, className }),
      options?.className,
    ),
  );
}
