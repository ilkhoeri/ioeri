import React from "react";

import { Spinner } from "@/components/assets/anim-loader";
import style from "@/styles/ioeri.module.css";

export default function Loading() {
  return (
    <main className={style.loader}>
      <Spinner size={36} />
    </main>
  );
}
