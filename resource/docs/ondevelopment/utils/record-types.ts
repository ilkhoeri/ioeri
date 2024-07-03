export type RecordElements<T extends string> = {
  /** @default div */
  el?: Partial<Record<T, React.ElementType>>;
};
/**
 * ```ts
 * // usage:
 * type Education = "school" | "notes" | "registered" | "graduated";
 * export type EducationsColumn = RecordString<Education> & {
 * isNew?: boolean;
 * };

 * // result:
 * type EducationsColumn = {
 *   school?: string | undefined;
 *   notes?: string | undefined;
 *   registered?: string | undefined;
 *   graduated?: string | undefined;
 * } & {
 *   isNew?: boolean;
 * };
 * ```
 */
export type RecordString<T extends string> = Partial<Record<T, string>>;

/**
 * ```ts
 * // usage:
 * type FieldType = "price" | "quantity";
 * export type Columns = RecordNumber<FieldType> & {
 * isNew?: boolean;
 * };

 * // result:
 * type Columns = {
 *   price?: number | undefined;
 *   quantity?: number | undefined;
 * } & {
 *   isNew?: boolean;
 * };
 * ```
 */
export type RecordNumber<T extends string> = Partial<Record<T, number>>;

/**
 * ```ts
 * // usage:
 * type FieldType = "isNew" | "isArchived";
 * export type Columns = RecordBoolean<FieldType> & { isNew?: boolean };

 * // result:
 * type Columns = {
 *   isNew?: boolean | undefined;
 *   isArchived?: boolean | undefined;
 * } & {
 *   isNew?: boolean;
 * };
 * ```
 */
export type RecordBoolean<T extends string> = Partial<Record<T, boolean>>;

/**
 ```ts
 * type MyComponentProps = RecordNestedString<"U", "T1" | "T2", P>;
 * type MyComponentProps = {
 *   U?: {
 *     T1?: string;
 *     T2?: string;
 *   } & P;
 * }

 * // Jadi, jika kita menggunakan:
 * type ExtendsData = {
 *   images?: {
 *       url: string;
 *   }[] | undefined;
 * }
 * type MyComponentProps = RecordNested<"property", "className" | "color", ExtendsData>;
 * // dapat juga dibaca:
 * type MyComponentProps = {
 *   property?: {
 *     color?: string;
 *     className?: string;
 *   } & {
 *     images?: {
 *         url: string;
 *     }[] | undefined;
 *   };
 * }
  ```

  ```js
 * return
 *   <Image
 *    src={property?.images?.[0]?.url}
 *    className={property?.className}
 *    style={{ color: property?.color }}
 *   />
 * ```
 */
export type RecordNested<U extends string, T extends string, P = Record<string, unknown>> = {
  [K in U]?: (Partial<Record<T, string>> & P) | undefined;
};

/**
 *- `RecordNestedString` adalah sebuah generic type yang menerima dua parameter: `U` dan `T`.
 *- `U` adalah tipe string tunggal yang digunakan sebagai kunci objek.
 *- `T` adalah tipe string tunggal atau gabungan dari beberapa tipe string yang dipisahkan oleh operator `|`.
 *- `Record<U, Partial<Record<T, string>>>` menciptakan sebuah objek di mana setiap kunci adalah dari tipe `U`, dan setiap `T` adalah nilai objek.
 *- `Partial<Record<T, string>>` menciptakan sebuah objek di mana setiap kunci dari tipe `T` memiliki nilai bertipe string atau bisa juga tidak memiliki nilai sama sekali karena menggunakan Partial.
 *- `?` setelah `[K in U]` membuat setiap properti menjadi opsional.
 ```ts
 * type MyComponentProps = RecordNestedString<"U", "T1" | "T2">;
 * type MyComponentProps = {
 *   U?: {
 *     T1?: string;
 *     T2?: string;
 *   };
 * }

 * // Jadi, jika kita menggunakan:
 * type MyComponentProps = RecordNestedString<"someProperty", "color" | "size">;
 * // dapat juga dibaca:
 * type MyComponentProps = {
 *   someProperty?: {
 *     color?: string;
 *     size?: string;
 *   };
 * }

 * // atau
  type MyComponentProps = RecordNestedString<"firstProperty" | "secondProperty", "color" | "size">;
 * // dapat juga dibaca:
 * type MyComponentProps = {
 *   firstProperty?: {
 *     color?: string;
 *     size?: string;
 *   };
 *   secondProperty?: {
 *     color?: string;
 *     size?: string;
 *   };
 * }
  ```
  ```js
 * return <MyComponent someProperty={{ color: 'purple', size: '32px', }} />
 * ```
 */
export type RecordNestedString<U extends string, T extends string> = {
  [K in U]?: Partial<Record<T, string>>;
};

/**
 * ```ts
   // usage
 * type ComponentProps = RecordClasses<'root' | 'wrapper' | 'leftIcon' | 'inner' | 'rightIcon'>;
   *
   // or
   type Componentrees = 'root' | 'wrapper' | 'leftIcon' | 'inner' | 'rightIcon';
   type ComponentProps = RecordClasses<Componentrees>;
   *
   *
 * ```
 */

export type RecordClasses<T extends string> = {
  classNames?: Partial<Record<T, string>>;
} & {
  className?: string;
};

// export const attr: { [key: string]: string | boolean | number | readonly string[] | undefined } = {};
// export const attr: { [key: string]: any } = {};

/**
 * ```ts
   // usage
 * type ComponentProps = RecordStyles<'root' | 'wrapper' | 'leftIcon' | 'inner' | 'rightIcon'>;
   *
   // or
   type Componentrees = 'root' | 'wrapper' | 'leftIcon' | 'inner' | 'rightIcon';
   type ComponentProps = RecordStyles<Componentrees>;
   *
   *
 * ```
 */
export type RecordStyles<T extends string> = {
  styles?: Partial<Record<T, CSSProperties>>;
} & {
  style?: CSSProperties;
};

export type StyleObject = { [key: string]: string };

export interface CSSProperties extends React.CSSProperties {
  [key: string]: any;
}

type Style = CSSProperties | (() => CSSProperties);
export type StyleProp = Style | Style[] | StyleProp[] | undefined;

export type CssVariable = `--${string}`;

export type CssVariables<Variable extends string = CssVariable> = Partial<Record<Variable, string>>;

export type CssVars<Variable extends string = CssVariable> =
  | CssVariables<Variable>
  | (() => CssVariables<Variable>)
  | CssVars<Variable>[];

export type CssVarsProp<Variable extends string = CssVariable> = CssVars<Variable> | CssVars<Variable>[];

export function getStyleObject(style: StyleProp | undefined): React.CSSProperties {
  if (Array.isArray(style)) {
    return [...style].reduce<Record<string, any>>((acc, item) => ({ ...acc, ...getStyleObject(item) }), {});
  }

  if (typeof style === "function") {
    return style();
  }

  if (style == null) {
    return {};
  }

  return style;
}

type Parse_AttrType = string | boolean | number | readonly string[] | undefined;
export type AttrType = React.CSSProperties | Parse_AttrType;
export type ExtendedAttrType = CSSProperties | Parse_AttrType;
export const attr: { [key: string]: AttrType } = {};
export const extendedAttr: { [key: string]: ExtendedAttrType } = {};
