import { Article, Title } from "@/components/ui/components";
import { HooksPage } from "./try-page";

export const metadata = {
  title: "Hooks",
  description: "ioeri Next App - Straightforward Hooks",
};

export default async function Page() {
  return (
    <Article>
      <Title title="components" />

      <hr className="my-0.5" />
      <HooksPage />
    </Article>
  );
}
