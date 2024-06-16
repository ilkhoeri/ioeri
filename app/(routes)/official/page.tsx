import { ListSocmed } from "@/components/clients/includes/list-socmed";
import { Article, Title } from "@/components/ui/components";
import { getSocmed } from "@/connections/get-socmed";

export const metadata = {
  title: "Official",
  description: "ioeri Next App - Official Page.",
};

export default async function Page() {
  const socmeds = await getSocmed();

  return (
    <Article>
      <Title title="official" />

      <ListSocmed data={socmeds} filtered={socmeds} />
    </Article>
  );
}
