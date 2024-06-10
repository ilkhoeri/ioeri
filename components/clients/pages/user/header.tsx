"use client";
import * as React from "react";
import { StyleObject } from "@/types/record-class";
import { AnimText, getRandomColor } from "@/modules";

import type { User } from "@/types/connections";

import style from "./ioeri.module.css";

function variables(): StyleObject {
  const vars: StyleObject = {};
  vars["--text-gradient-from"] = getRandomColor();
  vars["--text-gradient-to"] = getRandomColor();
  return vars;
}

export function UserPageHeader({ user }: { user: User }) {
  const header = { className: style.user_header, style: variables() };
  const pict = { style: { backgroundImage: `url("/images/pattern-prisma.svg")` } };
  return (
    <section suppressHydrationWarning {...header}>
      <AnimText anim="spiral" el={{ root: "article", wrap: "p", inner: "i" }} placeholders={user.name} />

      <figure>
        <picture {...pict} />
      </figure>
      <figcaption>
        <h2>{user.alias || user.name}</h2>
      </figcaption>
    </section>
  );
}
