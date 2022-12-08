import apiClient from "./http-common";
import { CustomerType } from "./types";

export const getAllCustomersFn = async () => {
  const response = await apiClient.get<CustomerType>(`/customers`);
  return response.data;
};

export const getCustomerFn = async (id: string) => {
  const response = await apiClient.get<CustomerType>(`/customers/${id}`);
  return response.data;
};

export const createCustomerFn = async (formData: FormData) => {
  const response = await apiClient.post<CustomerType>(`/customers`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateCustomerFn = async ({
  id,
  formData,
}: {
  id: string;
  formData: FormData;
}) => {
  const response = await apiClient.patch<CustomerType>(
    `customers/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const deleteCustomerFn = async (id: string) => {
  const response = await apiClient.delete<any>(`/customers/${id}`);
  return response.data;
};
