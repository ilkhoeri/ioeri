import { Metadata } from "next";
// import { notFound } from "next/navigation";
import { SectionID } from "@/components/clients/section";
import { TitlePageID } from "@/components/clients/title-page";

import { MarkdownEditor } from "../playground-markdown-editor";

import fs from "fs-extra";
const defaultText = fs.readFileSync("md/markdown.md", "utf-8");

type Params = { params: { playgroundId: string } };

export const fetchCache = "only-no-store";

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
  return (
    <SectionID>
      <TitlePageID title="Markdown Editor" />

      <MarkdownEditor defaultText={defaultText} />
    </SectionID>
  );
}
