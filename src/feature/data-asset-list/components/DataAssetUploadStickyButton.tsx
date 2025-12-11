import { Button } from "@/components/ui/button";
import Link from "next/link";
import { memo } from "react";

function DataAssetUploadStickyButton() {
  return (
    <Link href={"data-asset-upload"} className="align-bottom-safe sticky top-30 z-10 self-end ">
      <Button
        color="primary"
        className="bg-primary-500/70 border-primary-500/70 rounded-full border px-4 py-2 shadow-lg backdrop-blur-xl [backdrop-filter:blur(14px)] dark:border-white/10 dark:bg-black/20"
      >
        + 등록하기
      </Button>
    </Link>
  );
}

export default memo(DataAssetUploadStickyButton);
