import { TitlePage } from "@/components/clients/title-page";
import { HooksPage } from "./try-page";

export const metadata = {
  title: "Hooks",
  description: "ioeri Next App - Straightforward Hooks",
};

export default async function Page() {
  return (
    <>
      <TitlePage title="components" />

      <hr className="my-0.5" />

      <HooksPage />
    </>
  );
}
