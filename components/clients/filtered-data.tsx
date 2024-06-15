import { cnx } from "@/modules";
import { Input } from "../ui/input";

export function FilteredData<T extends string>({
  data,
  value,
  onChange,
}: {
  data: Partial<Record<T, string>>[];
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
  if (!data.length) {
    return null;
  }
  return (
    <Input
      unstyled
      placeholder="Search"
      name="search"
      autoComplete="socmed"
      value={value}
      onChange={onChange}
      className={cnx(
        "input_class",
        "backdrop-blur-md bg-background/40 max-w-[35rem] aria-[disabled='true']:cursor-not-allowed aria-[disabled='true']:opacity-50",
      )}
    />
  );
}
