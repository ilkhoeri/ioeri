import { APIURL } from "./url";
import type { Equal } from "@/types/connections";

const URL = `${APIURL}/equal`;

async function getEqual(): Promise<Equal[]> {
  const res = await fetch(URL, { cache: "no-store" });
  return await res.json();
}

export { getEqual };
