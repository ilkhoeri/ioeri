import { cnx, type ClassValue } from "@/modules/utils";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(cnx(inputs));
}
