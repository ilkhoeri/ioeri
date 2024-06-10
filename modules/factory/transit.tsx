import { FactoryPayload } from "./factory";

export type ElementProps<ElementType extends React.ElementType, PropsToOmit extends string = never> = Omit<
  React.ComponentPropsWithoutRef<ElementType>,
  "style" | PropsToOmit
>;

const elevations = {
  app: 100,
  modal: 200,
  popover: 300,
  overlay: 400,
  max: 9999,
} as const;

export function getDefaultZIndex(level: keyof typeof elevations) {
  return elevations[level];
}

export type ColorsTuple = readonly [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  ...string[],
];

export type ColorShade = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface PrimaryShade {
  light: ColorShade;
  dark: ColorShade;
}

type ThemeComponents = {
  [x: string]: ThemeComponent;
};

export interface ThemeOther {
  [key: string]: any;
}

export type Theme = {
  /** Controls focus ring styles. Supports the following options:
   *  - `auto` – focus ring is displayed only when the user navigates with keyboard (default value)
   *  - `always` – focus ring is displayed when the user navigates with keyboard and mouse
   *  - `never` – focus ring is always hidden (not recommended)
   */
  focusRing: "auto" | "always" | "never";

  /** rem units scale, change if you customize font-size of `<html />` element
   *  default value is `1` (for `100%`/`16px` font-size on `<html />`)
   */
  scale: number;

  /** Determines whether `font-smoothing` property should be set on the body, `true` by default */
  fontSmoothing: boolean;

  /** White color */
  white: string;

  /** Black color */
  black: string;

  /** Object of colors, key is color name, value is an array of at least 10 strings (colors) */
  colors: string;

  /** Index of theme.colors[color].
   *  Primary shade is used in all components to determine which color from theme.colors[color] should be used.
   *  Can be either a number (0–9) or an object to specify different color shades for light and dark color schemes.
   *  Default value `{ light: 6, dark: 8 }`
   *
   *  For example,
   *  { primaryShade: 6 } // shade 6 is used both for dark and light color schemes
   *  { primaryShade: { light: 6, dark: 7 } } // different shades for dark and light color schemes
   * */
  primaryShade: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | PrimaryShade;

  /** font-family used in all components, system fonts by default */
  fontFamily: string;

  /** Monospace font-family, used in code and other similar components, system fonts by default  */
  fontFamilyMonospace: string;

  /** Object of values that are used to control breakpoints in all components,
   *  values are expected to be defined in em
   * */
  breakpoints: {
    [x: string & NonNullable<unknown>]: string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };

  /** Determines whether user OS settings to reduce motion should be respected, `false` by default */
  respectReducedMotion: boolean;

  /** Determines which cursor type will be used for interactive elements
   * - `default` – cursor that is used by native HTML elements, for example, `input[type="checkbox"]` has `cursor: default` styles
   * - `pointer` – sets `cursor: pointer` on interactive elements that do not have these styles by default
   */
  cursorType: "default" | "pointer";

  /** Class added to the elements that have active styles, for example, `Button` and `ActionIcon` */
  activeClassName: string;

  /** Class added to the elements that have focus styles, for example, `Button` or `ActionIcon`.
   *  Overrides `theme.focusRing` property.
   */
  focusClassName: string;

  /** Allows adding `classNames`, `styles` and `defaultProps` to any component */
  components: ThemeComponents;

  /** Any other properties that you want to access with the theme objects */
  other: ThemeOther;
} | null;

export interface CSSProperties extends React.CSSProperties {
  [key: string]: any;
}

type Style = CSSProperties | ((theme: Theme) => CSSProperties);
export type StyleProp = Style | Style[] | StyleProp[] | undefined;

export type CssVariable = `--${string}`;

export type CssVariables<Variable extends string = CssVariable> = Partial<Record<Variable, string>>;

export type CssVars<Variable extends string = CssVariable> =
  | CssVariables<Variable>
  | ((theme: Theme) => CssVariables<Variable>)
  | CssVars<Variable>[];

export type CssVarsProp<Variable extends string = CssVariable> = CssVars<Variable> | CssVars<Variable>[];

export type TransformVars<V> = {
  [Key in keyof V]: V[Key] extends CssVariable ? Record<V[Key], string | undefined> : never;
};

export type PartialTransformVars<V> = {
  [Key in keyof V]: V[Key] extends CssVariable ? Partial<Record<V[Key], string | undefined>> : never;
};

export type VarsResolver<Payload extends FactoryPayload> = (
  theme: Theme,
  props: Payload["props"],
  ctx: Payload["ctx"],
) => TransformVars<Payload["vars"]>;

export type PartialVarsResolver<Payload extends FactoryPayload> = (
  theme: Theme,
  props: Payload["props"],
  ctx: Payload["ctx"],
) => PartialTransformVars<Payload["vars"]>;

export function createVarsResolver<Payload extends FactoryPayload>(resolver: VarsResolver<Payload>) {
  return resolver;
}

export interface ThemeComponent {
  classNames?: any;
  styles?: any;
  vars?: any;
  defaultProps?: any;
}
import React, { createContext, useContext } from "react";

export function createSafeContext<ContextValue>(errorMessage: string) {
  const Context = createContext<ContextValue | null>(null);

  const useSafeContext = () => {
    const ctx = useContext(Context);

    if (ctx === null) {
      throw new Error(errorMessage);
    }

    return ctx;
  };

  const Provider = ({ children, value }: { value: ContextValue; children: React.ReactNode }) => (
    <Context.Provider value={value}>{children}</Context.Provider>
  );

  return [Provider, useSafeContext] as const;
}
