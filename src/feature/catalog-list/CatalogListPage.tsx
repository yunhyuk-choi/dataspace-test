import { memo } from "react";
import SearchBar from "./components/SearchBar";

function CatalogListPage() {
  return (
    <>
      {/* 검색 결과 */}
      <SearchBar />
    </>
  );
}

export default memo(CatalogListPage);
