import { Address, User } from "@/types/connections";
import { APIURL, URLUSER } from "./url";

async function getUser(): Promise<User> {
  const res = await fetch(URLUSER, { cache: "no-store" });
  return await res.json();
}

async function getUserAddress(): Promise<Address[]> {
  const res = await fetch(`${APIURL}/address`, { cache: "no-store" });
  return await res.json();
}

export { getUser, getUserAddress };
