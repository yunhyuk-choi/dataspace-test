import ListGrid from "@/feature/catalog-list/components/ListGrid";
import SearchBar from "@/feature/catalog-list/components/SearchBar";
import { Suspense } from "react";

export default async function ListPage() {
  return (
    <main className="relative flex min-h-full max-w-7xl min-w-3xl flex-col items-center dark:bg-black">
      <SearchBar search=" " />
      <Suspense>
        <div className="my-20 flex w-full flex-col items-center justify-between gap-1 px-4">
          <ListGrid />
        </div>
      </Suspense>
    </main>
  );
}
