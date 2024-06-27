import React from "react";

import { Spinner } from "@/library/assets/anim-loader";
import style from "@/library/styles/ioeri.module.css";

export default function Loading() {
  return (
    <main className={style.loader}>
      <Spinner size={24} />
    </main>
  );
}
