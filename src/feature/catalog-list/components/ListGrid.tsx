"use client";
import EmptyList from "@/components/commons/EmptyList";
import SkeletonCard from "@/components/skeletons/SkeletonCard";
import { useSuspenseQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { memo } from "react";
import { getDatasetList } from "../services/dataset";
import CatalogPagination from "./CatalogPagination";

const CatalogListItem = dynamic(() => import("./CatalogListItem"), {
  ssr: false,
  loading: () => <SkeletonCard />,
});

function ListGrid() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const page = searchParams.get("page");
  const { data } = useSuspenseQuery({
    queryKey: ["datasetList", search, page],
    queryFn: () => getDatasetList(search ?? undefined, page ?? undefined),
  });

  return (
    <>
      {/* Grid */}

      {data.data.content?.length ? (
        <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {data.data.content.map((item) => (
            <CatalogListItem key={item.datasetStrId} data={item} />
          ))}
        </div>
      ) : (
        <EmptyList />
      )}
      {/* Pagination */}
      {data.data.page.totalPages > 1 && (
        <CatalogPagination totalPages={data.data.page.totalPages} />
      )}
    </>
  );
}

export default memo(ListGrid);
