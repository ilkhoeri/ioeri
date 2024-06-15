export { cnx, getCSX } from "./cnx";
export type { ClassValue, ClassDictionary, ClassArray, CSXType } from "./cnx";

export { attr, extendedAttr, getStyleObject } from "./record-types";

export type {
  RecordNested,
  RecordNestedString,
  RecordString,
  RecordNumber,
  RecordBoolean,
  RecordClasses,
  RecordStyles,
  CSSProperties,
  CssVariable,
  CssVariables,
  CssVars,
  CssVarsProp,
  StyleProp,
  RecordElements,
  StyleObject,
  AttrType,
  ExtendedAttrType,
} from "./record-types";

export {
  capitalizeFirst,
  capitalizeString,
  capitalizeWords,
  getFirstString,
  lowerCasePunctuation,
  lowerCaseWords,
  sanitizedWord,
  sanitizedToTag,
  sanitizedName,
  truncate,
  camelToKebab,
  sanitizedToParams,
  desanitizeFromParams,
  desanitizeParams,
} from "./text-transform";

export { markdownText } from "./formatter/markdown-text";
export { parseText, processParseText } from "./formatter/parse-text";
export { convertBytesToMB } from "./formatter/bytes";
export { formatPrice, formatterIDR, formatterIDRK, formatterLong } from "./formatter/currency";
export { getTimeAgo, getTimeInterval, longStringDate, sortStringDate, getPostDate } from "./formatter/time";

export { fuzzySearch, levenshteinDistance, levenshteinDistanceIncludes } from "./fuzzy-search";

export { UUID } from "./uuid";

// function - placeholder - others
export const PLACEHOLDER_IMAGESRC = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D";
