import qs from "query-string";
import { APIURL } from "./url";
import type { Blog } from "@/types/connections";

const URL = `${APIURL}/blog`;

interface Query {
  blogId?: string;
  categoryId?: string;
  equalId?: string;
  matchId?: string;
  // isNew?: boolean;
}

async function getBlogs(): Promise<Blog[]> {
  const res = await fetch(URL, { cache: "no-store" });
  return await res.json();
}

async function getBlogByID(id: string): Promise<Blog> {
  const res = await fetch(`${URL}/${id}`, { cache: "no-store" });
  return await res.json();
}

async function getBlog(query: Query): Promise<Blog[]> {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      // blogId: query.categoryId ?? "",
      categoryId: query.categoryId ?? "",
      equalId: query.equalId ?? "",
      matchId: query.matchId ?? "",
      // isNew: query.isNew,
    },
  });
  const res = await fetch(url, { cache: "no-store" });
  return await res.json();
}

export { getBlog, getBlogByID, getBlogs };
