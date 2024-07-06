"use client";
import { useFetch } from "@/modules/hooks";
import { cnx } from "@/modules/utility";
import globalStyle from "@/library/styles/styles";

type Data = {
  userId: number;
  id: number;
  title: string;
};

export function Demo() {
  const { data, loading, error, refetch, abort } = useFetch<Data[]>("https://jsonplaceholder.typicode.com/albums/");

  const uniqueUserData = data
    ? Object.values(
        data.reduce(
          (acc, data) => {
            if (!acc[data.userId]) {
              acc[data.userId] = data;
            }
            return acc;
          },
          {} as Record<number, Data>,
        ),
      )
    : null;

  if (error) return <p className="text-sm font-medium text-red-600">{error.message}</p>;
  return (
    <div>
      <pre
        className={cnx(
          "bg-muted rounded-lg relative flex items-center justify-center overflow-hidden",
          !uniqueUserData && "animate-pulse",
        )}
      >
        <code className="overflow-y-auto">
          <p className="w-[350px] h-[400px] min-w-[350px] min-h-[400px] p-4">
            {uniqueUserData ? JSON.stringify(uniqueUserData, null, 2) : "Fetching"}
          </p>
        </code>
      </pre>

      <button
        type="button"
        role="button"
        onClick={refetch}
        className={globalStyle({ button: "constructive", size: "sm" }, "min-w-24 absolute top-4 left-4 z-20")}
      >
        Refetch
      </button>
      <button
        type="button"
        role="button"
        onClick={abort}
        className={globalStyle({ button: "destructive", size: "sm" }, "min-w-24 absolute top-16 left-4 z-20")}
      >
        Abort
      </button>
      <span
        className={cnx(
          "absolute top-4 right-4 rounded-full size-4",
          !uniqueUserData || loading ? "bg-destructive" : "bg-conservative",
        )}
      />
    </div>
  );
}
