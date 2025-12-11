"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useTranslations } from "next-intl";
import { usePathname, useSearchParams } from "next/navigation";
import React, { memo, useCallback, useMemo } from "react";
import PageHeaderWrapper from "../ui/pageHeaderWrapper";

type Props = {
  resolveDynamicName?: (id: string) => string | undefined;
};

const isNumeric = (seg: string) => /^\d+$/.test(seg);

function PageHeaderBreadcrumb({ resolveDynamicName }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations("menubar");

  const nameParam = searchParams.get("name");
  const sub = searchParams.get("sub");

  // ------------------------------
  // ⭐ translation helper (missing key safe)
  // ------------------------------
  const translate = useCallback(
    (key: string, fallback?: string) => {
      const translated = t(key);
      return translated === key ? (fallback ?? key) : translated;
    },
    [t]
  );

  // ------------------------------
  // ⭐ pre-parse path segments
  // ------------------------------
  const segments = useMemo(() => pathname.split("/").filter(Boolean), [pathname]);

  // ------------------------------
  // ⭐ build breadcrumb items
  // ------------------------------
  const breadcrumbs = useMemo(() => {
    if (segments.length < 2) return [];

    const nodes: React.ReactNode[] = [];
    const lastIndex = segments.length - 1;

    const isDetailPage = Boolean(nameParam);

    // ----------------------------------------------------
    // CASE 1: detail page → "/0?name=xxx"
    // ----------------------------------------------------
    if (isDetailPage) {
      const id = segments[lastIndex];

      nodes.push(
        <BreadcrumbItem key="root">
          <BreadcrumbLink href="/">{translate("search", "search")}</BreadcrumbLink>
        </BreadcrumbItem>
      );
      nodes.push(<BreadcrumbSeparator key="sep-root" />);

      const label = nameParam ?? resolveDynamicName?.(id) ?? id;

      nodes.push(
        <BreadcrumbItem key={`detail-${id}`}>
          <BreadcrumbPage>{label}</BreadcrumbPage>
        </BreadcrumbItem>
      );

      return nodes;
    }

    // ----------------------------------------------------
    // CASE 2: 일반 페이지
    // ----------------------------------------------------
    segments.forEach((seg, idx) => {
      const isLast = idx === lastIndex;
      let label: string;

      // dynamic numeric id
      if (isNumeric(seg)) {
        label = resolveDynamicName?.(seg) ?? nameParam ?? seg;
      } else {
        label = translate(seg, seg);
      }

      if (isLast && !sub) {
        nodes.push(
          <BreadcrumbItem key={`last-${seg}`}>
            <BreadcrumbPage>{label}</BreadcrumbPage>
          </BreadcrumbItem>
        );
        return;
      }

      const href = `/${segments.slice(0, idx + 1).join("/")}`;

      nodes.push(
        <BreadcrumbItem key={`lnk-${seg}`}>
          <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
        </BreadcrumbItem>
      );

      if (!isLast) {
        nodes.push(<BreadcrumbSeparator key={`sep-${idx}`} />);
      }
    });

    // ----------------------------------------------------
    // CASE 3: settings?sub=general 같은 sub 처리
    // ----------------------------------------------------
    if (sub) {
      nodes.push(<BreadcrumbSeparator key="sep-sub" />);
      nodes.push(
        <BreadcrumbItem key={`sub-${sub}`}>
          <BreadcrumbPage>{translate(sub, sub)}</BreadcrumbPage>
        </BreadcrumbItem>
      );
    }

    return nodes;
  }, [segments, nameParam, sub, translate, resolveDynamicName]);

  if (!breadcrumbs.length) return null;

  return (
    <PageHeaderWrapper>
      <Breadcrumb>
        <BreadcrumbList>{breadcrumbs}</BreadcrumbList>
      </Breadcrumb>
    </PageHeaderWrapper>
  );
}

export default memo(PageHeaderBreadcrumb);
