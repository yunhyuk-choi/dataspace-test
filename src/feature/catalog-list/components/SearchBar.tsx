"use client";
import PlaceholdersAndVanishInput from "@/components/ui/placeholders-and-vanish-input";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { memo, useState } from "react";

function SearchBar({ search }: { search?: string }) {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  // const search = searchParams.get("search") ?? "";
  const [query, setQuery] = useState<string | undefined>(search);

  const handleSubmit = (value?: string) => {
    if (!value) return;
    const params = new URLSearchParams(searchParams.toString());
    setQuery(value);
    if (value === null || value.trim().length === 0) {
      params.delete("search");
    } else {
      params.set("search", value.trim());
    }
    router.push(`${pathName}?${params.toString()}`);
  };

  return (
    <motion.div
      initial={!search ? { y: "40vh" } : { y: "5rem" }}
      animate={{
        y: search ? "5rem" : undefined, // 처음엔 화면 가운데
      }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className={cn(
        "top-0 z-50 mx-auto flex w-full max-w-xl flex-col items-center justify-center",
        search ? "fixed" : ""
      )}
    >
      {!search && (
        <h2 className="mb-10 w-full text-center text-xl text-black sm:mb-20 sm:text-5xl dark:text-white">
          Ask me something
        </h2>
      )}

      <PlaceholdersAndVanishInput
        placeholders={["검색어를 입력하세요", "React Query", "Next.js App Router"]}
        onChange={(e) => setQuery(e.target.value)}
        onSubmit={() => handleSubmit(query)}
        text={query}
      />
    </motion.div>
  );
}

export default memo(SearchBar);
