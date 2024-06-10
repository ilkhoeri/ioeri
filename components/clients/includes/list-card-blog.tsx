"use client";
import { useState } from "react";
import { SectionID } from "../section";

import { Card } from "../card";
import { FilteredData } from "../filtered-data";

import type { Blog } from "@/types/connections";

import style from "@/styles/ioeri.module.css";

type SanitizedBlogs = Pick<Blog, "title" | "description">;

export const ListBlog: React.FC<{ data: SanitizedBlogs[] | null }> = ({ data }) => {
  const [filteredValue, setFilteredValue] = useState<string>("");

  if (!data) {
    return null;
  }

  const filteredData = data.filter((blog) => blog.title.toLowerCase().includes(filteredValue.toLowerCase()));

  return (
    <SectionID>
      <FilteredData data={data} value={filteredValue} onChange={(e) => setFilteredValue(e.target.value)} />
      <ul className={style.lblog}>
        <CardBlogs data={filteredData} />
      </ul>
    </SectionID>
  );
};

export const CardBlogs: React.FC<{ data: SanitizedBlogs[]; loading?: boolean }> = ({ data, loading }) => {
  return data?.map((blog, index) => (
    <Card key={index} className={loading ? "load_" : ""} data={blog} srcNull="/images/blog.png" />
  ));
};
