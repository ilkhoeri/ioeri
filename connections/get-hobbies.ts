import { APIURL } from "./url";
import type { Hobby } from "@/types/connections";

const URL = `${APIURL}/hobbies`;

async function getHobbies(): Promise<Hobby[]> {
  const res = await fetch(URL, { cache: "no-store" });
  return await res.json();
}

export { getHobbies };
