import { Demos } from "./demo";
import { Tabs } from "@/library/components/tabs";
import { Container } from "@/library/components/components";
import { highlightCode } from "@/library/utils/escape-code";
import { Code, Customizer } from "@/library/components/code";
import { Playground } from "@/library/components/playground";
import { prefixName, retitled, slug, sourceFiles } from "@/library/utils";
import { getFilesWithPrefix, readdirPrefix } from "@/library/scripts/get-demos";
import { getMdx, getContent, type Content, getRepo } from "@/library/scripts/get-contents";

import type { Metadata } from "next";

interface DocsParams {
  params: { docs: string[] };
}

export async function generateMetadata({ params }: DocsParams): Promise<Metadata> {
  const domain = process.env.NEXT_PUBLIC_DOMAIN_URL;
  const namePage = retitled(params.docs) || "NotFound!";
  const urlDocs = params.docs === undefined ? `${domain}/docs` : `${domain}/docs/${params.docs.join("/")}`;
  return {
    title: namePage,
    description: namePage,
    openGraph: {
      title: namePage,
      description: namePage,
      url: urlDocs,
      type: "website",
    },
  };
}

const gitrepo = `https://raw.githubusercontent.com/ilkhoeri/ioeri/main`;

async function getReCode({ params }: DocsParams, ext: string): Promise<string> {
  return getRepo(`${gitrepo}/resource/docs/${sourceFiles(params.docs)}`, ext);
}
async function getCode({ params }: DocsParams): Promise<Content> {
  if (!params.docs) return { content: null, extension: null };
  return getContent(`/resource/docs/${sourceFiles(params.docs)}`, [".tsx", ".ts"]);
}
async function getCodeDemo({ params }: DocsParams, files: string[]) {
  if (!files.length) {
    return {
      consideration: await highlightCode(await getMdx(`/resource/docs/${sourceFiles(params.docs)}`, "consideration")),
      usages: await getMdx(`/resource/docs/${sourceFiles(params.docs)}`, "usage"),
      explanation: await highlightCode(await getMdx(`/resource/docs/${sourceFiles(params.docs)}`, "explanation"), {
        copy: true,
      }),
    };
  }

  const usageMap: { [key: string]: string | null } = {};
  const explanationMap: { [key: string]: string | null } = {};
  const considerationMap: { [key: string]: string | null } = {};

  for (const file of files) {
    const usage = await getContent(`resource/_docs_demo/${readdirPrefix("readdir", params.docs)}/${file}`, undefined, {
      Demo: `${prefixName(params.docs, file)}Demo`,
    });

    const [explanation, consideration] = await Promise.all([
      getMdx(`/resource/docs/${sourceFiles(params.docs)}`, `explanation-${file}`),
      getMdx(`/resource/docs/${sourceFiles(params.docs)}`, `consideration-${file}`),
    ]);

    usageMap[file] = usage.content;
    explanationMap[file] = explanation;
    considerationMap[file] = consideration;
  }

  return {
    consideration: considerationMap,
    usages: usageMap,
    explanation: explanationMap,
  };
}
async function getCss({ params }: DocsParams): Promise<Content> {
  if (!params.docs) return { content: null, extension: null };
  return getContent(`/resource/docs/${sourceFiles(params.docs)}`, [".css"], undefined, { lang: "css" });
}
async function getSection({ params }: DocsParams, id: string): Promise<string | null> {
  if (!params.docs) return null;
  return getMdx(`/resource/docs/${sourceFiles(params.docs)}`, id);
}

export default async function Page({ params }: DocsParams) {
  const code = await getCode({ params });
  const ce = code.extension || ".tsx";
  const files = getFilesWithPrefix({ params });
  const demo = await getCodeDemo({ params }, files);
  const reCode = !code.content ? await getReCode({ params }, `${ce}`) : code.content;

  const [css, conclusion] = await Promise.all([
    getCss({ params }).then((res) => res.content),
    getSection({ params }, "conclusion"),
  ]);

  const file: string = `${slug(params.docs)}${ce}`;
  const repo: string = `${sourceFiles(params.docs)}${ce}`;
  const codes: { [key: string]: React.JSX.Element | null } = {};

  if (css) {
    codes.css = (
      <Code title={`${slug(params.docs)}.css`} ext=".css" code={css} setInnerHTML={await highlightCode(css)} />
    );
  }
  if (reCode) {
    codes.code = <Code title={file} repo={repo} ext={ce} code={reCode} setInnerHTML={await highlightCode(reCode)} />;
  }

  return (
    <Container>
      {demo && (
        <Demos files={files} params={params} usage={typeof demo.usages === "object" ? demo.usages : await highlightCode(demo.usages, { copy: true })} {...demo} />
      )}

      <div id="code">
        <Tabs defaultValue="code" className="w-full mb-12">
          <Playground childrens={codes} />
        </Tabs>
        <Customizer setInnerHTML={await highlightCode(conclusion, { copy: true })} />
      </div>
    </Container>
  );
}
