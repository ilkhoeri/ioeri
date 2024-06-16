import { getBlogs } from "@/connections/get-blog";
import { ListBlog } from "@/components/clients/includes/list-card-blog";
import { Article, Title } from "@/components/ui/components";

export const metadata = {
  title: "Blog",
  description: "ioeri Next App - Blog Page.",
};

export default async function Page() {
  const blogs = await getBlogs();

  return (
    <Article>
      <Title title="blog" />
      <ListBlog data={blogs} />
    </Article>
  );
}
