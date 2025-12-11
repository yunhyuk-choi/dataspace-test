import CardItem from "@/components/commons/CardItem";
import SkeletonCard from "@/components/skeletons/SkeletonCard";
import { DatasetListItem } from "@/feature/data-asset-list/types/datasetList";
import { memo } from "react";

interface CatalogListItemProps {
  data?: DatasetListItem;
}

function CatalogListItem({ data }: CatalogListItemProps) {
  return data ? <CardItem data={data} /> : <SkeletonCard />;
}

export default memo(CatalogListItem);
