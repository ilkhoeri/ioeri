import { getEvents } from "@/connections/get-event";
import { TableEvent } from "@/components/clients/includes/table-event";
import { EventColumns } from "@/components/clients/includes/column-event";
import { Article, Title } from "@/components/ui/components";

export const metadata = {
  title: "Event",
  description: "ioeri Next App - Event Page.",
};

export default async function Page() {
  const events = await getEvents();

  return (
    <Article>
      <Title title="event" />
      <TableEvent searchKey="title" columns={EventColumns} data={events} />
    </Article>
  );
}
