"use client";
import React, { ElementType, FC } from "react";

import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export const formatterIDR = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

export const formatterLong = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0, // Menetapkan jumlah digit di belakang koma
  maximumFractionDigits: 0, // Menetapkan jumlah maksimum digit di belakang koma
});

export const formatterIDRK = (value: number) => {
  if (value >= 1000 && value < 1000000) {
    return `Rp ${Math.floor(value / 1000)} K`;
  } else {
    return formatterIDR.format(value);
  }
};

type CurrencyProps = {
  el?: ElementType;

  value?: string | number;
  quantity?: number;

  format?: "default" | "long" | "medium" | "short";

  className?: string;

  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

const Currency: FC<CurrencyProps> = ({
  value = 0,
  quantity,
  format = "default",
  className,
  leftSection,
  rightSection,
  el = "div",
  ...others
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const rootClassName = twMerge("min-w-max", className);

  let Component: React.ComponentType<React.HTMLAttributes<HTMLElement>> = el as any;

  const total = Number(value) * quantity!;

  const formattedValue = quantity ? formatterIDR.format(Number(total)) : formatterIDR.format(Number(value));

  // Remove "Rp " and ",00"
  const sanitizedValue = formattedValue.replace(/Rp\s*/, "").replace(/\,00$/, "");

  return (
    <Component className={rootClassName} {...others}>
      {leftSection}

      {format === "default" && formattedValue}

      {format === "long" && (quantity ? formatterLong.format(Number(total)) : formatterLong.format(Number(value)))}

      {format === "medium" && sanitizedValue}

      {format === "short" && (quantity ? formatterIDRK(Number(total)) : formatterIDRK(Number(value)))}

      {rightSection}
    </Component>
  );
};

export { Currency };
