import { Transform } from "@/modules";
import { CardBlogs } from "../../includes/list-card-blog";
import { getBlogs } from "@/connections/get-blog";

export async function SectionBlogs() {
  const blogs = await getBlogs();
  const data = blogs.slice(0, 4);

  if (!data?.length) {
    return null;
  }
  return (
    <section id="blogs-section" className="w-full lg:w-[96%] max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
      <div className="mb-12 space-y-2 text-center">
        <Transform
          el="h3"
          transform={{ before: "translateY(6.5rem)", after: "translateY(0)", origin: "bottom center" }}
          className="text-h4 font-bold text-color"
        >
          Latest Blog
        </Transform>
      </div>

      <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <CardBlogs data={data} />
      </ul>
    </section>
  );
}
