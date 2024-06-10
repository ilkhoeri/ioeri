import qs from "query-string";
import { APIURL } from "./url";
import type { Event, Events } from "@/types/connections";

const URL = `${APIURL}/event`;

interface Query {
  blogId?: string;
  categoryId?: string;
  equalId?: string;
  matchId?: string;
  // isNew?: boolean;
}

async function getEvents(): Promise<Events[]> {
  const res = await fetch(URL, { cache: "no-store" });
  return await res.json();
}

async function getEventById(id: string): Promise<Event> {
  const res = await fetch(`${URL}/${id}`, { cache: "no-store" });
  return await res.json();
}

// async function getEvent(query: Query): Promise<Event[]> {
//   const url = qs.stringifyUrl({
//     url: URL,
//     query: {
//       blogId: query.categoryId ?? "",
//       categoryId: query.categoryId ?? "",
//       equalId: query.equalId ?? "",
//       matchId: query.matchId ?? "",
//       // isNew: query.isNew,
//     },
//   });
//   const res = await fetch(url, { cache: "no-store" });
//   return await res.json();
// }

export { getEvents, getEventById };
