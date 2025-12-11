import { Button } from "@/components/ui/button";
import { useField } from "@tanstack/react-form";
import { useTranslations } from "next-intl";
import { memo, useCallback } from "react";
import {
  DataAPIInterface,
  OdrlPolicy,
} from "../../../feature/data-asset-upload/main-panel/types/formInterfaces";

const createEmptyConstraint = () => ({
  type: "odrl:LogicalConstraint" as const,
  leftOperand: { id: "" },
  operator: { id: "" },
  rightOperand: "",
});

const createEmptyPermission = () => ({
  action: { id: "" },
  constraint: [createEmptyConstraint()],
});

const createEmptyPolicy = (): OdrlPolicy => ({
  type: "odrl:Offer" as const,
  id: "",
  permission: [createEmptyPermission()],
});

const ConstraintItem = memo(function T({
  form,
  permissionIndex,
  constraintIndex,
}: {
  form: DataAPIInterface<OdrlPolicy>;
  permissionIndex: number;
  constraintIndex: number;
}) {
  const t = useTranslations("data-asset-upload");
  const basePath = `permission[${permissionIndex}].constraint[${constraintIndex}]` as const;

  const leftOperandField = useField({
    form,
    name: `${basePath}.leftOperand.id`,
  });
  const operatorField = useField({
    form,
    name: `${basePath}.operator.id`,
  });
  const rightOperandField = useField({
    form,
    name: `${basePath}.rightOperand`,
  });

  return (
    <div className="mb-2 ml-4 rounded border p-2">
      <label className="text-xs font-medium">{t("constraint")}</label>
      <input
        className="mb-1 w-full rounded border px-2 py-1"
        value={leftOperandField.state.value ?? ""}
        placeholder={t("some-operand", { direction: t("left") })}
        onChange={(e) => leftOperandField.handleChange(e.target.value)}
      />
      <input
        className="mb-1 w-full rounded border px-2 py-1"
        value={operatorField.state.value ?? ""}
        placeholder={t("operator")}
        onChange={(e) => operatorField.handleChange(e.target.value)}
      />
      <input
        className="mb-1 w-full rounded border px-2 py-1"
        value={rightOperandField.state.value ?? ""}
        placeholder={t("some-operand", { direction: t("right") })}
        onChange={(e) => rightOperandField.handleChange(e.target.value)}
      />
    </div>
  );
});

const PermissionItem = memo(
  function T({
    form,
    permissionIndex,
  }: {
    form: DataAPIInterface<OdrlPolicy>;
    permissionIndex: number;
  }) {
    const t = useTranslations("data-asset-upload");
    const basePath = `permission[${permissionIndex}]` as const;

    const actionField = useField({ form, name: `${basePath}.action.id` });
    const constraints = useField({ form, name: `${basePath}.constraint` });

    const addConstraint = useCallback(
      () => constraints.pushValue(createEmptyConstraint()),
      [constraints]
    );

    const removeConstraint = useCallback(
      (index: number) => constraints.removeValue(index),
      [constraints]
    );

    return (
      <div className="mb-2 ml-2 rounded border p-2">
        <label className="text-sm font-medium">{t("permission-action")}</label>
        <input
          className="mb-2 w-full rounded border px-2 py-1"
          value={actionField.state.value ?? ""}
          onChange={(e) => actionField.handleChange(e.target.value)}
        />

        <div>
          {constraints.state.value.map((_, constraintIndex) => (
            <div key={constraintIndex}>
              <ConstraintItem
                form={form}
                permissionIndex={permissionIndex}
                constraintIndex={constraintIndex}
              />
              <Button
                type="button"
                onClick={() => removeConstraint(constraintIndex)}
                color="error"
                size={"small"}
                style={"ghost"}
              >
                {t("remove-some-label", { item: t("constraint") })}
              </Button>
            </div>
          ))}
        </div>

        <Button
          type="button"
          onClick={addConstraint}
          size={"medium"}
          style={"outlined"}
          color="primary"
        >
          {t("add-some-label", { item: t("constraint") })}
        </Button>
      </div>
    );
  },
  (prev, next) =>
    prev.form.getFieldValue(`permission[${prev.permissionIndex}].constraint`).length ===
    next.form.getFieldValue(`permission[${prev.permissionIndex}].constraint`).length
);

export const PolicyPanelItem = memo(function T({ form }: { form: DataAPIInterface<OdrlPolicy> }) {
  const t = useTranslations("data-asset-upload");
  const idField = useField({ form, name: `id` });
  const permissions = useField({ form, name: `permission` });

  const addPermission = useCallback(
    () => permissions.pushValue(createEmptyPermission()),
    [permissions]
  );

  const removePermission = useCallback(
    (permIndex: number) => permissions.removeValue(permIndex),
    [permissions]
  );

  return (
    <div className="mb-4 rounded border p-3">
      <label className="text-sm font-medium">{t("policy-id")}</label>
      <input
        className="mb-2 w-full rounded border px-2 py-1"
        value={idField.state.value ?? ""}
        onChange={(e) => idField.handleChange(e.target.value)}
      />

      {permissions.state.value.map((_, permIndex) => (
        <div key={permIndex}>
          <PermissionItem form={form} permissionIndex={permIndex} />
          <Button
            type="button"
            color="error"
            size={"small"}
            style={"ghost"}
            onClick={() => removePermission(permIndex)}
          >
            {t("remove-some-label", { item: t("permission") })}
          </Button>
        </div>
      ))}

      <Button
        type="button"
        onClick={addPermission}
        color="primary"
        size={"medium"}
        style={"outlined"}
      >
        {t("add-some-label", { item: t("permission") })}
      </Button>
    </div>
  );
});

export default memo(
  PolicyPanelItem,
  (prev, next) => prev.form.getFieldValue("id") === next.form.getFieldValue("id")
);
