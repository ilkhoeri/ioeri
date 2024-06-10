import qs from "query-string";
import { APIURL } from "./url";
import type { Params } from "@/types/connections";

const URL = `${APIURL}/params`;

interface Query {
  isNew?: boolean;
  slug: string;
}

async function getParams(): Promise<Params[]> {
  const res = await fetch(URL, { cache: "no-store" });
  return await res.json();
}

async function getParamsById(id: string): Promise<Params> {
  const res = await fetch(`${URL}/${id}`, { cache: "no-store" });
  return await res.json();
}

async function getParamBySlug(slug: string, id: string): Promise<Params[]> {
  const url = qs.stringifyUrl({
    url: `${URL}/${id}`,
    query: {
      slug,
    },
  });
  const res = await fetch(url, { cache: "no-store" });
  return await res.json();
}

async function getParam(ids: string[]): Promise<Params[]> {
  const promises = ids.map(async (id) => {
    const res = await fetch(`${URL}/${id}`);
    return res.json();
  });
  return Promise.all(promises);
}

export { getParams, getParamsById, getParamBySlug, getParam };
