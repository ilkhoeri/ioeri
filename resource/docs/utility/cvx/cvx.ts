type ExcludeType = "defaultVariants" | "";
type ExcludeUndefined<T> = T extends undefined ? never : T;

export type KeysMap = { [key: string]: { [key: string]: string } };
export type Variant<T extends KeysMap> = { [K in keyof T]?: keyof T[K] };
export type KeysVariant<T extends KeysMap> = { assign?: string; variants: T; defaultVariants?: Variant<T> };
export type VariantsType<T extends (...keys: any) => any> = Omit<ExcludeUndefined<Parameters<T>[0]>, ExcludeType>;
export type InferTypes<T> = T extends (...args: any[]) => infer R ? R : never;

export function cvx<T extends KeysMap>(keys: KeysVariant<T>) {
  return (variant: Variant<T> = {}) => {
    const mergedVariant = { ...keys.defaultVariants, ...variant } as { [K in keyof T]?: keyof T[K] };
    const variantsValue = Object.keys(keys.variants)
      .map((key) => {
        const variantKey = mergedVariant[key as keyof T] || keys.defaultVariants?.[key as keyof T];
        return variantKey ? keys.variants[key as keyof T][variantKey as keyof T[keyof T]] : undefined;
      })
      .filter(Boolean)
      .join(" ");
    return keys.assign ? [keys.assign, variantsValue].join(" ") : variantsValue;
  };
}
