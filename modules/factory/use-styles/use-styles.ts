import { CSSProperties } from "../../utils/record-types";
import { FactoryPayload } from "../../factory";

import { getId } from "../get-id";
import { getClassName } from "./get-class-name/get-class-name";
import { getStyle } from "./get-style/get-style";

import { useTheme } from "../use-props";
import { ClassNames, ClassNamesArray, GetStyleProp, GetStylesApiOptions, Styles } from "../styles-api.types";
import { PartialVarsResolver, VarsResolver } from "../transit";

export interface UseStyles<Payload extends FactoryPayload> {
  name: string | (string | undefined)[];
  classes: Payload["stylesNames"] extends string ? Record<string, string> : never;
  props: Payload["props"];
  stylesCtx?: Payload["ctx"];
  className?: string;
  style?: GetStyleProp;
  rootSelector?: Payload["stylesNames"];
  unstyled?: boolean;
  classNames?: ClassNames<Payload> | ClassNamesArray<Payload>;
  styles?: Styles<Payload>;
  classNamesPrefix?: string;
}

export type GetStylesApi<Payload extends FactoryPayload> = (
  selector: NonNullable<Payload["stylesNames"]>,
  options?: GetStylesApiOptions,
) => {
  className: string;
  style: CSSProperties;
};

export function useStyles<Payload extends FactoryPayload>({
  name,
  classes,
  props,
  stylesCtx,
  className,
  style,
  rootSelector = "root" as NonNullable<Payload["stylesNames"]>,
  unstyled,
  classNames,
  styles,
  classNamesPrefix,
}: UseStyles<Payload>): GetStylesApi<Payload> {
  const theme = useTheme();
  const themeName = (Array.isArray(name) ? name : [name]).filter((n) => n) as string[];

  return (selector, options) => ({
    id: getId({
      options,
      selector,
    }),
    className: getClassName({
      theme,
      classNamesPrefix,
      options,
      selector,
      classNames,
      classes,
      unstyled,
      className,
      rootSelector,
      props,
      stylesCtx,
    }),

    style: getStyle({
      theme,
      themeName,
      selector,
      options,
      props,
      stylesCtx,
      rootSelector,
      styles,
      style,
    }),
  });
}
