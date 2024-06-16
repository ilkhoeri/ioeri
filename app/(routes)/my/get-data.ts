import type { Address, Blog, Socmed, User } from "@/components/assets/user/types";

const APIURL = `${process.env.SECRET_API_CLIENT}/${process.env.SECRET_API_ID}`;
const URLUSER = `${process.env.SECRET_API_CLIENT}/${process.env.SECRET_API_ID}/user/${process.env.SECRET_API_ID}`;

export async function getUser(): Promise<User> {
  const res = await fetch(URLUSER, { cache: "no-store" });
  return await res.json();
}

export async function getAddress(): Promise<Address> {
  const res = await fetch(`${APIURL}/address`, { cache: "no-store" });
  return await res.json();
}

export async function getBlogs(): Promise<Blog[]> {
  const res = await fetch(`${APIURL}/blog`, { cache: "no-store" });
  return await res.json();
}

export async function getSocmed(): Promise<Socmed[]> {
  const res = await fetch(`${APIURL}/socmed`, { cache: "no-store" });
  return await res.json();
}
