import { APIURL } from "./url";
import type { Category } from "@/types/connections";

const URL = `${APIURL}/categories`;

async function getCategory(id: string): Promise<Category> {
  const res = await fetch(`${URL}/${id}`, { cache: "no-store" });
  return await res.json();
}

export { getCategory };
