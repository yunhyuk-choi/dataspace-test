import DataAssetUploadLayout from "../layout";

export default function EditLayout({
  children,
  subItemUpload,
}: {
  children: React.ReactNode;
  subItemUpload?: React.ReactNode;
}) {
  return <DataAssetUploadLayout subItemUpload={subItemUpload}>{children}</DataAssetUploadLayout>;
}
