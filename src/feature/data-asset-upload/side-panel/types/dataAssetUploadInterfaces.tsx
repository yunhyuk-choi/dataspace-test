import {
  ConstraintBlockProps,
  PermissionBlockProps,
} from "@/feature/data-asset-upload/main-panel/types/apiInterfaces";

type OperandType = {
  value: string;
  label: string;
};

export interface ConditionType {
  leftOperand?: OperandType;
  operator?: OperandType;
  rightOperand?: OperandType;
}

export interface OperandItemProps {
  item?: { value: string; label: string };
  type: keyof ConditionType;
  onClick?: (type: keyof ConditionType) => void;
}

export interface ConstraintItemProps {
  item: ConstraintBlockProps;
  onClick?: (target: string) => void;
}

export interface PermissionItemProps {
  item: PermissionBlockProps;
  listType?: string;
  onClick?: (target: string, listType: string) => void;
}
