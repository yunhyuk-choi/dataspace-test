"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import {
  DatasetProps,
  PolicyBlockProps,
} from "@/feature/data-asset-upload/main-panel/types/apiInterfaces";
import {
  datasetSchema,
  Distribution,
} from "@/feature/data-asset-upload/main-panel/types/dataSchema";
import { FormAsyncValidateOrFn, FormValidateOrFn, useForm } from "@tanstack/react-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { memo } from "react";
import { getDetail, postDataset } from "./services/dataset";
import DatasetDescription from "./sessions/DatasetDescription";
import DefaultSchemaForm from "./sessions/DefaultSchemaForm";
import DistributionSchemaForm from "./sessions/DistributionSchemaForm";
import KeywordSchemaForm from "./sessions/KeywordSchemaForm";
import PolicySchemaForm from "./sessions/PolicySchemaForm";

function DataAssetUpload({ initialId }: { initialId?: string }) {
  const t = useTranslations("data-asset-upload");
  const { data: initialData } = useQuery({
    queryKey: ["initialDataset"],
    queryFn: () => {
      if (!initialId) {
        return Promise.resolve(null);
      }
      return getDetail(initialId);
    },
    enabled: !!initialId,
  });
  const dataUploadMutation = useMutation({
    mutationFn: postDataset,
    mutationKey: ["postDataSet"],
    onSuccess: (res) => {
      console.log("success upload", res);
    },
  });
  const form = useForm<
    DatasetProps,
    undefined | FormValidateOrFn<DatasetProps>,
    undefined | FormValidateOrFn<DatasetProps>,
    undefined | FormAsyncValidateOrFn<DatasetProps>,
    undefined | FormValidateOrFn<DatasetProps>,
    undefined | FormAsyncValidateOrFn<DatasetProps>,
    undefined | FormValidateOrFn<DatasetProps>,
    undefined | FormAsyncValidateOrFn<DatasetProps>,
    undefined | FormValidateOrFn<DatasetProps>,
    undefined | FormAsyncValidateOrFn<DatasetProps>,
    undefined | FormAsyncValidateOrFn<DatasetProps>,
    unknown
  >({
    validators: {
      onSubmit: datasetSchema,
    },
    defaultValues: initialData ?? {
      type: "dcat:Dataset" as const,
      id: "",
      title: "",
      description: "",
      creator: { id: "" },
      keyword: [] as string[],
      hasPolicy: [] as PolicyBlockProps[],
      distribution: [] as Distribution[],
      detailDescription: "",
    },
    onSubmit: async ({ value }) => {
      console.log("submit", value);
      dataUploadMutation.mutate(value);
      // 실제 제출처리(서버 전송)는 여기
      try {
        // await api.post("/upload", value);
        console.log("저장 성공 시 처리...");
      } catch (err) {
        console.error("서버 전송 실패", err);
      }
    },
  });

  return (
    <Card className="relative my-10 w-full">
      <CardHeader>
        <CardTitle>{t("card-title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          <FieldGroup>
            <DefaultSchemaForm form={form} />
            <KeywordSchemaForm form={form} />
            <PolicySchemaForm form={form} />
            <DistributionSchemaForm form={form} />
            <DatasetDescription form={form} />
            <Button
              type="submit"
              className="bg-primary-500/50 sticky bottom-10 shadow-lg backdrop-blur-xl [backdrop-filter:blur(10px)]"
            >
              {t("submit")}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}

export default memo(DataAssetUpload);
