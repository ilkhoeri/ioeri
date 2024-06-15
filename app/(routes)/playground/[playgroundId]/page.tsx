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

export default async function Page() {
  try {
    // const [edit, code, css] = await Promise.all([
    //   fs.readFile(process.cwd() + "/md/markdown.md", "utf-8"),
    //   fs.readFile(process.cwd() + "/modules/utils/formatter/mardown-text.ts", "utf-8"),
    //   fs.readFile(process.cwd() + "/modules/utils/formatter/markdown.css", "utf-8"),
    // ]);

    const text = await fs.readFile(process.cwd() + "/modules/utils/formatter/mardown-text.ts", "utf-8");

    return (
      <Article>
        <TitlePageID title="Markdown Editor" />
        <MarkdownEditor edit={text} code={text} css={text} />
      </Article>
    );
  } catch (error) {
    console.error("Error reading files:", error);
    return (
      <Article>
        <TitlePageID title="Error" />
        <p>There was an error loading the markdown editor.</p>
      </Article>
    );
  }
}
