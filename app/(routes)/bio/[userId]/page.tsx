import { Metadata } from "next";
import { notFound } from "next/navigation";
import { UserPortfolio } from "@/components/clients/pages/user/portfolio";
import { getUser, getUserAddress } from "@/connections/get-user";
import { sanitizedToParams } from "@/utils/text-transform";
import { getBlogs } from "@/connections/get-blog";
import { getEvents } from "@/connections/get-event";
import { getSocmed } from "@/connections/get-socmed";
import { UserPageHeader } from "@/components/clients/pages/user/header";

type USERID = { params: { userId: string } };

export async function generateMetadata({ params }: USERID): Promise<Metadata> {
  const user = await getUser();
  const namePage = params.userId;
  const url = process.env.NEXT_PUBLIC_DOMAIN_URL;
  const slug = user.name;
  return {
    title: namePage ? namePage.slice(0, 30) : "NotFound!",
    description: namePage,
    openGraph: {
      title: namePage || "NotFound!",
      description: namePage || "NotFound!",
      url: url + "/bio/" + slug,
      locale: "id-ID",
      type: "website",
    },
  };
}

export default async function Page({ params }: USERID) {
  const [user, address, blogs, events, socmeds] = await Promise.all([
    getUser(),
    getUserAddress(),
    getBlogs(),
    getEvents(),
    getSocmed(),
  ]);
  const named = sanitizedToParams(params.userId) === sanitizedToParams(user.name);

  if (!named) {
    notFound();
  }

  return (
    <>
      <UserPageHeader user={user} />
      <UserPortfolio user={user} address={address} blog={blogs} events={events} socmed={socmeds} />
    </>
  );
}
