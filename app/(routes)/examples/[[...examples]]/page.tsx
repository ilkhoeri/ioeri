import { Examples } from "./client";
import { retitled, sourceFiles } from "@/library/utils";
import { sanitizedToParams } from "@/modules/ondevelopment/utils";
import { Container, Title } from "@/library/components/components";
import { getMdx, getContent, type Content } from "@/library/scripts/get-contents";

import type { Metadata } from "next";

interface Params {
  params: { examples: string[] };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const domain = process.env.NEXT_PUBLIC_DOMAIN_URL;
  const namePage = retitled(params.examples) || "NotFound!";
  const urlOpenGraph = `${domain}/examples/${params.examples.join("/")}`;
  return {
    title: namePage,
    description: namePage,
    openGraph: {
      title: namePage,
      description: namePage,
      url: urlOpenGraph,
      type: "website",
    },
  };
}

async function getCode({ params }: Params): Promise<Content> {
  return getContent(`/modules/${sourceFiles(params.examples)}`);
}
async function getCss({ params }: Params): Promise<Content> {
  return getContent(`/modules/${sourceFiles(params.examples)}`, [".css"], undefined, { lang: "css" });
}
async function getSection({ params }: Params, sectionId: string): Promise<string | null> {
  return getMdx(`/modules/${sourceFiles(params.examples)}`, sectionId);
}

export default async function Page({ params }: Params) {
  return (
    <Container className="min-h-screen px-6 md:px-9 xl:px-12">
      <Title
        title={retitled(["on-development"])}
        id={sanitizedToParams(retitled(["on-development"]))}
        className="mt-0 mb-12"
      />
      <Examples params={params} />
    </Container>
  );
}
