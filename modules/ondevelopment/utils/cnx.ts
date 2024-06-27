import { CSSProperties } from "./record-types";

// export type ClassValue = (string | false | undefined)
export type ClassValue = ClassArray | ClassDictionary | string | number | null | boolean | undefined;
export type ClassDictionary = Record<string, any>;
export type ClassArray = ClassValue[];

/**
 * Memungkinkan menerima lebih dari satu nilaiPertama dan nilaiKedua:
 *- Kami menggunakan rest parameter `...additionalClassNames` yang mengizinkan lebih dari satu argumen untuk nilaiKedua.
 *- Dengan demikian, Anda dapat menggunakan fungsi **`cnx`** dengan memberikan banyak nilaiPertama dan nilaiKedua, seperti dalam contoh berikut:
  ```js
  const className = cnx(
    ['class_root', `variant-${variant}`, `size-${props.size}`, !(variant === 'unstyled') && classes.root],
    classNames?.root,
    className
  );
  ...
  * // Contoh dengan banyak nilaiPertama dan nilaiKedua
  * <div className={cnx(['class1', 'class2'], classNames?.root, className, `additionalClass`, `additionalClass`)} />

  // Contoh penggunaan di komponen induk
  * <ModuleComponent className="h-6 w-6" />
  * <ModuleComponent className={['h-6', 'w-6']} />
  ```
 *- Dengan ini, fungsi cnx dapat menerima lebih dari satu nilaiPertama dan nilaiKedua untuk menggabungkan kelas-kelas dengan lebih fleksibel.
 *>
 */

export function cnx(...inputs: ClassValue[]): string {
  const classes: string[] = [];

  inputs.forEach((input) => {
    if (!input) return;

    if (typeof input === "string" || typeof input === "number") {
      classes.push(String(input));
    } else if (Array.isArray(input)) {
      classes.push(cnx(...input));
    } else if (typeof input === "object") {
      for (const [key, value] of Object.entries(input)) {
        if (value) classes.push(key);
      }
    }
  });

  return classes.join(" ");
}

export type CSXType = { className?: string | string[]; style?: CSSProperties };
/**
 * @usage
 *  // without className
 * ```js
 * <div {...getCSX()}>
 * ```
 *  // with className & style
 * ```js
 * <div {...getCSX("bg-white font-bold", {"--color": "black"})}>
 * ```
 */
export function getCSX(
  className?: (string | string[] | false | undefined) | (string | string[] | false | undefined)[],
  style?: CSSProperties,
  ...additionalClassNames: (string | false | undefined | null)[]
) {
  let classNamesArray = Array.isArray(className) ? className : [className];

  classNamesArray = classNamesArray.filter((className) => typeof className === "string");

  const combinedClassNames = [...classNamesArray];

  additionalClassNames.forEach((classes) => {
    if (className && classes) {
      combinedClassNames.push(classes);
    }
  });

  return { className: combinedClassNames.join(" ") || undefined, style };
}
