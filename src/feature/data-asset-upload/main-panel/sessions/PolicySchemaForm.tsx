import PolicyDroppableArea from "@/blocks/data-asset-upload/main-panel/PolicyDroppableArea";
import PolicyItemCard from "@/blocks/data-asset-upload/main-panel/PolicyItemCard";
import { Button } from "@/components/ui/button";
import { PolicyBlockProps } from "@/feature/data-asset-upload/main-panel/types/apiInterfaces";
import { DatasetAPIType } from "@/feature/data-asset-upload/main-panel/types/formInterfaces";
import { getItems } from "@/feature/data-asset-upload/side-panel/services/items";
import { DndContext, DragEndEvent, rectIntersection } from "@dnd-kit/core";
import { useField } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { memo, useCallback } from "react";

const isCorrectType = (value: unknown): value is "Offer" | "Set" | "Agreement" => {
  if (["Offer", "Set", "Agreement"].includes(String(value))) return true;
  return false;
};

function PolicySchemaForm({ form }: { form: DatasetAPIType }) {
  const t = useTranslations("data-asset-upload");
  const router = useRouter();
  const field = useField({ form, name: `hasPolicy` });
  const policyList = field.state.value;
  const { data } = useQuery({
    queryKey: ["policyList"],
    queryFn: () => getItems<PolicyBlockProps>("policy"),
  });

  const removePolicy = useCallback(
    (id: string, type: string) =>
      field.removeValue(
        field.state.value.findIndex((item) => item.id === id && item.type === type)
      ),
    [field]
  );

  const onDragEnd = (result: DragEndEvent) => {
    const { active, over } = result;
    const policy = data?.data.find((item) => item.id === active.id);
    const already = field.state.value.find(
      (item) => item.id === active.id && item.type === `odrl:${over?.id}`
    );
    if (already || !policy || !isCorrectType(over?.id)) return;
    field.pushValue({ ...policy, type: `odrl:${over?.id}` });
  };

  const handleSideBar = useCallback(() => {
    const params = new URLSearchParams();

    params.set("side", "open");
    router.replace(`?${params.toString()}`);
  }, [router]);

  return (
    <div className="space-y-4 rounded border p-4">
      <h2 className="text-lg font-bold">{t("policies")}</h2>
      <DndContext collisionDetection={rectIntersection} onDragEnd={onDragEnd}>
        <div className="flex justify-between">
          <PolicyDroppableArea
            label="Set"
            removePolicy={removePolicy}
            list={policyList}
            className="border-error-400"
          />
          <PolicyDroppableArea
            label="Offer"
            removePolicy={removePolicy}
            list={policyList}
            className="border-warning-400"
          />
          <PolicyDroppableArea
            label="Agreement"
            removePolicy={removePolicy}
            list={policyList}
            className="border-info-400"
          />
        </div>

        <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {data?.data &&
            data.data.map((item) => (
              <PolicyItemCard
                data={item}
                key={item.id}
                selectedIn={field.state.value.reduce(
                  (t, s) => (s.id === item.id ? `${t}${s.type}` : t),
                  ""
                )}
              />
            ))}
        </div>
      </DndContext>
      <Button
        type="button"
        variant={"default"}
        color="primary"
        size={"medium"}
        onClick={handleSideBar}
      >
        {t("add-some-label", { item: t("policy") })}
      </Button>
    </div>
  );
}

export default memo(
  PolicySchemaForm,
  (prev, next) => prev.form.getFieldValue("hasPolicy") === next.form.getFieldValue("hasPolicy")
);
