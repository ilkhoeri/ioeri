import { cnx } from "../../../../utils/cnx";
import { GetStylesApiOptions } from "../../../styles-api.types";
import { Theme } from "@/resource/docs/ondevelopment/factory/transit";

interface GetGlobalClassNamesOptions {
  theme: Theme;
  unstyled: boolean | undefined;
  options: GetStylesApiOptions | undefined;
}

export const FOCUS_CLASS_NAMES = {
  always: "focus-always",
  auto: "focus-auto",
  never: "focus-never",
} as const;

/** Returns classes that are defined globally (focus and active styles) based on options */
export function getGlobalClassNames({ theme, options, unstyled }: GetGlobalClassNamesOptions) {
  return cnx(
    options?.focusable && !unstyled && theme?.focusClassName,
    options?.active && !unstyled && theme?.activeClassName,
  );
}
