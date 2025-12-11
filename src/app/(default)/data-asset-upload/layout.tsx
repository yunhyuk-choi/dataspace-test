import { memo, ReactNode } from "react";

function DataAssetUploadLayout({
  children,
  subItemUpload,
}: {
  children: ReactNode;
  subItemUpload?: ReactNode;
}) {
  return (
    <div className="relative flex flex-row items-baseline justify-center space-x-20">
      {children}
      {subItemUpload}
    </div>
  );
}

export default memo(DataAssetUploadLayout);
