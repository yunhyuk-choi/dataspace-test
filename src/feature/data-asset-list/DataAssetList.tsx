"use-client";
import { memo } from "react";
import DataAssetUploadStickyButton from "./components/DataAssetUploadStickyButton";
import ProvideList from "./components/ProvideList";

function DataAssetList() {
  return (
    <>
      <DataAssetUploadStickyButton />
      <ProvideList />
    </>
  );
}

export default memo(DataAssetList);
