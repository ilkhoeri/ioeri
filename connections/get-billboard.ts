import { APIURL } from "./url";
import type { Billboard } from "@/types/connections";

export const URL = `${APIURL}/billboards`;

async function getBillboardByID(id: string): Promise<Billboard> {
  const res = await fetch(`${URL}/${id}`, { cache: "no-store" });
  return await res.json();
}

async function getBillboard(ids: string[]): Promise<Billboard[]> {
  const promises = ids.map(async (id) => {
    const res = await fetch(`${URL}/${id}`);
    return res.json();
  });
  return Promise.all(promises);
}

async function getBillboards(): Promise<Billboard[]> {
  const res = await fetch(URL, { cache: "no-store" });
  return await res.json();
}

export { getBillboardByID, getBillboard, getBillboards };
