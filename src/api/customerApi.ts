import apiClient from "./http-common";
import { CustomerType, PostCustomerType } from "./types";

export const getAllCustomers = async () => {
  const response = await apiClient.get<CustomerType>(`/customers`);
  return response.data;
};

export const getCustomer = async (id: string) => {
  const response = await apiClient.get<CustomerType>(`/customers/${id}`);
  return response.data;
};

export const createCustomer = async (formData: PostCustomerType) => {
  const response = await apiClient.post<CustomerType>(`/customers`, formData);
  return response.data;
};

export const updateCustomer = async ({
  id,
  formData,
}: {
  id: string;
  formData: PostCustomerType;
}) => {
  const response = await apiClient.patch<CustomerType>(
    `customers/${id}`,
    formData
  );
  return response.data;
};

export const deleteCustomer = async (id: string) => {
  const response = await apiClient.delete<any>(`/customers/${id}`);
  return response.data;
};
