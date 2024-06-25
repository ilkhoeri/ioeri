import { cnx, type ClassValue } from "@/modules";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(cnx(...inputs));
}
