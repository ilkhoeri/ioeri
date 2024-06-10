import { forwardRef } from "react";
import { FactoryPayload, StaticComponents, ThemeExtend, identity, ComponentClasses } from "./factory";
import React from "react";

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
