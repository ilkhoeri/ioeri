/**
 sample:
```
  type MyComponentProps = RecordNestedString<'size' | 'color', 'customStyles'>;

  const MyComponent = (props: MyComponentProps) => {
    // props.customStyles akan berisi nilai
    Partial<Record<'size' | 'color', string>>
    // Contoh: Mengakses nilai customStyles untuk properti 'size'
    const sizeStyle = props.customStyles?.size;
    // Contoh: Mengakses nilai customStyles untuk properti 'color'
    const colorStyle = props.customStyles?.color;
    // Contoh: menggunakan properti customStyles
    customStyles={{ color: 'purple', size: '32px', }}
  ```
  };
 */
export type RecordNestedString<T extends string, U extends string> = {
  [K in U]?: Partial<Record<T, string>>;
};

/**
 * RecordClasses : Partial<Record<T, string>>,
 *- all properties in the className will be considered as options (can be undefined).
 *- allows to provide or not provide value for each property without error.
 * ```js
   // usage example
   *
   import { RecordClasses } from './RecordClasses';
   *
 * type ComponentProps = RecordClasses<'root' | 'wrapper' | 'leftIcon' | 'inner' | 'rightIcon'>;
   *
   // or
   type Componentrees =
   | 'root'
   | 'wrapper'
   | 'leftIcon'
   | 'inner'
   | 'rightIcon';
   type SomeOtherComponentProps = RecordClasses<Componentrees>;
   *
   *
 * ```
 */

export type RecordClasses<T extends string> = {
  classNames?: Partial<Record<T, string>>;
} & {
  className?: string;
};

export type StyleObject = { [key: string]: string };

export interface CSSProperties extends React.CSSProperties {
  [key: string]: any;
}

/** ### RecordStyles : Partial<Record<T, CSSProperties>>,
 *- all properties in style will be considered as options (can be undefined).
 *- allows to provide or not provide value for each property without error.
 * ```js
   // usage example
   import { RecordStyles } from './RecordStyles';
   *
 * type ComponentProps = RecordStyles<'root' | 'wrapper' | 'leftIcon' | 'inner' | 'rightIcon'>;
   *
   // or
   type Componentrees =
   | 'root'
   | 'wrapper'
   | 'leftIcon'
   | 'inner'
   | 'rightIcon';
   type SomeOtherComponentProps = RecordStyles<Componentrees>;
   *
   *
 * ```
 */
export type RecordStyles<T extends string> = {
  styles?: Partial<Record<T, CSSProperties>>;
} & {
  style?: CSSProperties;
};

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
