import { cleanHTML, markdownInsertHTML } from "@/lib/clean-html";
import { twMerge } from "tailwind-merge";

type ArticleInnerHTMLType = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
  article: string | undefined;
};

const ArticleInnerHTML: React.FC<ArticleInnerHTMLType> = ({
  role = "article",
  "aria-label": ariaLabel,
  className,
  article,
  ...props
}) => {
  if (!article) {
    return null;
  }
  const attr = {
    role,
    "aria-label": ariaLabel || "article",
    className: twMerge("whitespace-pre-line text-sm md:text-[15px] leading-normal text-justify", className),
    dangerouslySetInnerHTML: markdownInsertHTML(article),
  };
  return <article {...attr} {...props} />;
};

export { ArticleInnerHTML };
