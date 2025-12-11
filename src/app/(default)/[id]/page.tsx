import CatalogDetail from "@/feature/catalog-detail/CatalogDetail";
import { memo } from "react";

async function CatalogDetailPage({ params }: PageProps<`/[id]`>) {
  // const initialData = await getDetail((await params).id);
  return <CatalogDetail />;
}

export default memo(CatalogDetailPage);
