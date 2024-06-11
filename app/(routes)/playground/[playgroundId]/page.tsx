import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogByID } from "@/connections/get-blog";
import { SectionID } from "@/components/clients/section";
import { TitlePageID } from "@/components/clients/title-page";

import { MarkdownEditor } from "@/components/clients/pages/playground-markdown-editor";

type Params = { params: { playgroundId: string } };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const page = await getBlogByID(params.playgroundId);
  const url = process.env.NEXT_PUBLIC_DOMAIN_URL;
  const slug = page?.id;
  const namePage = page?.title;
  return {
    title: namePage ? namePage.slice(0, 30) : "NotFound!",
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
  const data = await getBlogByID(params.playgroundId);

  if (!data) {
    notFound();
  }
  return (
    <SectionID>
      <TitlePageID title={data?.title} />

      <MarkdownEditor text={data.description} />
    </SectionID>
  );
}
