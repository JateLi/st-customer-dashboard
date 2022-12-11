import apiClient from "./http-common";
import { OpportunityType, PostOpportunityType } from "./types";

export const getAllOpportunitiesFn = async (id: string) => {
  const response = await apiClient.get<OpportunityType[]>(
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

export const createOpportunityFn = async (
  id: string,
  formData: PostOpportunityType
) => {
  const response = await apiClient.post<OpportunityType>(
    `/customers/${id}/opportunities/`,
    formData
  );
  return response.data;
};

export const updateOpportunityFn = async ({
  id,
  formData,
  opId,
}: {
  id: string;
  formData: PostOpportunityType;
  opId: string;
}) => {
  const response = await apiClient.patch<OpportunityType>(
    `/customers/${id}/opportunities/${opId}`,
    formData
  );
  return response.data;
};

export const deleteOpportunityFn = async (id: string, opId: string) => {
  const response = await apiClient.delete<any>(
    `/customers/${id}/opportunities/${opId}`
  );
  return response.data;
};
