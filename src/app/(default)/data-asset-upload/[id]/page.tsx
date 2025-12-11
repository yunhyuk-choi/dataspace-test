import DataAssetUpload from "@/feature/data-asset-upload/main-panel/DataAssetUpload";

export default async function DataAssetEditPage({ params }: PageProps<"/data-asset-upload/[id]">) {
  const id = (await params).id;
  return (
    <main className="relative flex min-h-full max-w-7xl min-w-3xl flex-col items-center dark:bg-black">
      <DataAssetUpload initialId={id} />
    </main>
  );
}
