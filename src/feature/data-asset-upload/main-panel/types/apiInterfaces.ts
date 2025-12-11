import { DatasetFormType, OdrlConstraint, OdrlPermission, OdrlPolicy } from "./formInterfaces";

export interface ConstraintBlockProps extends OdrlConstraint {
  name: string;
  line: string;
}

export interface PermissionBlockProps extends OdrlPermission {
  name: string;
  constraint: ConstraintBlockProps[];
}
export interface PolicyBlockProps extends OdrlPolicy {
  name: string;
  permission: PermissionBlockProps[];
  prohibition?: PermissionBlockProps[];
  obligation?: PermissionBlockProps[];
}

export interface DatasetProps extends DatasetFormType {
  hasPolicy: PolicyBlockProps[];
}
