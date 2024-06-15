import { MarkdownEditor } from "../playground-markdown-editor";

import fs from "fs-extra";

export default async function MarkdownEditorRest({ edit }: { edit: string }) {
  const [code, css] = await Promise.all([
    fs.readFile(process.cwd() + "/modules/utils/formatter/mardown-text.ts", "utf-8"),
    fs.readFile(process.cwd() + "/modules/utils/formatter/markdown.css", "utf-8"),
  ]);

  return <MarkdownEditor edit={edit} code={code} css={css} />;
}
