import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogByID } from "@/connections/get-blog";
import { Article, Title } from "@/components/ui/components";

type BLOGID = { params: { blogId: string } };

export async function generateMetadata({ params }: BLOGID): Promise<Metadata> {
  const page = await getBlogByID(params.blogId);
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

export default async function Page({ params }: BLOGID) {
  const data = await getBlogByID(params.blogId);

  if (!data) {
    notFound();
  }
  return (
    <Article>
      <Title type="tick" title={data?.title} />
      {/* <ImagesArray images={data?.images} />
      <ArticleInnerHTML article={data?.description} />

      <PostedTimes times={data} /> */}
    </Article>
  );
}
