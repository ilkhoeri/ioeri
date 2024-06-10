import { getEvents } from "@/connections/get-event";
import { TitlePage } from "@/components/clients/title-page";
import { TableEvent } from "@/components/clients/includes/table-event";
import { EventColumns } from "@/components/clients/includes/column-event";

export const metadata = {
  title: "Event",
  description: "ioeri Next App - Event Page.",
};

export default async function Page() {
  const events = await getEvents();

  return (
    <>
      <TitlePage title="event" />
      <TableEvent searchKey="title" columns={EventColumns} data={events} />
    </>
  );
}
