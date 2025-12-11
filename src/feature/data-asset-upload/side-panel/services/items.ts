import { apiClient } from "@/lib/apiClient";

interface GetProps<T> {
  data: T[];
}

interface PostItemProps<T> {
  target: string;
  data: T;
}

export const getItems = async <T>(target: string): Promise<GetProps<T>> => {
  const { data } = await apiClient.get(`set-items?target=${target}`);

  return data;
};

export const postItem = async <T>(req: PostItemProps<T>) => {
  const { data } = await apiClient.post("set-items", req);

  return data;
};
