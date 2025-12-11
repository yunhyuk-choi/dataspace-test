"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useField } from "@tanstack/react-form";
import { useTranslations } from "next-intl";
import { memo, useCallback, useRef, useState } from "react";
import { DatasetAPIType } from "../types/formInterfaces";

function KeywordSchemaForm({ form }: { form: DatasetAPIType }) {
  const t = useTranslations("data-asset-upload");
  const field = useField({ form, name: "keyword" });
  const ref = useRef<HTMLInputElement>(null);
  const [resetKey, setResetKey] = useState(0);

  const addKeyword = useCallback(() => {
    if (ref.current) field.pushValue(ref.current.value);
    setResetKey((prev) => prev + 1);
  }, [field]);

  const removeKeyword = (index: number) => {
    field.removeValue(index);
  };

  return (
    <div className="w-full space-y-2 rounded border p-4">
      <h2 className="font-bold">{t("keywords")}</h2>
      <div className="flex flex-row flex-wrap space-y-1 space-x-2">
        {field.state.value.map((kw, index) => (
          <KeywordItem key={index} index={index} form={form} handleRemove={removeKeyword} />
        ))}
      </div>

      <div className="flex w-full flex-row space-x-4">
        <Input autoComplete="te" key={resetKey} ref={ref} />
        <Button
          type="button"
          style={"outlined"}
          color="primary"
          size={"medium"}
          onClick={addKeyword}
        >
          + Add Keyword
        </Button>
      </div>
    </div>
  );
}

const KeywordItem = memo(function KeywordItem({
  form,
  index,
  handleRemove,
}: {
  form: DatasetAPIType;
  index: number;
  handleRemove: (index: number) => void;
}) {
  const t = useTranslations("data-asset-upload");
  const field = useField({ form, name: `keyword[${index}]` });

  return (
    <Badge className="flex space-x-1">
      {field.state.value}

      <Button style={"outlined"} color="error" size={"tiny"} onClick={() => handleRemove(index)}>
        {/* {t("delete")} */}X
      </Button>
    </Badge>
  );
});

export default memo(KeywordSchemaForm);
