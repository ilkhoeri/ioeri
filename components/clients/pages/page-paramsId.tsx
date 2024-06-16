import { PostedTimes } from "../italic-time";
import { ArticleInnerHTML } from "../article-inner-html";
import { Article, Title } from "@/components/ui/components";

import type { ContentsProps, ParamsPageTypes } from "@/types/connections";

import style from "@/styles/ioeri.module.css";

export const PageParamsId: React.FC<ParamsPageTypes> = ({ data }) => {
  return (
    <Article>
      <Title title={data?.title} />
      <h4 className={style.pg_params_ID_h4}>{data?.subtitle}</h4>

      <ContentParams contents={data?.contents} />

      {data?.notes && <div className="text-[15px] text-wrap text-pre-line text-muted-foreground">{data.notes}</div>}

      <PostedTimes times={data} />
    </Article>
  );
};

function ContentParams({ contents = [] }: ContentsProps) {
  if (!contents.length) {
    return null;
  }
  return contents.map((ctn, index) => <ArticleInnerHTML key={index} article={ctn.section} />);
}
