import { Metadata } from "next";
import { Article } from "@/components/ui/component";
import { TitlePageID } from "@/components/clients/title-page";
import { MarkdownEditor } from "../playground-markdown-editor";
import { getMdFile } from "@/script/read-md-file";
// import { notFound } from "next/navigation";
// import { getPath } from "@/script/get-path";
import path from "node:path";
import fs from "fs-extra";

// type Params = { params: { playgroundId: string } };
interface Params {
  params: {
    [key: string]: string;
  };
}

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

export default async function Page() {
  const [edit, css, code] = await Promise.all([
    fs.readFile(path.join(process.cwd(), "/md/markdown.md"), "utf-8"),
    fs.readFile(path.join(process.cwd(), "/modules/utils/formatter/markdown.css"), "utf-8"),
    getMdFile("modules/utils/formatter/markdown-text.ts"),
  ]);

  return (
    <Article>
      <TitlePageID title="Markdown Editor" />

      <MarkdownEditor edit={edit} code={code} css={css} />
    </Article>
  );
}
