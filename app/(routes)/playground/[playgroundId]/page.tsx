import { Metadata } from "next";
import { Article } from "@/components/ui/component";
import { TitlePageID } from "@/components/clients/title-page";
import { MarkdownEditor } from "../playground-markdown-editor";
// import { notFound } from "next/navigation";

import fs from "fs-extra";

type Params = { params: { playgroundId: string } };

// export const fetchCache = "only-no-store";

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const url = process.env.NEXT_PUBLIC_DOMAIN_URL;
  const slug = "Markdown Editor";
  const namePage = "Markdown Editor | Playground";
  return {
    title: namePage ? namePage : "NotFound!",
    description: namePage,
    openGraph: {
      title: namePage || "NotFound!",
      description: namePage || "NotFound!",
      url: url + "/" + slug,
      locale: "id-ID",
      type: "website",
    },
  };
}

export default async function Page({ params }: Params) {
  const [edit, code, css] = await Promise.all([
    fs.readFile(process.cwd() + "/md/markdown.md", "utf-8"),
    fs.readFile(process.cwd() + "/modules/utils/formatter/mardown-text.ts", "utf-8"),
    fs.readFile(process.cwd() + "/modules/utils/formatter/markdown.css", "utf-8"),
  ]);
  // const data = JSON.parse(file);
  return (
    <Article>
      <TitlePageID title="Markdown Editor" />

      <MarkdownEditor edit={edit} code={code} css={css} />
    </Article>
  );
}
