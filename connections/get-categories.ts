import { APIURL } from "./url";
import type { Category } from "@/types/connections";

const URL = `${APIURL}/categories`;

async function getCategories(): Promise<Category[]> {
  const res = await fetch(URL, { cache: "no-store" });
  return await res.json();
}

export { getCategories };
