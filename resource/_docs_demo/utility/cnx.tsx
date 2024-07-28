import { cnx, type ClassValue } from "@/modules/utility";
import { twMerge } from "tailwind-merge";
import { SetProps } from "../__set_props";

function cn(...inputs: ClassValue[]) {
  return twMerge(cnx(...inputs));
}

export function Demo() {
  return (
    <div className={cn("block", "gap-0", "flex items-center flex-col")}>
      <div className={cn("py-1 px-2 rounded-md border bg-color/10")}>Cnx</div> {/* prettier-ignore */}
      <div className="flex flex-col items-start">
        <SetProps.Comment title={`// cnx(["foo", 0, false, "bar"])`} />
        {cnx(["foo", 0, false, "bar"])}

        <SetProps.Comment title={`// cnx("hello", true && "foo", false && "bar")`} />
        {cnx("hello", true && "foo", false && "bar")}

        <SetProps.Comment title={`// cnx(["foo"], ["", 0, false, "bar"], [["baz", [["hello"], "there"]]])`} />
        {cnx(["foo"], ["", 0, false, "bar"], [["baz", [["hello"], "there"]]])}

        <SetProps.Comment title={`// cnx("foo", [1 && "bar", { baz: false, bat: null }, ["hello", ["world"]]], "cya")`} />
        {cnx("foo", [1 && "bar", { baz: false, bat: null }, ["hello", ["world"]]], "cya")}
      </div>
    </div>
  );
}
