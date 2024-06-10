"use client";

import * as React from "react";
import Image from "next/image";
import { Anchor } from "@/components/ui/anchor";
import { Input } from "@/components/ui/input";

import { FilteredData } from "../filtered-data";
import { getSocMedImages } from "@/connections/get-socmed-images";
import { ChainLinkIcon } from "@/modules";

import type { Socmed } from "@/types/connections";

import style from "@/styles/ioeri.module.css";

const ListSocmed: React.FC<{ data: Socmed[]; filtered: Pick<Socmed, "siteName" | "siteUrl">[] }> = ({
  data,
  filtered,
}) => {
  const [filterValue, setFilterValue] = React.useState<string>("");

  const filteredData = data.filter((socmed) => socmed.siteName.toLowerCase().includes(filterValue.toLowerCase()));
  return (
    <>
      <ol className={style.lscm_ol}>
        <FilteredData data={filtered} value={filterValue} onChange={(e) => setFilterValue(e.target.value)} />
        <ListSocmeds data={filteredData} />
      </ol>
    </>
  );
};

const ListSocmeds: React.FC<{ data: Socmed[] }> = ({ data }) => {
  return data
    .slice()
    .sort((a, b) => a.siteName.localeCompare(b.siteName))
    .map((socmed) => <ListSocmedCard key={socmed.id} data={socmed} />);
};

const ListSocmedCard: React.FC<{ data: Socmed }> = ({ data }) => {
  return (
    <li className={style.lscm_li}>
      <Image
        alt="x"
        loading="lazy"
        width="36"
        height="36"
        decoding="async"
        className={style.lscm_img}
        src={getSocMedImages({ siteUrl: data.siteUrl, imageUrl: data.imageUrl })}
      />
      <div className={style.lscm_stN}>{data.siteName || data.siteUrl.split("/")[2].split(".").shift()}</div>
      <div className={style.lscm_stU}>{data.siteUrl}</div>
      <Anchor unstyled href={data.siteUrl} target="_blank" className={style.lscm_st_Link}>
        <ChainLinkIcon />
      </Anchor>
    </li>
  );
};

export { ListSocmed };
