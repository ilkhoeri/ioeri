import { APIURL } from "./url";
import type { Career } from "@/types/connections";

const URL = `${APIURL}/careers`;

async function getCareers(): Promise<Career[]> {
  const res = await fetch(URL, { cache: "no-store" });
  return await res.json();
}

export { getCareers };
