import {
  FormAsyncValidateOrFn,
  FormValidateOrFn,
  ReactFormExtendedApi,
} from "@tanstack/react-form";
import { DatasetProps } from "./apiInterfaces";

export interface DatasetCreator {
  id: string;
}

export interface OdrlConstraint {
  type: "odrl:LogicalConstraint";
  leftOperand: { id: string };
  operator: { id: string };
  rightOperand: string;
}

export interface OdrlPermission {
  action: { id: string };
  constraint: OdrlConstraint[];
}

export interface OdrlPolicy {
  type: "odrl:Offer" | "odrl:Set" | "odrl:Agreement";
  id: string;
  permission: OdrlPermission[];
  prohibition?: OdrlPermission[];
  obligation?: OdrlPermission[];
}

export interface Distribution {
  type: "dcat:Distribution";
  id: string;
  format: { id: string };
  accessService: {
    type: "dcat:DataService";
    id: string;
  };
}

export interface DefaultFormType {
  type: "dcat:Dataset";
  id: string;
  title: string;
  description: string;
}

export interface DatasetFormType extends DefaultFormType {
  creator: DatasetCreator;
  keyword: string[];
  hasPolicy: OdrlPolicy[];
  distribution: Distribution[];
  detailDescription: string;
}

export type DataAPIInterface<T> = ReactFormExtendedApi<
  T,
  undefined | FormValidateOrFn<T>,
  undefined | FormValidateOrFn<T>,
  undefined | FormAsyncValidateOrFn<T>,
  undefined | FormValidateOrFn<T>,
  undefined | FormAsyncValidateOrFn<T>,
  undefined | FormValidateOrFn<T>,
  undefined | FormAsyncValidateOrFn<T>,
  undefined | FormValidateOrFn<T>,
  undefined | FormAsyncValidateOrFn<T>,
  undefined | FormAsyncValidateOrFn<T>,
  unknown
>;

export type DatasetAPIType = DataAPIInterface<DatasetProps>;
