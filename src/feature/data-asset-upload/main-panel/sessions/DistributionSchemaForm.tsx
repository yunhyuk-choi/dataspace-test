import { useField } from "@tanstack/react-form";
import { useTranslations } from "next-intl";
import { memo } from "react";
import { DatasetAPIType, Distribution } from "../types/formInterfaces";

const DistributionItem = memo(function T({ form, index }: { form: DatasetAPIType; index: number }) {
  const t = useTranslations("data-asset-upload");
  const idField = useField({ form, name: `distribution[${index}].id` });
  const formatField = useField({ form, name: `distribution[${index}].format.id` });

  return (
    <div className="mb-2 rounded border p-2">
      <label className="text-sm font-medium">{t("distribution-id")}</label>
      <input
        className="mb-1 w-full rounded border px-2 py-1"
        value={idField.state.value ?? ""}
        onChange={(e) => idField.handleChange(e.target.value)}
      />
      <label className="text-sm font-medium">{t("format-id")}</label>
      <input
        className="w-full rounded border px-2 py-1"
        value={formatField.state.value ?? ""}
        onChange={(e) => formatField.handleChange(e.target.value)}
      />
    </div>
  );
});

function DistributionSchemaForm({ form }: { form: DatasetAPIType }) {
  const t = useTranslations("data-asset-upload");
  const distributions = form.getFieldValue("distribution") as Distribution[];

  return (
    <div className="space-y-2 rounded border p-4">
      <h2 className="text-lg font-bold">{t("distributions")}</h2>
      {distributions.map((_, index) => (
        <DistributionItem key={index} form={form} index={index} />
      ))}
    </div>
  );
}

export default memo(DistributionSchemaForm);
