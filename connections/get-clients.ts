import { APIURL } from "./url";
import type { Clients } from "@/types/connections";

const URL = `${APIURL}/billboards`;

export async function getClients(): Promise<Clients[]> {
  const res = await fetch(URL, { cache: "no-store" });
  return await res.json();
}
