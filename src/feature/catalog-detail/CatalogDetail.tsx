"use client";

import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { memo } from "react";
import { getDetail } from "../data-asset-upload/main-panel/services/dataset";
import { DatasetFormType } from "../data-asset-upload/main-panel/types/formInterfaces";
import DetailSection from "./components/DetailSection";
import HeroSection from "./components/HeroSection";

function CatalogDetail({ initialData }: { initialData?: DatasetFormType }) {
  const pathName = usePathname();
  const { data } = useQuery({
    queryKey: ["detailData"],
    queryFn: () => getDetail(pathName.slice(1)),
    initialData,
  });

  return (
    <div className="flex flex-col gap-32 space-y-20 py-30">
      <HeroSection
        data={
          data
            ? {
                id: data.id,
                title: data.title,
                type: data.type,
                description: data.description,
                imgUrl:
                  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1280&auto=format&fit=crop",
              }
            : undefined
        }
      />
      <DetailSection data={data?.detailDescription} />
    </div>
  );
}

export default memo(CatalogDetail);
