import { getBlogs } from "@/connections/get-blog";
import { ListBlog } from "@/components/clients/includes/list-card-blog";
import { TitlePage } from "@/components/clients/title-page";
import { Article } from "@/components/ui/component";

export const metadata = {
  title: "Playground",
  description: "ioeri Next App - Playground Page.",
};

export default async function Page() {
  const blogs = await getBlogs();

  return (
    <Article>
      <TitlePage title="playground" />
      <ListBlog data={blogs} />
    </Article>
  );
}
