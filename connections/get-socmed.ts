import { APIURL } from "./url";
import type { Socmed } from "@/types/connections";

const URL = `${APIURL}/socmed`;

async function getSocmed(): Promise<Socmed[]> {
  const res = await fetch(URL, { cache: "no-store" });
  return await res.json();
}

export { getSocmed };
