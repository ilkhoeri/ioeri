import { FC } from "react";
import CarouselBillboard from "@/components/assets/carousel/carousel-billboard";
import { Billboard as BillboardTypes } from "@/types/connections";

type BillboardsProps = {
  billboard: BillboardTypes | BillboardTypes[];
};

const Billboards: FC<BillboardsProps> = ({ billboard }) => {
  return (
    <ul className="w-full grid gap-4 sm:grid-cols-2md:grid-cols-3lg:grid-rows-3xl:grid-cols-42xl:grid-cols-5">
      <li className="sm:row-span-2 lg:row-span-1 lg:col-span-2 aspect-video lg:aspect-[2/1]2xl:row-span-22xl:col-span-32xl:aspect-[1.5/1] !list-none overflow-hidden relative rounded-[10px] bg-white dark:bg-black transition-opacity border border-neutral-200 dark:border-neutral-800 [--h:100%]">
        <CarouselBillboard
          billboard={billboard}
          classNames={{
            root: "mt-0 [--slide-sz:100%] aspect-[2.25/1] md:aspect-square",
          }}
        />
      </li>
    </ul>
  );
};

export default Billboards;
