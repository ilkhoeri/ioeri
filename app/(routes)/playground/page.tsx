import { getBlogs } from "@/connections/get-blog";
import { ListBlog } from "@/components/clients/includes/list-card-blog";
import { TitlePage } from "@/components/clients/title-page";

export const metadata = {
  title: "Playground",
  description: "ioeri Next App - Playground Page.",
};

export default async function Page() {
  const blogs = await getBlogs();

  return (
    <>
      <TitlePage title="playground" />
      <ListBlog data={blogs} />
    </>
  );
}
