import { DatasetListItem } from "@/feature/data-asset-list/types/datasetList";
import { apiClient } from "@/lib/apiClient";

interface LinksType {
  rel: string;
  href: string;
}

interface ResponseType {
  success: boolean;
  data: {
    links: LinksType[];
    content: DatasetListItem[];
    page: {
      size: number;
      totalElements: number;
      totalPages: number;
      number: number;
    };
  };
}

export async function getDatasetList(search?: string, page?: string): Promise<ResponseType> {
  const { data } = await apiClient.get<ResponseType>(`catalog/search`, {
    params: {
      page: page ?? 1,
      size: 30,
      sort: ["string"],
      searchTerm: search,
    },
  });

  return data;
}
