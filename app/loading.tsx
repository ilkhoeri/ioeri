import React from "react";

import { Spinner } from "@/library/assets/anim-loader";
import style from "@/library/styles/ioeri.module.css";

export default function Loading() {
  return (
    <main className="w-full min-h-screen h-screen flex items-center justify-center relative bg-background">
      <Spinner size={24} />
    </main>
  );
}
