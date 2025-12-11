import CatalogList from "@/feature/catalog-list/components/CatalogList";
import SearchBar from "@/feature/catalog-list/components/SearchBar";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const search = params.search;
  return (
    <main className="relative flex min-h-full max-w-7xl min-w-3xl flex-col items-center dark:bg-black">
      <SearchBar search={search as string} />
      {search && <CatalogList />}
    </main>
  );
}
