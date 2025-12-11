import DataAssetUpload from "@/feature/data-asset-upload/main-panel/DataAssetUpload";
import { memo } from "react";

function DataAssetUploadPage() {
  return (
    <main className="relative flex min-h-full max-w-7xl min-w-3xl flex-col items-center dark:bg-black">
      <DataAssetUpload />
    </main>
  );
}

export default memo(DataAssetUploadPage);
