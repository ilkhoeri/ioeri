type ExcludeType = "defaultVariants" | "";
type ExcludeUndefined<T> = T extends undefined ? never : T;

export type KeysMap = { [key: string]: { [key: string]: string } };
export type Variant<T extends KeysMap> = { [K in Exclude<keyof T, ExcludeType>]?: keyof T[K] };
export type KeysVariant<T extends KeysMap> = { assign?: string; variants: T; defaultVariants?: Variant<T> };
export type VariantsType<T extends (...keys: any) => any> = Omit<ExcludeUndefined<Parameters<T>[0]>, ExcludeType>;

export function cvx<T extends KeysMap>(keys: KeysVariant<T>) {
  return (variant: Variant<T> = {}) => {
    const mergedVariant = { ...keys.defaultVariants, ...variant } as { [K in keyof T]?: keyof T[K] };
    const variantsValue = Object.keys(mergedVariant)
      .map((key) => keys.variants[key as keyof T][mergedVariant[key as keyof T] as keyof T[keyof T]])
      .join(" ");
    return keys.assign ? [keys.assign, variantsValue].join(" ") : variantsValue;
  };
}
