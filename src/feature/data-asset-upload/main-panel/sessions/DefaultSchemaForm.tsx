"use client";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useField } from "@tanstack/react-form";
import { useTranslations } from "next-intl";
import { memo } from "react";
import { DatasetAPIType, DefaultFormType } from "../types/formInterfaces";

interface DefaultSchemaFormProps {
  form: DatasetAPIType;
}

function FieldInput({
  form,
  name,
  label,
}: {
  form: DatasetAPIType;
  name: keyof DefaultFormType;
  label: string;
}) {
  const t = useTranslations("data-asset-upload");
  const field = useField({ form, name });
  return (
    <div className="mb-2">
      <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
        <FieldLabel className="text-sm font-medium">{t(label)}</FieldLabel>
        <Input
          className="w-full rounded border px-2 py-1"
          id={field.name}
          name={field.name}
          onBlur={field.handleBlur}
          value={field.state.value ?? ""}
          aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
          onChange={(e) => field.handleChange(e.target.value)}
        />
        {field.state.meta.isTouched && !field.state.meta.isValid && (
          <FieldError
            className="text-xs text-red-500"
            errors={field.state.meta.errors}
          ></FieldError>
        )}
      </Field>
    </div>
  );
}

function DefaultSchemaForm({ form }: DefaultSchemaFormProps) {
  const t = useTranslations("data-asset-upload");
  return (
    <div className="space-y-2 rounded border p-4">
      <h2 className="text-lg font-bold">{t("basic-information")}</h2>
      <FieldInput form={form} name="id" label="id" />
      <FieldInput form={form} name="title" label="title" />
      <FieldInput form={form} name="description" label="description" />
    </div>
  );
}

export default memo(DefaultSchemaForm);
