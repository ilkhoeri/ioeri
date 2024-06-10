import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageParamsId } from "@/components/clients/pages/page-paramsId";
import { getParamsById } from "@/connections/get-params";

type ParamsID = { params: { paramsId: string } };

export async function generateMetadata({ params }: ParamsID): Promise<Metadata> {
  const data = await getParamsById(params.paramsId);

  const namePage = data.title;
  const url = process.env.NEXT_PUBLIC_DOMAIN_URL;
  const slug = data.slug;
  return {
    title: namePage ? namePage.slice(0, 30) : "NotFound!",
    openGraph: {
      title: namePage || "NotFound!",
      description: namePage || "NotFound!",
      url: url + "/page/" + slug,
      locale: "id-ID",
      type: "website",
    },
  };
}

export default async function Page({ params }: ParamsID) {
  const data = await getParamsById(params.paramsId);
  // const slugList = pages.map((p) => p.slug);
  // const currentSlug = slugList.includes(params.paramsId);
  // const currentPage = pages.find((p) => p.slug === params.paramsId);

  if (!params.paramsId || data.slug !== params.paramsId) {
    notFound();
  }

  // console.log("SLUG:", currentPage);
  return <PageParamsId data={data} />;
}
