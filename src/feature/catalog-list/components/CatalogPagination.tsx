"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";
import { memo, useCallback, useMemo } from "react";

interface CatalogPaginationProps {
  totalPages?: number;
}

function CatalogPagination({ totalPages = 0 }: CatalogPaginationProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentPage = Number(searchParams.get("page") ?? 1);

  /**
   * 페이지네이션 계산 로직을 메모이제이션
   * currentPage / totalPages 변화시에만 계산 수행
   */
  const pages = useMemo(() => {
    const visiblePages: (number | "...")[] = [];
    const maxVisible = 5;

    // 전체 페이지가 5 이하 → 모두 보여줌
    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);

    if (start > 1) {
      visiblePages.push(1);
      if (start > 2) visiblePages.push("...");
    }

    for (let i = start; i <= end; i++) {
      visiblePages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) visiblePages.push("...");
      visiblePages.push(totalPages);
    }

    return visiblePages;
  }, [currentPage, totalPages]);

  /** URL 생성 로직 */
  const createURL = useCallback(
    (page: number) => {
      const params = new URL(pathname, "https://dummy.com");
      params.search = searchParams.toString();
      params.searchParams.set("page", String(page));
      return `${params.pathname}?${params.searchParams.toString()}`;
    },
    [pathname, searchParams]
  );

  // 페이지가 1개라면 컴포넌트 자체를 렌더링하지 않아 성능 최적화
  if (totalPages <= 1) return null;

  return (
    <div className="sticky bottom-4 z-50 mx-auto flex items-center justify-center">
      <div className="mx-auto rounded-full border border-white/20 bg-gray-800/15 px-4 py-2 shadow-lg backdrop-blur-xl [backdrop-filter:blur(14px)] dark:border-white/10 dark:bg-black/20">
        <Pagination>
          <PaginationContent className="gap-1">
            <PaginationItem>
              <PaginationPrevious
                href={currentPage > 1 ? createURL(currentPage - 1) : ""}
                aria-disabled={currentPage <= 1}
                className={currentPage <= 1 ? "pointer-events-none opacity-30" : ""}
              />
            </PaginationItem>

            {pages.map((p, i) => (
              <PaginationItem key={i}>
                {p === "..." ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink href={createURL(p)} isActive={p === currentPage}>
                    {p}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href={currentPage < totalPages ? createURL(currentPage + 1) : ""}
                aria-disabled={currentPage >= totalPages}
                className={currentPage >= totalPages ? "pointer-events-none opacity-30" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

export default memo(CatalogPagination);
