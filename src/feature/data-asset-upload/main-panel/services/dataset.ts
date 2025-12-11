import { DatasetProps } from "@/feature/data-asset-upload/main-panel/types/apiInterfaces";
import { DatasetFormType } from "@/feature/data-asset-upload/main-panel/types/dataSchema";
import { apiClient } from "@/lib/apiClient";

interface GetPoliciesProps {
  data: DatasetFormType[];
}

export const getDataset = async (): Promise<DatasetFormType[]> => {
  const { data } = await apiClient.get(`api/set-dataset`);

  return data.data;
};

export const getDetail = async (id: string): Promise<DatasetProps> => {
  const { data } = await apiClient.get(`catalog/datasets/${id}`);

  return data.data;
};

export const postDataset = async (req: DatasetFormType) => {
  const { data } = await apiClient.post("api/set-dataset", req);

  return data;
};
