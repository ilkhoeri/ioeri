import { ListSocmed } from "@/components/clients/includes/list-socmed";
import { TitlePage } from "@/components/clients/title-page";
import { Article } from "@/components/ui/component";
import { getSocmed } from "@/connections/get-socmed";

export const metadata = {
  title: "Official",
  description: "ioeri Next App - Official Page.",
};

export default async function Page() {
  const socmeds = await getSocmed();

  return (
    <Article>
      <TitlePage title="official" />

      <ListSocmed data={socmeds} filtered={socmeds} />
    </Article>
  );
}
