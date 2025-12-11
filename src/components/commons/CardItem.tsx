import { DatasetListItem } from "@/feature/data-asset-list/types/datasetList";
import Image from "next/image";
import Link from "next/link";
import { memo, useMemo } from "react";
import { CardItem as BaseCardItem, CardBody, CardContainer } from "../ui/3d-card";
import { Badge } from "../ui/badge";
import CollapsibleBadge from "./CollapsibleBadge";

interface CardItemProps {
  data: DatasetListItem;
}

function CardItem({ data }: CardItemProps) {
  // ✨ 1) 이미지 URL memoization (매 렌더마다 문자열 재생성 방지)
  const imageSrc = useMemo(
    () =>
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1280&auto=format&fit=crop",
    []
  );

  return (
    <Link
      href={{ pathname: `${data.datasetStrId}`, query: { name: data.title } }}
      prefetch={true}
      className="h-full"
    >
      <CardContainer className="inter-var will-change-transform">
        <CardBody className="group/card relative h-auto w-auto rounded-xl border border-black/10 bg-gray-50 p-6 sm:w-100 dark:border-white/20 dark:bg-black dark:hover:shadow-2xl dark:hover:shadow-emerald-500/10">
          <BaseCardItem
            as="p"
            translateZ="60"
            className="mb-2 max-w-sm text-sm text-neutral-500 dark:text-neutral-300"
          >
            {data.companyName}
          </BaseCardItem>
          <BaseCardItem
            translateZ="50"
            className="text-xl font-bold text-neutral-600 dark:text-white"
          >
            {data.title}
          </BaseCardItem>

          {/* ✨ optimized image */}
          <BaseCardItem translateZ="100" rotateX={20} className="mt-4 w-full">
            <Image
              src={imageSrc}
              alt="thumbnail"
              fill={false}
              width={600}
              height={400}
              loading="lazy"
              decoding="async"
              placeholder="blur"
              blurDataURL={imageSrc}
              className="h-60 w-full rounded-xl object-cover group-hover/card:shadow-xl"
              sizes="
              (min-width: 1280px) 400px,
              (min-width: 768px) 50vw,
              100vw
            "
              priority={false} // LCP 방지 — 리스트용 이미지들은 priority 사용 X
            />
          </BaseCardItem>
          <BaseCardItem
            as="p"
            translateZ="120"
            className="mt-2 max-w-sm text-sm text-neutral-500 dark:text-neutral-300"
          >
            {data.description}
          </BaseCardItem>

          {/* buttons */}

          <div className="relative mt-20 flex items-center justify-between">
            <BaseCardItem
              translateZ={20}
              translateX={-40}
              as="div"
              className="w-full min-w-1/3 rounded-xl py-2 text-xs font-normal dark:text-white"
            >
              <CollapsibleBadge items={data.tags} />
            </BaseCardItem>
            <BaseCardItem
              translateZ={20}
              translateX={40}
              as={"div"}
              className="dark:text-whit max-w-1/2 rounded-xl py-2 text-xs font-normal"
            >
              <Badge variant={"destructive"}>{data.contentType}</Badge>
            </BaseCardItem>
          </div>
        </CardBody>
      </CardContainer>
    </Link>
  );
}

export default memo(CardItem);
