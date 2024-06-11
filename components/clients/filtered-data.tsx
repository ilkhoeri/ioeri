import { cnx } from "@/modules";
import { Input } from "../ui/input";

import style from "@/styles/ioeri.module.css";

export function FilteredData<T extends string>({
  data,
  value,
  onChange,
}: {
  data: Partial<Record<T, string>>[];
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    data.length > 0 && (
      <Input
        unstyled
        placeholder="Search"
        name="search"
        autoComplete="socmed"
        value={value}
        onChange={onChange}
        className={cnx(style._search, "input_class")}
      />
    )
  );
}
