import { Heading } from "@/components/ui/heading";
import { getCategory } from "@/connections/get-category";

export type IdsList = {
  matchId: string;
  equalId: string;
};

export type SearchParamsIdsFilters = { searchParams: IdsList };

type CategoryPageProps = {
  params: {
    categoryId: string;
  };
} & SearchParamsIdsFilters;

export default async function Page({ params, searchParams }: CategoryPageProps) {
  const category = await getCategory(params.categoryId);
  return (
    <div className="w-full h-dvh flex items-center justify-center">
      <Heading el="h1">Page Category</Heading>
    </div>
  );
}
