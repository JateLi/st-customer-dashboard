import apiClient from "./http-common";
import { OpportunityType } from "./types";

export const getAllOpportunitiesFn = async (id: string) => {
  const response = await apiClient.get<OpportunityType>(
    `/customers/${id}/opportunities/`
  );
  return response.data;
};

export const getOpportunityFn = async (id: string, opId: string) => {
  const response = await apiClient.get<OpportunityType>(
    `/customers/${id}/opportunities/${opId}`
  );
  return response.data;
};

export const createOpportunityFn = async (id: string, formData: FormData) => {
  const response = await apiClient.post<OpportunityType>(
    `/customers/${id}/opportunities/`,
    {
      name: formData.get("name"),
      status: formData.get("status"),
      customerId: formData.get("customerId"),
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const updateOpportunityFn = async ({
  id,
  formData,
  opId,
}: {
  id: string;
  formData: FormData;
  opId: string;
}) => {
  const response = await apiClient.patch<OpportunityType>(
    `/customers/${id}/opportunities/${opId}`,
    {
      name: formData.get("name"),
      status: formData.get("status"),
      customerId: formData.get("customerId"),
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const deleteOpportunityFn = async (id: string, opId: string) => {
  const response = await apiClient.delete<any>(
    `/customers/${id}/opportunities/${opId}`
  );
  return response.data;
};
