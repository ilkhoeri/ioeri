import { Metadata } from "next";
import { notFound } from "next/navigation";
import { UserPortfolio } from "./components";

import { sanitizedToParams } from "@/modules";
import { getAddress, getBlogs, getSocmed, getUser } from "../utils";

type Params = { params: { myId: string } };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const user = await getUser();
  const namePage = params.myId;
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

export default async function Page({ params }: Params) {
  const [user, address, blogs, socmeds] = await Promise.all([getUser(), getAddress(), getBlogs(), getSocmed()]);
  const named = sanitizedToParams(params.myId) === sanitizedToParams(user.name);
  if (!named) {
    notFound();
  }
  return <UserPortfolio user={user} address={address} blog={blogs} socmed={socmeds} />;
}
