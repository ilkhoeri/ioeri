export function capitalizeString(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * **`capitalizeFirst`** : mengkapitalisasi huruf pertama dari string dan mengubah huruf sisanya menjadi huruf kecil.
 *
 *  Fungsi `capitalizeFirst`:
 *
 * membagi string menjadi kata-kata, kemudian mengkapitalisasi setiap kata menggunakan fungsi capitalizeString, dan menggabungkan kembali kata-kata yang telah dikapitalisasi.
 *
 * `syntax:`
 * ```js
 * const parameter = 'part-time-job-description'
 * const name = typeof parameter === 'string' ? capitalizeFirst(parameter) : parameter
 * ```
 * `result:`
 * ```js
 * Part time job description
 * ```
 */
export function capitalizeFirst(str: string | undefined): string {
  const string = str ?? "---";
  const words = string.split(" ");
  const capitalizedWords = words.map((word) => capitalizeString(word.replace(/-/g, " ")));
  const first = capitalizedWords.join(" ");
  return capitalizeString(first);
}

/**
 * **`capitalizeWords`** : mengkapitalisasi huruf pertama dari string dan mengubah huruf sisanya menjadi huruf kecil.
 *
 *  Fungsi `capitalizeWords`:
 *
 * membagi string menjadi kata-kata, kemudian mengkapitalisasi setiap kata menggunakan fungsi capitalizeString, dan menggabungkan kembali kata-kata yang telah dikapitalisasi.
 *
 * `syntax:`
 * ```js
 * const parameter = 'part-time-job-description'
 * const name = typeof parameter === 'string' ? capitalizeWords(parameter) : parameter
 * ```
 * `result:`
 * ```js
 * Part Time Job Description
 * ```
 */
export function capitalizeWords(str: string | undefined): string {
  const string = str ?? "---";
  const words = string.split("-");
  const capitalizedWords = words.map((word) => capitalizeString(word));
  return capitalizedWords.join(" ");
}

// #

function lowerCaseString(str: string): string {
  return str.charAt(0).toLowerCase() + str.slice(1).toLowerCase();
}
/**
 * **`lowerCaseWords`** : mengkapitalisasi huruf pertama dari string dan mengubah huruf sisanya menjadi huruf kecil.
 *
 *  Fungsi `lowerCaseWords`:
 *
 * lowerCaseWords menerima satu parameter str, dan membagi string menjadi kata-kata dengan menggunakan metode split(' '). Kemudian, setiap kata diubah menjadi huruf kecil menggunakan fungsi lowerCaseString yang didefinisikan sebelumnya, dengan menggunakan metode map. Akhirnya, kata-kata yang sudah diubah menjadi huruf kecil digabungkan kembali dengan spasi menggunakan metode join(' ').
 *
 * `syntax:`
 *
 * const `name` = typeof `parameter` === 'string' ? lowerCaseWords(`parameter`.replace(/-/g, ' ')) : `parameter`
 */
export function lowerCaseWords(str: string): string {
  const words = str.split(" ");
  const lowerCaseWords = words.map((word) => lowerCaseString(word));
  return lowerCaseWords.join(" ");
}

/**
 *```js
  const word = truncate("Mekanisme Seleksi PPPK non guru 2023 beserta aturan yang perlu diperhatikan", 30);
  console.log(word); // Output: Mekanisme Seleksi PPPK non...
 *```
 * @param words ```+ "..."```
 */
export function truncate(word: string, max?: number): string {
  const maxLength = max || 30;
  let slicedWords = word;
  if (slicedWords.length > maxLength) {
    const lastSpaceIndex = slicedWords.lastIndexOf(" ", maxLength);
    slicedWords = slicedWords.substring(0, lastSpaceIndex) + "...";
  }
  return slicedWords;
}

/**
 * Encodes a text string as a valid component of a Uniform Resource Identifier (URI).
 * @param uriComponent A value representing an unencoded URI component.
 */
/**
 * `const hrefAccount =
     typeof account === 'string' ? account.replace(/ /g, '-').toLowerCase() : account;`

  const hrefAccount =
     `/${encodeURIComponent(name?.toLowerCase()?.replace(/ /g, '-') ?? '')}`;
 */

/**
 * function capitalizeString(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
 * export function capitalizeWords(str: string) {
  const words = str.split(' ');
  const capitalizedWords = words.map((word) => capitalizeString(word));
  return capitalizedWords.join(' ');
}
*/

function removePunctuation(str: string): string {
  return str.replace(/[.,'"+[\]{}]/g, "").replace(/[^-=!?\w\s]/g, "");
}

function combineConsecutiveHyphens(str: string): string {
  return str.replace(/-+/g, "-");
}
/**
 * ```js
 * const inputString = 'Saat Pertama Kali KU DengaR! suARAmu, kURASakaN } {} adA seSUaTu yANg aNU ANu dan ANU [ExaMPle]';
 * const stringWithoutPunctuation = removePunctuation(inputString);
 * console.log(stringWithoutPunctuation);
 * // output : "saat-pertama-kali-ku-dengar!-suaramu-kurasakan-ada-sesuatu-yang-anu-anu-dan-anu-example"
 * ```
 * @param str
 * @returns `combineConsecutiveHyphens(punctuationLess)`
 */
export function lowerCasePunctuation(str: string): string {
  const words = str.split(" ");
  const lowerCase = words.map((word) => lowerCaseString(word));
  const withoutPunctuation = lowerCase.map((lower) => removePunctuation(lower));
  const punctuationLess = withoutPunctuation.join("-");
  return combineConsecutiveHyphens(punctuationLess);
}

/**
 * ```js
 * 'Sanitized <'|">[\]{}?/,.`\\%^&~:;*()+$#@!_+= Word'
 *
 * to 'Sanitized-Word'
 * ```
 */
export function sanitizedWord(str: string | undefined): string {
  const string = str ?? "[]{}<>/";
  const w = string.replace(/\s/g, "-");
  const sntz = w.replace(/[<'|">[\]{}?/,.`\\%^&~:;*()+$#@!_+=]/g, "");
  const final = sntz.replace(/-{2,}/g, "-");
  return sanitizedWord(final);
}

/**
 * ```js
 *
 * from 'Sanitized--)*&^^(*&(-Word- to -word'
 * to 'sanitized word-to-word'
 * ```
 */
export function sanitizedName(str: string | undefined): string {
  const string = str ?? ")*&^^(";
  const replaced = string.toLowerCase();
  const sanitized = replaced
    .replace(/[<'|">[\]{}?/,.`\\%^&~:;*()+$#@!_+=]/g, "")
    .replace(/\s{2,}/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/-\s/g, "-")
    .replace(/\s-/g, "-");
  return sanitized;
}

/**
 *```js

const name = "Sanitized--)*&^^(*&(-Word";

const firstName = getFirstString(name);

console.log(firstName); // Output: sanitized-word
  ```
 */
export function sanitizedToParams(str: string | undefined): string {
  const string = str ?? ")*&^^(";
  const replaced = string.toLowerCase().replace(/\s/g, "-");
  const sanitized = replaced.replace(/[<'|">[\]{}?/,.`\\%^&~:;*()+$#@!_+=]/g, "");
  const final = sanitized.replace(/-{2,}/g, "-");
  return final;
}

// Fungsi untuk desanitize parameter URL-friendly ke format asli title
export function desanitizeFromParams(param: string): string {
  return param
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
    .replace(/_/g, " ");
}

export function desanitizeParams(sanitizedTitle: string): string {
  // Ganti '-' dengan spasi dan kapitalisasi kata pertama setiap kata (kecuali kata sambung umum)
  const commonWords = ["dan", "dari", "ke", "di", "yang", "untuk"];
  return sanitizedTitle
    .split("-")
    .map((word) => (commonWords.includes(word) ? word : word.charAt(0).toUpperCase() + word.slice(1)))
    .join(" ");
}

export function sanitizedToTag(str: string | undefined): string {
  const string = str ?? ")*&^^(";
  const replaced = string.replace(/\s/g, "_");
  const sanitized = replaced.replace(/[<'|">[\]{}?/,.`\\%^&~:;*()+$#@!+=]/g, "");
  const final = sanitized.replace(/-{2,}/g, "_").replace(/_{2,}/g, "_");
  return final;
}

/**
 *```js
  function getFirstString(name) {
    // Membagi nama berdasarkan spasi atau karakter pemisah lainnya
    const nameParts = name.split(/\s|[-~]/);
    // Mengambil bagian pertama dari array
    const firstName = nameParts[0];
    return firstName;
  }

  const name1 = "ioeri tra lala - tri - ~ lili";
  const name2 = "abdurrahman jalaluddin el khoeri";

const firstName1 = getFirstString(name1);
const firstName2 = getFirstString(name2);

console.log(firstName1); // Output: ioeri
console.log(firstName2); // Output: abdurrahman
  ```
 */

export function getFirstString(name: string) {
  const nameParts = name.split(/\s|[-~]/);
  const firstName = nameParts[0];
  return firstName;
}

/**
 * ```js
// Contoh penggunaan
const input = "actionsSelectList-0a";
const output = camelToKebab(input);
console.log(output); // Output: actions-select-list-0a
 * ```
 */
export function camelToKebab(n: string): string {
  if (n === undefined) {
    return "";
  }
  return n.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

export function kebabToCamelCase(str: string): string {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

export function toPascalCase(str: string) {
  return str
    .split("-") // Memisahkan string berdasarkan tanda hubung
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Mengubah huruf pertama setiap kata menjadi huruf besar
    .join(""); // Menggabungkan kembali kata-kata tanpa tanda hubung
}

// Contoh penggunaan
// const kebabCaseString = "animation-text-spiral";
// const pascalCaseString = toPascalCase(kebabCaseString);
