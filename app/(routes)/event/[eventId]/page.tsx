import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageEventId } from "@/components/clients/pages/page-eventId";
import { getEventById } from "@/connections/get-event";

type ParamsID = { params: { eventId: string } };

export async function generateMetadata({ params }: ParamsID): Promise<Metadata> {
  const event = await getEventById(params.eventId);

  const url = process.env.NEXT_PUBLIC_DOMAIN_URL;
  const namePage = event.title;
  const slug = event.slug;
  return {
    title: namePage ? namePage.slice(0, 30) : "NotFound!",
    openGraph: {
      title: namePage || "NotFound!",
      description: namePage || "NotFound!",
      url: url + "/" + slug,
      locale: "id-ID",
      type: "website",
    },
  };
}

export default async function Page({ params }: ParamsID) {
  const event = await getEventById(params.eventId);

  if (!params.eventId || event.slug !== params.eventId) {
    notFound();
  }
  // console.log("SLUG:", currentPage);
  return <PageEventId event={event} />;
}
