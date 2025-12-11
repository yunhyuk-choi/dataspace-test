import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface SkeletonListProps {
  /** 보여줄 스켈레톤 아이템 개수 (기본값: 3) */
  count?: number;
  /** 컨테이너 클래스 (grid 등 설정 가능) */
  className?: string;
  /** 개별 아이템 클래스 (높이 등 설정) */
  itemClassName?: string;
}

export function SkeletonList({ count = 3, className, itemClassName }: SkeletonListProps) {
  return (
    <div className={cn("flex w-full flex-col space-y-3", className)}>
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton
          key={index}
          className={cn(
            "h-24 w-full rounded-xl bg-neutral-200 dark:bg-neutral-800", // 기본 높이 및 색상
            itemClassName
          )}
        />
      ))}
    </div>
  );
}
