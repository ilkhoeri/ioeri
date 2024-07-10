import React from "react";
import { Variant } from "../utility";

export type Factory<Payload extends FactoryPayload> = Payload;
export type PolymorphicFactory<Payload extends PolymorphicFactoryPayload> = Payload;

type ExtendedProps<Props = {}, OverrideProps = {}> = OverrideProps & Omit<Props, keyof OverrideProps>;

type ElementType = keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>;

type PropsOf<C extends ElementType> = JSX.LibraryManagedAttributes<C, React.ComponentPropsWithoutRef<C>>;

type ComponentProp<C> = {
  component?: C;
};

type InheritedProps<C extends ElementType, Props = {}> = ExtendedProps<PropsOf<C>, Props>;

export type PolymorphicRef<C> = C extends React.ElementType ? React.ComponentPropsWithRef<C>["ref"] : never;

export type PolymorphicComponentProps<C, Props = {}> = C extends React.ElementType
  ? InheritedProps<C, Props & ComponentProp<C>> & {
      ref?: PolymorphicRef<C>;
      renderRoot?(props: any): any;
    }
  : Props & { component: React.ElementType; renderRoot?(props: Record<string, any>): any };

export function createPolymorphicComponent<ComponentDefaultType, Props, StaticComponents = Record<string, never>>(
  component: any,
) {
  type ComponentProps<C> = PolymorphicComponentProps<C, Props>;

  type _PolymorphicComponent = <C = ComponentDefaultType>(props: ComponentProps<C>) => React.ReactElement;

  type ComponentProperties = Omit<React.FunctionComponent<ComponentProps<any>>, never>;

  type PolymorphicComponent = _PolymorphicComponent & ComponentProperties & StaticComponents;

  return component as PolymorphicComponent;
}

export interface PolymorphicFactoryPayload extends FactoryPayload {
  defaultComponent: any;
  defaultRef: any;
}

export interface FactoryPayload {
  props: Record<string, any>;
  ctx?: any;
  ref?: any;
  stylesNames?: string;
  vars?: any;
  variant?: string;
  staticComponents?: Record<string, any>;
  // Compound components cannot have classNames, styles and vars on Provider
  compound?: boolean;
}

type ResolveStyle = CSSProperties | ((theme: Theme) => CSSProperties);
export type GetStyleProp = ResolveStyle | ResolveStyle[] | GetStyleProp[] | undefined;

export interface GetStylesApiOptions {
  id?: string;
  className?: string;
  style?: StyleProp;
  focusable?: boolean;
  active?: boolean;
  classNames?: ClassNames<{ props: any; stylesNames: string }>;
  styles?: Styles<{ props: any; stylesNames: string }>;
  variant?: string;
  props?: Record<string, any>;
  attrs?: Record<string, string | undefined>;
  // open?: boolean;
  // modal?: boolean;
  // defaultOpen?: boolean;
}

export type StylesApiRecord<Payload extends FactoryPayload, DataType> = Payload["compound"] extends true
  ? Payload["stylesNames"] extends string
    ? StylesRecord<Payload["stylesNames"], DataType>
    : never
  : Payload["stylesNames"] extends string
    ?
        | StylesRecord<Payload["stylesNames"], DataType>
        | ((
            theme: Theme,
            props: Payload["props"],
            ctx: Payload["ctx"],
          ) => StylesRecord<Payload["stylesNames"], DataType>)
    : never;

export type Styles<Payload extends FactoryPayload> = StylesApiRecord<Payload, CSSProperties>;
export type ClassNames<Payload extends FactoryPayload> = StylesApiRecord<Payload, string>;
export type ClassNamesArray<Payload extends FactoryPayload> = (StylesApiRecord<Payload, string> | undefined)[];

export type StylesRecord<StylesNames extends string, Payload> = Partial<Record<StylesNames, Payload>>;

export interface StylesApiProps<Payload extends FactoryPayload> {
  unstyled?: boolean;
  variant?: Payload["variant"] extends string ? Payload["variant"] | (string & {}) : string;
  classNames?: ClassNames<Payload>;
  styles?: Styles<Payload>;
  className?: string;
  style?: CSSProperties;
  vars?: PartialVarsResolver<Payload>;
}

export interface CompoundStylesApiProps<Payload extends FactoryPayload> extends StylesApiProps<Payload> {}

export type ElementProps<ElementType extends React.ElementType, PropsToOmit extends string = never> = Omit<
  React.ComponentPropsWithoutRef<ElementType>,
  "style" | PropsToOmit
>;

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

export interface ThemeComponent {
  classNames?: any;
  styles?: any;
  vars?: any;
  defaultProps?: any;
}

export type DataAttributes = Record<`data-${string}`, any>;

export interface ExtendCompoundComponent<Payload extends FactoryPayload> {
  defaultProps?: Partial<Payload["props"]> & DataAttributes;
}

export interface ExtendsRootComponent<Payload extends FactoryPayload> {
  defaultProps?: Partial<Payload["props"]> & DataAttributes;
  classNames?: ClassNames<Payload>;
  styles?: Styles<Payload>;
  vars?: PartialVarsResolver<Payload>;
}

export type ExtendComponent<Payload extends FactoryPayload> = Payload["compound"] extends true
  ? ExtendCompoundComponent<Payload>
  : ExtendsRootComponent<Payload>;

export type StaticComponents<Input> = Input extends Record<string, any> ? Input : Record<string, never>;

export interface ThemeExtend<Payload extends FactoryPayload> {
  extend: (input: ExtendComponent<Payload>) => ThemeComponent;
}

export type ComponentClasses<Payload extends FactoryPayload> = {
  classes: Payload["stylesNames"] extends string
    ? (variant?: Variant<{ selector: { [key: string]: string } }>) => string
    : never;
};

export type ComponentStaticProperties<Payload extends FactoryPayload> = ThemeExtend<Payload> &
  ComponentClasses<Payload> &
  StaticComponents<Payload["staticComponents"]>;

export type Component<Payload extends FactoryPayload> = React.ForwardRefExoticComponent<
  Payload["props"] & React.RefAttributes<Payload["ref"]>
> &
  ComponentStaticProperties<Payload>;

export type FilterPropsRes<T extends Record<string, any>> = {
  [Key in keyof T]-?: T[Key] extends undefined ? never : T[Key];
};

export interface UseStyles<Payload extends FactoryPayload> {
  name: string | (string | undefined)[];
  classes: Payload["stylesNames"] extends string
    ? (variant?: Variant<{ selector: { [key: string]: string } }>) => string
    : never;
  // classes: Payload["stylesNames"] extends string ? Record<string, string> : never;
  props: Payload["props"];
  stylesCtx?: Payload["ctx"];
  className?: string;
  style?: GetStyleProp;
  rootSelector?: Payload["stylesNames"];
  unstyled?: boolean;
  classNames?: ClassNames<Payload> | ClassNamesArray<Payload>;
  styles?: Styles<Payload>;
  classNamesPrefix?: string;
  // attrs?: Record<string, string | undefined>;
  // open?: boolean;
  // modal?: boolean;
  // defaultOpen?: boolean;
}

export type GetStylesApi<Payload extends FactoryPayload> = (
  selector: NonNullable<Payload["stylesNames"]>,
  options?: GetStylesApiOptions,
) => {
  className: string;
  style: CSSProperties;
};

export type AnchorTargets = {
  /**
   * Target property **`<a>`** :
   *
   * `Please note that some target values may behave differently depending on configuration and browser used.`
   *
   * **`_self`** : Opens the link in the same window or frame.
   *
   * **`_blank`** : Opens the link in a new window or tab.
   *
   * **`_parent`** : Opens the link in the parent frame (if any).
   *
   * **`_top`** : Opens the link at the very top of the window (closes all frames if any).
   *
   * **`_search`** : Used to search for specific text on the intended page.
   *
   * **`_media`** : Used to indicate specific media content (for example, audio or video).
   *
   * **`_messaging`** : Used to communicate with a specific message channel.
   *
   * **`_email`** : Used to open the default email program with the specified email address.
   *
   * **`_ftp`** : Used to open an FTP program with the specified address.
   *
   * **`_tel`** : Used to open the phone application with the specified phone number.
   *
   * **`_sms`** : Used to open the text messaging application with the specified phone number.
   *
   * **`_file`** : Used to open local files on the user's system.
   *
   * **`_about`** : Used to open information about the intended page.
   *
   * **`_calendar`** : Opens the default calendar application with the specified events.
   *
   * **`_contacts`** : Opens the default contacts application with the specified contact.
   *
   * **`_noopener`** : Opens a link by not allowing the target link to access window.opener on the intended page.
   *
   * **`_noreferrer`** : Opens a link by not sending an HTTP referer to the intended page.
   *
   * **`_external`** : A special value that can be specified by a custom implementation to open a link to an external context or a custom application.
   */
  target?:
    | "_about"
    | "_blank"
    | "_calendar"
    | "_contacts"
    | "_email"
    | "_external"
    | "_file"
    | "_ftp"
    | "_media"
    | "_messaging"
    | "_noopener"
    | "_noreferrer"
    | "_parent"
    | "_search"
    | "_self"
    | "_sms"
    | "_tel"
    | "_top"
    | (string & NonNullable<unknown>);
};
