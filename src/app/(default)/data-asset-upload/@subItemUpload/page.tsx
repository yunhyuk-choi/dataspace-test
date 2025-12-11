import SubItemPanel from "@/feature/data-asset-upload/side-panel/SubItemPanel";
import { memo } from "react";

async function SubItemUploadPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const side = await searchParams;
  const isSidePanel = side.side === "open";
  return isSidePanel ? (
    <div className="sticky top-30 min-h-100 max-w-7xl min-w-3xl flex-col items-center dark:bg-black">
      <SubItemPanel />
    </div>
  ) : null;
}

export default memo(SubItemUploadPage);
