import { ListSocmed } from "@/components/clients/includes/list-socmed";
import { SectionID } from "@/components/clients/section";
import { TitlePage } from "@/components/clients/title-page";
import { getSocmed } from "@/connections/get-socmed";

export const metadata = {
  title: "Official",
  description: "ioeri Next App - Official Page.",
};

export default async function Page() {
  const socmeds = await getSocmed();

  return (
    <>
      <TitlePage title="official" />
      <SectionID className="max-w-3xl">
        <ListSocmed data={socmeds} filtered={socmeds} />
      </SectionID>
    </>
  );
}
