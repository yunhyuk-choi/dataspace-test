"use client";
import ListGrid from "@/feature/catalog-list/components/ListGrid";
import { memo, Suspense } from "react";

function ProvideList() {
  return (
    <div className="my-20 flex min-h-[70dvh] w-full flex-col items-center justify-between gap-1 px-4">
      <Suspense>
        <ListGrid />
      </Suspense>
    </div>
  );
}

export default memo(ProvideList);
