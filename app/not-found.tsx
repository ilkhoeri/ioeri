import Link from "next/link";
import { getNestedRoutes, getRoutes } from "@/library/scripts/get-routes";
import { AsideLeft } from "@/library/assets/nav-aside-left";
import { Main } from "@/library/components/components";
import { IoeriIcon } from "@/modules";

import type { NestedRoute, SingleRoute } from "@/library/routes";

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const runtime = "nodejs";

async function loadRoutes(sourcePath: string): Promise<SingleRoute[]> {
  return await getRoutes(sourcePath);
}
async function loadNestedRoutes(sourcePath: string): Promise<NestedRoute[]> {
  return await getNestedRoutes(sourcePath);
}

export default async function NotFound() {
  const nested = await loadNestedRoutes("components");
  const utility = await loadRoutes("utility");
  const hooks = await loadRoutes("hooks");

  return (
    <Main className="pb-0">
      <AsideLeft topRoutes={[...utility]} routes={[...hooks]} nestedRoutes={nested} />

      <article className="h-dvh w-full max-w-full overflow-hidden flex flex-wrap items-start justify-center p-4 m-0 relative pt-20 after:content-[''] after:w-full after:h-[262px] after:absolute after:bottom-0 after:bg-gradient-to-t after:from-background">
        <h1
          role="presentation"
          className="absolute flex flex-col flex-nowrap min-w-max text-left w-full h-full text-[clamp(52px,47px_+_25vw,30rem)] pointer-events-none leading-[0.727] font-[900] text-[#ebebeb] dark:text-[#2e2e2e] z-[-1] tracking-[-26px] left-0"
        >
          <span>Not -</span>
          <span>Found</span>
        </h1>

        <div className="relative z-10 centered flex-col pt-16 min768:pt-[7rem] text-[#909090] dark:text-[#c1c2c5] text-center m-0 leading-normal">
          <Link
            href={"/"}
            tabIndex={-1}
            aria-label="back-home"
            className="px-4 py-1 rounded-lg sticky top-14 focus-visible:ring-0 focus-visible:border-0 hover:text-color"
          >
            <IoeriIcon size={146} />
          </Link>
          <h1 className="font-greycliff font-[900] text-[32px] min681:text-[38px] text-[inherit]">
            Could not find requested resource
          </h1>
          <p className="mb-[24px] mt-6 m-auto text-center leading-normal font-greycliff text-[#909296] text-[18px] max-w-[540px]">
            Page you are trying to open does not exist. You may have mistyped the address, or the page has been moved to
            another URL. If you think this is an error contact support.
          </p>
        </div>
      </article>
    </Main>
  );
}
