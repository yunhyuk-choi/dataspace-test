import DataAssetList from "@/feature/data-asset-list/DataAssetList";
import { memo } from "react";

function DataAssetListPage() {
  return (
    <main className="relative flex min-h-full max-w-7xl min-w-3xl flex-col items-center dark:bg-black">
      <DataAssetList />
    </main>
  );
}

export default memo(DataAssetListPage);
