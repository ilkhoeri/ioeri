import React, { createContext, forwardRef, useContext } from "react";
import { createPortal } from "react-dom";

import type {
  Component,
  ComponentClasses,
  FactoryPayload,
  FilterPropsRes,
  GetStylesApi,
  PolymorphicComponentProps,
  PolymorphicFactoryPayload,
  StaticComponents,
  Theme,
  ThemeExtend,
  UseStyles,
  VarsResolver,
} from "./factory-types";
import { getStyle } from "./get-style/get-style";
import { getAttrs, getId } from "./factory-utils";
import { getClassName } from "./get-classname/get-classname";

export function identity<T>(value: T): T {
  return value;
}

export function factory<Payload extends FactoryPayload>(
  ui: React.ForwardRefRenderFunction<Payload["ref"], Payload["props"]>,
) {
  const Component = forwardRef(ui) as Component<Payload>;

  Component.extend = identity as any;

  return Component as Component<Payload>;
}

export function filterProps<T extends Record<string, any>>(props: T) {
  return Object.keys(props).reduce<FilterPropsRes<T>>((acc, key: keyof T) => {
    if (props[key] !== undefined) {
      acc[key] = props[key];
    }
    return acc;
  }, {} as FilterPropsRes<T>);
}

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

export function createVarsResolver<Payload extends FactoryPayload>(resolver: VarsResolver<Payload>) {
  return resolver;
}
export function createSafeContext<ContextValue>(errorMessage: string) {
  const Context = createContext<ContextValue | null>(null);

  const useSafeContext = () => {
    const ctx = useContext(Context);

    if (ctx === null) {
      throw new Error(errorMessage);
    }

    return { ...ctx, Portal };
  };

  const Provider = ({ children, value }: { value: ContextValue; children: React.ReactNode }) => (
    <Context.Provider value={value}>{children}</Context.Provider>
  );

  return [Provider, useSafeContext] as const;
}

interface PortalProps {
  render: boolean;
  children: React.ReactNode;
  container?: Element | DocumentFragment | null;
  key?: null | string;
}
export function Portal(_props: PortalProps) {
  const { render, children, container, key } = _props;
  if (typeof document === "undefined" || !render) return null;
  return createPortal(children, container || document.body, key);
}

export function polymorphicFactory<Payload extends PolymorphicFactoryPayload>(
  ui: React.ForwardRefRenderFunction<Payload["defaultRef"], Payload["props"]>,
) {
  type ComponentProps<C> = PolymorphicComponentProps<C, Payload["props"]>;

  type _PolymorphicComponent = <C = Payload["defaultComponent"]>(props: ComponentProps<C>) => React.ReactElement;

  type ComponentProperties = Omit<React.FunctionComponent<ComponentProps<any>>, never>;

  type PolymorphicComponent = _PolymorphicComponent &
    ComponentProperties &
    ThemeExtend<Payload> &
    ComponentClasses<Payload> &
    StaticComponents<Payload["staticComponents"]>;

  const Component = forwardRef(ui) as unknown as PolymorphicComponent;

  Component.extend = identity as any;

  return Component as PolymorphicComponent;
}

export const ThemeContext = createContext<Theme | null>(null);

export const useSafeTheme = () => useContext(ThemeContext);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  return ctx;
}

export function useProps<T extends Record<string, any>, U extends Partial<T> = {}>(
  component: string,
  defaultProps: U,
  props: T,
): T & {
  [Key in Extract<keyof T, keyof U>]-?: U[Key] | NonNullable<T[Key]>;
} {
  const theme = useTheme();
  const contextPropsPayload = theme?.components[component]?.defaultProps;
  const contextProps = typeof contextPropsPayload === "function" ? contextPropsPayload(theme) : contextPropsPayload;

  return { ...defaultProps, ...contextProps, ...filterProps(props) };
}

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
    ...getAttrs({
      selector,
    }),
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
