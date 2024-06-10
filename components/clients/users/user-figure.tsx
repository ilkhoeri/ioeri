import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import { getFirstString } from "@/utils/text-transform";
import type { User } from "@/types/connections";

export interface UserFigureProps {
  user: User;
}

const UserFigure: React.FC<UserFigureProps> = ({ user }) => {
  return (
    <Link href="/" className={""}>
      <figure className={""}>
        <figcaption className={""}>{user.name}</figcaption>
        {user.image && <Image fill sizes="100" alt={user.name} src={user.image} />}
      </figure>
      <p className={""}>{getFirstString(user.name)}</p>
    </Link>
  );
};

export { UserFigure };
