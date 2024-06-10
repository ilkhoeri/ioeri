import { APIURL } from "./url";
import type { Match } from "@/types/connections";

const URL = `${APIURL}/match`;

async function getMatch(): Promise<Match[]> {
  const res = await fetch(URL, { cache: "no-store" });
  return await res.json();
}

export { getMatch };
