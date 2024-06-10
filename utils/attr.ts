import * as React from "react";

type Parse_AttrType = string | boolean | number | readonly string[] | undefined;
export type AttrType = React.CSSProperties | Parse_AttrType;

export const attr: { [key: string]: AttrType } = {};

// export const attr: { [key: string]: string | boolean | number | readonly string[] | undefined } = {};
// export const attr: { [key: string]: any } = {};
