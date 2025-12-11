import { memo, Suspense } from "react";
import ListGrid from "./ListGrid";

function CatalogList() {
  return (
    <div className="my-20 flex w-full flex-col items-center justify-between gap-1 px-4">
      <Suspense>
        <ListGrid />
      </Suspense>
    </div>
  );
}

export default memo(CatalogList);
