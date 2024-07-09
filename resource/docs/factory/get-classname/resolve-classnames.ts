import { cnx } from "@/modules/utility";
import { Theme } from "../factory-types";
import { _ClassNames } from "./get-classname";

export interface ResolveClassNamesInput {
  theme: Theme;
  classNames: _ClassNames;
  props: Record<string, any>;
  stylesCtx: Record<string, any> | undefined;
}

const EMPTY_CLASS_NAMES: Partial<Record<string, string>> = {};

function mergeClassNames(objects: Partial<Record<string, string>>[]) {
  const merged: Partial<Record<string, string>> = {};

  objects.forEach((obj) => {
    Object.entries(obj).forEach(([key, value]) => {
      if (merged[key]) {
        merged[key] = cnx(merged[key], value);
      } else {
        merged[key] = value;
      }
    });
  });

  return merged;
}

export function resolveClassNames({ theme, classNames, props, stylesCtx }: ResolveClassNamesInput) {
  const arrayClassNames = Array.isArray(classNames) ? classNames : [classNames];
  const resolvedClassNames = arrayClassNames.map((item) =>
    typeof item === "function" ? item(theme, props, stylesCtx) : item || EMPTY_CLASS_NAMES,
  );

  return mergeClassNames(resolvedClassNames);
}
