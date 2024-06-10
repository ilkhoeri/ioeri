import { twMerge } from "tailwind-merge";

import style from "@/styles/ioeri.module.css";

type SectionType = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { unstyled?: boolean };

const SectionID: React.FC<SectionType> = ({ unstyled, className, ...props }) => {
  const attr = {
    className: twMerge(!unstyled && style.pg_section, className),
  };
  return <section {...attr} {...props} />;
};

export { SectionID };
