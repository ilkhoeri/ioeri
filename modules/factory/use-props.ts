import { createContext, useContext } from "react";
import { filterProps } from "./filter-props";
import { Theme } from "./transit";

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

