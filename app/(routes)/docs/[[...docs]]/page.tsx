import { Container, Paragraph, Title } from "@/library/components/components";
import { Playground } from "@/library/components/playground";
import { CodeCustomizer } from "@/library/components/code-customizer";
import { getContent } from "@/library/scripts/get-file-content";
import { getRepository } from "@/library/scripts/get-repository";
import { capitalizeWords, sanitizedToParams } from "@/modules";
import { getMdFile } from "@/library/scripts/get-md-file";

import type { Metadata } from "next";
import Docs from "./docs";
import { getReserveContent } from "@/library/scripts/get-reserve-content";
import { Tabs } from "@/library/components/tabs";

import fs from "fs-extra";
import path from "node:path";
import { retitled, sourceFiles } from "@/library/utils";

interface DocsParams {
  params: { docs: string[] };
}

export async function generateMetadata({ params }: DocsParams): Promise<Metadata> {
  const url = process.env.NEXT_PUBLIC_DOMAIN_URL;
  const namePage = retitled(params.docs);
  return {
    title: namePage ? namePage : "NotFound!",
    description: namePage,
    openGraph: {
      title: namePage || "NotFound!",
      description: namePage || "NotFound!",
      url: url + "/" + namePage,
      locale: "id-ID",
      type: "website",
    },
  };
}

// async function getCode({ params }: DocsParams): Promise<string | null> {
//   return getFileContent(`/modules/${sourceFiles(params.docs)}`, [".tsx", ".ts"]);
// }
type FileContent = { content: string | null; extension: string | null };
async function getCode({ params }: DocsParams): Promise<FileContent> {
  return getFileContent(`/modules/${sourceFiles(params.docs)}`, [".tsx", ".ts"]);
}
async function getCss({ params }: DocsParams): Promise<FileContent> {
  return getFileContent(`/modules/${sourceFiles(params.docs)}`, [".css"]);
}
async function getSection({ params }: DocsParams, sectionId: string): Promise<string | null> {
  return getContent(`/modules/${sourceFiles(params.docs)}.md`, sectionId);
}

export default async function Page({ params }: DocsParams) {
  if (params.docs === undefined) {
    return <Docs />;
  } else {
    if (params.docs.length === 1) {
      return (
        <Container>
          <h4 className="text-h3 font-bold">{String(sourceFiles(params.docs))}</h4>

          <h4 className="text-h3 font-bold">Length: {String(params.docs.length)}</h4>
          <Title
            title={String(slug(params.docs))}
            id={sanitizedToParams(String(slug(params.docs)))}
            className="mt-0 mb-12"
          />
        </Container>
      );
    } else {
      const { content: code, extension: codeExtension } = await getCode({ params });
      const [title, description, css, usage] = await Promise.all([
        getSection({ params }, "title"),
        getSection({ params }, "description"),
        getCss({ params }).then((res) => res.content),
        getSection({ params }, "usage"),
      ]);

      const childrens: { [key: string]: React.JSX.Element | null } = {};

      if (usage) {
        childrens.usage = <CodeCustomizer code={usage} />;
      }
      if (code) {
        childrens.code = <CodeCustomizer code={code} />;
      }
      if (css) {
        childrens.css = <CodeCustomizer code={css} />;
      }

      return (
        <Container>
          {/* <h4 className="text-h3 font-bold">{String(sourceFiles(params.docs))}</h4> */}

          <Title
            title={title || retitled(params.docs)}
            id={sanitizedToParams(retitled(params.docs))}
            className={description ? "mt-0 mb-0" : "mt-0 mb-12"}
          />

          {description && <Paragraph className="mt-0 mb-12" dangerouslySetInnerHTML={{ __html: description }} />}

          <Tabs defaultValue="code" id="code" className="w-full scroll-m-20">
            <Playground childrens={childrens} repo={`${sourceFiles(params.docs)}${codeExtension}`} />
          </Tabs>
        </Container>
      );
    }
  }
}

function slug(texts: string[] | undefined) {
  return texts === undefined ? " " : texts[texts.length - 1];
}

async function getFileContent(
  basePath: string,
  extensions: string[] = [".tsx", ".ts"],
): Promise<{ content: string | null; extension: string | null }> {
  try {
    for (const ext of extensions) {
      const fullPath = path.join(process.cwd(), `${basePath}${ext}`);
      try {
        const text = await fs.readFile(fullPath, "utf-8");
        return { content: text.trim() ? text : null, extension: ext };
      } catch (error) {
        // Continue to the next extension if file is not found
      }
    }
    return { content: null, extension: null }; // If none of the extensions matched
  } catch (error) {
    return { content: null, extension: null };
  }
}
