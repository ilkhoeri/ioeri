"use client";

import React, { useEffect, useState } from "react";
import { sortStringDate } from "@/modules/ondevelopment/utils";
import { twMerge } from "tailwind-merge";

const ItalicTime: React.FC<{ time: string | undefined; util: "created" | "updated" }> = ({ time, util }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !time) {
    return null;
  }
  const timeCreated = util === "created";
  const timeUpdated = util === "updated";

  const timingUpdated = sortStringDate(new Date(time), {
    options: {
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZoneName: "short",
    },
  }).replace(".", ":");

  const dateTime = timeUpdated ? timingUpdated : sortStringDate(new Date(time));

  return (
    <>
      <svg
        stroke="currentColor"
        fill="none"
        strokeWidth="2"
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        height="28"
        width="28"
        xmlns="http://www.w3.org/2000/svg"
        className="border rounded-lg p-[3px]"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        {timeCreated && (
          <>
            <path d="M20.983 12.548a9 9 0 1 0 -8.45 8.436" />
            <path d="M19 22v-6" />
            <path d="M22 19l-3 -3l-3 3" />
            <path d="M12 7v5l2.5 2.5" />
          </>
        )}
        {timeUpdated && (
          <>
            <path d="M12 8l0 4l2 2" />
            <path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5" />
          </>
        )}
      </svg>
      <time dateTime={String(time)} className="italic">
        {dateTime}
      </time>
      .
    </>
  );
};

interface PostedTimesProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  times:
    | {
        createdAt: string | undefined;
        updatedAt: string | undefined;
      }
    | undefined;
}
const PostedTimes = React.forwardRef<HTMLElement, PostedTimesProps>(({ times, className, ...props }, ref) => {
  if (!times) {
    return null;
  }
  return (
    <section ref={ref} className={twMerge("border-t mt-16", className)} {...props}>
      <ItalicTime util="created" time={times.createdAt} />
      {times.createdAt !== times.updatedAt && <ItalicTime util="updated" time={times.updatedAt} />}
    </section>
  );
});
PostedTimes.displayName = "PostedTimes";

export { ItalicTime, PostedTimes };
