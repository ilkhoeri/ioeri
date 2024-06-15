// "use client";

import fs from "fs-extra";
const defaultText = fs.readFileSync("md/markdown.md", "utf-8");

import { useEffect, useState } from "react";



export async function HooksPage() {
  // const file = await fs.readFile(process.cwd() + "/md/markdown.md", "utf8");
  // const data = JSON.parse(file);

  return <div>{defaultText}</div>;
}
