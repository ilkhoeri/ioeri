import { getBlogs } from "@/connections/get-blog";
import { ListBlog } from "@/components/clients/includes/list-card-blog";
import { TitlePage } from "@/components/clients/title-page";

export const metadata = {
  title: "Blog",
  description: "ioeri Next App - Blog Page.",
};

export default async function Page() {
  const blogs = await getBlogs();

  return (
    <>
      <TitlePage title="blog" />
      <ListBlog data={blogs} />
    </>
  );
}
