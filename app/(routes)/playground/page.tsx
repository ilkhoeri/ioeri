import { getBlogs } from "@/connections/get-blog";
import { ListBlog } from "@/components/clients/includes/list-card-blog";
import { Article, Title } from "@/components/ui/components";

export const metadata = {
  title: "Playground",
  description: "ioeri Next App - Playground Page.",
};

export default async function Page() {
  const blogs = await getBlogs();

  return (
    <Article>
      <Title title="playground" />
      <ListBlog data={blogs} />
    </Article>
  );
}
