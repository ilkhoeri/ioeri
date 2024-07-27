import fs from "fs";
import path from "path";
import dynamic from "next/dynamic";

interface DocsParams {
  params: {
    docs: string[];
  };
}

export function readdirPrefix(has: "readdir" | "prefix", params: string[]): string {
  switch (has) {
    case "readdir":
      return params.slice(0, -1).join("/");
    case "prefix":
      return params.slice(-1)[0];
  }
}

export function getFilesWithPrefixWithExtension({ params }: DocsParams) {
  const files = fs.readdirSync(`resource/_docs_demo/${readdirPrefix("readdir", params.docs)}`);
  return files.filter((file) => file.startsWith(readdirPrefix("prefix", params.docs)));
}


export function getFilesWithPrefix({ params }: DocsParams): string[] {
  const directoryPath = `resource/_docs_demo/${readdirPrefix("readdir", params.docs)}`;
  const prefix = readdirPrefix("prefix", params.docs);
  const files = fs.readdirSync(directoryPath);
  return files
    .filter((file) => file.startsWith(prefix) && file.endsWith(".tsx"))
    .map((file) => file.replace(".tsx", ""));
}