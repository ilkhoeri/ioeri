import { Variant } from "@/modules/utility";
import { GetStylesApiOptions } from "../factory-types";

interface GetVariantClassNameInput {
  options: GetStylesApiOptions | undefined;
  classes: (variant?: Variant<{ selector: { [key: string]: string } }>) => string;
  selector: string;
  unstyled: boolean | undefined;
}

/** Returns variant className, variant is always separated from selector with `--`, for example, `tab--default` */
export function getVariantClassName({ options, classes, selector, unstyled }: GetVariantClassNameInput) {
  // return options?.variant && !unstyled ? classes.variant.as[`${selector}--${options.variant}`] : undefined;
  return options?.variant && !unstyled ? classes({ selector }) : undefined;
}
