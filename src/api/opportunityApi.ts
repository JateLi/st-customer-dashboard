import apiClient from "./http-common";
import { OpportunityType } from "./types";

export const getAllOpportunitiesFn = async (id: string) => {
  const response = await apiClient.get<OpportunityType>(
    `/customers/${id}/opportunities/`
  );
  return response.data;
};
