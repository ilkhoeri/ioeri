import { PageHome } from "@/components/clients/pages/page-home";
import { CarouselClient } from "@/components/clients/pages/home/carousel-client";
import { HeaderHome, HomeLayouts } from "@/components/clients/pages/home/header";
import { getClients } from "@/connections/get-clients";

// import { SectionBlogs } from "@/components/clients/pages/home/latest-blog";
// import { CardReviews } from "@/components/clients/pages/home/card-reviews";
// import { Solution } from "@/components/clients/pages/home/solution";

export default async function Home() {
  // const user = await getUser();
  // const billboards = await getBillboards();
  // const events = await getEvent();
  // const socmeds = await getSocmed();
  // const address = await getUserAddress();
  const [clientList] = await Promise.all([getClients()]);

  return (
    <HomeLayouts>
      <HeaderHome />
      {/* <CardReviews data={userReviews} /> */}
      <CarouselClient data={clientList} />

      {/* <Solution /> */}
      <PageHome />

      {/* <SectionBlogs /> */}
    </HomeLayouts>
  );
}

/**
const userReviews = [
  {
    imageUrl: "https://raw.githubusercontent.com/ioeridev/assets/public/avatar/u/0.png",
    name: "John Doe",
    job: "Web dev",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum aliquid quo eum quae quos illo earum ipsa doloribus nostrum minus libero aspernatur laborum cum, a suscipit, ratione ea totam ullam! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto laboriosam deleniti aperiam ab veniam sint non cumque quis tempore cupiditate. Sint libero voluptas veniam at reprehenderit, veritatis harum et rerum.",
  },
  {
    imageUrl: "https://raw.githubusercontent.com/ioeridev/assets/public/avatar/u/9.png",
    name: "Jane doe",
    job: "Marketing",
    comment:
      "Lorem ipsum dolor laboriosam deleniti aperiam ab veniam sint non cumque quis tempore cupiditate. Sint libero voluptas veniam at reprehenderit, veritatis harum et rerum.",
  },
  {
    imageUrl: "https://raw.githubusercontent.com/ioeridev/assets/public/avatar/u/u.png",
    name: "Yanick Doe",
    job: "Developer",
    comment:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto laboriosam deleniti aperiam ab veniam sint non cumque quis tempore cupiditate. Sint libero voluptas veniam at reprehenderit, veritatis harum et rerum.",
  },
  {
    imageUrl: "https://raw.githubusercontent.com/ioeridev/assets/public/avatar/u/z.png",
    name: "Jane Doe",
    job: "Mobile dev",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum aliquid quo eum quae quos illo earum ipsa doloribus nostrum minus libero aspernatur laborum cum, a suscipit, ratione ea totam ullam! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto laboriosam deleniti aperiam ab veniam sint non cumque quis tempore cupiditate. Sint libero voluptas veniam at reprehenderit, veritatis harum et rerum.",
  },
  {
    imageUrl: "https://raw.githubusercontent.com/ioeridev/assets/public/avatar/u/L.png",
    name: "Andy Doe",
    job: "Manager",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum aliquid quo eum quae quos illo earum ipsa doloribus nostrum minus libero aspernatur laborum cum, a suscipit.",
  },
  {
    imageUrl: "https://raw.githubusercontent.com/ioeridev/assets/public/avatar/u/k.png",
    name: "Yanndy Doe",
    job: "Mobile dev",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum aliquid quo eum quae quos illo earum ipsa doloribus nostrum minus libero aspernatur laborum cum, a suscipit, ratione ea totam ullam! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto laboriosam deleniti aperiam ab veniam sint non cumque quis tempore cupiditate. Sint libero voluptas veniam at reprehenderit, veritatis harum et rerum.",
  },
];
 */
