"use client";
import * as React from "react";
import { createPortal } from "react-dom";

export function createSafeContext<ContextValue>(errorMessage: string) {
  const Context = React.createContext<ContextValue | null>(null);
  const useSafeContext = () => {
    const ctx = React.useContext(Context);
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

type Components = (string | false | React.JSXElementConstructor<any>)[];

export const modifyChildren = (children: React.ReactNode, components: Components, props: any): React.ReactNode => {
  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;

    if (components.includes(child.type)) {
      return React.cloneElement(child, { ...props });
    }

    return child;
  });
};

export const hasSpecificChildren = (children: React.ReactNode, components: Components): boolean => {
  return React.Children.toArray(children).some((child) => {
    const isChild = React.isValidElement(child) && child.type;
    return components.includes(isChild);
  });
};

/**
export type CssVariable = `--${string}`;
export type TransformVars<V> = {
  [Key in keyof V]: V[Key] extends CssVariable ? Record<V[Key], string | undefined> : never;
};
export type VarsResolver<Payload extends FactoryPayload> = (
  props: Payload["props"],
  ctx: Payload["ctx"],
) => TransformVars<Payload["vars"]>;
export interface FactoryPayload {
  ref?: any;
  props: Record<string, any>;
  ctx?: any;
  stylesNames?: string;
  vars?: any;
  staticComponents?: Record<string, any>;
  // Compound components cannot have classNames, styles and vars on Provider
  compound?: boolean;
}

export function createVarsResolver<Payload extends FactoryPayload>(resolver: VarsResolver<Payload>) {
  return resolver;
}
 */
