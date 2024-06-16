import { Metadata } from "next";
import { notFound } from "next/navigation";
import { UserPortfolio } from "@/components/assets/user/portfolio";

import { Article } from "@/components/ui/components";
import { sanitizedToParams } from "@/modules";
import { getAddress, getBlogs, getSocmed, getUser } from "../get-data";

type Params = { params: { userId: string } };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
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

export default async function Page({ params }: Params) {
  const [user, address, blogs, socmeds] = await Promise.all([getUser(), getAddress(), getBlogs(), getSocmed()]);
  const named = sanitizedToParams(params.userId) === sanitizedToParams(user.name);

  if (!named) {
    notFound();
  }

  return (
    <Article className="absolute z-[86] inset-0 md:bg-background">
      <UserPortfolio user={user} address={address} blog={blogs} socmed={socmeds} />
    </Article>
  );
}
